import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronLeft, ChevronRight, Settings, BookOpen } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface MobiReaderProps {
  file: File;
  onClose: () => void;
}

const READING_STATE_KEY = 'mobi-reading-state';

export const MobiReader: React.FC<MobiReaderProps> = ({ file, onClose }) => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [fontSize, setFontSize] = useState(16);
  const contentRef = useRef<HTMLDivElement>(null);

  // Salvar estado de leitura
  const saveReadingState = (page: number, size: number) => {
    const state = {
      fileName: file.name,
      page: page,
      fontSize: size,
      timestamp: Date.now()
    };
    localStorage.setItem(`${READING_STATE_KEY}-${file.name}`, JSON.stringify(state));
  };

  // Carregar estado de leitura
  const loadReadingState = () => {
    const stored = localStorage.getItem(`${READING_STATE_KEY}-${file.name}`);
    if (stored) {
      try {
        const state = JSON.parse(stored);
        return { page: state.page || 1, fontSize: state.fontSize || 16 };
      } catch (error) {
        console.error('Erro ao carregar estado de leitura:', error);
      }
    }
    return { page: 1, fontSize: 16 };
  };

  useEffect(() => {
    const loadMobiFile = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Carregar estado anterior
        const savedState = loadReadingState();
        setCurrentPage(savedState.page);
        setFontSize(savedState.fontSize);

        // Ler o arquivo como texto (MOBI é um formato binário, mas vamos tentar extrair texto básico)
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        
        // Tentar extrair texto do arquivo MOBI (método simplificado)
        let textContent = '';
        let inTextSection = false;
        
        // Procurar por seções de texto no arquivo MOBI
        for (let i = 0; i < uint8Array.length - 10; i++) {
          // Procurar por tags HTML comuns em arquivos MOBI
          const chunk = String.fromCharCode(...uint8Array.slice(i, i + 10));
          
          if (chunk.includes('<html') || chunk.includes('<body') || chunk.includes('<p>')) {
            inTextSection = true;
          }
          
          if (inTextSection && uint8Array[i] >= 32 && uint8Array[i] <= 126) {
            textContent += String.fromCharCode(uint8Array[i]);
          }
          
          if (textContent.length > 50000) break; // Limitar para evitar arquivos muito grandes
        }

        // Se não conseguiu extrair texto, mostrar mensagem explicativa
        if (textContent.length < 100) {
          textContent = `
            <div style="padding: 40px; text-align: center; font-family: Arial, sans-serif;">
              <h2>Arquivo MOBI Detectado</h2>
              <p>Este é um arquivo no formato MOBI (Mobipocket).</p>
              <p>O formato MOBI é proprietário da Amazon e requer decodificação especializada.</p>
              <br>
              <h3>Para ler este arquivo:</h3>
              <ul style="text-align: left; max-width: 400px; margin: 0 auto;">
                <li>Use o aplicativo Kindle da Amazon</li>
                <li>Converta para EPUB usando Calibre</li>
                <li>Use um leitor MOBI dedicado</li>
              </ul>
              <br>
              <p><strong>Nome do arquivo:</strong> ${file.name}</p>
              <p><strong>Tamanho:</strong> ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          `;
        } else {
          // Limpar e formatar o texto extraído
          textContent = textContent
            .replace(/<[^>]*>/g, '') // Remover tags HTML
            .replace(/\s+/g, ' ') // Normalizar espaços
            .trim();
          
          // Dividir em páginas (aproximadamente 2000 caracteres por página)
          const wordsPerPage = 500;
          const words = textContent.split(' ');
          const pages = [];
          
          for (let i = 0; i < words.length; i += wordsPerPage) {
            pages.push(words.slice(i, i + wordsPerPage).join(' '));
          }
          
          setTotalPages(pages.length);
          setContent(pages[savedState.page - 1] || pages[0] || textContent);
        }

        setIsLoading(false);

        if (savedState.page > 1) {
          toast({
            title: "Posição restaurada",
            description: `Continuando da página ${savedState.page}`,
          });
        }

      } catch (error) {
        console.error('Erro ao carregar arquivo MOBI:', error);
        setError('Erro ao processar o arquivo MOBI. Este formato requer decodificação especializada.');
        setIsLoading(false);
      }
    };

    loadMobiFile();
  }, [file]);

  // Salvar estado quando página ou fonte mudar
  useEffect(() => {
    if (!isLoading) {
      saveReadingState(currentPage, fontSize);
    }
  }, [currentPage, fontSize, isLoading, file.name]);

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 24));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 12));
  };

  // Navegação por teclado
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goToPrevPage();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goToNextPage();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, totalPages]);

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Barra superior */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <BookOpen className="w-5 h-5 text-primary" />
          <span className="font-medium truncate max-w-xs">
            {file.name.replace(/\.[^/.]+$/, "")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={decreaseFontSize}>
            A-
          </Button>
          <span className="text-sm px-2">{fontSize}px</span>
          <Button variant="outline" size="sm" onClick={increaseFontSize}>
            A+
          </Button>
        </div>
      </div>

      {/* Área de leitura */}
      <div className="flex-1 relative bg-white overflow-auto">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-800">Processando arquivo MOBI...</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="text-center max-w-md p-6 bg-red-50 rounded-lg border border-red-200">
              <div className="text-red-500 mb-4">
                <BookOpen className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-red-800">Erro ao carregar MOBI</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={onClose} variant="outline">Voltar</Button>
            </div>
          </div>
        )}
        
        {!isLoading && !error && (
          <div className="max-w-4xl mx-auto p-8">
            <div 
              ref={contentRef}
              className="prose prose-lg max-w-none"
              style={{ 
                fontSize: `${fontSize}px`,
                lineHeight: '1.8',
                color: '#1a1a1a',
                fontFamily: 'Georgia, serif'
              }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        )}

        {/* Controles de navegação */}
        {!isLoading && !error && totalPages > 1 && (
          <>
            <Button
              variant="outline"
              size="sm"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
              onClick={goToPrevPage}
              disabled={currentPage <= 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
              onClick={goToNextPage}
              disabled={currentPage >= totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>

      {/* Barra inferior */}
      {!isLoading && !error && (
        <div className="flex items-center justify-between p-4 border-t bg-card">
          <div className="text-sm text-muted-foreground">
            Use as setas do teclado para navegar
          </div>
          
          {totalPages > 1 && (
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPrevPage}
                disabled={currentPage <= 1}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Anterior
              </Button>
              
              <span className="text-sm font-medium">
                Página {currentPage} de {totalPages}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={goToNextPage}
                disabled={currentPage >= totalPages}
              >
                Próxima
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MobiReader;