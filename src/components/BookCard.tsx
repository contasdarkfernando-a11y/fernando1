import { Book } from '@/types/book';
import { Headphones } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onClick: () => void;
  className?: string;
}

export const BookCard = ({ book, onClick, className = '' }: BookCardProps) => {
  return (
    <div 
      className={`book-card bg-card rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10 flex-shrink-0 w-32 h-48 md:w-40 md:h-60 ${className}`}
      onClick={onClick}
    >
      <div className="relative w-full h-full">
        <img 
          src={book.cover} 
          alt={`Capa do ${book.isAudiobook ? 'audiobook' : 'livro'} ${book.title}`}
          className="w-full h-full object-cover rounded-lg"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://placehold.co/400x600/1f1f1f/FFFFFF?text=${encodeURIComponent(book.title)}`;
          }}
        />
        {book.isAudiobook && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white p-1 rounded-full">
            <Headphones className="w-3 h-3" />
          </div>
        )}
        {book.duration && (
          <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {book.duration}
          </div>
        )}
      </div>
    </div>
  );
};