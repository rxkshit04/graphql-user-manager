import { useState } from "react";

import UserTable from "./components/UserTable";
import UserModal from "./components/UserModal";

import "./App.css";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

function App() {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] =
    useState<User | null>(null);

  const handleAddUser = () => {
    setSelectedUser(null);
    setShowModal(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>User Management</h1>
          <p>Manage users in your application</p>
        </div>

        <button
          type="button"
          className="add-user-button"
          onClick={handleAddUser}
        >
          + Add User
        </button>
      </header>

      <main className="main-content">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search users..."
          />
        </div>

        <UserTable onEdit={handleEditUser} />
      </main>

      {showModal && (
        <UserModal
          user={selectedUser}
          onClose={handleCloseModal}
          onSuccess={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;
