import { IProduct } from "../../api/api.ts"
import s from "./ProductList.module.css"
import { ProductItem } from "../ProductItem/ProductItem.tsx"

interface Props {
  products: IProduct[]
}

export const ProductList = ({ products }: Props) => {
  return (
    <ul className={s.list}>
      {products.length
        ? products.map((product) => (
            <ProductItem productData={product} key={product.id} />
          ))
        : "Ничего не найдено!"}
    </ul>
  )
}
