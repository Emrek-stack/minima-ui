// Product Types
export interface Product {
  id: string
  title: string
  description?: string
  thumbnail?: string
  status: 'draft' | 'proposed' | 'published' | 'rejected'
  collection?: {
    id: string
    title: string
  }
  variants: ProductVariant[]
  sales_channels?: SalesChannel[]
  created_at: string
  updated_at: string
}

export interface ProductVariant {
  id: string
  title: string
  sku?: string
  price: number
  inventory_quantity: number
}

export interface SalesChannel {
  id: string
  name: string
  description?: string
}

// Category Types
export interface Category {
  id: string
  name: string
  handle: string
  description?: string
  is_active: boolean
  is_internal: boolean
  parent_category?: Category
  category_children?: Category[]
  created_at: string
  updated_at: string
}

// Common Types
export interface PaginatedResponse<T> {
  data: T[]
  count: number
  offset: number
  limit: number
}

export interface TableQuery {
  q?: string
  offset?: number
  limit?: number
  order?: string
}
