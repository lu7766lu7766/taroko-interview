import _ from "lodash"
import axios, { Method } from "axios"
import urljoin from "url-join"
import { Bus } from "../EventBus"
import { isClient, isServer } from "../System"

type iConfig = {
  method: string
  uri: string
}
export default class BaseRequest<
  T extends {
    [k: string]: iConfig
  }
> {
  config: T = {} as T

  public baseUrls = isServer ? ["http://127.0.0.1:3000/api"] : ["/api"]

  get header() {
    return {}
  }

  loading() {
    if (isClient) {
      document.body.style.cursor = "wait"
    }
  }

  default() {
    if (isClient) {
      document.body.style.cursor = "default"
    }
  }

  async request(actionKey: keyof T, data: any = {}) {
    const config: iConfig = this.config[actionKey]
    if (!config) throw `config didn't find ${actionKey.toString()}!!`

    let { uri, method } = config
    method = method.toUpperCase() as Method

    if (isServer) {
      while (/{\w+}/.test(uri)) {
        const matchRes = uri.match(/{(\w+)}/)!
        uri = uri.replace(matchRes[0], data[matchRes[1]])
      }
    } else {
      while (/{\w+}/.test(uri)) {
        const matchRes = uri.match(/{(\w+)}/)!
        uri = uri.replace(matchRes[0], "")
      }
    }

    try {
      this.loading()
      const res = await axios({
        baseURL: urljoin(...this.baseUrls),
        method,
        url: uri,
        params: ["GET", "DELETE"].includes(method) ? data : undefined,
        data: ["POST", "PATCH"].includes(method) ? data : undefined,
        headers: this.header,
        responseType: "json",
        withCredentials: true,
      })

      this.default()
      return this.resultHandler(res)
    } catch (e: any) {
      this.default()
      return this.errorHandler(e)
    }
  }

  private resultHandler(res: any) {
    const SUCCESS_CODE = [200, 201]
    if (SUCCESS_CODE.includes(res.data.statusCode)) {
      return res.data
    } else {
      Bus.emit("notification.error", res.message)
      throw res
    }
  }

  private errorHandler(e: any) {
    let throwE
    switch (e.status) {
      case 200:
        const { message, ...res } = e
        throwE = { res, message }
        break
      case 404:
        throwE = { res: e.data.error, message: "page not found" }
        break
      case 500:
        throwE = { res: e.data.error, message: "api crashed" }
        break
      default:
        throwE = { ...e, message: "system error!! please try again later" }
    }
    Bus.emit("notification.error", throwE.message)
    throw throwE
  }
}
