import { FaEdit, FaTrash } from "react-icons/fa";

const ActionsCellRenderer = (props) => {
    const handleEdit = () => {
        // You can use props.data.id or other fields as needed
        alert(`Edit SubCategory ID: ${props.data.id}`);
    };

    const handleDelete = () => {
        // You can use props.data.id or other fields as needed
        alert(`Delete SubCategory ID: ${props.data.id}`);
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100%" }}>
            <button
                className="btn btn-sm btn-warning d-flex align-items-center justify-content-center"
                style={{ height: "32px", width: "32px" }}
                onClick={handleEdit}>
                <FaEdit />
            </button>
            <button
                className="btn btn-sm btn-danger d-flex align-items-center justify-content-center ms-2"
                style={{ height: "32px", width: "32px" }}
                onClick={handleDelete}>
                <FaTrash />
            </button>
        </div>
    );
};

export default ActionsCellRenderer;