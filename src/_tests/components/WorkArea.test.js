import {render, screen} from "@testing-library/react";
import WorkArea from "../../components/WorkArea";

import {AnimationFrame} from "../../domain/AnimationFrame";
import {noop} from "../test_helpers/testHelpers";


describe("WorkArea", () => {

    test("WorkArea contains grid", () => {
        const frame = new AnimationFrame(0, Array(8 * 8).fill("#0011FF"))
        render(<WorkArea animationFrame={frame} frameHeight="8" frameWidth="8" handleAnimationFrameUpdate={noop}/>)

        const element = screen.getByTestId("workarea")
        const gridElement = element.getElementsByClassName("grid")[0]

        expect(gridElement).toBeInTheDocument()
        expect(gridElement.querySelector(".pixel")).toHaveStyle({"backgroundColor": "#0011FF"})
    })

    test("WorkArea contains a color picker", () => {
        const frame = new AnimationFrame(0, Array(8 * 8).fill("#0011FF"))
        render(<WorkArea animationFrame={frame} frameHeight="8" frameWidth="8" handleAnimationFrameUpdate={noop}/>)

        const elements = screen.getAllByTestId("color-picker")

        elements.forEach(element => {
            expect(element).toBeInTheDocument()
            expect(element).toHaveAttribute("type", "color")
        })
    })


})