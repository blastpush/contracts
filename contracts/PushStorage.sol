// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract PushStorage {
    mapping(address => Push) public pushes;

    event Created(Push);

    struct Push {
        address from;
        string from_name;
        string to;
        string data;
    }

    function read(address _address) public view returns (Push memory) {
        return pushes[_address];
    }

    function write(
        address _address,
        string memory _from,
        string memory _to,
        string memory data
    ) public {
        pushes[_address] = Push(msg.sender, _from, _to, data);
        emit Created(pushes[_address]);
    }
}
