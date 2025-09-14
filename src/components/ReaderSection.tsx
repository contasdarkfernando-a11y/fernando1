import React, { useState } from 'react';
import { BookUploader } from './BookUploader';
import { PdfReader } from './PdfReader';
import { EpubReader } from './EpubReader';
import { MobiReader } from './MobiReader';
import { useUploadedBooks, UploadedBook } from '@/hooks/useUploadedBooks';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, BookOpen, Trash2, Clock, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const ReaderSection = () => {
  const { uploadedBooks, lastReadBook, addBook, removeBook, clearAllBooks, markAsRead } = useUploadedBooks();
  const [currentBook, setCurrentBook] = useState<UploadedBook | null>(null);

  const handleFileUpload = (file: File) => {
    addBook(file);
  };

  const handleOpenBook = (book: UploadedBook) => {
    // Verificar se o arquivo ainda existe
    if (!book.file) {
      toast({
        title: "Arquivo não encontrado",
        description: "O arquivo foi perdido. Tente fazer upload novamente.",
        variant: "destructive"
      });
      return;
    }
    
    markAsRead(book.id);
    setCurrentBook(book);
  };

  const handleCloseReader = () => {
    setCurrentBook(null);
  };

  const handleRemoveBook = (bookId: string) => {
    removeBook(bookId);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return <FileText className="w-8 h-8" />;
    return <BookOpen className="w-8 h-8" />;
  };

  // Separar último livro lido dos outros
  const lastReadBookData = uploadedBooks.find(book => book.id === lastReadBook);
  const otherBooks = uploadedBooks.filter(book => book.id !== lastReadBook);
  // Renderizar o leitor se um livro estiver selecionado
  if (currentBook) {
    const fileExtension = currentBook.name.split('.').pop()?.toLowerCase();
    
    if (fileExtension === 'pdf') {
      return <PdfReader file={currentBook.file} onClose={handleCloseReader} />;
    } else if (fileExtension === 'epub') {
      return <EpubReader file={currentBook.file} onClose={handleCloseReader} />;
    } else if (fileExtension === 'mobi') {
      return <MobiReader file={currentBook.file} onClose={handleCloseReader} />;
    } else {
      toast({
        title: "Formato não suportado",
        description: "Este formato de arquivo ainda não é suportado.",
        variant: "destructive"
      });
      setCurrentBook(null);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Leitor Digital</h1>
          <p className="text-muted-foreground">
            Carregue seus livros em PDF ou EPUB e leia diretamente no navegador
          </p>
        </div>

        {/* Upload de arquivos */}
        <div className="mb-12">
          <BookUploader onFileUpload={handleFileUpload} />
        </div>

        {/* Lista de livros carregados */}
        {uploadedBooks.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Minha Biblioteca Pessoal</h2>
              <Button 
                variant="outline" 
                onClick={clearAllBooks}
                className="text-destructive hover:text-destructive"
              >
                Limpar Tudo
              </Button>
            </div>
            
            {/* Último livro lido */}
            {lastReadBookData && (
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Continue Lendo
                </h3>
                <Card className="p-4 border-primary/20 bg-primary/5">
                  <div className="flex items-start gap-3">
                    <div className="text-primary flex-shrink-0">
                      {getFileIcon(lastReadBookData.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium truncate">{lastReadBookData.name}</h3>
                        <Star className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(lastReadBookData.size)}
                      </p>
                      {lastReadBookData.lastRead && (
                        <p className="text-xs text-muted-foreground">
                          Última leitura: {new Date(lastReadBookData.lastRead).toLocaleDateString('pt-BR')}
                        </p>
                      )}
                      <div className="flex gap-2 mt-3">
                        <Button 
                          size="sm" 
                          onClick={() => handleOpenBook(lastReadBookData)}
                          className="bg-primary hover:bg-primary/90"
                        >
                          Continuar Lendo
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleRemoveBook(lastReadBookData.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
            
            {/* Outros livros */}
            {otherBooks.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-4">Todos os Livros</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {otherBooks.map((book) => (
                <Card key={book.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="text-primary flex-shrink-0">
                      {getFileIcon(book.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{book.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(book.size)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(book.uploadDate).toLocaleDateString('pt-BR')}
                      </p>
                      {book.lastRead && (
                        <p className="text-xs text-muted-foreground">
                          Última leitura: {new Date(book.lastRead).toLocaleDateString('pt-BR')}
                        </p>
                      )}
                      <div className="flex gap-2 mt-3">
                        <Button 
                          size="sm" 
                          onClick={() => handleOpenBook(book)}
                        >
                          Ler
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleRemoveBook(book.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
              </div>
            )}
          </div>
        )}
        
        {uploadedBooks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhum livro carregado ainda</h3>
            <p className="text-muted-foreground">
              Carregue seu primeiro livro para começar a ler
            </p>
          </div>
        )}
      </div>
    </div>
  );
};