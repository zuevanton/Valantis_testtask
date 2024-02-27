import { Filter } from "../hooks/useFilter.ts"
import { api, IResponseIds } from "./api.ts"

const getAllIds = async (): Promise<string[] | undefined> => {
  try {
    const res = await api<IResponseIds>({
      action: "get_ids",
    })
    return [...new Set(res.result)]
  } catch (e) {
    if (e instanceof Error) {
      if (e.message === "Network response was not ok") {
        return getAllIds()
      }
    }
  }
}

const getFilteredIds = async (
  filterParams: Partial<Filter>,
): Promise<string[] | undefined> => {
  try {
    const ids = await api<IResponseIds>({
      action: "filter",
      params: filterParams,
    })
    return [...new Set(ids.result)]
  } catch (e) {
    if (e instanceof Error) {
      if (e.message === "Network response was not ok") {
        return await getFilteredIds(filterParams)
      }
    }
  }
}

export const getIds = (filter: Filter) => {
  const filterParams = Object.keys(filter).filter(
    (paramKey) => !!filter[paramKey],
  )
  if (Object.keys(filterParams).length === 0) {
    return getAllIds()
  } else {
    return getFilteredIds(
      filterParams.reduce((acc, param) => {
        acc[param] = filter[param]
        return acc
      }, {} as Partial<Filter>),
    )
  }
}
