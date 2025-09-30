import { FiTrash2 } from "react-icons/fi";

const DeleteConfirmation = ({ onClose, onDelete }) => {
    return (
        <>
            <div className="d-flex align-items-center justify-content-center bg-light p-5">
                <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content rounded-3 shadow">
                            {/* Close button */}
                            <div className="modal-header border-0 pb-0">
                                <button
                                    onClick={onClose}
                                    type="button"
                                    className="btn-close"
                                    aria-label="Close"
                                ></button>
                            </div>

                            {/* Modal body */}
                            <div className="modal-body text-center pt-0">
                                {/* Trash icon */}
                                <div className="mb-4">
                                    <FiTrash2 className="fs-1 text-danger" />
                                </div>

                                {/* Title */}
                                <h2 className="fs-4 fw-semibold text-dark mb-5">
                                    Are you sure you want to delete it?
                                </h2>

                                {/* Action buttons */}
                                <div className="d-grid gap-3">
                                    <button
                                        onClick={onDelete}
                                        className="btn btn-danger btn-lg fw-semibold">
                                        Delete
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className="btn btn-light btn-lg fw-semibold border">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteConfirmation
