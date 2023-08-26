type iCallback = {
  (detail: any): void
}
type iCallbackContainer = {
  [key: string]: iCallback
}

interface iBus {
  on: (event: string, callback: iCallback) => void
  emit: (event: string, detail?: unknown) => void
  off: (event: string) => void
}

class EventBus implements iBus {
  private static instance: EventBus
  private callbacks: iCallbackContainer

  public static getInstance(): EventBus {
    if (!this.instance) {
      this.instance = new EventBus()
      return this.instance
    }
    return this.instance
  }

  public constructor() {
    this.callbacks = {}
  }

  public on(event: any, callback: iCallback): void {
    if (typeof window === "undefined") return
    this.callbacks[event] = callback
    document.addEventListener(event, (e: CustomEvent<unknown>) => {
      callback(e.detail)
    })
  }

  public emit(event: string, detail?: unknown): void {
    if (typeof window === "undefined") return
    document.dispatchEvent(new CustomEvent(event, { detail }))
  }

  public off(event: string): void {
    if (typeof window === "undefined") return
    document.removeEventListener(event, this.callbacks[event])
  }
}

export const Bus = EventBus.getInstance()
