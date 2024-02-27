import md5 from "md5"
import { getCurrentDate } from "../utils/getCurrentDate.ts"

export interface IParams {
  price?: number | null
  offset?: number
  limit?: number
  ids?: string[]
  field?: string
  name?: null | string
  brand?: null | string
}

export interface IBody {
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
