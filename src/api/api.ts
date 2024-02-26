import md5 from "md5"
import { getCurrentDate } from "../utils/getCurrentDate.ts"

interface IParams {
  price?: number
  offset?: number
  limit?: number
  ids?: string[]
  field?: string
}

interface IBody {
  action: "get_ids" | "filter" | "get_items" | "get_fields"
  params?: IParams
}

export interface IResponseIds {
  result: string[]
}

export interface IProduct {
  brand: null | string
  id: string
  price: number
  product: string
}

export const api = <T>(body: IBody): Promise<T> => {
  const options = {
    method: "POST",
    headers: {
      "X-Auth": md5(`Valantis_${getCurrentDate()}`),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }

  return fetch("/api", options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json()
    })
    .catch((e) => {
      console.log(e.message)
      throw e
    })
}

export const getIds = async (): Promise<string[]> => {
  try {
    const res = await api<IResponseIds>({
      action: "get_ids",
      // params: {
      //   offset,
      // },
    })
    return [...new Set(res.result)]
  } catch (e) {
    return getIds()
  }
}

export const getItemsById = async (ids: string[]): Promise<IProduct[]> => {
  try {
    const res = await api<Record<"result", IProduct[]>>({
      action: "get_items",
      params: {
        ids,
      },
    })
    // if (!res) return []
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
