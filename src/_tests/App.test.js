// const customGlobal = global
// customGlobal.URL = {
//     createObjectURL: jest.fn(),
//     toString: jest.fn()
// }

import {clickSaveAnimationButton, mockFetchCall} from "./test_helpers/testHelpers";
import {render, screen, waitFor, waitForElementToBeRemoved} from "@testing-library/react";
import App from "../App";

function setUrl(url) {
    global.URL = {
        toString: jest.fn(() => url)
    }
}

describe("App", () => {
    it("displays a notification when an animation is saved", async () => {
        mockFetchCall(123)

        render(<App/>)

        expect(screen.queryByTestId("notification")).not.toBeInTheDocument()
        clickSaveAnimationButton()

        // ! WHY IS THE TIMING ON THIS NOT WORKING NOW?!?!?!??!
        await waitFor(async () => {
            expect(screen.queryByTestId("notification")).toHaveTextContent("Animation Saved")
            await waitForElementToBeRemoved(
                () => screen.queryByTestId("notification"),
                {timeout: 10000, interval: 1000}
            )
            expect(screen.queryByTestId("notification")).not.toBeInTheDocument()
        })
    })

    it.skip("can load a specific animation when routed to an animation id", () => {
    })
    it.skip("can load a blank animation when routed to animator without an animation id", () => {
    })
    it.skip("can load a list of stored animations when routed to the list view", () => {
    })
})
