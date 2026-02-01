import { ShoppingCartItem } from "@/models/Product";
import { defineStore } from 'pinia'

interface State {
  shoppingCart: ShoppingCartItem[]
}

const useUserStore = defineStore('User', {
  state: (): State => ({
    shoppingCart: [
      {
        id: 1,
        name: "Camiseta Básica",
        description: "Camiseta básica de algodão, disponível em várias cores. Ideal para o dia a dia.",
        price: {
          total: 69.99,
          installmentAmount: 11.67,
          installments: 6
        },
        amount: 3,
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
        amount: 2,
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
    ]
  }),
})

export { useUserStore }
