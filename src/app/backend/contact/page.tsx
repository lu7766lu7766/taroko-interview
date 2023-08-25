"use client"
import Button from "@mui/material/Button"
import { AddCircleOutline } from "@mui/icons-material"
import { Bus } from "../../lib/EventBus"
import Card from "@mui/material/Card"
import contactStyle from "./style.module.sass"
import classNames from "classnames"

export default () => {
  return (
    <>
      <div className="title text-2xl mb-2">Contact List</div>
      <Button variant="outlined" endIcon={<AddCircleOutline />} onClick={() => Bus.emit("modal.show")}>
        Add
      </Button>
      <div className="container mt-4 flex flex-wrap">
        <Card className={classNames(contactStyle.card)}>hello</Card>
        <Card className={classNames(contactStyle.card)}>hello</Card>
        <Card className={classNames(contactStyle.card)}>hello</Card>
      </div>
    </>
  )
}
