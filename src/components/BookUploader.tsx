import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface BookUploaderProps {
  onFileUpload: (file: File) => void;
}

export const BookUploader = ({ onFileUpload }: BookUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // Verificar se é um tipo de arquivo suportado
      const supportedTypes = ['.pdf', '.epub', '.mobi'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      
      if (supportedTypes.includes(fileExtension)) {
        onFileUpload(file);
        toast({
          title: "Arquivo carregado!",
          description: `"${file.name}" foi carregado com sucesso.`,
        });
      } else {
        toast({
          title: "Formato não suportado",
          description: "Por favor, selecione um arquivo PDF, EPUB ou MOBI.",
          variant: "destructive"
        });
      }
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/epub+zip': ['.epub'],
      'application/x-mobipocket-ebook': ['.mobi']
    },
    multiple: false
  });

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors duration-200
          ${isDragActive 
            ? 'border-primary bg-primary/5' 
            : 'border-muted-foreground/25 hover:border-primary/50'
          }
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <Upload className="w-12 h-12 text-muted-foreground" />
          <div>
            <h3 className="text-lg font-semibold mb-2">
              {isDragActive ? 'Solte o arquivo aqui' : 'Carregue seu livro'}
            </h3>
            <p className="text-muted-foreground mb-4">
              Arraste e solte ou clique para selecionar
            </p>
            <div className="flex gap-2 justify-center text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                <span>PDF</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>EPUB</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>MOBI</span>
              </div>
            </div>
          </div>
          <Button variant="outline">
            Selecionar Arquivo
          </Button>
        </div>
      </div>
    </div>
  );
};