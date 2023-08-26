"use client"
import Button from "@mui/material/Button"
import { AddCircleOutline, Delete, Edit } from "@mui/icons-material"
import { Bus } from "../../../lib/EventBus"
import Card from "@mui/material/Card"
import Avatar from "@mui/material/Avatar"
import contactStyle from "./style.module.sass"
import classNames from "classnames"
import { useApi } from "@/lib/Api"
import { useEffect, useState } from "react"
import { iContactData } from "@/lib/Request/Contact"
import CreateModal from "./Create"
import UpdateModal from "./Update"
import { deleteSuccess } from "@/lib/Alert"

export default () => {
  const api = useApi("contact")
  const [datas, setDatas] = useState<iContactData[]>([])
  const getList = async () => {
    const res = await api.getList()
    setDatas(res.data)
  }
  const doDelete = async (id: number) => {
    await api.delete({ id })
    deleteSuccess()
    getList()
  }
  useEffect(() => {
    getList()
  }, [])
  return (
    <>
      <div className="title text-2xl mb-2">Contact List</div>
      <Button variant="outlined" endIcon={<AddCircleOutline />} onClick={() => Bus.emit("create.show")}>
        Add
      </Button>
      <div className="container mt-4 flex flex-wrap">
        {datas.map((data) => (
          <Card key={"user" + data.id} className={classNames(contactStyle.card, "flex")}>
            <Avatar className="flex-none mr-2">{data.first_name.substring(0, 1)}</Avatar>
            <div className="flex-1">
              {data.first_name} {data.last_name}
              <div className="job text-sm">Job: {data.job}</div>
              <div className="desc text-sm">Desc: {data.description}</div>
            </div>
            <div className="action flex flex-col">
              <Button variant="outlined" color="success" endIcon={<Edit />} onClick={() => Bus.emit("update.show", data)}>
                Edit
              </Button>
              <Button variant="outlined" color="error" endIcon={<Delete />} onClick={() => doDelete(data.id)}>
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <CreateModal getList={getList} />
      <UpdateModal getList={getList} />
    </>
  )
}
