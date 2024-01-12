export default function Pixel({rowIndex, columnIndex, handlePixelClick, color}) {
    return <div
        className="pixel"
        style={{backgroundColor: color}}
        onClick={() => handlePixelClick(rowIndex, columnIndex, color)}
    >
    </div>
}