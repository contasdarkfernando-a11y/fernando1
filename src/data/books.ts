import { Book, Library } from '@/types/book';
import heroImage from '@/assets/hero-lotr-banner.jpg';

const generateBookId = (title: string, author: string): string => {
  return `${title.toLowerCase().replace(/\s+/g, '-')}-${author.toLowerCase().replace(/\s+/g, '-')}`;
};

// Livro em destaque
const featuredBook: Book = {
  id: generateBookId('O Senhor dos Anéis', 'J.R.R. Tolkien'),
  title: 'O Senhor dos Anéis',
  author: 'J.R.R. Tolkien',
  summary: 'Em uma terra fantástica e única, um hobbit recebe de presente de seu tio um anel mágico e maligno que precisa ser destruído antes que caia nas mãos do mal. Uma jornada heroica e perigosa o aguarda.',
  cover: heroImage,
  driveLink: 'https://drive.google.com/file/d/exemplo-senhor-dos-aneis'
};

// Mais Lidos
const mostReadBooks: Book[] = [
  {
    id: generateBookId('Harry Potter e a Pedra Filosofal', 'J.K. Rowling'),
    title: 'Harry Potter e a Pedra Filosofal',
    author: 'J.K. Rowling',
    summary: 'A vida de Harry Potter muda para sempre no seu 11º aniversário, quando ele descobre que é um bruxo e tem uma vaga na Escola de Magia e Bruxaria de Hogwarts.',
    cover: 'https://i.postimg.cc/Jsb49fHd/Pedra-Filosofal.jpg',
    driveLink: 'https://drive.google.com/file/d/exemplo-harry-potter'
  },
  {
    id: generateBookId('É Assim que Acaba', 'Colleen Hoover'),
    title: 'É Assim que Acaba',
    author: 'Colleen Hoover',
    summary: 'Um romance sobre amor, perda e resiliência, explorando as complexidades de relacionamentos abusivos.',
    cover: 'https://i.postimg.cc/k2rgYJGb/Assim-Acaba.jpg',
    driveLink: 'https://drive.google.com/file/d/exemplo-assim-que-acaba'
  },
  {
    id: generateBookId('Os Sete Maridos de Evelyn Hugo', 'Taylor Jenkins Reid'),
    title: 'Os Sete Maridos de Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    summary: 'A lendária estrela de Hollywood Evelyn Hugo está finalmente pronta para contar a verdade sobre sua vida glamorosa e escandalosa.',
    cover: 'https://i.postimg.cc/0bKNCMkv/Os-Sete-Maridos-de-Evelyn-Hugo.jpg',
    driveLink: 'https://drive.google.com/file/d/exemplo-sete-maridos'
  },
  {
    id: generateBookId('A Paciente Silenciosa', 'Alex Michaelides'),
    title: 'A Paciente Silenciosa',
    author: 'Alex Michaelides',
    summary: 'Um thriller psicológico chocante sobre o ato de violência de uma mulher contra o marido — e sobre o terapeuta obcecado em descobrir seu motivo.',
    cover: 'https://i.postimg.cc/fkrLXjh5/A-Paciente-Silenciosa.jpg',
    driveLink: '#'
  },
  {
    id: generateBookId('Hábitos Atômicos', 'James Clear'),
    title: 'Hábitos Atômicos',
    author: 'James Clear',
    summary: 'Um guia prático sobre como criar bons hábitos, quebrar os maus e dominar os pequenos comportamentos que levam a resultados notáveis.',
    cover: 'https://i.postimg.cc/Wt3zhYxh/H-bitos-At-micos.jpg',
    driveLink: '#'
  },
  {
    id: generateBookId('Quarta Asa (Fourth Wing)', 'Rebecca Yarros'),
    title: 'Quarta Asa (Fourth Wing)',
    author: 'Rebecca Yarros',
    summary: 'Violet Sorrengail esperava viver uma vida tranquila entre livros, mas é forçada a entrar no perigoso Quadrante dos Cavaleiros de Dragões.',
    cover: 'https://i.postimg.cc/ctrL26fQ/Quarta-Asa-Fourth-Wing.jpg',
    driveLink: '#'
  }
];

// Novidades
const newBooks: Book[] = [
  {
    id: generateBookId('A Biblioteca da Meia-Noite', 'Matt Haig'),
    title: 'A Biblioteca da Meia-Noite',
    author: 'Matt Haig',
    summary: 'Entre a vida e a morte, existe uma biblioteca. Cada livro oferece a chance de experimentar outra vida que você poderia ter vivido.',
    cover: 'https://i.postimg.cc/k6j5TWRJ/A-Biblioteca-da-Meia-Noite.jpg',
    driveLink: '#'
  },
  {
    id: generateBookId('Verity', 'Colleen Hoover'),
    title: 'Verity',
    author: 'Colleen Hoover',
    summary: 'Uma escritora em dificuldades aceita a oferta de emprego de uma vida, mas descobre a autobiografia inacabada da esposa doente de seu chefe, que contém segredos arrepiantes.',
    cover: 'https://placehold.co/400x600/181818/FFFFFF?text=Verity',
    driveLink: '#'
  },
  {
    id: generateBookId('A Empregada', 'Freida McFadden'),
    title: 'A Empregada',
    author: 'Freida McFadden',
    summary: 'Um thriller psicológico cheio de reviravoltas sobre uma jovem com um passado sombrio e o emprego que pode ser sua última chance.',
    cover: 'https://i.postimg.cc/HJ9n7qp7/A-Empregada.jpg',
    driveLink: '#'
  },
  {
    id: generateBookId('Trono de Vidro', 'Sarah J. Maas'),
    title: 'Trono de Vidro',
    author: 'Sarah J. Maas',
    summary: 'Depois de cumprir um ano de trabalhos forçados, a assassina Celaena Sardothien é arrastada para uma competição para se tornar a campeã do rei.',
    cover: 'https://i.postimg.cc/QB3VC8r3/Trono-de-Vidro.jpg',
    driveLink: '#'
  },
  {
    id: generateBookId('O Problema dos 3 Corpos', 'Cixin Liu'),
    title: 'O Problema dos 3 Corpos',
    author: 'Cixin Liu',
    summary: 'Uma decisão secreta de uma jovem nos anos 60 reverbera através do tempo e do espaço para um grupo de cientistas no presente, forçando-os a enfrentar a maior ameaça da humanidade.',
    cover: 'https://i.postimg.cc/5Xv6fHTg/O-Problema-dos-3-Corpos.jpg',
    driveLink: '#'
  },
  {
    id: generateBookId('O Homem de Giz', 'C.J. Tudor'),
    title: 'O Homem de Giz',
    author: 'C.J. Tudor',
    summary: 'Um jogo de infância inocente se transforma em algo sinistro quando desenhos de giz levam a um corpo desmembrado.',
    cover: 'https://i.postimg.cc/6y881bhD/O-Homem-de-Giz.jpg',
    driveLink: '#'
  }
];

// Clássicos
const classicBooks: Book[] = [
  {
    id: generateBookId('O Hobbit', 'J.R.R. Tolkien'),
    title: 'O Hobbit',
    author: 'J.R.R. Tolkien',
    summary: 'A aventura de Bilbo Bolseiro, um hobbit pacato que é arrastado para uma jornada épica para recuperar um tesouro guardado por um dragão.',
    cover: 'https://i.postimg.cc/KRC1X7q4/O-Hobbit.jpg',
    driveLink: '#'
  },
  {
    id: generateBookId('1984', 'George Orwell'),
    title: '1984',
    author: 'George Orwell',
    summary: 'Uma visão distópica de um futuro totalitário onde o pensamento crítico é suprimido sob a vigilância onipresente do Grande Irmão.',
    cover: 'https://i.postimg.cc/F1WfpX0y/1984.jpg',
    driveLink: '#'
  },
  {
    id: generateBookId('Duna', 'Frank Herbert'),
    title: 'Duna',
    author: 'Frank Herbert',
    summary: 'A história da luta de uma família nobre para controlar o planeta deserto Arrakis e sua valiosa especiaria.',
    cover: 'https://i.postimg.cc/4nN7pxH4/Duna.jpg',
    driveLink: '#'
  },
  {
    id: generateBookId('O Pequeno Príncipe', 'Antoine de Saint-Exupéry'),
    title: 'O Pequeno Príncipe',
    author: 'Antoine de Saint-Exupéry',
    summary: 'Uma fábula poética sobre amizade, amor, perda e solidão, vista pelos olhos de um jovem príncipe que visita diferentes planetas.',
    cover: 'https://i.postimg.cc/G8z46ZV1/O-Pequeno-Pr-ncipe.jpg',
    driveLink: '#'
  },
  {
    id: generateBookId('Dom Quixote', 'Miguel de Cervantes'),
    title: 'Dom Quixote',
    author: 'Miguel de Cervantes',
    summary: 'A história de um fidalgo que lê tantos romances de cavalaria que decide se tornar um cavaleiro andante para reviver a glória da cavalaria.',
    cover: 'https://i.postimg.cc/FdhfW9PZ/Dom-Quixote.jpg',
    driveLink: '#'
  },
  {
    id: generateBookId('O Grande Gatsby', 'F. Scott Fitzgerald'),
    title: 'O Grande Gatsby',
    author: 'F. Scott Fitzgerald',
    summary: 'Um retrato da Era do Jazz na América, explorando temas de riqueza, excesso e o sonho americano.',
    cover: 'https://i.postimg.cc/sBdGWP7b/O-Grande-Gatsby.jpg',
    driveLink: '#'
  }
];

// Gerar livros A-Z
const generateAZBooks = (): Record<string, Book[]> => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const azBooks: Record<string, Book[]> = {};
  
  for (const letter of alphabet) {
    azBooks[letter] = [];
    for (let i = 1; i <= 15; i++) {
      const book: Book = {
        id: `${letter.toLowerCase()}-${i}`,
        title: `Livro de ${letter}${i}`,
        author: `Autor ${letter}`,
        summary: `Este é o resumo do livro ${letter}${i}, uma obra fascinante que explora novos mundos e desperta a imaginação dos leitores.`,
        cover: `https://placehold.co/400x600/${Math.floor(Math.random()*16777215).toString(16)}/FFFFFF?text=${letter}${i}`,
        driveLink: '#'
      };
      azBooks[letter].push(book);
    }
  }
  
  return azBooks;
};

export const library: Library = {
  featured: featuredBook,
  sections: [
    {
      id: 'most-read',
      title: 'Mais Lidos',
      books: mostReadBooks
    },
    {
      id: 'new',
      title: 'Novidades',
      books: newBooks
    },
    {
      id: 'classics',
      title: 'Clássicos Imperdíveis',
      books: classicBooks
    },
    {
      id: 'az',
      title: 'Explore de A a Z',
      books: [],
      isAZ: true
    }
  ]
};

export const azBooks = generateAZBooks();

// Função para buscar todos os livros
export const getAllBooks = (): Book[] => {
  const allBooks = [featuredBook];
  
  library.sections.forEach(section => {
    if (!section.isAZ) {
      allBooks.push(...section.books);
    }
  });
  
  // Adicionar livros A-Z
  Object.values(azBooks).forEach(books => {
    allBooks.push(...books);
  });
  
  return allBooks;
};