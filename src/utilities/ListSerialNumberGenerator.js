// TODO: consider this approach, good? bad? better way?
// * I want a way of serializing the frames independent of their array index (b/c eventually we'll allow moving frames around),
// * the frames themselves don't have IDs when stored in the DB, and they don't really _need_ ids except for avoiding collisions
// * in react list rendering. In that sense, we don't really need UUIDs and I don't know that we need to add serial numbers into
// * the persisted data structure (what benefit would that give us?), so really all we need are numbers that we know aren't going
// * to collide. So in that sense, we can just make a singleton that keeps spitting out consecutive integers and as long as everything
// * that needs an id calls that singleton we won't collide. Really it's like pulling the auto-increment sn idea out of the db and
// * doing it locally. Really you could have a singleton per react list location (i.e. the numbers have to be unique within a specific
// * rendered list, but matching numbers in separate lists don't matter), but really none of these lists are ever going to be so massive
// * that we need to worry about type rollover.
// ^ Another special note is that when we use this approach, react ends up calling out to the getSerialNumber method multiple times per
// ^ single render. I don't think this is a problem, we're still not going to run into conflicts, but it's worth being aware of in case
// ^ this does eventually become a problem. Checking my browser (chrome on my macbook pro) the max safe int is still pretty massive
// | Number.MAX_SAFE_INTEGER
// | 9007199254740991
// ^ this isn't the same for all browsers and computers, but I'm taking it as a good indication that we're not worried about rollover
class ListSerialNumberGenerator {
    constructor() {
        self.availableSerialNumber = 0
    }

    getSerialNumber() {
        const newSN = self.availableSerialNumber
        self.availableSerialNumber++
        return newSN
    }
}

export const serialNumbers = new ListSerialNumberGenerator()
