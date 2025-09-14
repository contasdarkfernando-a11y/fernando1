import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

export interface UploadedBook {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: Date;
  file: File;
  lastRead?: Date;
}

const UPLOADED_BOOKS_KEY = 'uploaded-books-storage';
const LAST_READ_BOOK_KEY = 'last-read-book';

export const useUploadedBooks = () => {
  const [uploadedBooks, setUploadedBooks] = useState<UploadedBook[]>([]);
  const [lastReadBook, setLastReadBook] = useState<string | null>(null);

  // Carregar livros do localStorage na inicialização
  useEffect(() => {
    const stored = localStorage.getItem(UPLOADED_BOOKS_KEY);
    const lastRead = localStorage.getItem(LAST_READ_BOOK_KEY);
    
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
    
    if (lastRead) {
      setLastReadBook(lastRead);
    }
  }, []);

  // Marcar livro como lido
  const markAsRead = (bookId: string) => {
    setLastReadBook(bookId);
    localStorage.setItem(LAST_READ_BOOK_KEY, bookId);
    
    setUploadedBooks(prev => {
      const updated = prev.map(book => 
        book.id === bookId 
          ? { ...book, lastRead: new Date() }
          : book
      );
      
      // Salvar metadata atualizada
      const metadata = updated.map(book => ({
        id: book.id,
        name: book.name,
        type: book.type,
        size: book.size,
        uploadDate: book.uploadDate,
        lastRead: book.lastRead
      }));
      localStorage.setItem(UPLOADED_BOOKS_KEY, JSON.stringify(metadata));
      return updated;
    });
  };
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
        uploadDate: book.uploadDate,
        lastRead: book.lastRead
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
    // Se o livro removido era o último lido, limpar essa informação
    if (lastReadBook === bookId) {
      setLastReadBook(null);
      localStorage.removeItem(LAST_READ_BOOK_KEY);
    }
    
    setUploadedBooks(prev => {
      const updated = prev.filter(book => book.id !== bookId);
      const metadata = updated.map(book => ({
        id: book.id,
        name: book.name,
        type: book.type,
        size: book.size,
        uploadDate: book.uploadDate,
        lastRead: book.lastRead
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
    setLastReadBook(null);
    localStorage.removeItem(UPLOADED_BOOKS_KEY);
    localStorage.removeItem(LAST_READ_BOOK_KEY);
    toast({
      title: "Biblioteca limpa",
      description: "Todos os livros foram removidos da sua biblioteca pessoal.",
    });
  };

  return {
    uploadedBooks,
    lastReadBook,
    addBook,
    removeBook,
    clearAllBooks,
    markAsRead
  };
};