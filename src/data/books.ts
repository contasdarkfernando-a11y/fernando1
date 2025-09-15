import { Book, Library } from '@/types/book';
import heroImage from '@/assets/hero-lotr-banner.jpg';
import quintoEvangelhoImg from '@/assets/quinto-evangelho.jpg';
import loucosPorJesusImg from '@/assets/loucos-por-jesus.jpg';
import concursoMathiasImg from '@/assets/concurso-mathias.jpg';
import filosofiaImg from '@/assets/filosofia.jpg';
import telecursoImg from '@/assets/telecurso.jpg';

const generateBookId = (title: string, author: string): string => {
  return `${title.toLowerCase().replace(/\s+/g, '-')}-${author.toLowerCase().replace(/\s+/g, '-')}`;
};

// Livro em destaque
const featuredBook: Book = {
  id: generateBookId('O Senhor dos Anéis', 'J.R.R. Tolkien'),
  title: 'O Senhor dos Anéis',
  author: 'J.R.R. Tolkien',
  summary: 'Em uma terra fantástica e única, um hobbit recebe de presente de seu tio um anel mágico e maligno que precisa ser destruído antes que caia nas mãos do mal. Uma jornada heroica e perigosa o aguarda.',
  cover: 'https://i.postimg.cc/4yFtT4vS/Senhor-dos-Aneis-Banner.webp',
  driveLink: 'https://drive.google.com/drive/folders/1BcisO6U31aqOr02_4qcKndZOmIEMCSaS?usp=drive_link'
};

// Educação
const educationBooks: Book[] = [
  {
    id: generateBookId('O Quinto Evangelho', 'Autor'),
    title: 'O Quinto Evangelho',
    author: 'Autor',
    summary: 'Uma obra que explora os aspectos espirituais e filosóficos do cristianismo de uma perspectiva única e transformadora.',
    cover: quintoEvangelhoImg || 'https://placehold.co/400x600/8b4513/f5f5dc?text=O+Quinto+Evangelho',
    driveLink: 'https://drive.google.com/file/d/1_-Ssdouj3NJO9bx3428foQBe_XMe8kDg/view?usp=drive_link'
  },
  {
    id: generateBookId('Loucos Por Jesus', 'Autor'),
    title: 'Loucos Por Jesus',
    author: 'Autor',
    summary: 'Um livro sobre fé radical e compromisso total com os ensinamentos cristãos, explorando o que significa viver uma vida dedicada.',
    cover: loucosPorJesusImg || 'https://placehold.co/400x600/8b4513/f5f5dc?text=Loucos+Por+Jesus',
    driveLink: 'https://drive.google.com/file/d/1HlyCaiuk3YGFYkAuObLKcDnulg-aT-6-/view?usp=drive_link'
  },
  {
    id: generateBookId('Filosofia', 'Vários Autores'),
    title: 'Filosofia',
    author: 'Vários Autores',
    summary: 'Uma coleção abrangente de textos filosóficos que exploram as grandes questões da existência humana.',
    cover: filosofiaImg || 'https://placehold.co/400x600/8b4513/f5f5dc?text=Filosofia',
    driveLink: 'https://drive.google.com/file/d/1dPoW7I2cTmkbGpm7OZZ8h7tQ8P6NbLbY/view?usp=drive_link'
  },
  {
    id: generateBookId('Como ser aprovado em qualquer concurso', 'Mathias Gonzales'),
    title: 'Como ser aprovado em qualquer concurso',
    author: 'Mathias Gonzales',
    summary: 'Um guia completo com estratégias e técnicas para conquistar a aprovação em concursos públicos.',
    cover: concursoMathiasImg || 'https://placehold.co/400x600/8b4513/f5f5dc?text=Concurso+Mathias',
    driveLink: 'https://drive.google.com/file/d/1lGBEYWfSPdZ_KzUJvgDrqSSIF9CuwQpU/view?usp=drive_link'
  },
  {
    id: generateBookId('Telecurso 2000', 'Fundação Roberto Marinho'),
    title: 'Telecurso 2000',
    author: 'Fundação Roberto Marinho',
    summary: 'Material educativo completo que aborda diversas disciplinas do ensino fundamental e médio.',
    cover: telecursoImg || 'https://placehold.co/400x600/8b4513/f5f5dc?text=Telecurso+2000',
    driveLink: 'https://drive.google.com/drive/folders/1b62ggGezMideBBSRNOny3EwzjjPXHclI?usp=drive_link'
  }
];

// Mais Lidos
const mostReadBooks: Book[] = [
  {
    id: generateBookId('Harry Potter e a Pedra Filosofal', 'J.K. Rowling'),
    title: 'Harry Potter e a Pedra Filosofal',
    author: 'J.K. Rowling',
    summary: 'A vida de Harry Potter muda para sempre no seu 11º aniversário, quando ele descobre que é um bruxo e tem uma vaga na Escola de Magia e Bruxaria de Hogwarts.',
    cover: 'https://i.postimg.cc/Jsb49fHd/Pedra-Filosofal.jpg',
    driveLink: 'https://drive.google.com/drive/folders/1wm3zOtPh1nAnPpcI2XX9Da4Ld867Siza?usp=drive_link'
  },
  {
    id: generateBookId('É Assim que Acaba', 'Colleen Hoover'),
    title: 'É Assim que Acaba',
    author: 'Colleen Hoover',
    summary: 'Um romance sobre amor, perda e resiliência, explorando as complexidades de relacionamentos abusivos.',
    cover: 'https://i.postimg.cc/k2rgYJGb/Assim-Acaba.jpg',
    driveLink: 'https://drive.google.com/drive/folders/16HZuLt8UfujsnCQvXGJa1mM8eZHTP_QB?usp=drive_link'
  },
  {
    id: generateBookId('Os Sete Maridos de Evelyn Hugo', 'Taylor Jenkins Reid'),
    title: 'Os Sete Maridos de Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    summary: 'A lendária estrela de Hollywood Evelyn Hugo está finalmente pronta para contar a verdade sobre sua vida glamorosa e escandalosa.',
    cover: 'https://i.postimg.cc/0bKNCMkv/Os-Sete-Maridos-de-Evelyn-Hugo.jpg',
    driveLink: 'https://drive.google.com/drive/folders/14xfPV6JanUGpBuWETY4b78nutqWCtZhv?usp=drive_link'
  },
  {
    id: generateBookId('A Paciente Silenciosa', 'Alex Michaelides'),
    title: 'A Paciente Silenciosa',
    author: 'Alex Michaelides',
    summary: 'Um thriller psicológico chocante sobre o ato de violência de uma mulher contra o marido — e sobre o terapeuta obcecado em descobrir seu motivo.',
    cover: 'https://i.postimg.cc/fkrLXjh5/A-Paciente-Silenciosa.jpg',
    driveLink: 'https://drive.google.com/drive/folders/1SOLr7PYqhIbEGVY6QxA1GP44BB3b4qO4?usp=drive_link'
  },
  {
    id: generateBookId('Hábitos Atômicos', 'James Clear'),
    title: 'Hábitos Atômicos',
    author: 'James Clear',
    summary: 'Um guia prático sobre como criar bons hábitos, quebrar os maus e dominar os pequenos comportamentos que levam a resultados notáveis.',
    cover: 'https://i.postimg.cc/Wt3zhYxh/H-bitos-At-micos.jpg',
    driveLink: 'https://drive.google.com/drive/folders/1ZXy9ybdKXAs51Zx_23ay_sAsFJZ6WGK3?usp=drive_link'
  },
  {
    id: generateBookId('Quarta Asa (Fourth Wing)', 'Rebecca Yarros'),
    title: 'Quarta Asa (Fourth Wing)',
    author: 'Rebecca Yarros',
    summary: 'Violet Sorrengail esperava viver uma vida tranquila entre livros, mas é forçada a entrar no perigoso Quadrante dos Cavaleiros de Dragões.',
    cover: 'https://i.postimg.cc/ctrL26fQ/Quarta-Asa-Fourth-Wing.jpg',
    driveLink: 'https://drive.google.com/drive/folders/1-kr1PvTkz8IyWaXN7Q2W57PSguGMYOCT?usp=drive_link'
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
    driveLink: 'https://drive.google.com/file/d/1dpmgM1drPJlMCHFuJDy3tu4n8uzVUs7-/view?usp=drive_link'
  },
  {
    id: generateBookId('Verity', 'Colleen Hoover'),
    title: 'Verity',
    author: 'Colleen Hoover',
    summary: 'Uma escritora em dificuldades aceita a oferta de emprego de uma vida, mas descobre a autobiografia inacabada da esposa doente de seu chefe, que contém segredos arrepiantes.',
    cover: 'https://placehold.co/400x600/181818/FFFFFF?text=Verity',
    driveLink: 'https://drive.google.com/drive/folders/16HZuLt8UfujsnCQvXGJa1mM8eZHTP_QB?usp=drive_link'
  },
  {
    id: generateBookId('A Empregada', 'Freida McFadden'),
    title: 'A Empregada',
    author: 'Freida McFadden',
    summary: 'Um thriller psicológico cheio de reviravoltas sobre uma jovem com um passado sombrio e o emprego que pode ser sua última chance.',
    cover: 'https://i.postimg.cc/HJ9n7qp7/A-Empregada.jpg',
    driveLink: 'https://drive.google.com/file/d/1MezWTjCctOZkbkqhzEhHmuwiDqBbCNYo/view?usp=drive_link'
  },
  {
    id: generateBookId('Trono de Vidro', 'Sarah J. Maas'),
    title: 'Trono de Vidro',
    author: 'Sarah J. Maas',
    summary: 'Depois de cumprir um ano de trabalhos forçados, a assassina Celaena Sardothien é arrastada para uma competição para se tornar a campeã do rei.',
    cover: 'https://i.postimg.cc/QB3VC8r3/Trono-de-Vidro.jpg',
    driveLink: 'https://drive.google.com/drive/folders/1THZw2U-_4riSQwI_vdlsgzCYS0ptVHax?usp=drive_link'
  },
  {
    id: generateBookId('O Problema dos 3 Corpos', 'Cixin Liu'),
    title: 'O Problema dos 3 Corpos',
    author: 'Cixin Liu',
    summary: 'Uma decisão secreta de uma jovem nos anos 60 reverbera através do tempo e do espaço para um grupo de cientistas no presente, forçando-os a enfrentar a maior ameaça da humanidade.',
    cover: 'https://i.postimg.cc/5Xv6fHTg/O-Problema-dos-3-Corpos.jpg',
    driveLink: 'https://drive.google.com/drive/folders/1IBi5ReRQ9L9u4aao-OEI6rd-xHJGpIE6?usp=drive_link'
  },
  {
    id: generateBookId('O Homem de Giz', 'C.J. Tudor'),
    title: 'O Homem de Giz',
    author: 'C.J. Tudor',
    summary: 'Um jogo de infância inocente se transforma em algo sinistro quando desenhos de giz levam a um corpo desmembrado.',
    cover: 'https://i.postimg.cc/6y881bhD/O-Homem-de-Giz.jpg',
    driveLink: 'https://drive.google.com/drive/folders/1nnELXL19_njtT0Ww3rBENR1M8xSbXnaV?usp=drive_link'
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
    driveLink: 'https://drive.google.com/drive/folders/1BcisO6U31aqOr02_4qcKndZOmIEMCSaS?usp=drive_link'
  },
  {
    id: generateBookId('1984', 'George Orwell'),
    title: '1984',
    author: 'George Orwell',
    summary: 'Uma visão distópica de um futuro totalitário onde o pensamento crítico é suprimido sob a vigilância onipresente do Grande Irmão.',
    cover: 'https://i.postimg.cc/F1WfpX0y/1984.jpg',
    driveLink: 'https://drive.google.com/drive/folders/1oQgT8VjiQoTaOpXAdpGACwa_gIB-0eT2?usp=drive_link'
  },
  {
    id: generateBookId('Duna', 'Frank Herbert'),
    title: 'Duna',
    author: 'Frank Herbert',
    summary: 'A história da luta de uma família nobre para controlar o planeta deserto Arrakis e sua valiosa especiaria.',
    cover: 'https://i.postimg.cc/4nN7pxH4/Duna.jpg',
    driveLink: 'https://drive.google.com/drive/folders/1xsgcPUk_lK7xEgIya_s1ykDLNdwsm99r?usp=drive_link'
  },
  {
    id: generateBookId('O Pequeno Príncipe', 'Antoine de Saint-Exupéry'),
    title: 'O Pequeno Príncipe',
    author: 'Antoine de Saint-Exupéry',
    summary: 'Uma fábula poética sobre amizade, amor, perda e solidão, vista pelos olhos de um jovem príncipe que visita diferentes planetas.',
    cover: 'https://i.postimg.cc/G8z46ZV1/O-Pequeno-Pr-ncipe.jpg',
    driveLink: 'https://drive.google.com/drive/folders/1Y_jk0LKyNNSvzoomVnwzVdtmUU3cmGFa?usp=drive_link'
  },
  {
    id: generateBookId('Dom Quixote', 'Miguel de Cervantes'),
    title: 'Dom Quixote',
    author: 'Miguel de Cervantes',
    summary: 'A história de um fidalgo que lê tantos romances de cavalaria que decide se tornar um cavaleiro andante para reviver a glória da cavalaria.',
    cover: 'https://i.postimg.cc/FdhfW9PZ/Dom-Quixote.jpg',
    driveLink: 'https://drive.google.com/drive/folders/1nXyh2XDolm4ngxRWfKUHf-OkLA3n_HSq?usp=drive_link'
  },
  {
    id: generateBookId('Machado de Assis - Obra Completa', 'Machado de Assis'),
    title: 'Machado de Assis - Obra Completa',
    author: 'Machado de Assis',
    summary: 'A obra completa do maior escritor brasileiro, incluindo Dom Casmurro, O Cortiço, Memórias Póstumas de Brás Cubas e outros clássicos.',
    cover: 'https://placehold.co/400x600/8b4513/f5f5dc?text=Machado+de+Assis',
    driveLink: 'https://drive.google.com/drive/folders/1RR6G0gj3BU7DouiNsBZEUMgDtzNtkrcU?usp=drive_link'
  }
];

// Gerar livros A-Z
const generateAZBooks = (): Record<string, Book[]> => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const azBooks: Record<string, Book[]> = {};
  
  // Links das pastas A-Z do Google Drive
  const azDriveLinks: Record<string, string> = {
    'A': 'https://drive.google.com/drive/folders/1oQgT8VjiQoTaOpXAdpGACwa_gIB-0eT2?usp=drive_link',
    'B': 'https://drive.google.com/drive/folders/1iyPGLVDnF7gvs04EusvrVhwirKeuHYc4?usp=drive_link',
    'C': 'https://drive.google.com/drive/folders/12OIWOf4EdfSBuBAs9J-iswlwmH54qbqQ?usp=drive_link',
    'D': 'https://drive.google.com/drive/folders/1fUfTmIkdcWuR-_E289URTmR7USFPku9T?usp=drive_link',
    'E': 'https://drive.google.com/drive/folders/1NCyf_9sENwW6Jqd94Ar2HcKPUprnrnS0?usp=drive_link',
    'F': 'https://drive.google.com/drive/folders/16kHsNt7fGg51DrWnHUSyad9980njtCea?usp=drive_link',
    'G': 'https://drive.google.com/drive/folders/1U0-u5ca96bwkFsDW1joyQWgAL_52Hw65?usp=drive_link',
    'H': 'https://drive.google.com/drive/folders/1HkP94fZEuZZHLQsNp_UNXAjgmvETGxm7?usp=drive_link',
    'I': 'https://drive.google.com/drive/folders/11KcgY-XDS7VLa5U5OMZJd_euQoQiu44G?usp=drive_link',
    'J': 'https://drive.google.com/drive/folders/1t2O0Yqk_fJPaU3l2tziiFAVo3HIQaYLH?usp=drive_link',
    'K': 'https://drive.google.com/drive/folders/150GZ9HjE3eO8Tr2HG_0ApTxIZxXyYcT4?usp=drive_link',
    'L': 'https://drive.google.com/drive/folders/1Gr3drDIa5GzlIymgG-Zbco5KbbONHdI4?usp=drive_link',
    'M': 'https://drive.google.com/drive/folders/1XgrKY-coVlwpj5CsdkLSd-GS9KPVDNUR?usp=drive_link',
    'N': 'https://drive.google.com/drive/folders/1_7Hx_MeewwiEqp5HElaqZDPZFW-GgDo7?usp=drive_link',
    'O': 'https://drive.google.com/drive/folders/17Y6QR8hWMd7X_alCBXKk5cOTXQrSbXXd?usp=drive_link',
    'P': 'https://drive.google.com/drive/folders/1Q3964G7YlrsxK-E7Dy1kL50EPgYZSr7l?usp=drive_link',
    'Q': 'https://drive.google.com/drive/folders/1Yh5L9l6ERLBV7YNPKfj70X5rsSfGXNZE?usp=sharing',
    'R': 'https://drive.google.com/drive/folders/1eDXKl6IBWu1Dx6ws89GAZVewyICANSVn?usp=drive_link',
    'S': 'https://drive.google.com/drive/folders/11_M3IXVkkK0ZyiYCuvBgAS30TsuP-wsi?usp=drive_link',
    'T': 'https://drive.google.com/drive/folders/1aOOAKPKiRRdkJLct581u08a-FaqhwwRi?usp=drive_link',
    'U': 'https://drive.google.com/drive/folders/1skEhcl-GlPfMn7IF_SyTHGv5gbRuToix?usp=drive_link',
    'V': 'https://drive.google.com/drive/folders/1jcdDKUwXArumnHjDt2ahZjdcAOqMyEEg?usp=drive_link',
    'W': 'https://drive.google.com/drive/folders/1n23N2jQnlEqXsx34C9HL1M2B4xK_jXl3?usp=drive_link',
    'X': '#', // Não foi fornecido link para X
    'Y': '#', // Não foi fornecido link para Y
    'Z': 'https://drive.google.com/drive/folders/1FiF1VT9diua64UYOMSf62MiK1VIwLHPl?usp=drive_link'
  };
  
  for (const letter of alphabet) {
    azBooks[letter] = [];
    for (let i = 1; i <= 15; i++) {
      const book: Book = {
        id: `${letter.toLowerCase()}-${i}`,
        title: `Livro de ${letter}${i}`,
        author: `Autor ${letter}`,
        summary: `Este é o resumo do livro ${letter}${i}, uma obra fascinante que explora novos mundos e desperta a imaginação dos leitores.`,
        cover: `https://placehold.co/400x600/${Math.floor(Math.random()*16777215).toString(16)}/FFFFFF?text=${letter}${i}`,
        driveLink: azDriveLinks[letter] || '#'
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
      id: 'education',
      title: 'Educação',
      books: educationBooks
    },
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

// Audiobooks famosos
const audiobooksSection: Book[] = [
  {
    id: 'pai-rico-pai-pobre-audio',
    title: 'Pai Rico, Pai Pobre',
    author: 'Robert Kiyosaki',
    summary: 'O livro que mudou a forma como milhões de pessoas pensam sobre dinheiro e investimentos. Uma lição valiosa sobre educação financeira.',
    cover: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=600&fit=crop&crop=center',
    driveLink: '#',
    isAudiobook: true,
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Placeholder
    duration: '6h 9m'
  },
  {
    id: 'mil-ao-milhao-audio',
    title: 'Do Mil ao Milhão',
    author: 'Thiago Nigro',
    summary: 'O guia definitivo para sair da situação de dívidas, conseguir juntar dinheiro e multiplicar o patrimônio.',
    cover: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=600&fit=crop&crop=center',
    driveLink: '#',
    isAudiobook: true,
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Placeholder
    duration: '8h 15m'
  },
  {
    id: '7-habitos-audio',
    title: 'Os 7 Hábitos das Pessoas Altamente Eficazes',
    author: 'Stephen R. Covey',
    summary: 'Lições poderosas de mudança pessoal que transformaram a vida de milhões de pessoas ao redor do mundo.',
    cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=center',
    driveLink: '#',
    isAudiobook: true,
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Placeholder
    duration: '13h 4m'
  },
  {
    id: 'quem-pensa-enriquece-audio',
    title: 'Quem Pensa Enriquece',
    author: 'Napoleon Hill',
    summary: 'O clássico atemporal sobre como desenvolver a mentalidade de riqueza e alcançar o sucesso financeiro.',
    cover: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=600&fit=crop&crop=center',
    driveLink: '#',
    isAudiobook: true,
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Placeholder
    duration: '10h 17m'
  },
  {
    id: 'mindset-audio',
    title: 'Mindset: A Nova Psicologia do Sucesso',
    author: 'Carol S. Dweck',
    summary: 'Como podemos aprender a realizar nosso potencial através da mudança de mentalidade.',
    cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop&crop=center',
    driveLink: '#',
    isAudiobook: true,
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Placeholder
    duration: '7h 32m'
  },
  {
    id: 'poder-do-agora-audio',
    title: 'O Poder do Agora',
    author: 'Eckhart Tolle',
    summary: 'Um guia para a iluminação espiritual que ensina como viver plenamente no momento presente.',
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop&crop=center',
    driveLink: '#',
    isAudiobook: true,
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Placeholder
    duration: '7h 37m'
  }
];

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
    {
      id: 'audiobooks',
      title: 'Audiobooks',
      books: audiobooksSection,
      isAudiobooks: true
    },