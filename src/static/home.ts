import { Product } from "@/models/Product"

export const highlights = [
  {
    src: 'https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    alt: "Men's Winter Collection",
    to: '/products/clothing/man'
  },
  {
    src: 'https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    alt: "Woman's Winter Collection",
    to: '/products/clothing/woman'
  },
  {
    src: 'https://images.pexels.com/photos/1902830/pexels-photo-1902830.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    alt: "Kid's Winter Collection",
    to: '/products/clothing/kids'
  }
]

export const products: Product[] = [
  {
    id: 1,
    name: "Camiseta Básica",
    description: "Camiseta básica de algodão, disponível em várias cores. Ideal para o dia a dia.",
    price: {
      total: 69.99,
      installmentAmount: 11.67,
      installments: 6
    },
    category: "Roupas",
    brand: "MarcaX",
    stock: 150,
    rating: 4.3,
    reviews: 85,
    imageUrl: "https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    details: {
      size: ["P", "M", "G", "GG"],
      color: ["Branco", "Preto", "Azul", "Vermelho"],
      material: "100% Algodão",
      careInstructions: "Lavar à máquina a 30°C"
    }
  },
  {
    id: 2,
    name: "Calça Jeans Skinny",
    description: "Calça jeans skinny com elastano, proporcionando maior conforto e ajuste perfeito.",
    price: {
      total: 69.99,
      installmentAmount: 11.67,
      installments: 6
    },
    category: "Roupas",
    brand: "MarcaY",
    stock: 100,
    rating: 4.7,
    reviews: 102,
    imageUrl: "https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    details: {
      size: ["36", "38", "40", "42", "44"],
      color: ["Azul Claro", "Azul Escuro"],
      material: "98% Algodão, 2% Elastano",
      careInstructions: "Lavar à máquina a 30°C"
    }
  },
  {
    id: 3,
    name: "Vestido Floral",
    description: "Vestido floral leve e soltinho, ideal para dias quentes e eventos casuais.",
    price: {
      total: 69.99,
      installmentAmount: 11.67,
      installments: 6
    },
    category: "Roupas",
    brand: "MarcaZ",
    stock: 60,
    rating: 4.5,
    reviews: 64,
    imageUrl: "https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    details: {
      size: ["P", "M", "G"],
      color: ["Estampa Floral"],
      material: "100% Viscose",
      careInstructions: "Lavar à mão"
    }
  },
  {
    id: 4,
    name: "Jaqueta de Couro",
    description: "Jaqueta de couro sintético com forro, ideal para dias frios e composições elegantes.",
    price: {
      total: 69.99,
      installmentAmount: 11.67,
      installments: 6
    },
    category: "Roupas",
    brand: "MarcaC",
    stock: 30,
    rating: 4.8,
    reviews: 45,
    imageUrl: "https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    details: {
      size: ["P", "M", "G", "GG"],
      color: ["Preto", "Marrom"],
      material: "Couro Sintético",
      careInstructions: "Limpar com pano úmido"
    }
  },
  {
    id: 5,
    name: "Tênis Casual",
    description: "Tênis casual confortável, perfeito para uso diário e combinações despojadas.",
    price: {
      total: 69.99,
      installmentAmount: 11.67,
      installments: 6
    },
    category: "Calçados",
    brand: "MarcaT",
    stock: 80,
    rating: 4.6,
    reviews: 78,
    imageUrl: "https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    details: {
      size: ["37", "38", "39", "40", "41", "42"],
      color: ["Branco", "Preto"],
      material: "Sintético",
      careInstructions: "Limpar com pano úmido"
    }
  },
  {
    id: 6,
    name: "Blusa de Moletom",
    description: "Blusa de moletom com capuz, confortável e ideal para dias frios.",
    price: {
      total: 69.99,
      installmentAmount: 11.67,
      installments: 6
    },
    category: "Roupas",
    brand: "MarcaM",
    stock: 120,
    rating: 4.4,
    reviews: 56,
    imageUrl: "https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    details: {
      size: ["P", "M", "G", "GG"],
      color: ["Cinza", "Preto", "Vermelho"],
      material: "70% Algodão, 30% Poliéster",
      careInstructions: "Lavar à máquina a 30°C"
    }
  },
  {
    id: 7,
    name: "Saia Plissada",
    description: "Saia plissada de tecido leve, ideal para composições elegantes e confortáveis.",
    price: {
      total: 69.99,
      installmentAmount: 11.67,
      installments: 6
    },
    category: "Roupas",
    brand: "MarcaF",
    stock: 70,
    rating: 4.2,
    reviews: 42,
    imageUrl: "https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    details: {
      size: ["P", "M", "G"],
      color: ["Preto", "Bege", "Azul"],
      material: "100% Poliéster",
      careInstructions: "Lavar à mão"
    }
  },
  {
    id: 8,
    name: "Blazer Feminino",
    description: "Blazer feminino elegante, ideal para ambientes de trabalho e ocasiões especiais.",
    price: {
      total: 69.99,
      installmentAmount: 11.67,
      installments: 6
    },
    category: "Roupas",
    brand: "MarcaE",
    stock: 50,
    rating: 4.7,
    reviews: 39,
    imageUrl: "https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    details: {
      size: ["P", "M", "G"],
      color: ["Preto", "Cinza"],
      material: "65% Poliéster, 35% Viscose",
      careInstructions: "Lavar a seco"
    }
  },
  {
    id: 9,
    name: "Shorts Jeans",
    description: "Shorts jeans com barra desfiada, confortável e estiloso para o verão.",
    price: {
      total: 69.99,
      installmentAmount: 11.67,
      installments: 6
    },
    category: "Roupas",
    brand: "MarcaV",
    stock: 90,
    rating: 4.5,
    reviews: 66,
    imageUrl: "https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    details: {
      size: ["36", "38", "40", "42"],
      color: ["Azul Claro", "Azul Escuro"],
      material: "100% Algodão",
      careInstructions: "Lavar à máquina a 30°C"
    }
  },
  {
    id: 10,
    name: "Camisa Social",
    description: "Camisa social de algodão, ideal para ambientes de trabalho e eventos formais.",
    price: {
      total: 69.99,
      installmentAmount: 11.67,
      installments: 6
    },
    category: "Roupas",
    brand: "MarcaS",
    stock: 85,
    rating: 4.6,
    reviews: 49,
    imageUrl: "https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    details: {
      size: ["P", "M", "G", "GG"],
      color: ["Branco", "Azul", "Rosa"],
      material: "100% Algodão",
      careInstructions: "Lavar à máquina a 30°C"
    }
  },
  {
    id: 11,
    name: "Suéter de Lã",
    description: "Suéter de lã aconchegante, perfeito para o inverno.",
    price: {
      total: 69.99,
      installmentAmount: 11.67,
      installments: 6
    },
    category: "Roupas",
    brand: "MarcaW",
    stock: 60,
    rating: 4.7,
    reviews: 38,
    imageUrl: "https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    details: {
      size: ["P", "M", "G"],
      color: ["Cinza", "Bege", "Verde"],
      material: "80% Lã, 20% Poliéster",
      careInstructions: "Lavar à mão"
    }
  },
  {
    id: 12,
    name: "Bermuda de Sarja",
    description: "Bermuda de sarja confortável, ideal para momentos de lazer.",
    price: {
      total: 69.99,
      installmentAmount: 11.67,
      installments: 6
    },
    category: "Roupas",
    brand: "MarcaB",
    stock: 95,
    rating: 4.4,
    reviews: 53,
    imageUrl: "https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    details: {
      size: ["38", "40", "42", "44"],
      color: ["Bege", "Preto", "Azul"],
      material: "100% Algodão",
      careInstructions: "Lavar à máquina a 30°C"
    }
  },
  {
    id: 13,
    name: "Macacão Feminino",
    description: "Macacão feminino estiloso e confortável, ideal para diversas ocasiões.",
    price: {
      total: 69.99,
      installmentAmount: 11.67,
      installments: 6
    },
    category: "Roupas",
    brand: "MarcaG",
    stock: 55,
    rating: 4.6,
    reviews: 45,
    imageUrl: "https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    details: {
      size: ["P", "M", "G"],
      color: ["Preto", "Verde"],
      material: "95% Poliéster, 5% Elastano",
      careInstructions: "Lavar à máquina a 30°C"
    }
  },
  {
    id: 14,
    name: "Blusa de Tricô",
    description: "Blusa de tricô macia e quentinha, perfeita para o inverno.",
    price: {
      total: 69.99,
      installmentAmount: 11.67,
      installments: 6
    },
    category: "Roupas",
    brand: "MarcaK",
    stock: 75,
    rating: 4.5,
    reviews: 50,
    imageUrl: "https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    details: {
      size: ["P", "M", "G", "GG"],
      color: ["Branco", "Cinza", "Rosa"],
      material: "70% Acrílico, 30% Lã",
      careInstructions: "Lavar à mão"
    }
  },
  {
    id: 15,
    name: "Legging Fitness",
    description: "Legging fitness de alta compressão, ideal para exercícios físicos.",
    price: {
      total: 69.99,
      installmentAmount: 11.67,
      installments: 6
    },
    category: "Roupas",
    brand: "MarcaFit",
    stock: 85,
    rating: 4.7,
    reviews: 58,
    imageUrl: "https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    details: {
      size: ["P", "M", "G", "GG"],
      color: ["Preto", "Azul", "Roxo"],
      material: "85% Poliéster, 15% Elastano",
      careInstructions: "Lavar à máquina a 30°C"
    }
  }
];

export const tabs = [
  {
    title: 'Masculino',
    value: 'mens',
  },
  {
    title: 'Feminino',
    value: 'womans',
  },
  {
    title: 'Infantil',
    value: 'kids'
  }
]
