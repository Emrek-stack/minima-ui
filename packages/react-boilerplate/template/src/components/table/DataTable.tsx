import { useState } from 'react'
import { 
  Table, 
  Input, 
  Button, 
  Text, 
  Container,
  Skeleton 
} from '@minimaui/ui'
import { MagnifyingGlass, ChevronLeft, ChevronRight } from '@minimaui/icons'
import { 
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  ColumnDef,
} from '@tanstack/react-table'

interface DataTableProps<TData> {
  data: TData[]
  columns: ColumnDef<TData>[]
  isLoading?: boolean
  searchable?: boolean
  onSearch?: (query: string) => void
  onRowClick?: (row: TData) => void
}

export function DataTable<TData>({
  data,
  columns,
  isLoading = false,
  searchable = false,
  onSearch,
  onRowClick,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [searchQuery, setSearchQuery] = useState('')

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  })

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    onSearch?.(query)
  }

  if (isLoading) {
    return (
      <Container className="p-6">
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </Container>
    )
  }

  return (
    <div className="space-y-4">
      {searchable && (
        <div className="flex items-center gap-x-2">
          <div className="relative flex-1 max-w-sm">
            <MagnifyingGlass className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ui-fg-muted" />
            <Input
              placeholder="Ara..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.HeaderCell key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Table.HeaderCell>
                ))}
              </Table.Row>
            ))}
          </Table.Header>
          <Table.Body>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Table.Row
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={onRowClick ? "cursor-pointer hover:bg-ui-bg-subtle" : ""}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <Table.Cell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell
                  className="h-24 text-center"
                  style={{ gridColumn: `1 / ${columns.length + 1}` }}
                >
                  <Text className="text-ui-fg-muted">Veri bulunamadı.</Text>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>

      {data.length > 0 && (
        <div className="flex items-center justify-between">
          <Text size="small" className="text-ui-fg-muted">
            Toplam {data.length} kayıt
          </Text>
        </div>
      )}
    </div>
  )
}
