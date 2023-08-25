"use client"
import Button from "@mui/material/Button"
import { AddCircleOutline } from "@mui/icons-material"
import { Bus } from "../../../lib/EventBus"
import Card from "@mui/material/Card"
import contactStyle from "./style.module.sass"
import classNames from "classnames"
import { useApi } from "@/lib/Api"
import { useEffect, useState } from "react"
import { iContactData } from "@/lib/Request/Contact"

export default () => {
  const api = useApi("contact")
  const [datas, setDatas] = useState<iContactData[]>([])
  const getList = async () => {
    const res = await api.getList()
    setDatas(res.data)
  }
  useEffect(() => {
    getList()
  }, [])
  return (
    <>
      <div className="title text-2xl mb-2">Contact List</div>
      <Button variant="outlined" endIcon={<AddCircleOutline />} onClick={() => Bus.emit("modal.show")}>
        Add
      </Button>
      <div className="container mt-4 flex flex-wrap">
        {datas.map((data) => (
          <Card key={"user" + data.id} className={classNames(contactStyle.card)}>
            {data.first_name} {data.last_name}
          </Card>
        ))}
      </div>
    </>
  )
}
