import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { mockApi } from '../data/mockData'
import { TableQuery } from '../types'

export function useCategories(query: TableQuery = {}) {
  return useQuery({
    queryKey: ['categories', query],
    queryFn: () => mockApi.getCategories(query),
    staleTime: 1000 * 60 * 5, // 5 minutes
    select: (data) => data.data, // Extract the data array from PaginatedResponse
  })
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: string) => mockApi.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}

