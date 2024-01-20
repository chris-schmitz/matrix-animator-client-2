import Grid from "./Grid";

export default function Timeline({frames, handleTimelineGridSelection, activeFrameIndex}) {

    return (
        <div className="timeline" data-testid="timeline">
            {renderFrames(frames, handleTimelineGridSelection, activeFrameIndex)}
        </div>
    )
}

function renderFrames(frames, handleTimelineGridSelection, activeFrameIndex) {
    return frames.map((frame, index) => {
        return <div
            key={frame.id}
            className={activeFrameIndex === index? "active-frame":""}
            onClick={() => handleTimelineGridSelection(index)}
        >
            <Grid
                height={frame.height}
                width={frame.width}
                gridColors={frame.gridColors}
                handlePixelClick={() => {
                }}
                tinyGrid={true}
            />
        </div>
    })
}
