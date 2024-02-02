//  TODO: move these helpers out to a test utility module
import {fireEvent, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

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


export function expectPixelToHaveColor(gridIndex, expectedColor) {
    const pixelElement = screen.getAllByTestId("pixel")[gridIndex]
    expect(pixelElement).toHaveStyle({backgroundColor: expectedColor})
}

export function mockFetchSuccessfulResponse(content) {
    global.fetch = jest.fn(() => {
        return Promise.resolve({
            json: () => Promise.resolve(content),
            text: () => Promise.resolve(content)
        })
    })
}