import Grid from "./Grid";
import {useState} from "react";

export default function WorkArea() {
    // * right now we're hard coding to 8 by 8 b/c that's the size
    // * of all of my physical matrices at the moment, but eventually
    // * I'll build bigger ones so I'll add the dynamic sizing later
    const height = 8
    const width = 8
    const [activeColor, setActiveColor] = useState("#FF00FF")
    const [gridColors, setGridColors] = useState(Array(height * width).fill("#FFFFFF"))

    function handlePixelClick(rowIndex, columnIndex) {
        const colors = gridColors.slice()
        colors[rowIndex * width + columnIndex] = activeColor
        setGridColors(colors)
    }

    function handleSetActiveColor(event) {
        setActiveColor(event.target.value)
    }

    return (
        <div className="work-area">
            <Grid
                height={height}
                width={width}
                gridColors={gridColors}
                handlePixelClick={handlePixelClick}
            />
            <div>
                <input
                    type="color"
                    value={activeColor}
                    onChange={handleSetActiveColor}
                />
            </div>
        </div>
    );
}
