"use client"
import { ContactPage, Menu } from "@mui/icons-material"
import Link from "next/link"
import classNames from "classnames"
import { useEffect, useState } from "react"
import { Snackbar, Alert, AlertColor } from "@mui/material"
import { Bus } from "@/lib/EventBus"

export default ({ children }: { children: React.ReactNode }) => {
  const [showSmMenu, setShowSmMenu] = useState(false)
  const [notification, setNotification] = useState<{ show: boolean; type: AlertColor; message: string }>({
    show: false,
    type: "success",
    message: "",
  })
  const closeNitication = () => setNotification({ ...notification, show: false })
  useEffect(() => {
    Bus.on("notification.success", (message: string) => {
      setNotification({
        show: true,
        type: "success",
        message,
      })
    })
    Bus.on("notification.error", (message: string) => {
      setNotification({
        show: true,
        type: "error",
        message,
      })
    })
    return () => {
      Bus.off("notification.success")
      Bus.off("notification.error")
    }
  }, [])
  return (
    <>
      <header className="header fixed top-0 h-16 p-4 w-full bg-slate-800 text-gray-100 flex">
        <Menu
          className="absolute hidden sm:block"
          onClick={() => {
            setShowSmMenu(!showSmMenu)
          }}
        />
        <div className="title text-lg flex-1 flex sm:justify-center">Tacoko</div>
      </header>
      <div className="pt-16 flex min-h-screen">
        <div
          className={classNames("menu py-4 w-48 overflow-y-auto bg-slate-300 sm:fixed sm:-left-full", {
            active: showSmMenu,
          })}
        >
          <ul>
            <li className="bg-slate-400 p-2 hover:bg-slate-500">
              <Link href={"/backend/contact"}>
                <ContactPage className="mr-2" />
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="main p-4 flex-1">{children}</div>
        <Snackbar open={notification.show} autoHideDuration={3000} onClose={closeNitication}>
          <Alert onClose={closeNitication} severity={notification.type} sx={{ width: "100%" }}>
            {notification.message}
          </Alert>
        </Snackbar>
      </div>
    </>
  )
}
