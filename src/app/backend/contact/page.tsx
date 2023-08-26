"use client"
import { Button, Card, Avatar, Paper, MenuList, Popover } from "@mui/material"
import { AddCircleOutline, Delete, Edit, SortByAlpha, ContentCopy } from "@mui/icons-material"
import { Bus } from "@/lib/EventBus"
import contactStyle from "./style.module.sass"
import classNames from "classnames"
import { useApi } from "@/lib/Api"
import { useEffect, useState, useRef, useMemo } from "react"
import { iContactData } from "@/lib/Request/Contact"
import CreateModal from "./Create"
import UpdateModal from "./Update"
import { deleteSuccess } from "@/lib/Alert"
import _ from "lodash"
import MyMenuItem from "@/components/MyMenuItem"

const api = useApi("contact")

export default () => {
  const [datas, setDatas] = useState<iContactData[]>([])
  const [showSort, setShowSort] = useState(false)
  const [sort, setSort] = useState<null | { key: string; type: "desc" | "asc" }>(null)
  const anchorEl = useRef(null)
  const processedDatas = useMemo(() => (sort ? _.orderBy(datas, sort.key, sort.type) : datas), [datas, sort])

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
      <div className="flex">
        <div className="button_area flex-1">
          <Button variant="outlined" endIcon={<AddCircleOutline />} onClick={() => Bus.emit("create.show")}>
            Add
          </Button>
        </div>
        <div className="optional_area flex-1 flex justify-end items-center">
          <Button variant="outlined" color="info" onClick={() => setShowSort(true)} ref={anchorEl}>
            <SortByAlpha />
          </Button>
          <Popover
            open={showSort}
            onClose={() => setShowSort(false)}
            anchorEl={anchorEl.current}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Paper sx={{ width: 320 }}>
              <MenuList dense>
                <MyMenuItem onClick={() => setSort(null)} checked={sort == null} title="none" />
                <MyMenuItem
                  onClick={() => setSort({ key: "first_name", type: "asc" })}
                  checked={sort?.key == "first_name" && sort?.type == "asc"}
                  title="First Name asc"
                />
                <MyMenuItem
                  onClick={() => setSort({ key: "first_name", type: "desc" })}
                  checked={sort?.key == "first_name" && sort?.type == "desc"}
                  title="First Name desc"
                />
                <MyMenuItem
                  onClick={() => setSort({ key: "last_name", type: "asc" })}
                  checked={sort?.key == "last_name" && sort?.type == "asc"}
                  title="Last Name asc"
                />
                <MyMenuItem
                  onClick={() => setSort({ key: "last_name", type: "desc" })}
                  checked={sort?.key == "last_name" && sort?.type == "desc"}
                  title="Last Name desc"
                />
              </MenuList>
            </Paper>
          </Popover>
        </div>
      </div>
      <div className="container mt-4 flex flex-wrap">
        {processedDatas.map((data) => (
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
              <Button variant="outlined" color="info" endIcon={<ContentCopy />} onClick={() => Bus.emit("create.show", data)}>
                Duplicate
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
