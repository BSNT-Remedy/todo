import { useTodo } from "../contexts/TodoContext"
import "../css/ConfirmModal.css"

export default function ConfirmModal() {
    const {
        currentTask,
        setShowConfirmModal, 
        handleDelete
    } = useTodo();

    return <div className="confirm-modal-container">
        <div className="confirm-modal">
            <h4>Do you want to delete {currentTask.taskName}?</h4>
            <div className="confirm-buttons">
                <button 
                    className="cancelBtn" 
                    onClick={() => setShowConfirmModal(false)}
                >
                    Cancel
                </button>

                <button 
                    className="deleteBtn" 
                    onClick={() => (
                        handleDelete(currentTask.id), setShowConfirmModal(false)
                    )}
                >
                    Delete
                </button>
            </div>
        </div>
    </div>
}