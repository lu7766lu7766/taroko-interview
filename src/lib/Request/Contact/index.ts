import config from "./config.json"
import BaseRequest from "../BaseRequest"

type iCreateData = {
  id: number
  contact: {
    first_name: string
    last_name: string
    job: string
    description: string
  }
}
type iUpdateData = {
  id: number
  info: {
    first_name: string
  }
}
export type iContactData = {
  id: number
  first_name: string
  last_name: string
  job: string
  description: string
}
type iRes<T> = {
  statusCode: number
  data: T
}

export default class extends BaseRequest<typeof config> {
  constructor() {
    super()
    this.config = config
    this.baseUrls = this.baseUrls.concat("contacts")
  }

  getList(): Promise<iRes<iContactData[]>> {
    return this.request("list")
  }

  create(data: iCreateData) {
    return this.request("create", data)
  }

  update(data: iUpdateData) {
    return this.request("update", data)
  }

  delete(data: { id: number }) {
    return this.request("delete", data)
  }
}
