import {render} from "@testing-library/react";
import WorkArea from "../components/WorkArea";


describe("WorkArea", () => {
    test("WorkArea renders", () => {
        render(<WorkArea/>)

        const element = document.getElementsByClassName("work-area")[0]

        expect(element).toBeInTheDocument()
    })

    test("WorkArea contains grid", () => {
        render(<WorkArea/>)

        const element = document.getElementsByClassName("work-area")[0]
        const gridElement = element.getElementsByClassName("grid")[0]

        expect(gridElement).toBeInTheDocument()
    })

    test("WorkArea contains a color picker", () => {
        render(<WorkArea/>)

        const element = document.getElementsByTagName("input")[0]

        expect(element).toBeInTheDocument()
        expect(element).toHaveAttribute("type", "color")
    })

    test("when a color is selected, the WorkArea's active color is set", () => {
        
    })
})