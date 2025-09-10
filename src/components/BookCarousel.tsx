import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Book } from '@/types/book';
import { BookCard } from './BookCard';
import { azBooks } from '@/data/books';

interface BookCarouselProps {
  title: string;
  books: Book[];
  onBookClick: (book: Book) => void;
  isAZ?: boolean;
}

export const BookCarousel = ({ title, books, onBookClick, isAZ = false }: BookCarouselProps) => {
  const [selectedLetter, setSelectedLetter] = useState('A');
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const displayBooks = isAZ ? azBooks[selectedLetter] || [] : books;

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth * 0.8;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (displayBooks.length === 0) return null;

  return (
    <section className="carousel-section space-y-4 animate-fade-in-up">
      <h2 className="text-2xl md:text-3xl font-bold px-4 md:px-8">
        {title}
      </h2>

      {isAZ && (
        <div className="flex items-center space-x-2 md:space-x-4 px-4 md:px-8 overflow-x-auto pb-2">
          {alphabet.map((letter) => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`text-xl font-semibold p-2 transition-all duration-300 ${
                selectedLetter === letter
                  ? 'text-accent scale-110'
                  : 'text-muted-foreground hover:text-accent hover:scale-105'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      )}

      <div className="relative group">
        <div 
          ref={carouselRef}
          className="flex space-x-4 overflow-x-auto pl-4 md:pl-8 pb-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayBooks.map((book, index) => (
            <BookCard
              key={`${book.id}-${index}`}
              book={book}
              onClick={() => onBookClick(book)}
            />
          ))}
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={() => scrollCarousel('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80 w-12 h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
        >
          <ChevronLeft className="w-8 h-8 text-foreground" />
        </button>

        <button
          onClick={() => scrollCarousel('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80 w-12 h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
        >
          <ChevronRight className="w-8 h-8 text-foreground" />
        </button>
      </div>
    </section>
  );
};