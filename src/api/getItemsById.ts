import { api, IProduct } from "./api.ts"

export const getItemsById = async (ids: string[]): Promise<IProduct[]> => {
  try {
    const res = await api<Record<"result", IProduct[]>>({
      action: "get_items",
      params: {
        ids,
      },
    })
    return res.result.reduce((acc, product) => {
      if (!acc.find((item) => item.id === product.id)) {
        acc.push(product)
      }
      return acc
    }, [] as IProduct[])
  } catch (e) {
    return await getItemsById(ids)
  }
}
