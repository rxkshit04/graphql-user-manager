import { useMutation, useQuery } from "@apollo/client";

import { GET_USERS } from "../graphql/queries";
import { DELETE_USER } from "../graphql/mutations";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface UsersData {
  users: User[];
}

interface UserTableProps {
  onEdit: (user: User) => void;
}

function UserTable({ onEdit }: UserTableProps) {
  const { loading, error, data, refetch } =
    useQuery<UsersData>(GET_USERS);

  const [deleteUser] = useMutation(DELETE_USER);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteUser({
        variables: { id },
      });

      await refetch();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loading) {
    return <p className="table-message">Loading users...</p>;
  }

  if (error) {
    return (
      <p className="table-error">
        Error loading users: {error.message}
      </p>
    );
  }

  const users = data?.users || [];

  return (
    <div className="user-table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={4} className="empty-state">
                <h3>No users yet</h3>
                <p>Add your first user to get started.</p>
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className="role-badge">
                    {user.role}
                  </span>
                </td>

                <td>
                  <div className="action-buttons">
                    <button
                      type="button"
                      className="action-button edit-button"
                      onClick={() => onEdit(user)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="action-button delete-button"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;