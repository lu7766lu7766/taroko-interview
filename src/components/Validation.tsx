import ErrorMessage from "@/components/ErrorMessage"
import { useForm } from "react-hook-form"

export default ({ title, value, rules, onChange, errorMessage }: any) => {
  return (
    <>
      <div className="mb-3">
        <label>
          <span className="title text-lg mr-3">{title}</span>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-md"
            {...rules}
            value={value}
            onChange={(e) => {
              onChange(e.target.value)
            }}
          />
        </label>
        <ErrorMessage message={errorMessage} />
      </div>
    </>
  )
}
