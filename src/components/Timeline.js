import Grid from "./Grid";
import {addButtonPressedClass, removeButtonPressedClass} from "../utilities/mouseUtilities";

export default function Timeline({
                                     frames,
                                     handleTimelineGridSelection,
                                     activeFrameIndex,
                                     playPreview,
                                     handleSetPlayPreview
                                 }) {

    return (
        <div className="timeline" data-testid="timeline">
            <button
                data-testid="animation-preview-play-pause-button"
                className={playPreview ? "play-pause-button playing" : "play-pause-button paused"}
                onClick={() => handleSetPlayPreview(!playPreview)}
                onMouseDown={addButtonPressedClass}
                onMouseUp={removeButtonPressedClass}
                onMouseLeave={removeButtonPressedClass}
            >
                ⏯
            </button>
            <div class="timeline-frame-wrapper">
                {renderFrames(frames, handleTimelineGridSelection, activeFrameIndex)}
            </div>
        </div>
    )
}

function renderFrames(frames, handleTimelineGridSelection, activeFrameIndex) {
    return frames.map((frame, index) => {
        return <div
            key={frame.id}
            className={activeFrameIndex === index ? "active-frame" : ""}
            onClick={() => handleTimelineGridSelection(index)}
        >
            <Grid
                height={frame.height}
                width={frame.width}
                gridColors={frame.gridColors}
                handlePixelClick={() => {
                }}
                handleSetPaintPixels={() => {
                }}
                tinyGrid={true}
            />
        </div>
    })
}
