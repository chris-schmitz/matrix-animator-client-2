export default function Pixel({rowIndex, columnIndex, handlePixelClick, color, paintPixels}) {
    function paintOnMouseOver() {
        if (paintPixels) handlePixelClick(rowIndex, columnIndex)
    }

    return <div
        className="pixel"
        style={{backgroundColor: color}}
        onMouseOver={paintOnMouseOver}
        onClick={() => handlePixelClick(rowIndex, columnIndex)}
    >
    </div>
}