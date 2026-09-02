import UserForm from "./UserForm";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UserModalProps {
  onClose: () => void;
  onSuccess: () => void;
  user?: User | null;
}

function UserModal({
  onClose,
  onSuccess,
  user,
}: UserModalProps) {
  const isEditing = !!user;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="modal-header">
          <div>
            <h2>
              {isEditing ? "Edit User" : "Add User"}
            </h2>

            <p>
              {isEditing
                ? "Update user information."
                : "Add a new user to the system."}
            </p>
          </div>

          <button
            type="button"
            className="close-button"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <UserForm
          user={user}
          onCancel={onClose}
          onSuccess={onSuccess}
        />
      </div>
    </div>
  );
}

export default UserModal;