import { Product, Category, PaginatedResponse } from '../types'

// Mock Categories Data
export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Elektronik',
    handle: 'elektronik',
    description: 'Elektronik ürünler',
    is_active: true,
    is_internal: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    category_children: [
      {
        id: '2',
        name: 'Telefon',
        handle: 'telefon',
        description: 'Akıllı telefonlar',
        is_active: true,
        is_internal: false,
        parent_category: undefined,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      },
      {
        id: '3',
        name: 'Laptop',
        handle: 'laptop',
        description: 'Dizüstü bilgisayarlar',
        is_active: true,
        is_internal: false,
        parent_category: undefined,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      }
    ]
  },
  {
    id: '4',
    name: 'Giyim',
    handle: 'giyim',
    description: 'Giyim ürünleri',
    is_active: true,
    is_internal: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    category_children: [
      {
        id: '5',
        name: 'Erkek Giyim',
        handle: 'erkek-giyim',
        description: 'Erkek giyim ürünleri',
        is_active: true,
        is_internal: false,
        parent_category: undefined,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      }
    ]
  },
  {
    id: '6',
    name: 'Ev & Yaşam',
    handle: 'ev-yasam',
    description: 'Ev ve yaşam ürünleri',
    is_active: false,
    is_internal: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  }
]

// Mock Products Data
export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'iPhone 15 Pro',
    description: 'Apple iPhone 15 Pro 128GB',
    thumbnail: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=200&h=200&fit=crop',
    status: 'published',
    collection: {
      id: '1',
      title: 'Apple Ürünleri'
    },
    variants: [
      {
        id: '1',
        title: '128GB - Doğal Titanyum',
        sku: 'IPH15P-128-NT',
        price: 45999,
        inventory_quantity: 25
      },
      {
        id: '2',
        title: '256GB - Doğal Titanyum',
        sku: 'IPH15P-256-NT',
        price: 51999,
        inventory_quantity: 15
      }
    ],
    sales_channels: [
      {
        id: '1',
        name: 'Online Store',
        description: 'Ana online mağaza'
      }
    ],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'MacBook Air M2',
    description: 'Apple MacBook Air 13" M2 çip',
    thumbnail: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=200&h=200&fit=crop',
    status: 'published',
    collection: {
      id: '1',
      title: 'Apple Ürünleri'
    },
    variants: [
      {
        id: '3',
        title: '8GB RAM - 256GB SSD',
        sku: 'MBA-M2-8-256',
        price: 25999,
        inventory_quantity: 8
      }
    ],
    sales_channels: [
      {
        id: '1',
        name: 'Online Store',
        description: 'Ana online mağaza'
      }
    ],
    created_at: '2024-01-05T00:00:00Z',
    updated_at: '2024-01-20T14:15:00Z'
  },
  {
    id: '3',
    title: 'Samsung Galaxy S24',
    description: 'Samsung Galaxy S24 256GB',
    thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop',
    status: 'draft',
    collection: {
      id: '2',
      title: 'Samsung Ürünleri'
    },
    variants: [
      {
        id: '4',
        title: '256GB - Siyah',
        sku: 'SGS24-256-BLK',
        price: 32999,
        inventory_quantity: 0
      }
    ],
    sales_channels: [],
    created_at: '2024-01-10T00:00:00Z',
    updated_at: '2024-01-10T00:00:00Z'
  },
  {
    id: '4',
    title: 'Nike Air Max 270',
    description: 'Nike Air Max 270 Erkek Spor Ayakkabı',
    thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
    status: 'published',
    collection: {
      id: '3',
      title: 'Nike Koleksiyonu'
    },
    variants: [
      {
        id: '5',
        title: '42 Numara - Beyaz',
        sku: 'NAM270-42-WHT',
        price: 2499,
        inventory_quantity: 12
      },
      {
        id: '6',
        title: '43 Numara - Siyah',
        sku: 'NAM270-43-BLK',
        price: 2499,
        inventory_quantity: 8
      }
    ],
    sales_channels: [
      {
        id: '1',
        name: 'Online Store',
        description: 'Ana online mağaza'
      },
      {
        id: '2',
        name: 'Retail Store',
        description: 'Fiziksel mağaza'
      }
    ],
    created_at: '2024-01-12T00:00:00Z',
    updated_at: '2024-01-18T09:45:00Z'
  },
  {
    id: '5',
    title: 'Adidas Ultraboost 22',
    description: 'Adidas Ultraboost 22 Koşu Ayakkabısı',
    thumbnail: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
    status: 'published',
    collection: {
      id: '4',
      title: 'Adidas Koleksiyonu'
    },
    variants: [
      {
        id: '7',
        title: '41 Numara - Mavi',
        sku: 'AUB22-41-BLU',
        price: 2899,
        inventory_quantity: 5
      }
    ],
    sales_channels: [
      {
        id: '1',
        name: 'Online Store',
        description: 'Ana online mağaza'
      }
    ],
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-22T16:20:00Z'
  }
]

// Mock API Functions
export const mockApi = {
  // Categories API
  getCategories: async (query: any = {}): Promise<PaginatedResponse<Category>> => {
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
    
    let filteredCategories = [...mockCategories]
    
    if (query.q) {
      const searchTerm = query.q.toLowerCase()
      filteredCategories = filteredCategories.filter(cat => 
        cat.name.toLowerCase().includes(searchTerm) ||
        cat.handle.toLowerCase().includes(searchTerm)
      )
    }
    
    const offset = query.offset || 0
    const limit = query.limit || 20
    const paginatedData = filteredCategories.slice(offset, offset + limit)
    
    return {
      data: paginatedData,
      count: filteredCategories.length,
      offset,
      limit
    }
  },

  // Products API
  getProducts: async (query: any = {}): Promise<PaginatedResponse<Product>> => {
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
    
    let filteredProducts = [...mockProducts]
    
    if (query.q) {
      const searchTerm = query.q.toLowerCase()
      filteredProducts = filteredProducts.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.description?.toLowerCase().includes(searchTerm)
      )
    }
    
    if (query.status) {
      filteredProducts = filteredProducts.filter(product => product.status === query.status)
    }
    
    const offset = query.offset || 0
    const limit = query.limit || 20
    const paginatedData = filteredProducts.slice(offset, offset + limit)
    
    return {
      data: paginatedData,
      count: filteredProducts.length,
      offset,
      limit
    }
  },

  // Delete functions
  deleteCategory: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const index = mockCategories.findIndex(cat => cat.id === id)
    if (index > -1) {
      mockCategories.splice(index, 1)
    }
  },

  deleteProduct: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const index = mockProducts.findIndex(product => product.id === id)
    if (index > -1) {
      mockProducts.splice(index, 1)
    }
  }
}
