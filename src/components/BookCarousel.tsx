import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Upload } from 'lucide-react';
import { Book } from '@/types/book';
import { BookCard } from './BookCard';
import { azBooks } from '@/data/books';
import { Button } from '@/components/ui/button';
import { useDropzone } from 'react-dropzone';
import { toast } from '@/hooks/use-toast';

interface BookCarouselProps {
  title: string;
  books: Book[];
  onBookClick: (book: Book) => void;
  isAZ?: boolean;
  isAudiobooks?: boolean;
  onAudioUpload?: (file: File) => void;
}

export const BookCarousel = ({ title, books, onBookClick, isAZ = false, isAudiobooks = false, onAudioUpload }: BookCarouselProps) => {
  const [selectedLetter, setSelectedLetter] = useState('A');
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const displayBooks = isAZ ? azBooks[selectedLetter] || [] : books;

  // Upload de audiobooks
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && onAudioUpload) {
      const supportedTypes = ['.mp3', '.m4a', '.wav', '.ogg', '.aac'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      
      if (supportedTypes.includes(fileExtension)) {
        onAudioUpload(file);
        toast({
          title: "Audiobook carregado!",
          description: `"${file.name}" foi adicionado aos seus audiobooks.`,
        });
      } else {
        toast({
          title: "Formato não suportado",
          description: "Use MP3, M4A, WAV, OGG ou AAC.",
          variant: "destructive"
        });
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'audio/mpeg': ['.mp3'],
      'audio/mp4': ['.m4a'],
      'audio/wav': ['.wav'],
      'audio/ogg': ['.ogg'],
      'audio/aac': ['.aac']
    },
    multiple: false,
    noClick: true
  });

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
      <div className="flex items-center justify-between px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold">
          {title}
        </h2>
        {isAudiobooks && onAudioUpload && (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Button 
              size="sm" 
              variant="outline"
              className="flex items-center gap-2 hover:bg-primary/10"
            >
              <Upload className="w-4 h-4" />
              Upload Audiobook
            </Button>
          </div>
        )}
      </div>

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