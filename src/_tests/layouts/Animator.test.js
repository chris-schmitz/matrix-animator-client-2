import Animator from "../../layouts/Animator";
import {render, screen} from "@testing-library/react";

describe("Animator", () => {
    // ? What is th flow I want to test?
    // * think of this less at a "cover this function" level and instead at a "this is what the user is doing" level
    // * make helpers for repetitive processes (e.g. assertPixelIsColor(index, color))
    // * https://github.com/testing-library/user-event


    test("It can update a frame's grid colors", () => {
        // ! for `handleAnimationFrameUpdate`
        // ? At a high level and from a user's perspective, what are we trying to do/test?
        // * when you click on a portion of the grid we expect the color for the given pixel
        // * to be updated
        // ? the thing is, while the state and the functions are at this level, everything
        // ? happens in and across multiple sub components

        render(<Animator/>)
        // ? The grid being rendered is from a child component, should we be doing that??
        const initialGridState = screen.getByTestId("grid")


    })
})