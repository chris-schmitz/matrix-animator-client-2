// const customGlobal = global
// customGlobal.URL = {
//     createObjectURL: jest.fn(),
//     toString: jest.fn()
// }

function setUrl(url) {
    global.URL = {
        toString: jest.fn(() => url)
    }
}

describe("App", () => {
    it.skip("can load a specific animation when routed to an animation id", () => {
    })
    it.skip("can load a blank animation when routed to animator without an animation id", () => {
    })
    it.skip("can load a list of stored animations when routed to the list view", () => {
    })
})
