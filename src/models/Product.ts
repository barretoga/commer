interface ProductDetails {
  size: string[]
  color: string[]
  material: string
  careInstructions?: string
}

export interface Product {
  id: number
  name: string
  description: string
  price: {
    total: number
    installmentAmount: number
    installments: number
  }
  category: string
  brand: string
  stock: number
  rating: number
  reviews: number
  imageUrl: string
  details: ProductDetails
}
