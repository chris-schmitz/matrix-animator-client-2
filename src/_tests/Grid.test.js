import {render} from '@testing-library/react'
import Grid from "../components/Grid";


describe("Grid", () => {
    test("it renders", () => {
        const height = 8
        const width = 8
        render(<Grid height={height} width={width}/>)

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

})
