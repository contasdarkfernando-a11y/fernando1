import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

export interface UploadedBook {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: Date;
  file: File;
}

const UPLOADED_BOOKS_KEY = 'uploaded-books-storage';

export const useUploadedBooks = () => {
  const [uploadedBooks, setUploadedBooks] = useState<UploadedBook[]>([]);

  // Carregar livros do localStorage na inicialização
  useEffect(() => {
    const stored = localStorage.getItem(UPLOADED_BOOKS_KEY);
    if (stored) {
      try {
        const parsedBooks = JSON.parse(stored);
        // Como File não é serializável, precisamos recriar apenas a metadata
        // Os arquivos serão perdidos ao recarregar a página (limitação do navegador)
        setUploadedBooks([]);
      } catch (error) {
        console.error('Erro ao carregar livros:', error);
      }
    }
  }, []);

  const addBook = (file: File) => {
    const newBook: UploadedBook = {
      id: `${file.name}-${Date.now()}`,
      name: file.name,
      type: file.type,
      size: file.size,
      uploadDate: new Date(),
      file: file
    };

    setUploadedBooks(prev => {
      const updated = [...prev, newBook];
      // Salvar apenas metadata (sem o arquivo)
      const metadata = updated.map(book => ({
        id: book.id,
        name: book.name,
        type: book.type,
        size: book.size,
        uploadDate: book.uploadDate
      }));
      localStorage.setItem(UPLOADED_BOOKS_KEY, JSON.stringify(metadata));
      return updated;
    });

    toast({
      title: "Livro adicionado!",
      description: `"${file.name}" foi adicionado à sua biblioteca pessoal.`,
    });
  };

  const removeBook = (bookId: string) => {
    setUploadedBooks(prev => {
      const updated = prev.filter(book => book.id !== bookId);
      const metadata = updated.map(book => ({
        id: book.id,
        name: book.name,
        type: book.type,
        size: book.size,
        uploadDate: book.uploadDate
      }));
      localStorage.setItem(UPLOADED_BOOKS_KEY, JSON.stringify(metadata));
      return updated;
    });

    toast({
      title: "Livro removido",
      description: "O livro foi removido da sua biblioteca pessoal.",
    });
  };

  const clearAllBooks = () => {
    setUploadedBooks([]);
    localStorage.removeItem(UPLOADED_BOOKS_KEY);
    toast({
      title: "Biblioteca limpa",
      description: "Todos os livros foram removidos da sua biblioteca pessoal.",
    });
  };

  return {
    uploadedBooks,
    addBook,
    removeBook,
    clearAllBooks
  };
};