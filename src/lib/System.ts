export const isClient = typeof window !== "undefined"
export const isService = !isClient
