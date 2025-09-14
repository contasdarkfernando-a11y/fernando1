import { useState } from 'react';
import { Book } from '@/types/book';
import { library } from '@/data/books';
import { useLibrary } from '@/hooks/useLibrary';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { BookCarousel } from '@/components/BookCarousel';
import { BookModal } from '@/components/BookModal';
import { ReaderSection } from '@/components/ReaderSection';
import { AZCatalog } from '@/components/AZCatalog';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { myLibrary } = useLibrary();

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'reader':
        return <ReaderSection />;
      
      case 'library':
        return (
          <div className="py-8 md:py-12 space-y-12">
            <BookCarousel
              title={`Minha Biblioteca (${myLibrary.length} ${myLibrary.length === 1 ? 'livro' : 'livros'})`}
              books={myLibrary}
              onBookClick={handleBookClick}
            />
            {myLibrary.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-2xl font-bold mb-4">Sua biblioteca está vazia</h3>
                <p className="text-muted-foreground text-lg">
                  Explore nosso catálogo e adicione livros à sua biblioteca pessoal!
                </p>
              </div>
            )}
          </div>
        );
      
      case 'education':
        const educationSection = library.sections.find(s => s.id === 'education');
        return educationSection ? (
          <div className="py-8 md:py-12">
            <BookCarousel
              title={educationSection.title}
              books={educationSection.books}
              onBookClick={handleBookClick}
            />
          </div>
        ) : null;
      
      case 'most-read':
        const mostReadSection = library.sections.find(s => s.id === 'most-read');
        return mostReadSection ? (
          <div className="py-8 md:py-12">
            <BookCarousel
              title={mostReadSection.title}
              books={mostReadSection.books}
              onBookClick={handleBookClick}
            />
          </div>
        ) : null;
      
      case 'new':
        const newSection = library.sections.find(s => s.id === 'new');
        return newSection ? (
          <div className="py-8 md:py-12">
            <BookCarousel
              title={newSection.title}
              books={newSection.books}
              onBookClick={handleBookClick}
            />
          </div>
        ) : null;
      
      case 'az':
        return (
          <div className="py-8 md:py-12">
            <AZCatalog />
          </div>
        );
      
      default: // home
        return (
          <>
            <HeroSection 
              book={library.featured}
              onBookClick={() => handleBookClick(library.featured)}
            />
            
            <main className="py-8 md:py-12 space-y-12">
              {library.sections.filter(section => !section.isAZ).map((section) => (
                <BookCarousel
                  key={section.id}
                  title={section.title}
                  books={section.books}
                  onBookClick={handleBookClick}
                />
              ))}
              
              {/* A-Z Section */}
              {library.sections.find(s => s.isAZ) && (
                <AZCatalog />
              )}
            </main>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onBookClick={handleBookClick}
      />
      
      {renderSectionContent()}
      
      <Footer />
      
      <BookModal
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Index;
