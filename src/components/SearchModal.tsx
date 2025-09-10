import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Book } from '@/types/book';
import { getAllBooks } from '@/data/books';
import { BookCard } from './BookCard';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookClick: (book: Book) => void;
}

export const SearchModal = ({ isOpen, onClose, onBookClick }: SearchModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [allBooks] = useState<Book[]>(getAllBooks());

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filtered = allBooks.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filtered.slice(0, 20)); // Limitar a 20 resultados
  }, [searchTerm, allBooks]);

  const handleBookClick = (book: Book) => {
    onBookClick(book);
    onClose();
    setSearchTerm('');
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 flex items-start justify-center pt-16"
      onClick={onClose}
    >
      <div 
        className="bg-card w-full max-w-4xl mx-4 rounded-lg animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="p-6 border-b border-muted/20">
          <div className="flex items-center space-x-4">
            <Search className="w-6 h-6 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar livros ou autores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent text-xl placeholder-muted-foreground focus:outline-none"
              autoFocus
            />
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {searchTerm.trim() === '' ? (
            <div className="p-8 text-center text-muted-foreground">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Digite para buscar livros ou autores</p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <p>Nenhum resultado encontrado para "{searchTerm}"</p>
            </div>
          ) : (
            <div className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''} encontrado{searchResults.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {searchResults.map((book) => (
                  <div key={book.id} className="space-y-2">
                    <BookCard
                      book={book}
                      onClick={() => handleBookClick(book)}
                      className="min-w-0"
                    />
                    <div className="text-sm">
                      <p className="font-medium text-foreground truncate">{book.title}</p>
                      <p className="text-muted-foreground truncate">{book.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};