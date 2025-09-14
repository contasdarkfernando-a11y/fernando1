import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, AlertCircle } from 'lucide-react';
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
      description: "O arquivo foi baixado. Use um aplicativo compatível para lê-lo.",
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
            <div className="w-16 h-16 mx-auto mb-4 bg-orange-500/10 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-orange-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Formato MOBI</h2>
            <p className="text-muted-foreground mb-6">
              Arquivos MOBI precisam ser abertos em aplicativos específicos. 
              Baixe o arquivo para ler em seu dispositivo.
            </p>
          </div>
          
          <div className="space-y-4">
            <Button onClick={handleDownload} className="w-full" size="lg">
              <Download className="w-4 h-4 mr-2" />
              Baixar Arquivo MOBI
            </Button>
            
            <div className="text-sm text-muted-foreground bg-muted/20 p-4 rounded-lg">
              <p className="font-medium mb-3">📱 Aplicativos recomendados:</p>
              <div className="grid grid-cols-2 gap-2 text-left">
                <div>
                  <p className="font-medium">Desktop:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Calibre</li>
                    <li>• Kindle para PC</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium">Mobile:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Kindle App</li>
                    <li>• FBReader</li>
                    <li>• Moon+ Reader</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground">
              💡 Dica: Converta para EPUB usando o Calibre para ler no navegador
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};