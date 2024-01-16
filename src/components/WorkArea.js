import {useState} from "react";
import Grid from "./Grid";

export default function WorkArea({
                                     animationFrame,
                                     handleAnimationFrameUpdate,
                                     handleNewFrameRequest,
                                     handleDeleteFrameRequest
                                 }) {
    const [activeColor, setActiveColor] = useState("#FF00FF")

    function handlePixelClick(rowIndex, columnIndex) {
        const colors = animationFrame.gridColors.slice()
        colors[rowIndex * animationFrame.width + columnIndex] = activeColor
        handleAnimationFrameUpdate(animationFrame.id, colors)
    }

    function handleSetActiveColor(event) {
        setActiveColor(event.target.value)
    }

    return (
        <div data-testid="workarea" className="work-area">
            <div className="grid-wrapper">
                <Grid
                    height={animationFrame.height}
                    width={animationFrame.width}
                    gridColors={animationFrame.gridColors}
                    handlePixelClick={handlePixelClick}
                />
            </div>
            <div className="color-palette">
                <div className="palette-button-group">
                    <input
                        data-testid="color-picker"
                        type="color"
                        value={activeColor}
                        onChange={handleSetActiveColor}
                    />
                    <input type="radio"/>
                </div>
                <div className="palette-button-group">
                    <input
                        data-testid="color-picker"
                        type="color"
                        value={activeColor}
                        onChange={handleSetActiveColor}
                    />
                    <input type="radio"/>
                </div>
                <div className="palette-button-group">
                    <input
                        data-testid="color-picker"
                        type="color"
                        value={activeColor}
                        onChange={handleSetActiveColor}
                    />
                    <input type="radio"/>
                </div>
            </div>

            <div className="frame-actions">
                <button
                    data-testid="new-frame-button"
                    onClick={handleNewFrameRequest}
                    className="new-frame-button"
                >
                    +
                </button>
                <button
                    data-testid="delete-frame-button"
                    onClick={() => handleDeleteFrameRequest(animationFrame.id)}
                    className="delete-frame-button"
                >
                    -
                </button>
            </div>
        </div>
    );
}
