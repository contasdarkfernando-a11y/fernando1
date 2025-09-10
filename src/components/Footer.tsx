export const Footer = () => {
  return (
    <footer className="bg-black border-t border-muted/20 py-12 mt-12">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Acervo Digital – A Biblioteca do Futuro
        </h3>
        
        <div className="flex justify-center space-x-6 text-2xl my-6">
          {/* Social media icons could be added here */}
        </div>
        
        <p className="text-muted-foreground">
          &copy; 2024 Acervo Digital. Todos os direitos reservados.
        </p>
        
        <p className="text-sm text-muted-foreground mt-4">
          Os livros são armazenados em sua biblioteca local. Limpar o cache do navegador removerá seus dados.
        </p>
      </div>
    </footer>
  );
};