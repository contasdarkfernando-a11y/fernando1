import React, { useEffect, useRef, useState } from 'react';
import { Book as EpubBook } from 'epubjs';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ArrowLeft, Settings } from 'lucide-react';

interface EpubReaderProps {
  file: File;
  onClose: () => void;
}

export const EpubReader = ({ file, onClose }: EpubReaderProps) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<EpubBook | null>(null);
  const renditionRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState('');

  useEffect(() => {
    let cleanup: (() => void) | null = null;

    const loadBook = async () => {
      if (!viewerRef.current) return;

      try {
        setIsLoading(true);
        
        // Criar URL do arquivo para o epubjs
        const url = URL.createObjectURL(file);
        const book = new EpubBook(url);
        bookRef.current = book;

        // Aguardar o livro carregar completamente
        await book.ready;

        const rendition = book.renderTo(viewerRef.current, {
          width: '100%',
          height: '100%',
          spread: 'none',
          flow: 'paginated'
        });
        
        renditionRef.current = rendition;
        
        // Aguardar a renderização
        await rendition.display();
        setIsLoading(false);

        // Configurar navegação por teclado
        const handleKeyPress = (event: KeyboardEvent) => {
          if (event.key === 'ArrowLeft') {
            rendition.prev();
          } else if (event.key === 'ArrowRight') {
            rendition.next();
          }
        };

        document.addEventListener('keydown', handleKeyPress);

        // Atualizar localização atual
        rendition.on('relocated', (location: any) => {
          setCurrentLocation(location.start.cfi);
        });

        cleanup = () => {
          document.removeEventListener('keydown', handleKeyPress);
          rendition.destroy();
          URL.revokeObjectURL(url);
        };

      } catch (error) {
        console.error('Erro ao carregar EPUB:', error);
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
      renditionRef.current.prev();
    }
  };

  const goToNextPage = () => {
    if (renditionRef.current) {
      renditionRef.current.next();
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
      <div className="flex-1 relative bg-background">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Carregando livro...</p>
            </div>
          </div>
        )}
        <div 
          ref={viewerRef} 
          className="w-full h-full"
          style={{ minHeight: '100%' }}
        />

        {/* Controles de navegação */}
        {!isLoading && (
          <>
            <Button
              variant="outline"
              size="sm"
              className="absolute left-4 top-1/2 transform -translate-y-1/2"
              onClick={goToPrevPage}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              onClick={goToNextPage}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};