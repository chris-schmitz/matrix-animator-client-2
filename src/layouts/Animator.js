import {AnimationFrame} from "../domain/AnimationFrame";
import {useState} from "react";
import WorkArea from "../components/WorkArea";
import Timeline from "../components/Timeline";
import {serialNumbers} from "../utilities/ListSerialNumberGenerator";
import {saveAnimation, updateAnimation} from "../utilities/apis";
import {addButtonPressedClass, removeButtonPressedClass} from "../utilities/mouseUtilities";
import {notificationDismissTypes} from "../App";
import {MatrixAnimation} from "../domain/MatrixAnimation";


export default function Animator({animation, setAnimation, setNotification}) {

    const [activeFrameIndex, setActiveFrameIndex] = useState(0)
    const [playPreview, setPlayPreview] = useState(false)
    const [animationSpeed, setAnimationSpeed] = useState(300)

    // * right now we're hard coding to 8 by 8 b/c that's the size
    // * of all of my physical matrices at the moment, but eventually
    // * I'll build bigger ones so I'll add the dynamic sizing later
    function makeNewFrame() {
        return new AnimationFrame(serialNumbers.getSerialNumber(), 8, 8, Array(8 * 8).fill("#000000"))
    }

    function handleAnimationFrameUpdate(frameId, gridColors) {
        const animationUpdate = {...animation}
        const targetFrame = animationUpdate.frames.findIndex(frame => frame.id === frameId)
        animationUpdate.frames[targetFrame].gridColors = gridColors
        setAnimation(animationUpdate)
    }

    function handleTimelineGridSelection(frameIndex) {
        setActiveFrameIndex(frameIndex)
    }

    function handleNewFrameRequest() {
        const animationUpdate = {...animation}
        const previousId = animationUpdate.frames[animationUpdate.frames.length - 1].id
        animationUpdate.frames.push(makeNewFrame(previousId + 1))
        setAnimation(animationUpdate)
        setActiveFrameIndex(animation.frames.length - 1)
    }

    function handleDeleteFrameRequest(frameId) {
        const answer = confirm("You're about to delete the current frame. That ok?")
        if (!answer) return

        const animationUpdate = {...animation}

        const targetIndex = animationUpdate.frames.findIndex(frame => frame.id === frameId)
        const framesUpdate = animation.frames.slice()
        animationUpdate.frames.splice(targetIndex, 1)


        if (animationUpdate.frames.length === 0) {
            animationUpdate.frames.push(makeNewFrame(0))
            setActiveFrameIndex(0)
        } else if (targetIndex === 0) {
            setActiveFrameIndex(0)
        } else {
            setActiveFrameIndex(targetIndex - 1)
        }
        setAnimation(animationUpdate)
    }

    function handleDuplicateFrameRequest(frameId) {
        const animationUpdate = {...animation}
        const duplicatedFrame = {...animationUpdate.frames.find(frame => frame.id === frameId)}
        duplicatedFrame.id = serialNumbers.getSerialNumber()
        const targetIndex = animationUpdate.frames.findIndex(frame => frame.id === frameId)
        animationUpdate.frames.splice(targetIndex, 0, duplicatedFrame)
        setAnimation(animationUpdate)
        setActiveFrameIndex(targetIndex + 1)
    }


    function playAnimation(play) {
        if (play) {
            let nextFrame = activeFrameIndex
            clearInterval(window.interval)
            window.interval = setInterval(() => {
                if (nextFrame >= animation.frames.length - 1) {
                    nextFrame = 0
                } else {
                    nextFrame = nextFrame + 1
                }
                setActiveFrameIndex(nextFrame)
            }, animation.speed)
        } else {
            clearInterval(window.interval)
        }

        setPlayPreview(play)
    }

    function handleSetAnimationTitle(event) {
        const animationUpdate = {...animation}
        animationUpdate.title = event.target.value
        setAnimation(animationUpdate)
    }

    async function handleSaveAnimation() {
        if (animation.id) {
            await updateAnimation(MatrixAnimation.fromObject(animation).toApiPayload())
        } else {
            const savedId = await saveAnimation(MatrixAnimation.fromObject(animation).toApiPayload())
            const animationUpdate = {...animation, id: savedId}
            setAnimation(animationUpdate)
        }
        setNotification({show: true, message: "Animation Saved", dismissType: notificationDismissTypes.AUTO_DISMISS})
    }

    function handleAnimationSpeedChange(event) {
        const animationUpdate = {...animation}
        animationUpdate.speed = event.target.value
        setAnimation(animationUpdate)
    }


    return (
        <div data-testid="animator-layout" className="animator-layout">
            <div className="nav-and-crud">
                {/*
                TODO: abstract:
                 * if we're having to do this to every button to handle the classes
                 * then we should make it a first class component
                  */}
                <button className="list-view-nav-button" data-testid="list-view-nav-button"
                        onClick={handleSaveAnimation}
                        onMouseDown={addButtonPressedClass}
                        onMouseLeave={removeButtonPressedClass}
                        onMouseUp={removeButtonPressedClass}
                >
                    List View
                </button>
                <span>|</span>
                <button className="save-animation-button" data-testid="save-animation-button"
                        onClick={handleSaveAnimation}
                        onMouseDown={addButtonPressedClass}
                        onMouseLeave={removeButtonPressedClass}
                        onMouseUp={removeButtonPressedClass}
                >
                    Save
                </button>
                <button className="delete-animation-button" data-testid="delete-animation-button"
                        onClick={handleSaveAnimation}
                        onMouseDown={addButtonPressedClass}
                        onMouseLeave={removeButtonPressedClass}
                        onMouseUp={removeButtonPressedClass}
                >
                    Delete
                </button>
            </div>
            <WorkArea
                animationFrame={animation.frames[activeFrameIndex]}
                handleAnimationFrameUpdate={handleAnimationFrameUpdate}
                handleNewFrameRequest={handleNewFrameRequest}
                handleDeleteFrameRequest={handleDeleteFrameRequest}
                handleDuplicateFrameRequest={handleDuplicateFrameRequest}
                animationTitle={animation.title}
                handleSetAnimationTitle={handleSetAnimationTitle}
            />
            <label htmlFor="speed" className="speed-label">➠
                <input
                    name="speed"
                    type="number"
                    value={animation.speed}
                    onChange={handleAnimationSpeedChange}
                    onKeyDown={
                        (event) => {
                            if (event.key !== "Enter") return
                            playAnimation(true)
                        }
                    }
                />
            </label>
            <Timeline
                frames={animation.frames}
                handleTimelineGridSelection={handleTimelineGridSelection}
                playPreview={playPreview}
                handleSetPlayPreview={playAnimation}
                activeFrameIndex={activeFrameIndex}
            />
        </div>
    );
}