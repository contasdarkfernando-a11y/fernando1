import { Book } from '@/types/book';

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
      <img 
        src={book.cover} 
        alt={`Capa do livro ${book.title}`}
        className="w-full h-full object-cover rounded-lg"
        loading="lazy"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = `https://placehold.co/400x600/1f1f1f/FFFFFF?text=${encodeURIComponent(book.title)}`;
        }}
      />
    </div>
  );
};