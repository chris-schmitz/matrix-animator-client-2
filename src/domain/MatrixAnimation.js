import {AnimationFrame} from "./AnimationFrame";
import {serialNumbers} from "../utilities/ListSerialNumberGenerator";

export class MatrixAnimation {
    constructor(title, userId, height, width, speed, frames, id) {
        this.title = title
        this.userId = userId
        this.height = height
        this.width = width
        this.speed = speed
        this.frames = frames ? frames : [new AnimationFrame(serialNumbers.getSerialNumber(), Array(8 * 8).fill("#000000"))]
        this.id = id
    }

    static newBlankAnimation() {
        return new MatrixAnimation("...", 0, 8, 8, 300, null)
    }

    static fromObject({title, userId, height, width, speed, frames, id} = animationData) {
        return new MatrixAnimation(title, userId, height, width, speed, frames, id)
    }

    // * Note that while we need to use the string representation of the hex value on the front end,
    // * that string representation is only necessary for the front end. Back end doesn't care what it's storing
    // * and the microcontroller is going to take int values. We don't want the microcontroller doing the conversions
    // * b/c there we're worried about speed, and there's not really a good reason to bake that specific business logic
    // * into the back end, so we're doing the conversion here.
    toApiPayload() {
        const frames = this.frames
            .map(frame => frame.gridColors)
            .map(gridColors => gridColors.map(stringHex => parseInt(stringHex.slice(1), 16)))
            .map((gridColors, i) => ({positionInAnimation: i, pixels: gridColors}))
        return {...this, frames}
    }
}
