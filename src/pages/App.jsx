import { useState } from "react";
import AdminPage from "./admin/AdminPage";

export default function App() {
  const [pin, setPin] = useState(Array(5).fill("")); // Array to store 5 digits
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const correctPin = "04120"; // Set a hardcoded PIN for this example

  const handleChange = (value, index) => {
    if (isNaN(value) || value.length > 1) return; // Ensure only single digits
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Automatically focus the next input field
    if (value && index < 4) {
      document.getElementById(`pin-${index + 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin.join("") === correctPin) {
      setIsLoggedIn(true);
    } else {
      alert("Incorrect PIN. Please try again.");
      setPin(Array(5).fill("")); // Reset the PIN
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      // Focus the previous input if current is empty and Backspace is pressed
      document.getElementById(`pin-${index - 1}`).focus();
    }
  };

  return (
    <div style={styles.container}>
      {isLoggedIn ? (
        <AdminPage />
      ) : (
        <form onSubmit={handleSubmit} style={styles.form}>
          <h1 style={styles.heading}>Isda</h1>
          <div style={styles.pinContainer}>
            {pin.map((digit, index) => (
              <input
                key={index}
                id={`pin-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                style={styles.pinInput}
              />
            ))}
          </div>
          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

// Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f2f5",
    fontFamily: "'Arial', sans-serif",
  },
  form: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "300px",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
  pinContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  pinInput: {
    width: "50px",
    height: "50px",
    textAlign: "center",
    fontSize: "24px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
};
