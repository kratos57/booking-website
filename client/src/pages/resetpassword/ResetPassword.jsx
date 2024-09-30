import axios from "axios";
import {  useState } from "react";
import { useNavigate,useParams } from "react-router-dom";



const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
const {id, token} = useParams()

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`/auth/reset-password/${id}/${token}`, { password });
      // Handle success, maybe show a message that an email has been sent for password reset
      console.log("Password reset email sent successfully");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login">
      <div className="lContainer">
      <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          update password 
        </button>
        {error && <span>{error}</span>}
      </div>
    </div>
  );
};

export default ResetPassword;
