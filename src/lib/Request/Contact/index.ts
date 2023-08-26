import config from "./config.json"
import BaseRequest from "../BaseRequest"
export type iCreateContact = {
  first_name: string
  last_name: string
  job: string
  description: string
}
export type iUpdateContact = {
  id: number
  first_name: string
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

  create(contact: iCreateContact) {
    return this.request("create", {
      contact,
    })
  }

  update({ id, ...info }: iUpdateContact) {
    return this.request("update", {
      id,
      info,
    })
  }

  delete({ id }: { id: number | string }) {
    return this.request("delete", { id })
  }
}
