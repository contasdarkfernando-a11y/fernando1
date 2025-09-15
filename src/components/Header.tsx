import { useState, useEffect } from 'react';
import { Search, User, Menu, X } from 'lucide-react';
import { SearchModal } from './SearchModal';
import { Book } from '@/types/book';

interface HeaderProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
  onBookClick?: (book: Book) => void;
}

export const Header = ({ activeSection = 'home', onSectionChange, onBookClick }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { id: 'home', label: 'Início' },
    { id: 'reader', label: 'Leitor' },
    { id: 'education', label: 'Educação' },
    { id: 'audiobooks', label: 'Audiobooks' },
    { id: 'most-read', label: 'Mais Lidos' },
    { id: 'new', label: 'Novidades' },
    { id: 'az', label: 'A-Z' },
    { id: 'library', label: 'Minha Biblioteca' }
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full p-4 md:p-6 z-30 transition-all duration-300 ${
          isScrolled ? 'bg-background/95 backdrop-blur-md' : 'bg-gradient-to-b from-black/70 to-transparent'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl md:text-3xl font-bold text-accent">
              ACERVO DIGITAL
            </h1>
            
            <nav className="hidden md:flex items-center space-x-6">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSectionChange?.(item.id)}
                  className={`font-semibold transition-colors hover-scale ${
                    activeSection === item.id
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-foreground hover:text-accent transition-colors hover-scale"
            >
              <Search className="w-6 h-6" />
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-foreground hover:text-accent transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="hidden md:flex w-8 h-8 bg-accent rounded-md items-center justify-center">
              <User className="w-5 h-5 text-accent-foreground" />
            </div>
          </div>
        </div>

        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onBookClick={onBookClick}
        />
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/80 z-40 md:hidden animate-fade-in">
          <div className="fixed right-0 top-0 h-full w-80 bg-background shadow-xl animate-slide-in-right">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-accent">MENU</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-foreground hover:text-accent"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <nav className="space-y-4">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSectionChange?.(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left py-3 px-4 rounded-lg font-semibold transition-colors ${
                      activeSection === item.id
                        ? 'text-accent bg-accent/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};