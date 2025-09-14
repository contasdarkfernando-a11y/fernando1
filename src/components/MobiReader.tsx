import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface MobiReaderProps {
  file: File;
  onClose: () => void;
}

export const MobiReader = ({ file, onClose }: MobiReaderProps) => {
  const handleDownload = () => {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download iniciado",
      description: "Use um aplicativo de leitura de ebooks para abrir o arquivo MOBI.",
    });
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
      </div>

      {/* Área de informação */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <Download className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Arquivo MOBI Detectado</h2>
            <p className="text-muted-foreground mb-6">
              Os arquivos MOBI não podem ser lidos diretamente no navegador. 
              Faça o download para abrir em um aplicativo de leitura compatível.
            </p>
          </div>
          
          <div className="space-y-4">
            <Button onClick={handleDownload} className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Baixar Arquivo MOBI
            </Button>
            
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-2">Aplicativos recomendados:</p>
              <ul className="space-y-1">
                <li>• Kindle (Amazon)</li>
                <li>• Calibre</li>
                <li>• FBReader</li>
                <li>• Moon+ Reader</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};