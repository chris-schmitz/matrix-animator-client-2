import Grid from "./Grid";
import {addButtonPressedClass, removeButtonPressedClass} from "../utilities/mouseUtilities";

export default function Timeline({
                                     frames,
                                     frameHeight,
                                     frameWidth,
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
            <div className="timeline-frame-wrapper">
                {renderFrames(frames, handleTimelineGridSelection, activeFrameIndex)}
            </div>
        </div>
    )

    // TODO: add some test coverage
    function renderFrames(frames, handleTimelineGridSelection, activeFrameIndex) {
        return frames.map((frame, index) => {
            return <div
                key={frame.id}
                className={activeFrameIndex === index ? "active-frame grid-tiny-wrapper" : "grid-tiny-wrapper"}
                onClick={() => handleTimelineGridSelection(index)}
            >
                <Grid
                    height={frameHeight}
                    width={frameWidth}
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
}
