import React, { useState } from "react";
import { useDispatch } from "react-redux";
import 'semantic-ui-css/semantic.min.css';
import { Input, Button } from "semantic-ui-react";
import "../App.css";
import { add } from '../store/index';

function AddUser({ account, contract, web3 }) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    const dispatch = useDispatch();

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleAgeChange = (event) => {
        setAge(event.target.value);
    }

    const addUser = async () => {
        let c = await contract;

        let user = {
            name: name,
            age: age
        };

        await c.methods.addUser(user).send({ from: account });

        let users = await c.methods.getAllUsers().call({ from: account });

        dispatch(add(users[users.length - 1]));

        setName('');
        setAge('');
    }

    return (
        <div className="App">
            <div className="send-eth">
              <div className="register">
                <h2>Register a new user</h2>
                <br></br>
                <Input
                  fluid
                  size='mini'
                  placeholder='name'
                >
                  <input
                    value={name}
                    onChange={handleNameChange}
                  />
                </Input>
                <br></br>
                <Input
                  fluid
                  size='mini'
                  placeholder='age'
                >
                  <input
                    value={age}
                    onChange={handleAgeChange}
                  />
                </Input>
                <br></br>
                <Button
                  fluid
                  size='large'
                  color='vk'
                  content="Send"
                  onClick={addUser}
                />
              </div>
            </div>
        </div>
    );
}

export default AddUser;