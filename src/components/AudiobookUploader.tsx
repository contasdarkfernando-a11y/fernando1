import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Music, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface AudiobookUploaderProps {
  onFileUpload: (file: File) => void;
}

export const AudiobookUploader = ({ onFileUpload }: AudiobookUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // Verificar se é um tipo de arquivo de áudio suportado
      const supportedTypes = ['.mp3', '.m4a', '.wav', '.ogg', '.aac'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      
      if (supportedTypes.includes(fileExtension)) {
        onFileUpload(file);
        toast({
          title: "Audiobook carregado!",
          description: `"${file.name}" foi carregado com sucesso.`,
        });
      } else {
        toast({
          title: "Formato não suportado",
          description: "Por favor, selecione um arquivo MP3, M4A, WAV, OGG ou AAC.",
          variant: "destructive"
        });
      }
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/mpeg': ['.mp3'],
      'audio/mp4': ['.m4a'],
      'audio/wav': ['.wav'],
      'audio/ogg': ['.ogg'],
      'audio/aac': ['.aac']
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
              {isDragActive ? 'Solte o audiobook aqui' : 'Carregue seu audiobook'}
            </h3>
            <p className="text-muted-foreground mb-4">
              Arraste e solte ou clique para selecionar
            </p>
            <div className="flex gap-2 justify-center text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Music className="w-4 h-4" />
                <span>MP3</span>
              </div>
              <div className="flex items-center gap-1">
                <Headphones className="w-4 h-4" />
                <span>M4A</span>
              </div>
              <div className="flex items-center gap-1">
                <Music className="w-4 h-4" />
                <span>WAV</span>
              </div>
              <div className="flex items-center gap-1">
                <Headphones className="w-4 h-4" />
                <span>OGG</span>
              </div>
              <div className="flex items-center gap-1">
                <Music className="w-4 h-4" />
                <span>AAC</span>
              </div>
            </div>
          </div>
          <Button variant="outline">
            Selecionar Audiobook
          </Button>
        </div>
      </div>
    </div>
  );
};