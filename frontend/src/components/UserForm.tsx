import { useState } from "react";
import { useMutation } from "@apollo/client";

import {
  CREATE_USER,
  UPDATE_USER,
} from "../graphql/mutations";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UserFormProps {
  onCancel: () => void;
  onSuccess: () => void;
  user?: User | null;
}

function UserForm({
  onCancel,
  onSuccess,
  user,
}: UserFormProps) {
  const isEditing = !!user;

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState(user?.role || "USER");
  const [error, setError] = useState("");

  const [createUser, { loading: creating }] =
    useMutation(CREATE_USER);

  const [updateUser, { loading: updating }] =
    useMutation(UPDATE_USER);

  const loading = creating || updating;

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();
    setError("");

    try {
      if (isEditing) {
        await updateUser({
          variables: {
            id: user.id,
            name,
            email,
            role,
          },
        });
      } else {
        await createUser({
          variables: {
            name,
            email,
            role,
          },
        });
      }

      onSuccess();
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="USER">User</option>
          <option value="DEVELOPER">Developer</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      {error && (
        <p className="form-error">{error}</p>
      )}

      <div className="form-actions">
        <button
          type="button"
          className="cancel-button"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="save-button"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : isEditing
            ? "Save Changes"
            : "Add User"}
        </button>
      </div>
    </form>
  );
}

export default UserForm;
