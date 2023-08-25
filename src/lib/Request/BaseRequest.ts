import _ from "lodash"
import axios, { Method } from "axios"
import urljoin from "url-join"

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

  public baseUrls = ["/api"]

  get header() {
    return {}
  }

  async request(actionKey: keyof T, data: any = {}) {
    const config: iConfig = this.config[actionKey]
    if (!config) throw `config didn't find ${actionKey.toString()}!!`

    let { uri, method } = config
    method = method.toUpperCase() as Method

    while (/{[\w]+}/.test(uri)) {
      const matchRes = uri.match(/{(\w+)}/)!
      uri.replace(matchRes[0], data[matchRes[1]])
    }

    try {
      document.body.style.cursor = "wait"
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
      document.body.style.cursor = "default"
      return this.resultHandler(res)
    } catch (e: any) {
      document.body.style.cursor = "default"
      return this.errorHandler(e)
    }
  }

  private resultHandler(res: any) {
    const SUCCESS_CODE = 200
    const code = res.data.statusCode
    if (code == SUCCESS_CODE) {
      return res.data
    } else {
      alert(res.message)
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
    alert(throwE.message)
    throw throwE
  }
}
