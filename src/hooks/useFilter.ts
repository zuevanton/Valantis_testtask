import { ChangeEventHandler, useState } from "react"
export interface Filter extends Record<string, number | null | string> {
  price: null | number
  product: null | string
  brand: null | string
}

const initFilterValue: Filter = {
  price: null,
  product: "",
  brand: null,
}
export const useFilter = (): [
  Filter,
  ChangeEventHandler<HTMLInputElement | HTMLSelectElement>,
] => {
  const [filter, setFilter] = useState(initFilterValue)

  const changeFilter: ChangeEventHandler<HTMLInputElement> = (e) => {
    switch (e.target.name) {
      case "product":
        setFilter((prev) => ({ ...prev, product: e.target.value }))
        break
      case "price":
        setFilter((prev) => ({ ...prev, price: +e.target.value }))
        break
      case "brand":
        setFilter((prev) => ({ ...prev, brand: e.target.value }))
        break
      default:
        console.log("неизвестный фильтр")
    }
  }

  return [filter, changeFilter]
}
