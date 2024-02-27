import { useCallback, useEffect, useState } from "react"
import { IProduct } from "./api/api.ts"
import { NavigateButtons } from "./components/NavigateButtons/NavigateButtons.tsx"
import { ProductList } from "./components/ProductList/ProductList.tsx"
import { getIds } from "./api/getIds.ts"
import { useFilter } from "./hooks/useFilter.ts"
import debounce from "debounce"
import { getItemsById } from "./api/getItemsById.ts"
import { getFields } from "./api/getFields.ts"

const pageSize = 50
const debouncedGetIds = debounce((filter, setIds) => {
  getIds(filter).then((res) => {
    setIds(res)
  })
}, 1000)

function App() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [ids, setIds] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(true)
  const [fields, setFields] = useState<string[]>([])
  const [filter, filterChangeHandler] = useFilter()

  useEffect(() => {
    getFields().then((res) => {
      if (!res) {
        setFields([])
        return
      }
      setFields([...new Set(res)].filter((field) => field))
    })
  }, [])

  const loadPrevPage = useCallback(() => {
    setPage((prev) => prev - 1 || 1)
    setOffset((prev) => (prev !== 0 ? prev - pageSize : prev))
  }, [])

  const loadNextPage = useCallback(() => {
    setPage((prev) => {
      if (ids.length - prev * pageSize <= 0) {
        return prev
      } else {
        return prev + 1
      }
    })
    setOffset((prev) => {
      if (ids.length - prev <= pageSize) {
        return prev
      } else {
        return prev + pageSize
      }
    })
  }, [ids])

  useEffect(() => {
    if (Object.keys(filter).some((key) => filter[key] && key !== "brand")) {
      debouncedGetIds(filter, setIds)
    } else {
      getIds(filter).then((ids) => setIds(ids || []))
    }
    setPage(1)
    setOffset(0)
  }, [filter])

  useEffect(() => {
    setLoading(true)
    if (ids.length === 0) {
      setLoading(false)
      setProducts([])
      return
    }
    getItemsById(ids.slice(offset, offset + pageSize)).then((products) => {
      setProducts(products)
      setLoading(false)
    })
  }, [offset, ids])

  return (
    <div className="app">
      <h1>Тестовое задание Valantis </h1>
      <p>страница {page}</p>
      <div>
        <input
          type="text"
          name="product"
          placeholder="Название"
          onChange={filterChangeHandler}
          value={filter.product || ""}
        />
        <select name="brand" onChange={filterChangeHandler}>
          <option value="">выберите бренд</option>
          {fields.length &&
            fields.map((field) => (
              <option value={field} key={field}>
                {field}
              </option>
            ))}
        </select>
        <input
          name="price"
          type="number"
          placeholder="Цена"
          value={filter.price || ""}
          onChange={filterChangeHandler}
        />
      </div>
      <NavigateButtons onPrev={loadPrevPage} onNext={loadNextPage} />
      {loading ? <div>Загрузка...</div> : <ProductList products={products} />}
    </div>
  )
}

export default App
