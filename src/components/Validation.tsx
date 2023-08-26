import ErrorMessage from "@/components/ErrorMessage"
import { useEffect, useState } from "react"

export default ({ title, value, rules, onChange, errorMessage }: any) => {
  const [myValue, setMyValue] = useState("")
  useEffect(() => setMyValue(value), [value])
  return (
    <div className="mb-3">
      <label>
        <span className="title text-lg mr-3">{title}</span>
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-md"
          {...rules}
          value={myValue}
          onChange={(e) => {
            onChange(e.target.value)
          }}
        />
      </label>
      <ErrorMessage message={errorMessage} />
    </div>
  )
}
