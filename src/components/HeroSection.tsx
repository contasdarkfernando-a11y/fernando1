import { Play, Plus, Minus } from 'lucide-react';
import { Book } from '@/types/book';
import { Button } from '@/components/ui/button';
import { useLibrary } from '@/hooks/useLibrary';

interface HeroSectionProps {
  book: Book;
  onBookClick: () => void;
}

export const HeroSection = ({ book, onBookClick }: HeroSectionProps) => {
  const { addToLibrary, removeFromLibrary, isInLibrary } = useLibrary();
  
  const inLibrary = isInLibrary(book.id);

  const handleLibraryAction = () => {
    if (inLibrary) {
      removeFromLibrary(book.id);
    } else {
      addToLibrary(book);
    }
  };

  return (
    <section 
      className="relative h-[80vh] md:h-screen flex items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${book.cover})` }}
    >
      <div className="hero-overlay absolute inset-0" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-xl animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-black mb-4 leading-tight">
            {book.title}
          </h2>
          
          <p className="text-lg md:text-xl text-foreground/90 mb-8 leading-relaxed">
            {book.summary}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onBookClick}
              className="btn-netflix flex items-center justify-center gap-3 text-lg font-bold"
            >
              <Play className="w-6 h-6 fill-current" />
              Ler Agora
            </Button>
            
            <Button
              onClick={handleLibraryAction}
              className={`btn-netflix-secondary flex items-center justify-center gap-3 text-lg font-bold ${
                inLibrary ? 'bg-accent/20 text-accent hover:bg-accent/30' : ''
              }`}
            >
              {inLibrary ? (
                <>
                  <Minus className="w-6 h-6" />
                  Remover da Biblioteca
                </>
              ) : (
                <>
                  <Plus className="w-6 h-6" />
                  Adicionar à Biblioteca
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};