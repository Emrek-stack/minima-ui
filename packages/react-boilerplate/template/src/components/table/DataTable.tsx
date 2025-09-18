import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table'
import { useState } from 'react'
import {
  Table,
  Text,
  Input,
  Button,
  Heading,
  clx,
} from '@minimaui/ui'
import { ChevronLeft, ChevronRight, ChevronUpDown, ChevronUpMini, ChevronDown, MagnifyingGlass } from '@minimaui/icons'

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
  isLoading?: boolean
  pageSize?: number
  enablePagination?: boolean
  enableSorting?: boolean
  enableFiltering?: boolean
  searchPlaceholder?: string
  onRowClick?: (row: TData) => void
  heading?: string
  subHeading?: string
  action?: {
    label: string
    onClick?: () => void
    to?: string
  }
  getRowId?: (row: TData) => string
}

export function DataTable<TData>({
  columns,
  data,
  isLoading = false,
  pageSize = 10,
  enablePagination = true,
  enableSorting = true,
  enableFiltering = true,
  searchPlaceholder = 'Ara...',
  onRowClick,
  heading,
  subHeading,
  action,
  getRowId = (row: TData) => `${row}`,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getRowId,
    state: {
      sorting,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
  })

  const shouldRenderHeading = heading || subHeading

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex items-center gap-x-4">
            {shouldRenderHeading && (
              <div>
                {heading && <Heading level="h2">{heading}</Heading>}
                {subHeading && (
                  <Text size="small" className="text-ui-fg-subtle">
                    {subHeading}
                  </Text>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center gap-x-2">
            {enableFiltering && (
              <div className="w-full md:w-auto">
                <div className="relative">
                  <MagnifyingGlass className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ui-fg-muted" />
                  <Input
                    placeholder={searchPlaceholder}
                    value={globalFilter ?? ''}
                    onChange={(event) => setGlobalFilter(event.target.value)}
                    className="pl-9 w-full md:w-64"
                  />
                </div>
              </div>
            )}
            {action && (
              <Button
                size="small"
                variant="secondary"
                onClick={action.onClick}
                asChild={!!action.to}
              >
                {action.to ? (
                  <a href={action.to}>{action.label}</a>
                ) : (
                  action.label
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.HeaderCell key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none flex items-center gap-x-2'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {enableSorting && header.column.getCanSort() && (
                            <span className="text-ui-fg-muted">
                              {{
                                asc: <ChevronUpMini />,
                                desc: <ChevronDown />,
                              }[header.column.getIsSorted() as string] ?? <ChevronUpDown />}
                            </span>
                          )}
                        </div>
                      )}
                  </Table.HeaderCell>
                ))}
              </Table.Row>
            ))}
          </Table.Header>
          <Table.Body>
            {isLoading ? (
              <Table.Row>
                <Table.Cell className="h-24 text-center" style={{ gridColumn: `1 / ${columns.length + 1}` }}>
                  <Text className="text-ui-fg-muted">Yükleniyor...</Text>
                </Table.Cell>
              </Table.Row>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Table.Row
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => onRowClick?.(row.original)}
                  className={clx(
                    onRowClick && 'cursor-pointer hover:bg-ui-bg-subtle-hover'
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <Table.Cell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
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

      {/* Pagination */}
      {enablePagination && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <Text size="small" className="text-ui-fg-muted">
              {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length
              )}{' '}
              / {table.getFilteredRowModel().rows.length} sonuç
            </Text>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="secondary"
              size="small"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
              Önceki
            </Button>
            <Button
              variant="secondary"
              size="small"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Sonraki
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}