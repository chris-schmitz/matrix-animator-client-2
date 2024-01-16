import {AnimationFrame} from "../domain/AnimationFrame";
import {useState} from "react";
import WorkArea from "../components/WorkArea";
import Timeline from "../components/Timeline";

export default function Animator() {

    // * right now we're hard coding to 8 by 8 b/c that's the size
    // * of all of my physical matrices at the moment, but eventually
    // * I'll build bigger ones so I'll add the dynamic sizing later

    const [frames, setFrames] = useState([makeNewFrame(0)])
    const [activeFrameIndex, setActiveFrameIndex] = useState(0)

    function makeNewFrame(id) {
        return new AnimationFrame(id, 8, 8, Array(8 * 8).fill("#FFFFFF"))
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

    return (
        <div data-testid="animator-layout" className="animator-layout">
            <WorkArea
                animationFrame={frames[activeFrameIndex]}
                handleAnimationFrameUpdate={handleAnimationFrameUpdate}
                handleNewFrameRequest={handleNewFrameRequest}
                handleDeleteFrameRequest={handleDeleteFrameRequest}
            />
            <Timeline
                frames={frames}
                handleTimelineGridSelection={handleTimelineGridSelection}
            />
        </div>
    );
}