import axios from "axios";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";



const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("/auth/forgot-password", { email });
      // Handle success, maybe show a message that an email has been sent for password reset
      console.log("Password reset email sent successfully");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Reset Password
        </button>
        {error && <span>{error}</span>}
      </div>
    </div>
  );
};

export default ForgotPassword;
