import { Product } from '../../types'

type ProductCellProps = {
  product: Pick<Product, "thumbnail" | "title">
}

export const ProductCell = ({ product }: ProductCellProps) => {
  return (
    <div className="flex h-full w-full max-w-[250px] items-center gap-x-3 overflow-hidden">
      <div className="w-fit flex-shrink-0">
        <div className="h-10 w-10 rounded-md bg-ui-bg-subtle flex items-center justify-center overflow-hidden">
          {product.thumbnail ? (
            <img 
              src={product.thumbnail} 
              alt={product.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-ui-fg-muted text-xs">No Image</span>
          )}
        </div>
      </div>
      <span title={product.title} className="truncate">
        {product.title}
      </span>
    </div>
  )
}

export const ProductHeader = () => {
  return (
    <div className="flex h-full w-full items-center">
      <span>Ürün</span>
    </div>
  )
}
