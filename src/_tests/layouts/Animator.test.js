import Animator from "../../layouts/Animator";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";


function setPaletteColor(color, palettePickerNumber) {
    const palette = screen.getAllByTestId("color-picker")[palettePickerNumber]
    fireEvent.change(palette, {target: {value: color}})
}

//  TODO: move out to a test utility module
function clickPixel(gridIndex) {
    const pixel = screen.getAllByTestId("pixel")[gridIndex]
    userEvent.click(pixel)
}

function expectPixelToHaveColor(gridIndex, expectedColor) {
    const pixelElement = screen.getAllByTestId("pixel")[gridIndex]
    expect(pixelElement).toHaveStyle({backgroundColor: expectedColor})
}


describe("Animator", () => {
    test("can set an active color in the first palette and use it to color pixels", async () => {
        const targetColor = "#FF00FF"

        render(<Animator/>)
        setPaletteColor(targetColor, 1)
        // setActivePalettePicker(1)

        clickPixel(0)

        await waitFor(() => {
            expectPixelToHaveColor(0, targetColor)
        })
    })

})