import React, { useEffect, useRef, useState } from 'react';
import ePub from 'epubjs';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ArrowLeft, Settings } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface EpubReaderProps {
  file: File;
  onClose: () => void;
}

const READING_STATE_KEY = 'epub-reading-state';

export const EpubReader = ({ file, onClose }: EpubReaderProps) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<any>(null);
  const renditionRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Salvar estado de leitura
  const saveReadingState = (location: string) => {
    const state = {
      fileName: file.name,
      location: location,
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
        return state.location;
      } catch (error) {
        console.error('Erro ao carregar estado de leitura:', error);
      }
    }
    return null;
  };
  useEffect(() => {
    let cleanup: (() => void) | null = null;

    const loadBook = async () => {
      if (!viewerRef.current) return;

      try {
        setIsLoading(true);
        setError(null);
        
        // Ler o arquivo como ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();
        
        // Criar o livro usando ePub
        const book = ePub(arrayBuffer);
        bookRef.current = book;

        // Aguardar o livro estar pronto
        await book.ready;

        // Verificar se o elemento ainda existe
        if (!viewerRef.current) return;

        const rendition = book.renderTo(viewerRef.current, {
          width: '100%',
          height: '100%',
          flow: 'paginated',
          manager: 'default'
        });
        
        renditionRef.current = rendition;
        
        // Carregar estado de leitura anterior
        const savedLocation = loadReadingState();
        
        // Exibir o livro
        if (savedLocation) {
          await rendition.display(savedLocation);
          toast({
            title: "Posição restaurada",
            description: "Continuando de onde você parou",
          });
        } else {
          await rendition.display();
        }
        
        setIsLoading(false);

        // Configurar navegação por teclado
        const handleKeyPress = (event: KeyboardEvent) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            rendition.prev();
          } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            rendition.next();
          }
        };

        document.addEventListener('keydown', handleKeyPress);

        // Atualizar localização atual
        rendition.on('relocated', (location: any) => {
          if (location && location.start && location.start.cfi) {
            setCurrentLocation(location.start.cfi);
            saveReadingState(location.start.cfi);
          }
        });

        cleanup = () => {
          document.removeEventListener('keydown', handleKeyPress);
          if (rendition) {
            try {
              rendition.destroy();
            } catch (e) {
              console.warn('Erro ao destruir rendition:', e);
            }
          }
        };

      } catch (error) {
        console.error('Erro ao carregar EPUB:', error);
        setError('Erro ao carregar o arquivo EPUB. Verifique se o arquivo não está corrompido.');
        setIsLoading(false);
      }
    };

    loadBook();

    return () => {
      if (cleanup) cleanup();
    };
  }, [file]);

  const goToPrevPage = () => {
    if (renditionRef.current) {
      try {
        renditionRef.current.prev();
      } catch (error) {
        console.error('Erro ao navegar para página anterior:', error);
      }
    }
  };

  const goToNextPage = () => {
    if (renditionRef.current) {
      try {
        renditionRef.current.next();
      } catch (error) {
        console.error('Erro ao navegar para próxima página:', error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Barra superior */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <span className="font-medium truncate max-w-xs">
            {file.name.replace(/\.[^/.]+$/, "")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Área de leitura */}
      <div className="flex-1 relative bg-white">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto mb-4"></div>
              <p className="text-gray-800">Carregando livro...</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-lg">
              <div className="text-red-500 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Erro ao carregar EPUB</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={onClose}>Voltar</Button>
            </div>
          </div>
        )}
        
        <div 
          ref={viewerRef} 
          className={`w-full h-full bg-white ${isLoading || error ? 'invisible' : 'visible'}`}
          style={{ 
            minHeight: '100%',
            color: '#000000',
            fontSize: '16px',
            lineHeight: '1.6',
            padding: '20px',
            maxWidth: '800px',
            margin: '0 auto'
          }}
        />

        {/* Controles de navegação */}
        {!isLoading && !error && (
          <>
            <Button
              variant="outline"
              size="sm"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
              onClick={goToPrevPage}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
              onClick={goToNextPage}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
      
      {/* Barra inferior com informações */}
      {!isLoading && !error && (
        <div className="flex items-center justify-center p-2 border-t bg-card text-sm text-muted-foreground">
          Use as setas do teclado ou os botões laterais para navegar
        </div>
      )}
    </div>
  );
};