import {useState} from "react";
import Grid from "./Grid";

export default function WorkArea({
                                     animationFrame,
                                     handleAnimationFrameUpdate,
                                     handleNewFrameRequest,
                                     handleDeleteFrameRequest,
                                     handleDuplicateFrameRequest
                                 }) {
    const [pickers, setPickers] = useState({activeIndex: 0, color: ['#FF00FF', '#00ff00', '#0385ff']})

    function handlePixelClick(rowIndex, columnIndex) {
        const colors = animationFrame.gridColors.slice()
        colors[rowIndex * animationFrame.width + columnIndex] = pickers.color[pickers.activeIndex]
        handleAnimationFrameUpdate(animationFrame.id, colors)
    }

    function storePickerColor(color, pickerIndex) {
        const pickersUpdate = {...pickers}
        pickersUpdate.color[pickerIndex] = color
        setPickers(pickersUpdate)
    }

    function handleSetActiveColor(pickerIndex) {
        const pickersUpdate = {...pickers}
        pickersUpdate.activeIndex = pickerIndex
        setPickers(pickersUpdate)
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
            <div className="color-palette" data-testid="palette">
                <div className="palette-button-group">
                    <input
                        data-testid="color-picker"
                        type="color"
                        value={pickers.color[0]}
                        onChange={(event) => {
                            storePickerColor(event.target.value, 0)
                        }}
                    />
                    <input
                        name="pickerActivator"
                        type="radio"
                        data-testid="color-picker-activator"
                        checked={pickers.activeIndex === 0}
                        onChange={() => handleSetActiveColor(0)}
                    />
                </div>
                <div className="palette-button-group">
                    <input
                        data-testid="color-picker"
                        type="color"
                        value={pickers.color[1]}
                        onChange={(event) => {
                            storePickerColor(event.target.value, 1)
                        }}
                    />
                    <input
                        name="pickerActivator"
                        type="radio"
                        data-testid="color-picker-activator"
                        checked={pickers.activeIndex === 1}
                        onChange={() => handleSetActiveColor(1)}
                    />
                </div>
                <div className="palette-button-group">
                    <input
                        data-testid="color-picker"
                        type="color"
                        value={pickers.color[2]}
                        onChange={(event) => {
                            storePickerColor(event.target.value, 2)
                        }}
                    />
                    <input
                        name="pickerActivator"
                        type="radio"
                        data-testid="color-picker-activator"
                        checked={pickers.activeIndex === 2}
                        onChange={() => handleSetActiveColor(2)}
                    />
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
                    data-testid="duplicate-frame-button"
                    onClick={() => handleDuplicateFrameRequest(animationFrame.id)}
                    className="duplicate-frame-button"
                >
                    ++
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
