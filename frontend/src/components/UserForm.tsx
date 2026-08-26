interface UserFormProps {
  onCancel: () => void;
}

function UserForm({ onCancel }: UserFormProps) {
  return (
    <form className="user-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input id="name" type="text" placeholder="Enter name" />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" placeholder="Enter email" />
      </div>

      <div className="form-group">
        <label htmlFor="role">Role</label>
        <select id="role" defaultValue="USER">
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="button" className="cancel-button" onClick={onCancel}>
          Cancel
        </button>

        <button type="submit" className="save-button">
          Add User
        </button>
      </div>
    </form>
  );
}

export default UserForm;
