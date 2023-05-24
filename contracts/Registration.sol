// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Registration {
    struct User {
        string  name;
        uint256 age;
    }

    User[] users;

    function addUser(User memory _user) public {
        users.push(_user);
    }

    function getAllUsers() public view returns(User[] memory) {
        return users;
    }
}
