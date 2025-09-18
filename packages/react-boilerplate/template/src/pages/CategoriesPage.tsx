import { useState, useMemo } from 'react'
import { 
  Heading, 
  Text, 
  Container, 
  Button
} from '@minimaui/ui'
import { Plus, PencilSquare, Trash } from '@minimaui/icons'
// import { createColumnHelper } from '@tanstack/react-table'
import { useCategories, useDeleteCategory } from '../hooks/useCategories'
import { DataTable } from '../components/table/DataTable'
import { ActionMenu } from '../components/table/ActionMenu'
import { StatusCell } from '../components/table/StatusCell'
import { Category } from '../types'

// const columnHelper = createColumnHelper<Category>()

export function CategoriesPage() {
  const [searchQuery, _setSearchQuery] = useState('')
  const { data: categoriesData, isLoading } = useCategories({ 
    q: searchQuery || undefined 
  })
  const deleteCategoryMutation = useDeleteCategory()

  const handleDelete = async (category: Category) => {
    if (window.confirm(`"${category.name}" kategorisini silmek istediğinizden emin misiniz?`)) {
      try {
        await deleteCategoryMutation.mutateAsync(category.id)
      } catch (error) {
        console.error('Kategori silinirken hata oluştu:', error)
      }
    }
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Kategori Adı',
        cell: ({ getValue }: any) => (
          <div className="font-medium">{getValue()}</div>
        ),
      },
      {
        accessorKey: 'handle',
        header: 'Handle',
        cell: ({ getValue }: any) => (
          <Text size="small" className="text-ui-fg-muted">
            /{getValue()}
          </Text>
        ),
      },
      {
        accessorKey: 'is_active',
        header: 'Durum',
        cell: ({ getValue }: any) => {
          const isActive = getValue()
          return (
            <StatusCell color={isActive ? 'green' : 'red'}>
              {isActive ? 'Aktif' : 'Pasif'}
            </StatusCell>
          )
        },
      },
      {
        accessorKey: 'is_internal',
        header: 'Görünürlük',
        cell: ({ getValue }: any) => {
          const isInternal = getValue()
          return (
            <StatusCell color={isInternal ? 'orange' : 'blue'}>
              {isInternal ? 'İç Kullanım' : 'Herkese Açık'}
            </StatusCell>
          )
        },
      },
      {
        id: 'actions',
        header: 'İşlemler',
        cell: ({ row }: any) => (
          <ActionMenu
            groups={[
              {
                actions: [
                  {
                    label: 'Düzenle',
                    icon: <PencilSquare className="h-4 w-4" />,
                    onClick: () => console.log('Edit category:', row.original.id),
                  },
                ],
              },
              {
                actions: [
                  {
                    label: 'Sil',
                    icon: <Trash className="h-4 w-4" />,
                    onClick: () => handleDelete(row.original),
                  },
                ],
              },
            ]}
          />
        ),
      },
    ],
    [deleteCategoryMutation]
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Heading level="h1">Kategoriler</Heading>
          <Text className="text-ui-fg-subtle">
            Ürün kategorilerini yönetin
          </Text>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Yeni Kategori
        </Button>
      </div>

      <Container className="p-0">
        <DataTable
          columns={columns}
          data={categoriesData || []}
          isLoading={isLoading}
          enableFiltering={true}
          searchPlaceholder="Kategori ara..."
          getRowId={(category) => category.id}
        />
      </Container>
    </div>
  )
}
