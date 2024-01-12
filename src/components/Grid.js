import Pixel from "./Pixel";


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
            const color = this.gridColors[rowIndex * 8 + columnIndex]
            columns.push(this.createPixelComponent(rowIndex, columnIndex, color))
        }
        return columns
    }
}

const gridBuilder = new GridBuilder()

export default function Grid({height, width, gridColors, handlePixelClick}) {

    // TODO refactor
    // * I kind of hate how this is set up, but I'm not sure the best way to do it otherwise
    // * let's get it functional first and then make it pretty after
    function buildGrid(height, width) {
        function buildRows(height, width) {
            const rows = []
            for (let rowIndex = 0; rowIndex < height; rowIndex++) {
                rows.push(<div key={rowIndex} className="row">{buildColumns(width, rowIndex)}</div>)
            }
            return rows
        }

        function buildColumns(width, rowIndex) {
            const columns = []
            for (let columnIndex = 0; columnIndex < width; columnIndex++) {
                columns.push(<Pixel
                    rowIndex={rowIndex}
                    columnIndex={columnIndex}
                    key={columnIndex}
                    handlePixelClick={handlePixelClick}
                ></Pixel>)
            }
            return columns
        }

        return buildRows(height, width)
    }

    function createPixelComponent(rowIndex, columnIndex, color) {
        return <Pixel
            rowIndex={rowIndex}
            columnIndex={columnIndex}
            key={columnIndex}
            color={color}
            handlePixelClick={handlePixelClick}
        ></Pixel>
    }

    return (
        <div className="grid">
            {gridBuilder.buildGrid(height, width, createPixelComponent, gridColors)}
        </div>
    );
}
