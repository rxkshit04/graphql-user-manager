function UserTable() {
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
          <tr>
            <td colSpan={4} className="empty-state">
              <div>
                <h3>No users yet</h3>
                <p>Add your first user to get started.</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;