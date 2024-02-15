//  TODO: move these helpers out to a test utility module
import {fireEvent, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import {MatrixAnimation} from "../../domain/MatrixAnimation";
import {AnimationFrame} from "../../domain/AnimationFrame";

const user = userEvent.setup()

export function setPaletteColor(color, palettePickerNumber) {
    const palette = screen.getAllByTestId("color-picker")[palettePickerNumber]
    fireEvent.change(palette, {target: {value: color}})
}

export async function setActivePalettePicker(pickerIndex) {
    const pickerActivator = screen.getAllByTestId("color-picker-activator")[pickerIndex]
    fireEvent.click(pickerActivator)
    // TODO: ask julie -> When I try to switch to this I get act warnings in `can use different colors in the palette color pickers`, but I'm not sure why
    // await user.click(pickerActivator)
}

export function clickPixel(gridIndex) {
    const pixel = screen.getAllByTestId("pixel")[gridIndex]
    fireEvent.mouseDown(pixel)
    fireEvent.mouseUp(pixel)
}

export function clickNewFrameButton() {
    const button = screen.getByTestId("new-frame-button")
    fireEvent.click(button)
}

export function clickSaveAnimationButton() {
    const button = screen.getByTestId("save-animation-button")
    fireEvent.click(button)
}

export function clickDeleteAnimationButton() {
    fireEvent.click(screen.getByTestId("delete-animation-button"))
}

export function clickModalOkButton() {
    fireEvent.click(screen.getByTestId("modal-ok-button"))
}


export function expectPixelToHaveColor(gridIndex, expectedColor) {
    const pixelElement = screen.getAllByTestId("pixel")[gridIndex]
    expect(pixelElement).toHaveStyle({backgroundColor: expectedColor})
}

export async function mockFetchCall(returnContent, statusCode = 200) {
    global.fetch = jest.fn(() => {
        return Promise.resolve({
            status: statusCode,
            json: () => Promise.resolve(returnContent),
            text: () => Promise.resolve(returnContent)
        })
    })
}

export function buildAMatrixAnimationInstance(title) {
    return new MatrixAnimation(
        title ? title : "some title",
        0,
        8,
        8,
        300,
        [
            new AnimationFrame(0, ["#FFFFFF"])
        ]
    )
}

export function confirmationModalVisible(expectedMessage) {
    const modal = screen.getByTestId("modal-message")
    expect(modal).toBeInTheDocument()
    expect(modal).toHaveTextContent(expectedMessage)
}

export function noop() {
}