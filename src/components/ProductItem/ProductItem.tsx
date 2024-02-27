import { IProduct } from "../../api/api.ts"
import s from "./ProductItem.module.css"

interface Props {
  productData: IProduct
}
export const ProductItem = ({ productData }: Props) => {
  const { product, brand, price } = productData
  return (
    <li className={s.item}>
      <h3>{product}</h3>
      {brand && <span>Бренд: {brand}</span>}
      <span>{price}р.</span>
    </li>
  )
}
