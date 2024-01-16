import {AnimationFrame} from "../domain/AnimationFrame";
import {useState} from "react";
import WorkArea from "../components/WorkArea";
import Timeline from "../components/Timeline";


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
class LocalSerialNumberTracker {
    constructor() {
        self.availableSerialNumber = 0
    }

    getSerialNumber() {
        const newSN = self.availableSerialNumber
        self.availableSerialNumber++
        return newSN
    }
}

const serialNumbers = new LocalSerialNumberTracker()

export default function Animator() {

    // * right now we're hard coding to 8 by 8 b/c that's the size
    // * of all of my physical matrices at the moment, but eventually
    // * I'll build bigger ones so I'll add the dynamic sizing later

    const [frames, setFrames] = useState([makeNewFrame(0)])
    const [activeFrameIndex, setActiveFrameIndex] = useState(0)

    function makeNewFrame() {
        return new AnimationFrame(serialNumbers.getSerialNumber(), 8, 8, Array(8 * 8).fill("#FFFFFF"))
    }

    function handleAnimationFrameUpdate(frameId, gridColors) {
        const framesUpdate = frames.slice()
        const targetFrame = framesUpdate.find(frame => frame.id === frameId)
        targetFrame.gridColors = gridColors
        setFrames(framesUpdate)
    }

    function handleTimelineGridSelection(frameIndex) {
        setActiveFrameIndex(frameIndex)
    }

    function handleNewFrameRequest() {
        const newFrames = frames.slice()
        const previousId = newFrames[newFrames.length - 1].id
        newFrames.push(makeNewFrame(previousId + 1))
        setFrames(newFrames)
        setActiveFrameIndex(newFrames.length - 1)
    }

    function handleDeleteFrameRequest(frameId) {
        const answer = confirm("You're about to delete the current frame. That ok?")
        if (!answer) return

        const targetIndex = frames.findIndex(frame => frame.id === frameId)
        const framesUpdate = frames.slice()
        framesUpdate.splice(targetIndex, 1)

        setFrames(framesUpdate)

        if (framesUpdate.length === 0) {
            setFrames([makeNewFrame(0)])
            setActiveFrameIndex(0)
        } else if (targetIndex === 0) {
            setActiveFrameIndex(0)
        } else {
            setActiveFrameIndex(targetIndex - 1)
        }
    }

    function handleDuplicateFrameRequest(frameId) {
        const duplicatedFrame = {...frames.find(frame => frame.id === frameId)}
        duplicatedFrame.id = serialNumbers.getSerialNumber()
        const targetIndex = frames.findIndex(frame => frame.id === frameId)
        const framesUpdate = frames.slice()
        framesUpdate.splice(targetIndex, 0, duplicatedFrame)
        setFrames(framesUpdate)
        setActiveFrameIndex(targetIndex + 1)
    }


    return (
        <div data-testid="animator-layout" className="animator-layout">
            <WorkArea
                animationFrame={frames[activeFrameIndex]}
                handleAnimationFrameUpdate={handleAnimationFrameUpdate}
                handleNewFrameRequest={handleNewFrameRequest}
                handleDeleteFrameRequest={handleDeleteFrameRequest}
                handleDuplicateFrameRequest={handleDuplicateFrameRequest}
            />
            <Timeline
                frames={frames}
                handleTimelineGridSelection={handleTimelineGridSelection}
            />
        </div>
    );
}