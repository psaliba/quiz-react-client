import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
export default function Profile() {
  const [profile, setProfile] = useState({ _id: "", username: "", password: "", 
    firstName: "", lastName: "", dob: "", email: "", role: "USER" });
  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await client.profile();
      setProfile(profile);
    }
    fetchProfile();
  }, []);

  const save = async () => {
    await client.updateUser(profile);
    setProfile(profile);
  }
  const signOut = async () => {
    await client.signout();
    navigate("/Kanbas/Account/signin");
  }

  return (
    <div>
      <h1>Profile</h1>
      <Link to="/Kanbas/Account/Admin/Users" className="btn btn-warning w-10">All Users </Link>
      <button className="btn btn-danger" onClick={signOut}> Sign Out </button>
      {profile && (
        <div> Username:  
          <input value={profile.username} onChange={(e) =>
            setProfile({ ...profile, username: e.target.value })}/>
            <br></br> Password: 
          <input value={profile.password} onChange={(e) =>
            setProfile({ ...profile, password: e.target.value })}/>
            <br></br>First Name:
          <input value={profile.firstName} onChange={(e) =>
            setProfile({ ...profile, firstName: e.target.value })}/>
            <br></br> Last Name:
          <input value={profile.lastName} onChange={(e) =>
            setProfile({ ...profile, lastName: e.target.value })}/>
            <br></br> Date of Birth:
          <input value={(profile.dob) ? profile.dob.slice(0,10) : ""} type="date" onChange={(e) =>
            setProfile({ ...profile, dob: e.target.value })}/>
            <br></br> Email:
          <input value={profile.email} onChange={(e) =>
            setProfile({ ...profile, email: e.target.value })}/>
            <br></br> Role
          <select onChange={(e) =>
              setProfile({ ...profile, role: e.target.value })}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select> <br></br>
          <button className="btn btn-primary" onClick={save}> Save </button>

        </div>
        
      )}
    </div>
  );
}
