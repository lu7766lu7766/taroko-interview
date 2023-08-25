type iCallback = {
  (detail: unknown): void
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
    this.callbacks[event] = callback
    document.addEventListener(event, (e: CustomEvent<unknown>) => {
      callback(e.detail)
    })
  }

  public emit(event: string, detail?: unknown): void {
    document.dispatchEvent(new CustomEvent(event, { detail }))
  }

  public off(event: string): void {
    document.removeEventListener(event, this.callbacks[event])
  }
}

export const Bus = EventBus.getInstance()
