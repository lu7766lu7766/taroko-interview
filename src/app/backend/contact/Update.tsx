import { useApi } from "@/lib/Api"
import { Bus } from "@/lib/EventBus"
import { iUpdateContact } from "@/lib/Request/Contact"
import { useEffect, useState } from "react"
import _ from "lodash"
import BaseModal from "@/components/BaseModal"
import Validation from "@/components/Validation"
import { FieldValues, useForm } from "react-hook-form"
import { updateSuccess } from "@/lib/Alert"

const emptyData = {
  id: 0,
  first_name: "",
}
const api = useApi("contact")

export default ({ getList }: { getList: () => void }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const [editData, setEditData] = useState(_.cloneDeep(emptyData))
  const [show, setShow] = useState(false)

  const onSubmit = async ({ first_name }: FieldValues) => {
    await api.update({ id: editData.id, first_name })
    updateSuccess()
    getList()
    setShow(false)
  }
  useEffect(() => {
    Bus.on("update.show", (data: iUpdateContact) => {
      setEditData(data)
      setShow(true)
    })
    return () => {
      Bus.off("update.show")
    }
  })
  return (
    <BaseModal title="Update" show={show} onClose={() => setShow(false)} onSubmit={handleSubmit(onSubmit)}>
      <Validation
        title="First Name"
        value={editData.first_name}
        onChange={(first_name: string) => setEditData({ ...editData, first_name })}
        rules={register("first_name", {
          required: "Required",
        })}
        errorMessage={errors.first_name?.message}
      />
    </BaseModal>
  )
}
