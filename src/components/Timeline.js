import Grid from "./Grid";

export default function Timeline({frames, handleTimelineGridSelection}) {

    return (
        <div className="timeline" data-testid="timeline">
            {renderFrames(frames, handleTimelineGridSelection)}
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
