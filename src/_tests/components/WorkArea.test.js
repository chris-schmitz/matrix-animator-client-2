import {render, screen} from "@testing-library/react";
import WorkArea from "../../components/WorkArea";

import {AnimationFrame} from "../../domain/AnimationFrame";


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


})