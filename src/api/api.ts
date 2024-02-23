import md5 from "md5"

interface IParams {
  price?: number
  offset?: number
  limit?: number
  ids?: string[]
  field?: string
}

interface IBody {
  action: string
  params: IParams
}

export const api = <T>(body: IBody): Promise<T> => {
  return fetch("/api", {
    method: "POST",
    headers: {
      "X-Auth": md5("Valantis_20240223"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    return response.json()
  })
}
