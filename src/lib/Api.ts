import ContactApi from "./Request/Contact"

export default class Api {
  contact = new ContactApi()
}
const api = new Api()

export function useApi<T extends keyof Api>(key: T): Api[T]
export function useApi(): Api
export function useApi(key?: keyof Api) {
  return key ? api[key] : api
}
