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
  fileContent?: string; // Base64 content for persistence
}

const UPLOADED_BOOKS_KEY = 'uploaded-books-storage';
const LAST_READ_BOOK_KEY = 'last-read-book';
const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB limit for localStorage

export const useUploadedBooks = () => {
  const [uploadedBooks, setUploadedBooks] = useState<UploadedBook[]>([]);
  const [lastReadBook, setLastReadBook] = useState<string | null>(null);

  // Converter File para Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Remove o prefixo "data:type;base64," para economizar espaço
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  };

  // Converter Base64 para File
  const base64ToFile = (base64: string, fileName: string, mimeType: string): File => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new File([byteArray], fileName, { type: mimeType });
  };

  // Carregar livros do localStorage na inicialização
  useEffect(() => {
    const loadStoredBooks = async () => {
      const stored = localStorage.getItem(UPLOADED_BOOKS_KEY);
      const lastRead = localStorage.getItem(LAST_READ_BOOK_KEY);
      
      if (stored) {
        try {
          const parsedBooks = JSON.parse(stored);
          const reconstructedBooks: UploadedBook[] = [];
          
          for (const bookData of parsedBooks) {
            try {
              // Reconstruir o objeto File a partir do Base64
              if (bookData.fileContent) {
                const file = base64ToFile(bookData.fileContent, bookData.name, bookData.type);
                reconstructedBooks.push({
                  ...bookData,
                  uploadDate: new Date(bookData.uploadDate),
                  lastRead: bookData.lastRead ? new Date(bookData.lastRead) : undefined,
                  file: file
                });
              }
            } catch (error) {
              console.warn(`Erro ao reconstruir arquivo ${bookData.name}:`, error);
              // Se não conseguir reconstruir, pula este livro
            }
          }
          
          setUploadedBooks(reconstructedBooks);
          
          if (reconstructedBooks.length > 0) {
            toast({
              title: "Biblioteca restaurada",
              description: `${reconstructedBooks.length} livro(s) carregado(s) do cache local.`,
            });
          }
        } catch (error) {
          console.error('Erro ao carregar livros do cache:', error);
          // Limpar cache corrompido
          localStorage.removeItem(UPLOADED_BOOKS_KEY);
        }
      }
      
      if (lastRead) {
        setLastReadBook(lastRead);
      }
    };

    loadStoredBooks();
  }, []);

  // Salvar livros no localStorage
  const saveBooks = async (books: UploadedBook[]) => {
    try {
      const booksToSave = await Promise.all(
        books.map(async (book) => {
          let fileContent = book.fileContent;
          
          // Se não tem conteúdo salvo ainda, converter o arquivo
          if (!fileContent && book.file) {
            try {
              fileContent = await fileToBase64(book.file);
            } catch (error) {
              console.warn(`Erro ao converter arquivo ${book.name} para Base64:`, error);
              fileContent = undefined;
            }
          }
          
          return {
            id: book.id,
            name: book.name,
            type: book.type,
            size: book.size,
            uploadDate: book.uploadDate,
            lastRead: book.lastRead,
            fileContent: fileContent
          };
        })
      );
      
      const dataToSave = JSON.stringify(booksToSave);
      
      // Verificar se o tamanho não excede o limite do localStorage
      const sizeInMB = new Blob([dataToSave]).size / (1024 * 1024);
      
      if (sizeInMB > 8) { // Limite conservador de 8MB
        toast({
          title: "Aviso: Cache muito grande",
          description: "Alguns livros podem não ser salvos devido ao limite do navegador.",
          variant: "destructive"
        });
      }
      
      localStorage.setItem(UPLOADED_BOOKS_KEY, dataToSave);
    } catch (error) {
      console.error('Erro ao salvar livros:', error);
      toast({
        title: "Erro ao salvar no cache",
        description: "Os livros podem não persistir após recarregar a página.",
        variant: "destructive"
      });
    }
  };

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
      
      // Salvar no localStorage
      saveBooks(updated);
      return updated;
    });
  };

  const addBook = async (file: File) => {
    // Verificar tamanho do arquivo
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "Arquivo muito grande",
        description: `Arquivos maiores que ${MAX_FILE_SIZE / (1024 * 1024)}MB podem não persistir após recarregar a página.`,
      });
    }

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
      // Salvar no localStorage (async)
      saveBooks(updated);
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
      saveBooks(updated);
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