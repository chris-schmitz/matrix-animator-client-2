import {getAnimationList} from "../__mocks__/utilities/apis";
import {render, waitFor} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import AnimationsList from "../../layouts/AnimationsList";


jest.mock("../../utilities/apis")

describe("AnimationsList", () => {
    it("can load a list of animations from the server", async () => {
        const expectedAnimationList = [
            {id: 1, title: "test animation 1"},
            {id: 2, title: "test animation 2"},
        ]
        getAnimationList.mockResolvedValue(expectedAnimationList)

        const {getByText} = render(
            <MemoryRouter>
                <DataRouter>
                    <AnimationsList/>
                </DataRouter>
            </MemoryRouter>
        )

        await waitFor(() => {
            expect(getAnimationList).toHaveBeenCalled()
        })

        expectedAnimationList.forEach(animation => {
            expect(getByText(animation.title)).toBeInTheDocument()
        })


    })
    it("Still renders even if nothing is returned from the server", async () => {
    })
})