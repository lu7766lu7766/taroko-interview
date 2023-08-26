import { render, screen } from "@testing-library/react"
import Home from "../src/app/backend/page"
import "@testing-library/jest-dom"

describe("Home", () => {
  it("welcome", () => {
    const { container } = render(<Home />)

    expect(screen.queryByText(/welcome/i)).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })
})
