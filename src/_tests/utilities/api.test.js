import {getAnimation, getAnimationList, saveAnimation} from "../../utilities/apis"
import {buildAMatrixAnimationInstance, mockFetchSuccessfulResponse} from "../test_helpers/testHelpers";


describe("animations api", () => {
    it("can save an animation", async () => {
        const expectedId = 123
        mockFetchSuccessfulResponse(expectedId)
        const animation = buildAMatrixAnimationInstance()

        const actualId = await saveAnimation(animation)

        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:8080/rest/animations",
            {
                "method": "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(animation)
            })
        expect(actualId).toBe(expectedId)
    })

    it("can get an animation by ID", async () => {
        const animationId = 123
        const expected = buildAMatrixAnimationInstance()
        mockFetchSuccessfulResponse(expected)

        const actual = await getAnimation(animationId)

        expect(fetch).toHaveBeenCalledWith(
            `http://localhost:8080/rest/animations/${animationId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        expect(actual).toBe(expected)
    })

    it("can get a list of animations", async () => {
        const expected = [
            buildAMatrixAnimationInstance({title: "animation 1"}),
            buildAMatrixAnimationInstance({title: "animation 2"}),
            buildAMatrixAnimationInstance({title: "animation 3"}),
        ]
        mockFetchSuccessfulResponse(expected)

        const actual = await getAnimationList()

        expect(fetch).toHaveBeenCalledWith(
            `http://localhost:8080/rest/animations`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        expect(actual).toBe(expected)
    })
})