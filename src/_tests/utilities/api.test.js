import {deleteAnimation, getAnimation, getAnimationList, saveAnimation, updateAnimation} from "../../utilities/apis"
import {buildAMatrixAnimationInstance, mockFetchCall} from "../test_helpers/testHelpers";


describe("animations api", () => {
    it("can save an animation", async () => {
        const expectedId = 123
        mockFetchCall(expectedId)
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

    it("can update an animation", async () => {
        const expectedId = 123
        mockFetchCall(expectedId)
        const animation = buildAMatrixAnimationInstance()
        animation.id = expectedId

        const actualId = await updateAnimation(animation)

        expect(fetch).toHaveBeenCalledWith(
            `http://localhost:8080/rest/animations/${expectedId}`,
            {
                "method": "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(animation)
            })
        expect(actualId).toBe(expectedId)
    })

    it("can delete an animation by ID", async () => {
        const animationId = 123
        mockFetchCall()

        await deleteAnimation(animationId)

        expect(fetch).toHaveBeenCalledWith(
            `http://localhost:8080/rest/animations/${animationId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
    })

    it("if a delete call fails, an exception is thrown", async () => {

        const animationId = 123
        mockFetchCall({}, 500)

        await expect(deleteAnimation(animationId)).rejects.toThrow("There was an error when trying to delete the animation")

        expect(fetch).toHaveBeenCalledWith(
            `http://localhost:8080/rest/animations/${animationId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
    })

    it("can get an animation by ID", async () => {
        const animationId = 123
        const expected = buildAMatrixAnimationInstance()
        mockFetchCall(expected)

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
        mockFetchCall(expected)

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