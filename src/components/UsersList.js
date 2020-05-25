import React from 'react';
import '../styles/UsersList.css'

const UsersList = (props) => (
    <tr key={props.user._id}>
        <td> {props.user.first_name} </td>
        <td> {props.user.last_name} </td>
        <td> {props.user.email} </td>
        <td> {new Date(props.user.updatedAt).toLocaleString()} </td>
    </tr>
);

export default UsersList;