import React, { useState, useEffect } from "react";
import { BsTrash3Fill, BsPlusCircleFill } from "react-icons/bs";
import * as client from "./client";
import { User } from "./client";

export default function UserTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<User>({
        _id: Math.random().toString(36).substring(7), username: "", password: "", firstName: "",
        lastName: "", role: "USER"
    });

    const deleteUser = async (user: User) => {
        try {
            await client.deleteUser(user);
            setUsers(users.filter((u) => u._id !== user._id));
        } catch (err) {
            console.log(err);
        }
    }

    const createUser = async () => {
        try {
            // get random id
            
            const newUser = await client.createUser(user);
            setUsers([newUser, ...users]);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };
    useEffect(() => { fetchUsers(); }, []);


    return (
        <div>
            <h1>User Table</h1>
            <table className="table">
                <thead>
                    <tr>
                        <td>
                            Username <br />
                            <input value={user.username} onChange={(e) =>
                                setUser({ ...user, username: e.target.value })} />

                            <input placeholder="password" value={user.password} type="password" onChange={(e) =>
                                setUser({ ...user, password: e.target.value })} />
                        </td>
                        <td>
                            First Name <br />
                            <input value={user.firstName} onChange={(e) =>
                                setUser({ ...user, firstName: e.target.value })} />
                        </td>
                        <td>
                            Last Name <br />
                            <input value={user.lastName} onChange={(e) =>
                                setUser({ ...user, lastName: e.target.value })} />
                        </td>
                        <td>
                            Role <br />
                            <select value={user.role} onChange={(e) =>
                                setUser({ ...user, role: e.target.value })}>
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                                <option value="FACULTY">Faculty</option>
                                <option value="STUDENT">Student</option>
                            </select>
                        </td>
                        <td>
                            <BsPlusCircleFill onClick={createUser} />
                        </td>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: any) => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.role}</td>
                            <td>
                                <BsTrash3Fill onClick={() => deleteUser(user)}/> 
                            </td>
                        </tr>))}
                </tbody>

            </table>
        </div>
    );

}
