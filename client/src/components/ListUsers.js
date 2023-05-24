import React from "react";
import { useSelector } from "react-redux";
import { Table } from "semantic-ui-react";

function ListUsers() {
    const newUsers = useSelector(state => {
        return state.users;
    });

    const renderedUsers = newUsers.map((user, index) => {
        return (
            <Table.Row key={index}>
               <Table.Cell>{user.name}</Table.Cell> 
               <Table.Cell>{user.age}</Table.Cell> 
            </Table.Row>
        );
    });

    return (
        <div style={{ marginTop: 145, marginRight: 40 }}>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Age</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {renderedUsers}
                </Table.Body>
            </Table>
        </div>
    );
}

export default ListUsers;