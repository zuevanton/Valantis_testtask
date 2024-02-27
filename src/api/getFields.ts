import { api } from "./api.ts"

export const getFields = async (): Promise<string[] | undefined> => {
  try {
    const res = await api<Record<"result", string[]>>({
      action: "get_fields",
      params: {
        field: "brand",
      },
    })
    return res.result
  } catch (e) {
    if (e instanceof Error) {
      if (e.message === "Network response was not ok") return await getFields()
    }
  }
}
