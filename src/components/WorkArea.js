import {useState} from "react"
import Grid from "./Grid"
import {addButtonPressedClass, removeButtonPressedClass} from "../utilities/mouseUtilities"

export default function WorkArea({
                                     animationFrame,
                                     frameHeight,
                                     frameWidth,
                                     handleAnimationFrameUpdate,
                                     handleNewFrameRequest,
                                     handleDeleteFrameRequest,
                                     handleDuplicateFrameRequest,
                                     animationTitle,
                                     handleSetAnimationTitle
                                 }) {
    const [pickers, setPickers] = useState({activeIndex: 0, color: ['#FF00FF', '#00ff00', '#000000']})
    const [paintPixels, setPaintPixels] = useState(false)

    function handlePixelClick(rowIndex, columnIndex) {
        const colors = animationFrame.gridColors.slice()
        colors[rowIndex * frameWidth + columnIndex] = pickers.color[pickers.activeIndex]
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

    function handleSetPaintPixels(canPaint) {
        setPaintPixels(canPaint)
    }

    function renderPaletteButtonGroups() {
        // * hmmmmm what if we make the number of color pickers configureable ... 
        const totalPaletteButtons = 3
        const paletteButtonGroups = []
        for (let i = 0; i < totalPaletteButtons; i++) {
            paletteButtonGroups.push(
                <div key={i} className="palette-button-group">
                    <input
                        data-testid="color-picker"
                        type="color"
                        value={pickers.color[i]}
                        onChange={(event) => {
                            storePickerColor(event.target.value, i)
                        }}
                    />
                    <input
                        name="pickerActivator"
                        className="picker-activator"
                        type="radio"
                        data-testid="color-picker-activator"
                        checked={pickers.activeIndex === i}
                        onChange={() => handleSetActiveColor(i)}
                    />
                </div>
            )
        }
        return paletteButtonGroups
    }

    function renderFrameActionButtons() {
        const buttonData = [
            {name: "new-frame-button", clickHandler: handleNewFrameRequest, symbol: "+"},
            {
                name: "duplicate-frame-button",
                clickHandler: () => handleDuplicateFrameRequest(animationFrame.id),
                symbol: "++"
            },
            {name: "delete-frame-button", clickHandler: () => handleDeleteFrameRequest(animationFrame.id), symbol: "-"},
        ]
        const buttons = []
        for (let i = 0; i < 3; i++) {
            buttons.push(
                <button
                    key={i}
                    data-testid={buttonData[i].name}
                    className={buttonData[i].name}
                    onClick={buttonData[i].clickHandler}
                    onMouseDown={addButtonPressedClass}
                    onMouseUp={removeButtonPressedClass}
                    onMouseLeave={removeButtonPressedClass}
                >
                    {buttonData[i].symbol}
                </button>
            )
        }
        return buttons
    }

    return (
        <div data-testid="workarea" className="work-area">
            <div className="frame-actions">
                {renderFrameActionButtons()}
            </div>
            <label htmlFor="animationTitle">AnimationTitle</label>
            <input data-testid="animation-title" name="animationTitle" value={animationTitle}
                   onChange={handleSetAnimationTitle}/>
            <div className="grid-wrapper" onMouseLeave={() => handleSetPaintPixels(false)}>
                <Grid
                    height={frameHeight}
                    width={frameWidth}
                    gridColors={animationFrame.gridColors}
                    paintPixels={paintPixels}
                    handleSetPaintPixels={handleSetPaintPixels}
                    handlePixelClick={handlePixelClick}
                />
                <div style={{display: "flex", flexWrap: "wrap", flexDirection: "column", height: "500px"}}>
                    {animationFrame.gridColors.map(((c, i) => <div key={i}>{c}</div>))}
                </div>
            </div>
            <div className="color-palette" data-testid="palette">
                {renderPaletteButtonGroups()}
            </div>
        </div>
    )
}
