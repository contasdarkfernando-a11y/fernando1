import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronLeft, ChevronRight, Settings, BookOpen, AlertCircle } from 'lucide-react';
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
  const [pages, setPages] = useState<string[]>([]);
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

        // Ler o arquivo como ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        
        // Procurar por texto legível no arquivo MOBI
        let extractedText = '';
        let textFound = false;
        
        // Procurar por padrões de texto HTML/XML no arquivo MOBI
        for (let i = 0; i < uint8Array.length - 4; i++) {
          const byte = uint8Array[i];
          
          // Verificar se é um caractere ASCII imprimível
          if (byte >= 32 && byte <= 126) {
            const char = String.fromCharCode(byte);
            extractedText += char;
            
            // Se encontrou uma tag HTML, provavelmente é conteúdo de texto
            if (extractedText.includes('<html') || extractedText.includes('<body') || extractedText.includes('<p>')) {
              textFound = true;
            }
          } else if (textFound && extractedText.length > 0) {
            // Se estava coletando texto e encontrou um byte não-ASCII, adiciona espaço
            if (extractedText[extractedText.length - 1] !== ' ') {
              extractedText += ' ';
            }
          }
          
          // Limitar o tamanho para evitar arquivos muito grandes
          if (extractedText.length > 100000) break;
        }

        // Limpar e processar o texto extraído
        if (extractedText.length > 100 && textFound) {
          // Remover tags HTML e limpar o texto
          let cleanText = extractedText
            .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '') // Remover scripts
            .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '') // Remover estilos
            .replace(/<[^>]*>/g, ' ') // Remover todas as tags HTML
            .replace(/&nbsp;/g, ' ') // Substituir &nbsp;
            .replace(/&amp;/g, '&') // Substituir &amp;
            .replace(/&lt;/g, '<') // Substituir &lt;
            .replace(/&gt;/g, '>') // Substituir &gt;
            .replace(/&quot;/g, '"') // Substituir &quot;
            .replace(/&#\d+;/g, ' ') // Remover entidades numéricas
            .replace(/\s+/g, ' ') // Normalizar espaços
            .replace(/[^\x20-\x7E\u00C0-\u017F\u0100-\u024F]/g, ' ') // Manter apenas caracteres legíveis
            .trim();

          // Dividir em parágrafos e depois em páginas
          const paragraphs = cleanText.split(/\.\s+/).filter(p => p.length > 20);
          const wordsPerPage = 400;
          const pageArray: string[] = [];
          
          let currentPageText = '';
          let wordCount = 0;
          
          for (const paragraph of paragraphs) {
            const words = paragraph.split(' ');
            
            if (wordCount + words.length > wordsPerPage && currentPageText.length > 0) {
              pageArray.push(currentPageText.trim() + '.');
              currentPageText = paragraph + '. ';
              wordCount = words.length;
            } else {
              currentPageText += paragraph + '. ';
              wordCount += words.length;
            }
          }
          
          // Adicionar a última página se houver conteúdo
          if (currentPageText.trim().length > 0) {
            pageArray.push(currentPageText.trim());
          }
          
          if (pageArray.length > 0) {
            setPages(pageArray);
            setTotalPages(pageArray.length);
            setContent(pageArray[Math.min(savedState.page - 1, pageArray.length - 1)]);
            setIsLoading(false);
            
            if (savedState.page > 1) {
              toast({
                title: "Posição restaurada",
                description: `Continuando da página ${savedState.page}`,
              });
            }
            return;
          }
        }

        // Se não conseguiu extrair texto válido, mostrar mensagem informativa
        setError('not_supported');
        setIsLoading(false);

      } catch (error) {
        console.error('Erro ao carregar arquivo MOBI:', error);
        setError('processing_error');
        setIsLoading(false);
      }
    };

    loadMobiFile();
  }, [file]);

  // Salvar estado quando página ou fonte mudar
  useEffect(() => {
    if (!isLoading && pages.length > 0) {
      saveReadingState(currentPage, fontSize);
    }
  }, [currentPage, fontSize, isLoading, file.name, pages.length]);

  // Atualizar conteúdo quando a página mudar
  useEffect(() => {
    if (pages.length > 0 && currentPage <= pages.length) {
      setContent(pages[currentPage - 1]);
    }
  }, [currentPage, pages]);

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

  const renderError = () => {
    if (error === 'not_supported') {
      return (
        <div className="text-center max-w-2xl p-8 bg-blue-50 rounded-lg border border-blue-200">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-blue-500" />
          <h3 className="text-xl font-semibold mb-4 text-blue-800">Arquivo MOBI Detectado</h3>
          <div className="text-blue-700 space-y-3 text-left">
            <p><strong>Nome:</strong> {file.name}</p>
            <p><strong>Tamanho:</strong> {(file.size / 1024 / 1024).toFixed(2)} MB</p>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-2">O formato MOBI é proprietário da Amazon</h4>
              <p className="mb-4">Para uma melhor experiência de leitura, recomendamos:</p>
              
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Usar o aplicativo <strong>Kindle</strong> da Amazon</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Converter para EPUB usando <strong>Calibre</strong> (gratuito)</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Usar um leitor MOBI dedicado como <strong>FBReader</strong></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="text-center max-w-md p-6 bg-red-50 rounded-lg border border-red-200">
        <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
        <h3 className="text-lg font-semibold mb-2 text-red-800">Erro ao processar arquivo</h3>
        <p className="text-red-600 mb-4">Não foi possível processar este arquivo MOBI.</p>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Barra superior */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <BookOpen className="w-5 h-5 text-blue-600" />
          <span className="font-medium truncate max-w-xs">
            {file.name.replace(/\.[^/.]+$/, "")}
          </span>
        </div>
        {!error && !isLoading && (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={decreaseFontSize}>
              <span className="text-sm font-bold">A-</span>
            </Button>
            <span className="text-sm px-2 font-medium">{fontSize}px</span>
            <Button variant="outline" size="sm" onClick={increaseFontSize}>
              <span className="text-sm font-bold">A+</span>
            </Button>
          </div>
        )}
      </div>

      {/* Área de leitura */}
      <div className="flex-1 relative bg-white overflow-auto">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-800">Processando arquivo MOBI...</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            {renderError()}
          </div>
        )}
        
        {!isLoading && !error && (
          <div className="max-w-4xl mx-auto p-8">
            <div 
              ref={contentRef}
              className="leading-relaxed text-justify"
              style={{ 
                fontSize: `${fontSize}px`,
                lineHeight: '1.8',
                color: '#1a1a1a',
                fontFamily: 'Georgia, "Times New Roman", serif'
              }}
            >
              {content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Controles de navegação - Botões laterais com melhor visibilidade */}
        {!isLoading && !error && totalPages > 1 && (
          <>
            <Button
              variant="default"
              size="sm"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg border-2 border-white"
              onClick={goToPrevPage}
              disabled={currentPage <= 1}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="default"
              size="sm"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg border-2 border-white"
              onClick={goToNextPage}
              disabled={currentPage >= totalPages}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </>
        )}
      </div>

      {/* Barra inferior */}
      {!isLoading && !error && totalPages > 1 && (
        <div className="flex items-center justify-between p-4 border-t bg-gray-50">
          <div className="text-sm text-gray-600">
            Use as setas do teclado ou os botões laterais para navegar
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevPage}
              disabled={currentPage <= 1}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Anterior
            </Button>
            
            <span className="text-sm font-medium px-3 py-1 bg-blue-100 text-blue-800 rounded">
              {currentPage} / {totalPages}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextPage}
              disabled={currentPage >= totalPages}
              className="flex items-center gap-1"
            >
              Próxima
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobiReader;