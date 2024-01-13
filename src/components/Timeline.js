import Grid from "./Grid";

export default function Timeline({frames, handleTimelineGridSelection, handleNewFrameRequest}) {

    return (
        <div className="timeline" data-testid="timeline">
            {renderFrames(frames, handleTimelineGridSelection)}
            <button
                data-testid="new-frame-button"
                onClick={handleNewFrameRequest}
                className="new-frame-button"
            >
                +
            </button>
        </div>
    )
}

function renderFrames(frames, handleTimelineGridSelection) {
    return frames.map(frame => {
        return <div
            key={frame.id}
            onClick={() => handleTimelineGridSelection(frame.id)}
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
