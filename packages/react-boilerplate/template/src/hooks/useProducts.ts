import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { mockApi } from '../data/mockData'
import { Product, TableQuery } from '../types'

export function useProducts(query: TableQuery = {}) {
  return useQuery({
    queryKey: ['products', query],
    queryFn: () => mockApi.getProducts(query),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: string) => mockApi.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}
