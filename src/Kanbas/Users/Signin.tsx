import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "./client";
import * as client from "./client";
export default function Signin() {
  const [credentials, setCredentials] = useState<User>({ _id: "",
    username: "", password: "", firstName: "", lastName: "", role: "USER"
  });
  const navigate = useNavigate();
  const signin = async () => {
    await client.signin(credentials);
    navigate("/Kanbas/Account/Profile");
  };
  return (
    <div>
      <h1>Sign In</h1>
      Enter Username: <input className="form-control" value={credentials.username} onChange={(e) =>
        setCredentials({ ...credentials, username: e.target.value })}/> <br>
        </br> Enter Password: 
      <input className="form-control" value={credentials.password} onChange={(e) =>
        setCredentials({ ...credentials, password: e.target.value })}/>
      <button className="btn btn-primary" onClick={signin}> Signin  </button>
       or <Link to="/Kanbas/Account/Signup"> <button className="btn btn-warning"> Signup </button> </Link>
    </div>
  );
}
