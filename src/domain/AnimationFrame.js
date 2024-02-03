export class AnimationFrame {
    constructor(id, height, width, gridColors) {
        this.id = id
        this.height = height
        this.width = width
        this.gridColors = gridColors
    }
}

export class AnimationRequestPayload {
    constructor(title, userId, height, width, speed, animationFrames, id) {
        this.title = title
        this.userId = userId
        this.height = height
        this.width = width
        this.speed = speed
        this.frames = this.toApiPayload(animationFrames)
        this.id = id
    }

    // TODO: consider a refactoring
    // * either at the client or API level so we don't have to do this kind of conversion.
    // * it's most likely an API conversion b/c the front end is the part that's actually dependent 
    // * on the structure
    toApiPayload(animationFrames) {
        return animationFrames
            .map(frame => frame.gridColors)
            .map(gridColors => gridColors.map(stringHex => parseInt(stringHex.slice(1), 16)))
            .map((gridColors, i) => {
                return {positionInAnimation: i, pixels: gridColors}
            })
    }

}
