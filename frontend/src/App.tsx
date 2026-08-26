import { useState } from "react";
import "./App.css";
import UserTable from "./components/UserTable";
import UserModal from "./components/UserModal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>User Management</h1>
          <p>Manage users in your application</p>
        </div>

        <button
          className="add-user-button"
          onClick={() => setIsModalOpen(true)}
        >
          + Add User
        </button>
      </header>

      <main className="main-content">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search users..."
            className="search-input"
          />
        </div>

        <UserTable />
      </main>

      {isModalOpen && (
        <UserModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

export default App;
