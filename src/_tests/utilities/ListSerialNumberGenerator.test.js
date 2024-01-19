import {serialNumbers} from "../../utilities/ListSerialNumberGenerator";

describe("ListSerialNumberGenerator", () => {
    // ? do we need to prove anything more than this? We can spit out numbers that are unique and it's
    // ? per instance of the tool (within reason, we're not worried about rollover at the moment), and
    // ? it's a singleton so the numbers would be unique anywhere it's imported (which also doesn't really matter
    // ? considering this is just for react list rendering purposes).
    it("Can return unique numbers from a singleton", () => {
        const someSerialNumbers = []

        const sn1 = someSerialNumbers.push(serialNumbers.getSerialNumber())
        const sn2 = someSerialNumbers.push(serialNumbers.getSerialNumber())
        const sn3 = someSerialNumbers.push(serialNumbers.getSerialNumber())

        expect(sn1).not.toEqual(sn2)
        expect(sn1).not.toEqual(sn3)
        expect(sn2).not.toEqual(sn3)
    })
})