import { useState, useMemo } from 'react'
import { 
  Heading, 
  Text, 
  Container, 
  Button,
  Badge
} from '@minimaui/ui'
import { Plus, PencilSquare, Trash, ArrowDownTray, ArrowUpTray } from '@minimaui/icons'
// import { createColumnHelper } from '@tanstack/react-table'
import { useProducts, useDeleteProduct } from '../hooks/useProducts'
import { DataTable } from '../components/table/DataTable'
import { ActionMenu } from '../components/table/ActionMenu'
import { StatusCell } from '../components/table/StatusCell'
import { ProductCell, ProductHeader } from '../components/table/ProductCell'
import { Product } from '../types'

// const columnHelper = createColumnHelper<Product>()

export function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const { data: productsData, isLoading } = useProducts({ 
    q: searchQuery || undefined 
  })
  const deleteProductMutation = useDeleteProduct()

  const handleDelete = async (product: Product) => {
    if (window.confirm(`"${product.title}" ürününü silmek istediğinizden emin misiniz?`)) {
      try {
        await deleteProductMutation.mutateAsync(product.id)
      } catch (error) {
        console.error('Ürün silinirken hata oluştu:', error)
      }
    }
  }

  const getStatusColor = (status: Product['status']) => {
    switch (status) {
      case 'published':
        return 'green'
      case 'draft':
        return 'orange'
      case 'proposed':
        return 'blue'
      case 'rejected':
        return 'red'
      default:
        return 'grey'
    }
  }

  const getStatusLabel = (status: Product['status']) => {
    switch (status) {
      case 'published':
        return 'Yayında'
      case 'draft':
        return 'Taslak'
      case 'proposed':
        return 'Önerilen'
      case 'rejected':
        return 'Reddedildi'
      default:
        return status
    }
  }

  const columns = useMemo(
    () => [
      {
        id: 'product',
        header: () => <ProductHeader />,
        cell: ({ row }: any) => <ProductCell product={row.original} />,
      },
      {
        accessorKey: 'collection',
        header: 'Koleksiyon',
        cell: ({ getValue }: any) => {
          const collection = getValue()
          return collection ? (
            <Badge size="small">{collection.title}</Badge>
          ) : (
            <Text size="small" className="text-ui-fg-muted">-</Text>
          )
        },
      },
      {
        accessorKey: 'variants',
        header: 'Varyantlar',
        cell: ({ getValue }: any) => {
          const variants = getValue()
          return (
            <Text size="small">
              {variants.length} varyant
            </Text>
          )
        },
      },
      {
        accessorKey: 'status',
        header: 'Durum',
        cell: ({ getValue }: any) => {
          const status = getValue()
          return (
            <StatusCell color={getStatusColor(status)}>
              {getStatusLabel(status)}
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
                    onClick: () => console.log('Edit product:', row.original.id),
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
    [deleteProductMutation]
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Heading level="h1">Ürünler</Heading>
          <Text className="text-ui-fg-subtle">
            Ürünlerinizi yönetin ve düzenleyin
          </Text>
        </div>
        <div className="flex items-center gap-x-2">
          <Button variant="secondary" size="small">
            <ArrowDownTray className="mr-2 h-4 w-4" />
            Dışa Aktar
          </Button>
          <Button variant="secondary" size="small">
            <ArrowUpTray className="mr-2 h-4 w-4" />
            İçe Aktar
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Yeni Ürün
          </Button>
        </div>
      </div>

      <Container className="p-6">
        <DataTable
          data={productsData?.data || []}
          columns={columns}
          isLoading={isLoading}
          searchable
          onSearch={setSearchQuery}
        />
      </Container>
    </div>
  )
}
