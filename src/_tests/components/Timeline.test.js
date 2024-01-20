import {fireEvent, render, screen} from '@testing-library/react'
import Timeline from "../../components/Timeline";
import {AnimationFrame} from "../../domain/AnimationFrame";

describe("Timeline", () => {
    it("can render an animation frame", () => {
        const frames = [new AnimationFrame(0, 8, 8, Array(8 * 8).fill("#FFFFFF"))]

        render(<Timeline frames={frames}/>)

        const timelineElement = screen.getByTestId("timeline")
        const frameElements = timelineElement.querySelector('[data-testid="grid"]')
        expect(frameElements).toBeInTheDocument()
    })

    it("can send the selected frame id when grid is clicked", () => {
        const gridSelectionHandler = jest.fn()
        const frames = [
            new AnimationFrame(0, 1, 1, []),
            new AnimationFrame(1, 1, 1, [])
        ]

        const {getAllByTestId} = render(<Timeline frames={frames} handleTimelineGridSelection={gridSelectionHandler}/>)

        const gridList = getAllByTestId("grid")
        fireEvent.click(gridList[1])
        expect(gridSelectionHandler).toBeCalledWith(1)
    })
})