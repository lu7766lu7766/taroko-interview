import { useApi } from "@/lib/Api"
import { Bus } from "@/lib/EventBus"
import { iCreateContact } from "@/lib/Request/Contact"
import { useEffect, useState } from "react"
import _ from "lodash"
import BaseModal from "@/components/BaseModal"
import Validation from "@/components/Validation"
import { FieldValues, useForm } from "react-hook-form"
import { createSuccess } from "@/lib/Alert"
import { wait } from "@/lib/Timer"

const emptyData = {
  first_name: "",
  last_name: "",
  job: "",
  description: "",
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

  const onSubmit = async (data: FieldValues) => {
    await api.create(data as iCreateContact)
    createSuccess()
    await wait(2000)
    getList()
    setShow(false)
  }
  useEffect(() => {
    Bus.on("create.show", () => {
      setEditData(_.cloneDeep(emptyData))
      setShow(true)
    })
    return () => {
      Bus.off("create.show")
    }
  })
  return (
    <BaseModal title="Create" show={show} onClose={() => setShow(false)} onSubmit={handleSubmit(onSubmit)}>
      <Validation
        title="First Name"
        value={editData.first_name}
        onChange={(first_name: string) => setEditData({ ...editData, first_name })}
        rules={register("first_name", {
          required: "Required",
        })}
        errorMessage={errors.first_name?.message}
      />
      <Validation
        title="Last Name"
        value={editData.last_name}
        onChange={(last_name: string) => setEditData({ ...editData, last_name })}
        rules={register("last_name", {
          required: "Required",
        })}
        errorMessage={errors.last_name?.message}
      />
      <Validation
        title="Job"
        value={editData.job}
        onChange={(job: string) => setEditData({ ...editData, job })}
        rules={register("job", {
          required: "Required",
        })}
        errorMessage={errors.job?.message}
      />
      <Validation
        title="Description"
        value={editData.description}
        onChange={(description: string) => setEditData({ ...editData, description })}
        rules={register("description", {
          required: "Required",
        })}
        errorMessage={errors.description?.message}
      />
    </BaseModal>
  )
}
