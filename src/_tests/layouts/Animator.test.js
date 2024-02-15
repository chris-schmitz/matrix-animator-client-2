import Animator from "../../layouts/Animator"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import {
    buildAMatrixAnimationInstance,
    clickDeleteAnimationButton,
    clickPixel,
    clickSaveAnimationButton,
    confirmationModalVisible,
    expectPixelToHaveColor,
    mockFetchCall,
    noop,
    setActivePalettePicker,
    setPaletteColor,
    clickDeleteFrameButton,
    clickModalOkButton
} from "../test_helpers/testHelpers"
import { notificationDismissTypes } from "../../App"
import { MatrixAnimation } from "../../domain/MatrixAnimation"


// TODO: add in a helper method to make a default animation instance and pop that into each of the tests
// TODO: also consider refactoring the code to pull the frame height and width out of the AnimationFrame object and have the components refer to the MatrixAnimation height and width

describe("Animator", () => {

    describe("action buttons", () => {
        it("can delete an animation frame", async () => {
            render(<Animator
                animation={MatrixAnimation.newBlankAnimation()}
                setAnimation={noop}
                setNotification={noop}
            />)

            clickPixel(0)

            expect(screen.getAllByTestId("pixel")[0]).toHaveStyle("background: #FF00FF")

            clickDeleteFrameButton()

            expect(screen.getByTestId("modal")).toBeInTheDocument()

            clickModalOkButton()

            expect(screen.getAllByTestId("pixel")[0]).toHaveStyle("background: #000000")
        })
    })

    test("can set an active color in the first palette and use it to color pixels", async () => {
        const targetColor = "#000000"
        render(<Animator animation={buildAMatrixAnimationInstance()} setAnimation={noop} setNotification={noop} />)
        await setPaletteColor(targetColor, 0)

        await clickPixel(0)

        expectPixelToHaveColor(0, targetColor)
    })

    test("can use different colors in the palette color pickers", async () => {
        const targetColor = "#CF10A3"

        render(<Animator animation={buildAMatrixAnimationInstance()} setAnimation={noop} setNotification={noop} />)
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
        mockFetchCall(123)
        const animation = buildAMatrixAnimationInstance()
        const notificationMock = jest.fn()
        render(<Animator animation={animation} setAnimation={noop} setNotification={notificationMock} />)
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


    test("Can delete an animation", async () => {
        mockFetchCall(123)
        const animation = buildAMatrixAnimationInstance()
        animation.id = 555
        const notificationMock = jest.fn()
        render(<Animator animation={animation} setAnimation={noop} setNotification={notificationMock} />)
        await clickPixel(0)
        await clickDeleteAnimationButton()

        confirmationModalVisible("Are you sure you want to delete this animation?")

        clickModalOkButton()

        expect(fetch).toHaveBeenCalledWith(
            `http://localhost:8080/rest/animations/${animation.id}`,
            {
                "method": "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
        await waitFor(() => {
            expect(notificationMock).toHaveBeenCalledWith({
                dismissType: notificationDismissTypes.AUTO_DISMISS,
                message: "Animation Deleted",
                show: true
            })
        })
    })

    test("if an animation has an id, the update endpoint is called", async () => {
        mockFetchCall(123)
        const animation = buildAMatrixAnimationInstance()
        animation.id = 123
        const notificationMock = jest.fn()
        render(<Animator animation={animation} setAnimation={noop} setNotification={notificationMock} />)

        clickSaveAnimationButton()


        expect(fetch).toHaveBeenCalledWith(
            `http://localhost:8080/rest/animations/${animation.id}`,
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