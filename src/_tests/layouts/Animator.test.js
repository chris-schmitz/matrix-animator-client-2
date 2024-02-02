import Animator from "../../layouts/Animator";
import {fireEvent, render, screen} from "@testing-library/react";
import {
    clickNewFrameButton,
    clickPixel,
    clickSaveAnimationButton,
    expectPixelToHaveColor,
    mockFetchSuccessfulResponse,
    setActivePalettePicker,
    setPaletteColor
} from "../test_helpers/testHelpers";
import {AnimationFrame, AnimationRequestPayload} from "../../domain/AnimationFrame";


describe("Animator", () => {

    test("can set an active color in the first palette and use it to color pixels", async () => {
        const targetColor = "#000000"
        render(<Animator/>)
        await setPaletteColor(targetColor, 0)

        await clickPixel(0)

        expectPixelToHaveColor(0, targetColor)
    })

    test("can use different colors in the palette color pickers", async () => {
        const targetColor = "#CF10A3"

        render(<Animator/>)
        await setPaletteColor(targetColor, 2)
        await setActivePalettePicker(2)

        await clickPixel(0)

        expectPixelToHaveColor(0, targetColor)
    })

    test("it can preview the animation", () => {
        function clickAnimationPreviewButton() {
            const buttonElement = screen.getAllByTestId("animation-preview-play-pause-button")
            fireEvent.click(buttonElement)
        }
    })

    test("Can save an animation", async () => {
        mockFetchSuccessfulResponse(123)
        render(<Animator/>)
        await clickPixel(0)
        await clickNewFrameButton()
        await clickPixel(1)
        await clickNewFrameButton()
        await clickPixel(2)
        let gridColors1, gridColors2, gridColors3
        gridColors1 = gridColors2 = gridColors3 = Array(64).fill("#000000")
        gridColors1[0] = "#FF00FF"
        gridColors2[1] = "#FF00FF"
        gridColors3[2] = "#FF00FF"
        const expectedAnimation = new AnimationRequestPayload(
            "",
            0,
            8,
            8,
            300,
            [
                new AnimationFrame(0, 8, 8, gridColors1),
                new AnimationFrame(0, 8, 8, gridColors2),
                new AnimationFrame(0, 8, 8, gridColors3),
            ]
        )

        await clickSaveAnimationButton()

        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:8080/rest/animations",
            {
                "method": "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(expectedAnimation)
            })
    })
})