import Pixel from "./Pixel";

export default function Grid({
                                 height,
                                 width,
                                 gridColors,
                                 paintPixels,
                                 handleSetPaintPixels,
                                 handlePixelClick,
                                 tinyGrid = false
                             }) {


    function createPixelComponent(rowIndex, columnIndex, color) {
        return <Pixel
            rowIndex={rowIndex}
            columnIndex={columnIndex}
            key={columnIndex}
            color={color}
            handlePixelClick={handlePixelClick}
            paintPixels={paintPixels}
        ></Pixel>
    }


    return (
        <div
            className={`grid ${tinyGrid ? "tiny" : ""}`}
            data-testid="grid"
            onMouseDown={() => handleSetPaintPixels(true)}
            onMouseUp={() => handleSetPaintPixels(false)}
        >
            {gridBuilder.buildGrid(height, width, createPixelComponent, gridColors)}
        </div>
    );
}

// TODO: ponder a bit more
// * I can't decide if I like this pulled out to a class or fit into
// * functions local to the grid component. Seems like a question for
// * later me amirite?!
class GridBuilder {
    buildGrid(height, width, createPixelComponent, gridColors) {
        this.height = height
        this.width = width
        this.createPixelComponent = createPixelComponent
        this.gridColors = gridColors
        return this._buildRows()
    }

    _buildRows() {
        const rows = []
        for (let rowIndex = 0; rowIndex < this.height; rowIndex++) {
            rows.push(<div key={rowIndex} className="row">{this._buildColumns(rowIndex)}</div>)
        }
        return rows
    }

    _buildColumns(rowIndex) {
        const columns = []
        for (let columnIndex = 0; columnIndex < this.width; columnIndex++) {
            const color = this.gridColors[rowIndex * this.width + columnIndex]
            columns.push(this.createPixelComponent(rowIndex, columnIndex, color))
        }
        return columns
    }
}

const gridBuilder = new GridBuilder()

