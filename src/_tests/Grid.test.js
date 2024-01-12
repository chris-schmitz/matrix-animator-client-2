import Grid from "../components/Grid";
import {render} from "@testing-library/react";

describe("Grid", () => {
    test("it renders", () => {
        const height = 8
        const width = 8
        render(<Grid height={height} width={width} gridColors={[]} handlePixelClick={() => {
        }}/>)

        const element = document.getElementsByClassName("grid")[0]

        expect(element).toBeInTheDocument()
        expect(element.children.length).toBe(height)
        Array.from(element.children).forEach(row => {
            expect(row).toHaveClass("row")
            expect(row.children.length).toBe(width)
            Array.from(row.children).forEach(column => {
                expect(column).toHaveClass("pixel")
            })
        })
    })

    test("it can use state passed to it to render pixel colors in the appropriate locations", () => {

    })
})
