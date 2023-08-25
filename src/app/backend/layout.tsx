"use client"
import { ContactPage, Menu } from "@mui/icons-material"
import Link from "next/link"
import classNames from "classnames"
import { useState } from "react"

export default ({ children }: { children: React.ReactNode }) => {
  const [showSmMenu, setShowSmMenu] = useState(false)
  return (
    <>
      <header className="header fixed h-16 p-4 w-full bg-slate-800 text-gray-100 flex">
        <Menu
          className="absolute hidden sm:block"
          onClick={() => {
            setShowSmMenu(!showSmMenu)
          }}
        />
        <div className="title text-lg flex-1 flex sm:justify-center">Tacoko</div>
      </header>
      <div className="pt-16 flex">
        <div
          className={classNames("menu py-4 w-48 h-screen max-h-screen overflow-y-auto bg-slate-300 sm:fixed sm:-left-full", {
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
      </div>
    </>
  )
}
