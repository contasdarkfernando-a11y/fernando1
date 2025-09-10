import { useState, useEffect } from 'react';
import { Book } from '@/types/book';
import { toast } from '@/hooks/use-toast';

const LIBRARY_STORAGE_KEY = 'netflix-books-library';

export const useLibrary = () => {
  const [myLibrary, setMyLibrary] = useState<Book[]>([]);

  // Carregar biblioteca do localStorage
  useEffect(() => {
    const stored = localStorage.getItem(LIBRARY_STORAGE_KEY);
    if (stored) {
      try {
        setMyLibrary(JSON.parse(stored));
      } catch (error) {
        console.error('Erro ao carregar biblioteca:', error);
      }
    }
  }, []);

  // Salvar biblioteca no localStorage
  const saveLibrary = (books: Book[]) => {
    try {
      localStorage.setItem(LIBRARY_STORAGE_KEY, JSON.stringify(books));
      setMyLibrary(books);
    } catch (error) {
      console.error('Erro ao salvar biblioteca:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar o livro na biblioteca",
        variant: "destructive"
      });
    }
  };

  // Adicionar livro à biblioteca
  const addToLibrary = (book: Book) => {
    const isAlreadyInLibrary = myLibrary.some(b => b.id === book.id);
    
    if (isAlreadyInLibrary) {
      toast({
        title: "Livro já está na biblioteca",
        description: `"${book.title}" já foi adicionado à sua biblioteca`,
      });
      return;
    }

    const updatedLibrary = [...myLibrary, book];
    saveLibrary(updatedLibrary);
    
    toast({
      title: "Livro adicionado!",
      description: `"${book.title}" foi adicionado à sua biblioteca`,
    });
  };

  // Remover livro da biblioteca
  const removeFromLibrary = (bookId: string) => {
    const book = myLibrary.find(b => b.id === bookId);
    const updatedLibrary = myLibrary.filter(b => b.id !== bookId);
    saveLibrary(updatedLibrary);
    
    if (book) {
      toast({
        title: "Livro removido",
        description: `"${book.title}" foi removido da sua biblioteca`,
      });
    }
  };

  // Verificar se livro está na biblioteca
  const isInLibrary = (bookId: string): boolean => {
    return myLibrary.some(b => b.id === bookId);
  };

  // Limpar biblioteca
  const clearLibrary = () => {
    localStorage.removeItem(LIBRARY_STORAGE_KEY);
    setMyLibrary([]);
    toast({
      title: "Biblioteca limpa",
      description: "Todos os livros foram removidos da sua biblioteca",
    });
  };

  return {
    myLibrary,
    addToLibrary,
    removeFromLibrary,
    isInLibrary,
    clearLibrary
  };
};