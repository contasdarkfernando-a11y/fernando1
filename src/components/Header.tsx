import { useState, useEffect } from 'react';
import { Search, User } from 'lucide-react';
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { id: 'home', label: 'Início' },
    { id: 'most-read', label: 'Mais Lidos' },
    { id: 'new', label: 'Novidades' },
    { id: 'az', label: 'A-Z' },
    { id: 'library', label: 'Minha Biblioteca' }
  ];

  return (
    <>
      <header className={`header-netflix ${isScrolled ? 'scrolled' : ''}`}>
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
                  className={`font-medium transition-colors duration-300 ${
                    activeSection === item.id
                      ? 'text-foreground font-semibold'
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
              className="text-foreground hover:text-accent transition-colors"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="w-6 h-6" />
            </button>
            
            <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </header>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onBookClick={(book) => {
          onBookClick?.(book);
          setIsSearchOpen(false);
        }}
      />
    </>
  );
};