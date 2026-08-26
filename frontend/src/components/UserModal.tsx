import UserForm from "./UserForm";

interface UserModalProps {
  onClose: () => void;
}

function UserModal({ onClose }: UserModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>Add User</h2>
            <p>Add a new user to the system.</p>
          </div>

          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <UserForm onCancel={onClose} />
      </div>
    </div>
  );
}

export default UserModal;