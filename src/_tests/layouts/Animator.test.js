import Animator from "../../layouts/Animator";
import {render} from "@testing-library/react";
import {clickPixel, expectPixelToHaveColor, setActivePalettePicker, setPaletteColor} from "../test_helpers/testHelpers";


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
})