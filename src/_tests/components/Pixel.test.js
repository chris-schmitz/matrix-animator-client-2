import {render} from '@testing-library/react'

import Pixel from '../../components/Pixel'

describe("Pixel", () => {
    test("it renders", () => {
        render(<Pixel/>)

        const element = document.getElementsByClassName("pixel")

        expect(element[0]).toBeInTheDocument()
    })

    test("it can set the background color based on prop data", () => {
        render(<Pixel color="red"/>,)

        const element = document.getElementsByClassName("pixel")[0]

        expect(element).toHaveStyle("background-color: red")
    })

    // test("on click it can assign a specific color", () => {
    //     render(<Pixel/>)
    //     const element = document.getElementsByClassName("pixel")[0]
    //
    //     fireEvent(element, new MouseEvent('click'))
    // })
})
