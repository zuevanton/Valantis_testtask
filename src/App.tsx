import { useCallback, useEffect, useState } from "react"
import { getItemsById, IProduct } from "./api/api.ts"
import { NavigateButtons } from "./components/NavigateButtons/NavigateButtons.tsx"
import { ProductList } from "./components/ProductList/ProductList.tsx"
import { getIds } from "./api/api.ts"

const pageSize = 50

function App() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [ids, setIds] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(true)

  const loadPrevPage = useCallback(() => {
    setPage((prev) => prev - 1 || 1)
    setOffset((prev) => (prev !== 0 ? prev - pageSize : prev))
  }, [])

  const loadNextPage = useCallback(() => {
    setPage((prev) => prev + 1)
    setOffset((prev) => prev + pageSize)
    setLoading(true)
  }, [])

  useEffect(() => {
    getIds().then((ids) => setIds(ids))
  }, [])

  useEffect(() => {
    setLoading(true)
    if (ids.length === 0) return
    getItemsById(ids.slice(offset, offset + pageSize)).then((products) => {
      setProducts(products)
      setLoading(false)
    })
  }, [offset, ids])

  return (
    <div className="app">
      <h1>Тестовое задание Valantis </h1>
      <p>страница {page}</p>
      <NavigateButtons onPrev={loadPrevPage} onNext={loadNextPage} />
      {loading ? <div>Загрузка...</div> : <ProductList products={products} />}
    </div>
  )
}

export default App
