import { Book } from '@/types/book';

interface BookCardProps {
  book: Book;
  onClick: () => void;
  className?: string;
}

export const BookCard = ({ book, onClick, className = '' }: BookCardProps) => {
  return (
    <div 
      className={`book-card bg-card rounded-lg overflow-hidden min-w-[160px] md:min-w-[200px] ${className}`}
      onClick={onClick}
    >
      <img 
        src={book.cover} 
        alt={`Capa do livro ${book.title}`}
        className="w-full h-full object-cover aspect-[2/3]"
        loading="lazy"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = `https://placehold.co/400x600/1f1f1f/FFFFFF?text=${encodeURIComponent(book.title)}`;
        }}
      />
    </div>
  );
};