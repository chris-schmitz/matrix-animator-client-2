import ModalButtonTypes from "../../domain/ModalButtonTypes"

export default function Modal({ message, handleResult }) {

    function handleOkClick(clickedButtonType) {
        handleResult({ buttonClicked: clickedButtonType })
    }

    return <div className="modal-background" data-testid="modal">
        <div className="modal">
            <p data-testid="modal-message" className="modal-message">{message}</p>
            <div className="modal-buttons">
                <button
                    className="modal-button ok"
                    data-testid="modal-ok-button"
                    onClick={() => handleOkClick(ModalButtonTypes.OK)}
                >OK
                </button>
                <button
                    className="modal-button cancel"
                    data-testid="modal-cancel-button"
                    onClick={() => handleOkClick(ModalButtonTypes.CANCEL)}
                >Cancel
                </button>
            </div>
        </div>
    </div>

}