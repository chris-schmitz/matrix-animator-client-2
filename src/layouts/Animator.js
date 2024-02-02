import {AnimationFrame, AnimationRequestPayload} from "../domain/AnimationFrame";
import {useState} from "react";
import WorkArea from "../components/WorkArea";
import Timeline from "../components/Timeline";
import {serialNumbers} from "../utilities/ListSerialNumberGenerator";
import {saveAnimation} from "../utilities/apis";


export default function Animator() {

    // * right now we're hard coding to 8 by 8 b/c that's the size
    // * of all of my physical matrices at the moment, but eventually
    // * I'll build bigger ones so I'll add the dynamic sizing later

    // TODO: we need to come back and replace frames with AnimationPayload and pull frames out of it
    const [frames, setFrames] = useState([makeNewFrame(0)])
    const [animationTitle, setAnimationTitle] = useState("...")
    const [activeFrameIndex, setActiveFrameIndex] = useState(0)
    const [playPreview, setPlayPreview] = useState(false)
    const [animationSpeed, setAnimationSpeed] = useState(300)

    function makeNewFrame() {
        return new AnimationFrame(serialNumbers.getSerialNumber(), 8, 8, Array(8 * 8).fill("#000000"))
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


    function playAnimation(play) {
        const newSpeed = animationSpeed
        if (play) {
            let nextFrame = activeFrameIndex
            clearInterval(window.interval)
            window.interval = setInterval(() => {
                if (nextFrame >= frames.length - 1) {
                    nextFrame = 0
                } else {
                    nextFrame = nextFrame + 1
                }
                console.log(nextFrame)
                setActiveFrameIndex(nextFrame)
            }, newSpeed)
        } else {
            clearInterval(window.interval)
        }

        setPlayPreview(play)
        setAnimationSpeed(newSpeed)
    }

    function handleSetAnimationTitle(event) {
        setAnimationTitle(event.target.value)
    }

    async function handleSaveAnimation() {
        const payload = new AnimationRequestPayload(
            "",
            0,
            frames[0].height,
            frames[0].width,
            animationSpeed,
            frames
        )
        const savedId = await saveAnimation(payload)
        const animation = {...payload, id: savedId}
        console.log(animation)
    }


    return (
        <div data-testid="animator-layout" className="animator-layout">
            <button data-testid="save-animation-button" onClick={handleSaveAnimation}>Save</button>
            <WorkArea
                animationFrame={frames[activeFrameIndex]}
                handleAnimationFrameUpdate={handleAnimationFrameUpdate}
                handleNewFrameRequest={handleNewFrameRequest}
                handleDeleteFrameRequest={handleDeleteFrameRequest}
                handleDuplicateFrameRequest={handleDuplicateFrameRequest}
                animationTitle={animationTitle}
                handleSetAnimationTitle={handleSetAnimationTitle}
            />
            <label htmlFor="speed" className="speed-label">➠
                <input name="speed" type="number" value={animationSpeed}
                       onKeyDown={(event) => {
                           if (event.key !== "Enter") return
                           playAnimation(true)
                       }
                       }
                       onChange={(event) => setAnimationSpeed(Number(event.target.value))}

                />
            </label>
            <Timeline
                frames={frames}
                handleTimelineGridSelection={handleTimelineGridSelection}
                playPreview={playPreview}
                handleSetPlayPreview={playAnimation}
                activeFrameIndex={activeFrameIndex}
            />
        </div>
    );
}