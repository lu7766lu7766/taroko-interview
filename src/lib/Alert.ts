import { Bus } from "./EventBus"

const successAlert = (message: string) => Bus.emit("notification.success", message)
export const createSuccess = () => successAlert("create success!")
export const updateSuccess = () => successAlert("update success!")
export const deleteSuccess = () => successAlert("delete success!")
