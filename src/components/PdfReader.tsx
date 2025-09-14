import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ArrowLeft, ZoomIn, ZoomOut } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
// Configurar worker do PDF.js (usar worker local para evitar CORS)
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?worker';

pdfjs.GlobalWorkerOptions.workerPort = new pdfjsWorker();

const READING_STATE_KEY = 'pdf-reading-state';

interface PdfReaderProps {
  file: File;
  onClose: () => void;
}

export const PdfReader = ({ file, onClose }: PdfReaderProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Salvar estado de leitura
  const saveReadingState = (page: number, currentScale: number) => {
    const state = {
      fileName: file.name,
      page: page,
      scale: currentScale,
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
        return { page: state.page || 1, scale: state.scale || 1.0 };
      } catch (error) {
        console.error('Erro ao carregar estado de leitura:', error);
      }
    }
    return { page: 1, scale: 1.0 };
  };

  // Carregar estado inicial
  useEffect(() => {
    const savedState = loadReadingState();
    setPageNumber(savedState.page);
    setScale(savedState.scale);
    
    if (savedState.page > 1) {
      toast({
        title: "Posição restaurada",
        description: `Continuando da página ${savedState.page}`,
      });
    }
  }, [file.name]);

  // Salvar estado quando página ou zoom mudar
  useEffect(() => {
    if (numPages > 0) {
      saveReadingState(pageNumber, scale);
    }
  }, [pageNumber, scale, numPages, file.name]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('Erro ao carregar PDF:', error);
    setError('Erro ao carregar o arquivo PDF. Verifique se o arquivo não está corrompido.');
    setIsLoading(false);
  };

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prev => Math.min(prev + 1, numPages));
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3.0));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
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
      } else if (event.key === '+' || event.key === '=') {
        event.preventDefault();
        zoomIn();
      } else if (event.key === '-') {
        event.preventDefault();
        zoomOut();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [numPages]);

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
          <Button variant="outline" size="sm" onClick={zoomOut}>
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-sm px-2">{Math.round(scale * 100)}%</span>
          <Button variant="outline" size="sm" onClick={zoomIn}>
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Área de leitura */}
      <div className="flex-1 overflow-auto bg-muted/30">
        <div className="flex justify-center p-4">
          {isLoading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Carregando PDF...</p>
            </div>
          )}
          
          {error && (
            <div className="text-center py-8">
              <div className="text-red-500 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Erro ao carregar PDF</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={onClose}>Voltar</Button>
            </div>
          )}
          
          {!error && (
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            className="max-w-full"
          >
            {!isLoading && (
              <Page 
                pageNumber={pageNumber} 
                scale={scale}
                className="shadow-lg"
                loading={
                  <div className="flex items-center justify-center p-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  </div>
                }
              />
            )}
          </Document>
          )}
        </div>
      </div>

      {/* Controles de navegação */}
      <div className="flex items-center justify-between p-4 border-t bg-card">
        <Button
          variant="outline"
          onClick={goToPrevPage}
          disabled={pageNumber <= 1}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Anterior
        </Button>
        
        <div className="flex items-center gap-2">
          <span className="text-sm">
            Página {pageNumber} de {numPages}
          </span>
        </div>
        
        <Button
          variant="outline"
          onClick={goToNextPage}
          disabled={pageNumber >= numPages}
        >
          Próxima
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};