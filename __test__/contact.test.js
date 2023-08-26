import { render, fireEvent, screen } from "@testing-library/react"
import Contact from "../src/app/backend/contact/page"
import "@testing-library/jest-dom"

describe("Contact", () => {
  it("create modal", () => {
    const { container } = render(<Contact />)
    fireEvent.click(screen.getByText(/add/i))
    expect(screen.getByText("create")).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
  it("create contact", () => {
    const { container } = render(<Contact />)
    fireEvent.click(screen.getByText(/add/i))
    fireEvent.change(screen.getByLabelText("First Name"), { target: { value: "test first name" } })
    fireEvent.change(screen.getByLabelText("Last Name"), { target: { value: "test last name" } })
    fireEvent.change(screen.getByLabelText("Job"), { target: { value: "test job" } })
    fireEvent.change(screen.getByLabelText("Description"), { target: { value: "test description" } })
    fireEvent.click(screen.getByText(/save/i))
    expect(screen.getByText("create success")).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
