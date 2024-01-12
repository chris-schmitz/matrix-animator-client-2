import {useState} from "react";
import Grid from "./Grid";

export default function WorkArea({animationFrame, handleAnimationFrameUpdate}) {
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
            <Grid
                height={animationFrame.height}
                width={animationFrame.width}
                gridColors={animationFrame.gridColors}
                handlePixelClick={handlePixelClick}
            />
            <div>
                <input
                    data-testid="color-picker"
                    type="color"
                    value={activeColor}
                    onChange={handleSetActiveColor}
                />
            </div>
        </div>
    );
}
