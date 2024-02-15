import Modal from "./Modal";
import {render, screen} from "@testing-library/react";
import {clickModalOkButton} from "../test_helpers/testHelpers";
import ModalButtonTypes from "../../domain/ModalButtonTypes";

describe("Modal", () => {
    it("can display a modal with a custom message and handle a result", () => {
        const resultMock = jest.fn()

        render(<Modal message="This is a test of the modal" handleResult={resultMock}/>)

        const element = screen.getByTestId("modal")
        expect(element).toBeInTheDocument()
        expect(element).toHaveTextContent("This is a test of the modal")

        clickModalOkButton()

        expect(resultMock).toBeCalledWith({buttonClicked: ModalButtonTypes.OK})
    })
    //      TODO: replace the browser confirmation with this custom one
})