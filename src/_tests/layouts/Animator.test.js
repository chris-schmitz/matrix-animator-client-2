import Animator from "../../layouts/Animator";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";


//  TODO: move these helpers out to a test utility module
function setPaletteColor(color, palettePickerNumber) {
    const palette = screen.getAllByTestId("color-picker")[palettePickerNumber]
    fireEvent.change(palette, {target: {value: color}})
}

function setActivePalettePicker(pickerIndex) {
    const pickerActivator = screen.getAllByTestId("color-picker-activator")[pickerIndex]
    fireEvent.click(pickerActivator)
}

function clickPixel(gridIndex) {
    const pixel = screen.getAllByTestId("pixel")[gridIndex]
    fireEvent.mouseDown(pixel)
    fireEvent.mouseUp(pixel)
}

function expectPixelToHaveColor(gridIndex, expectedColor) {
    const pixelElement = screen.getAllByTestId("pixel")[gridIndex]
    expect(pixelElement).toHaveStyle({backgroundColor: expectedColor})
}


describe("Animator", () => {
    test("can set an active color in the first palette and use it to color pixels", async () => {
        const targetColor = "#000000"
        render(<Animator/>)
        setPaletteColor(targetColor, 0)

        clickPixel(0)

        await waitFor(() => {
            expectPixelToHaveColor(0, targetColor)
        })
    })

    test("can use different colors in the palette color pickers", async () => {
        const targetColor = "#CF10A3"

        render(<Animator/>)
        setPaletteColor(targetColor, 2)
        setActivePalettePicker(2)

        clickPixel(0)

        await waitFor(() => {
            expectPixelToHaveColor(0, targetColor)
        })
    })
})