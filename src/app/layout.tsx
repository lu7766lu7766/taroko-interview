import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "element-theme-default"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TarokoInterview",
  description: "Generated by create next app",
}

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="header fixed p-4 w-full bg-slate-800 text-gray-100 flex">
          <div className="title flex-1 text-lg">Contact</div>
        </header>
        {children}
      </body>
    </html>
  )
}
