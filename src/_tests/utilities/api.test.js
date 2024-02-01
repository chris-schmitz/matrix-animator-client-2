import { getAnimation, saveAnimation } from "../../utilities/apis"
import { AnimationFrame, AnimationRequestPayload } from "../../domain/AnimationFrame"

function mockFetchSuccessfulResponse(content) {
    global.fetch = jest.fn(() => {
        return Promise.resolve({
            json: () => Promise.resolve(content),
            text: () => Promise.resolve(content)
        })
    })
}

describe("animations api", () => {
    it("can save an animation", async () => {
        const expectedId = 123
        mockFetchSuccessfulResponse(expectedId)
        const frames = [
            new AnimationFrame(0, 8, 8, [1])
        ]
        const animation = new AnimationRequestPayload(
            "test",
            1,
            frames[0].height,
            frames[0].width,
            frames[0].speed,
            frames
        )

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
        const expected = new AnimationRequestPayload("test animation", 3, 1, 1, 1, [new AnimationFrame(1, 1, 1, [0xFFFFFF])], animationId)
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

    it("can get a list of animations", async () => { })
})