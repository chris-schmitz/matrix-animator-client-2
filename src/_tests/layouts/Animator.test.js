import Animator from "../../layouts/Animator";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {
    buildAMatrixAnimationInstance,
    clickPixel,
    clickSaveAnimationButton,
    expectPixelToHaveColor,
    mockFetchSuccessfulResponse,
    noop,
    setActivePalettePicker,
    setPaletteColor
} from "../test_helpers/testHelpers";
import {notificationDismissTypes} from "../../App";


// TODO: add in a helper method to make a default animation instance and pop that into each of the tests
// TODO: also consider refactoring the code to pull the frame height and width out of the AnimationFrame object and have the components refer to the MatrixAnimation height and width

describe("Animator", () => {

    test("can set an active color in the first palette and use it to color pixels", async () => {
        const targetColor = "#000000"
        render(<Animator animation={buildAMatrixAnimationInstance()} setAnimation={noop} setNotification={noop}/>)
        await setPaletteColor(targetColor, 0)

        await clickPixel(0)

        expectPixelToHaveColor(0, targetColor)
    })

    test("can use different colors in the palette color pickers", async () => {
        const targetColor = "#CF10A3"

        render(<Animator animation={buildAMatrixAnimationInstance()} setAnimation={noop} setNotification={noop}/>)
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
        const animation = buildAMatrixAnimationInstance()
        const notificationMock = jest.fn()
        render(<Animator animation={animation} setAnimation={noop} setNotification={notificationMock}/>)
        await clickSaveAnimationButton()

        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:8080/rest/animations",
            {
                "method": "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(animation.toApiPayload())
            })
        await waitFor(() => {
            expect(notificationMock).toHaveBeenCalledWith({
                dismissType: notificationDismissTypes.AUTO_DISMISS,
                message: "Animation Saved",
                show: true
            })
        })
    })

    test("if an animation has an id, the update endpoint is called", async () => {
        mockFetchSuccessfulResponse(123)
        const animation = buildAMatrixAnimationInstance()
        animation.id = 123
        const notificationMock = jest.fn()
        render(<Animator animation={animation} setAnimation={noop} setNotification={notificationMock}/>)

        await clickSaveAnimationButton()

        await clickSaveAnimationButton()

        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:8080/rest/animations",
            {
                "method": "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(animation.toApiPayload())
            })
        await waitFor(() => {
            expect(notificationMock).toHaveBeenCalledWith({
                dismissType: notificationDismissTypes.AUTO_DISMISS,
                message: "Animation Saved",
                show: true
            })
        })
    })
})