import {fireEvent, render, screen} from "@testing-library/react";
import WorkArea from "../components/WorkArea";

import {AnimationFrame} from "../domain/AnimationFrame";


describe("WorkArea", () => {

    test("WorkArea contains grid", () => {
        const frame = new AnimationFrame(0, 8, 8, Array(8 * 8).fill("#0011FF"))
        render(<WorkArea animationFrame={frame} handleAnimationFrameUpdate={() => {
        }}/>)

        const element = screen.getByTestId("workarea")
        const gridElement = element.getElementsByClassName("grid")[0]

        expect(gridElement).toBeInTheDocument()
        expect(gridElement.querySelector(".pixel")).toHaveStyle({"backgroundColor": "#0011FF"})
    })

    test("WorkArea contains a color picker", () => {
        const frame = new AnimationFrame(0, 8, 8, Array(8 * 8).fill("#0011FF"))
        render(<WorkArea animationFrame={frame} handleAnimationFrameUpdate={() => {
        }}/>)

        const element = document.getElementsByTagName("input")[0]

        expect(element).toBeInTheDocument()
        expect(element).toHaveAttribute("type", "color")
    })

    test("when a color is selected, the WorkArea's active color is set", () => {
        const targetColor = "#FF00FF"

        const renderResult = render(<WorkArea/>)
        const colorPickerElement = screen.getByTestId("color-picker")
        const intialColor = colorPickerElement.value
        fireEvent.change(colorPickerElement, {target: {value: targetColor}})

        //     todo: figure out how this would be asserted
        //     ? we're not displaying active color anywhere, it's just what will get used if a pixel is clicked. can we only
        //     ? test this as an integration test where we then fire a click event on a pixel and assert against it??
        //     ? do we mock out a pixel, click the mock, and assert it's called with the active color???
    })
})