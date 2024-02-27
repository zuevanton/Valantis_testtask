import { api } from "./api.ts"

export const getFields = async (): Promise<string[]> => {
  try {
    const res = await api<Record<"result", string[]>>({
      action: "get_fields",
      params: {
        field: "brand",
      },
    })
    return res.result
  } catch (e) {
    return await getFields()
  }
}
