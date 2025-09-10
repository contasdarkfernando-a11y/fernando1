import { X, ExternalLink, Plus, Minus } from 'lucide-react';
import { Book } from '@/types/book';
import { Button } from '@/components/ui/button';
import { useLibrary } from '@/hooks/useLibrary';

interface BookModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookModal = ({ book, isOpen, onClose }: BookModalProps) => {
  const { addToLibrary, removeFromLibrary, isInLibrary } = useLibrary();

  if (!book || !isOpen) return null;

  const inLibrary = isInLibrary(book.id);

  const handleLibraryAction = () => {
    if (inLibrary) {
      removeFromLibrary(book.id);
    } else {
      addToLibrary(book);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-40 p-4 animate-scale-in"
      onClick={onClose}
    >
      <div 
        className="bg-card w-full max-w-4xl max-h-[90vh] rounded-lg overflow-y-auto relative animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: 'var(--shadow-modal)' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-foreground hover:text-accent transition-colors z-10 bg-background/80 rounded-full p-2"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3">
            <img 
              src={book.cover} 
              alt={`Capa do livro ${book.title}`}
              className="w-full h-full object-cover md:rounded-l-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://placehold.co/400x600/1f1f1f/FFFFFF?text=${encodeURIComponent(book.title)}`;
              }}
            />
          </div>
          
          <div className="p-8 md:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{book.title}</h2>
            <p className="text-lg text-muted-foreground mb-6">{book.author}</p>
            
            <p className="text-foreground/90 mb-8 leading-relaxed text-lg">
              {book.summary}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="btn-netflix flex-1"
              >
                <a 
                  href={book.driveLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-5 h-5" />
                  Acessar no Google Drive
                </a>
              </Button>
              
              <Button
                onClick={handleLibraryAction}
                className={`btn-netflix-secondary flex-1 flex items-center justify-center gap-2 ${
                  inLibrary ? 'bg-accent/20 text-accent hover:bg-accent/30' : ''
                }`}
              >
                {inLibrary ? (
                  <>
                    <Minus className="w-5 h-5" />
                    Remover da Biblioteca
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Adicionar à Biblioteca
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};