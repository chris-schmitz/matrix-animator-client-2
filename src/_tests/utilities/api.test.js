import { saveAnimation } from "../../utilities/apis"
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
})