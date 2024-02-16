import { AnimationFrame } from "../domain/AnimationFrame"
import { useEffect, useState } from "react"
import WorkArea from "../components/WorkArea"
import Timeline from "../components/Timeline"
import { serialNumbers } from "../utilities/ListSerialNumberGenerator"
import { deleteAnimation, getAnimation, saveAnimation, updateAnimation } from "../utilities/apis"
import { addButtonPressedClass, removeButtonPressedClass } from "../utilities/mouseUtilities"
import { notificationDismissTypes } from "../App"
import { MatrixAnimation } from "../domain/MatrixAnimation"
import Modal from "../_tests/components/Modal"
import modalButtonTypes from "../domain/ModalButtonTypes"
import ModalButtonTypes from "../domain/ModalButtonTypes"
import { Link, useLoaderData } from "react-router-dom"

export async function loader({ params }) {
    const animation = await getAnimation(params.id)

    const a = MatrixAnimation.fromApiResponse(animation)
    return a
}


export default function Animator({ setNotification }) {

    const [animation, setAnimation] = useState(MatrixAnimation.newBlankAnimation())
    const [activeFrameIndex, setActiveFrameIndex] = useState(0)
    const [playPreview, setPlayPreview] = useState(false)
    // TODO: consider compacting these booleans into a common object or something
    const [activeModalType, setActiveModalType] = useState({ type: null, show: false })

    const loadedAnimation = useLoaderData()
    useEffect(() => {
        if (loadedAnimation)
        {
            setAnimation(loadedAnimation)
        }
    }, [loadedAnimation])

    // * right now we're hard coding to 8 by 8 b/c that's the size
    // * of all of my physical matrices at the moment, but eventually
    // * I'll build bigger ones so I'll add the dynamic sizing later

    // ^ FRAME =========================
    function makeNewFrame() {
        return new AnimationFrame(serialNumbers.getSerialNumber(), Array(8 * 8).fill("#000000"))
    }

    function handleNewFrameRequest() {
        const animationUpdate = { ...animation }
        const previousId = animationUpdate.frames[animationUpdate.frames.length - 1].id
        animationUpdate.frames.push(makeNewFrame(previousId + 1))
        setAnimation(animationUpdate)
        setActiveFrameIndex(animation.frames.length - 1)
    }

    function handleAnimationFrameUpdate(frameId, gridColors) {
        const animationUpdate = { ...animation }
        const targetFrame = animationUpdate.frames.findIndex(frame => frame.id === frameId)
        animationUpdate.frames[targetFrame].gridColors = gridColors
        setAnimation(animationUpdate)
    }

    function handleDeleteAnimationFrame(modalResult) {
        setActiveModalType({ type: ModalTypeData.NONE, show: false })
        if (modalResult.buttonClicked !== ModalButtonTypes.OK) return

        const animationUpdate = { ...animation }

        animationUpdate.frames.splice(activeFrameIndex, 1)


        if (animationUpdate.frames.length === 0)
        {
            animationUpdate.frames.push(makeNewFrame(0))
            setActiveFrameIndex(0)
        } else if (activeFrameIndex === 0)
        {
            setActiveFrameIndex(0)
        } else
        {
            setActiveFrameIndex(activeFrameIndex - 1)
        }
        setAnimation(animationUpdate)
    }

    function handleDuplicateFrameRequest(frameId) {
        const animationUpdate = { ...animation }
        const duplicatedFrame = { ...animationUpdate.frames.find(frame => frame.id === frameId) }
        duplicatedFrame.id = serialNumbers.getSerialNumber()
        const targetIndex = animationUpdate.frames.findIndex(frame => frame.id === frameId)
        animationUpdate.frames.splice(targetIndex, 0, duplicatedFrame)
        setAnimation(animationUpdate)
        setActiveFrameIndex(targetIndex + 1)
    }

    function handleSetAnimationTitle(event) {
        const animationUpdate = { ...animation }
        animationUpdate.title = event.target.value
        setAnimation(animationUpdate)
    }

    // ^ timeline =========================
    function handleTimelineGridSelection(frameIndex) {
        setActiveFrameIndex(frameIndex)
    }



    // ^ Animation playback =========================
    function playAnimation(play) {
        if (play)
        {
            let nextFrame = activeFrameIndex
            clearInterval(window.interval)
            window.interval = setInterval(() => {
                if (nextFrame >= animation.frames.length - 1)
                {
                    nextFrame = 0
                } else
                {
                    nextFrame = nextFrame + 1
                }
                setActiveFrameIndex(nextFrame)
            }, animation.speed)
        } else
        {
            clearInterval(window.interval)
        }

        setPlayPreview(play)
    }

    function handleAnimationSpeedChange(event) {
        const animationUpdate = { ...animation }
        animationUpdate.speed = event.target.value
        setAnimation(animationUpdate)
    }



    // ^ API Crud ================================
    async function handleSaveAnimation() {
        if (animation.id)
        {
            await updateAnimation(MatrixAnimation.fromObject(animation).toApiPayload())
        } else
        {
            const savedId = await saveAnimation(MatrixAnimation.fromObject(animation).toApiPayload())
            const animationUpdate = { ...animation, id: savedId }
            setAnimation(animationUpdate)
        }
        setNotification({ show: true, message: "Animation Saved", dismissType: notificationDismissTypes.AUTO_DISMISS })
    }

    function handleDeleteAnimation(modalResult) {
        if (modalResult.buttonClicked === modalButtonTypes.OK)
        {
            deleteAnimation(animation.id)
            setAnimation(MatrixAnimation.newBlankAnimation())
            setNotification({
                show: true,
                message: "Animation Deleted",
                dismissType: notificationDismissTypes.AUTO_DISMISS
            })
            // * show notification saying "Animation Deleted"
        }
        setActiveModalType({ type: null, show: false })
        // setShowDeleteModal(false)
    }



    // ^ Modal ==================================
    // TODO: get second opinion
    // * I like this but I don't, really the thing I dont' like about it is 
    // * the fact that we need this class to be in the component to specify the 
    // * result handlers. We could inject that in the constructor, but then it would 
    // * make more sense to inject _everything_ in the constructor, and that messes up the
    // * static property stuff. But maybe that's ok???
    class ModalTypeData {
        static NONE = "none"
        static DELETE_ANIMATION = "deleteAnimation"
        static DELETE_FRAME = "deleteFrame"

        static getModalData(modalType) {
            return ModalTypeData.typeData[modalType]
        }

        static typeData = {
            [ModalTypeData.DELETE_ANIMATION]: {
                okButton: true,
                cancelButton: true,
                message: "Are you sure you want to delete this animation?",
                resultHandler: handleDeleteAnimation
            },
            [ModalTypeData.DELETE_FRAME]: {
                okButton: true,
                cancelButton: true,
                message: "You're about to delete the current frame. That ok?",
                resultHandler: handleDeleteAnimationFrame
            }
        }
    }

    function renderModal() {
        if (!activeModalType.show)
        {
            return
        }
        const modalDetails = ModalTypeData.getModalData(activeModalType.type)
        return <Modal
            message={modalDetails.message}
            handleResult={modalDetails.resultHandler}
        />
    }


    function handleShowDeleteAnimationModal() {
        if (animation.id)
        {
            // setShowDeleteModal(true)
            setActiveModalType({ type: ModalTypeData.DELETE_ANIMATION, show: true })
        }
    }

    function handleShowDeleteFrameModal() {
        setActiveModalType({ type: ModalTypeData.DELETE_FRAME, show: true })

    }




    return (
        <div data-testid="animator-layout" className="animator-layout">
            <div className="nav-and-crud">
                {/*
                TODO: abstract:
                 * if we're having to do this to every button to handle the classes
                 * then we should make it a first class component
                  */}
                {/**
                <button className="list-view-nav-button" data-testid="list-view-nav-button"
                    onClick={handleSaveAnimation}
                    onMouseDown={addButtonPressedClass}
                    onMouseLeave={removeButtonPressedClass}
                    onMouseUp={removeButtonPressedClass}
                >
                    List View
                </button>
                 */}
                <Link to="/">List View</Link>
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
                    onClick={handleShowDeleteAnimationModal}
                    onMouseDown={addButtonPressedClass}
                    onMouseLeave={removeButtonPressedClass}
                    onMouseUp={removeButtonPressedClass}
                >
                    Delete
                </button>
            </div>
            <WorkArea
                animationFrame={animation.frames[activeFrameIndex]}
                frameHeight={animation.height}
                frameWidth={animation.width}
                handleAnimationFrameUpdate={handleAnimationFrameUpdate}
                handleNewFrameRequest={handleNewFrameRequest}
                handleDeleteFrameRequest={handleShowDeleteFrameModal}
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
            {renderModal()}
            <Timeline
                frames={animation.frames}
                frameHeight={animation.height}
                frameWidth={animation.width}
                handleTimelineGridSelection={handleTimelineGridSelection}
                playPreview={playPreview}
                handleSetPlayPreview={playAnimation}
                activeFrameIndex={activeFrameIndex}
            />
        </div>
    )
}