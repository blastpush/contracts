// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IBlast.sol";
import "./interfaces/IBlastPoints.sol";

contract PushStorage is Ownable {
    IBlast public constant BLAST =
        IBlast(0x4300000000000000000000000000000000000002);

    IBlastPoints public constant BLAST_POINTS =
        IBlastPoints(0x2536FE9ab3F511540F2f9e2eC2A805005C3Dd800);

    mapping(address => Push) public pushes;

    event Created(Push);

    constructor() Ownable(msg.sender) {
        BLAST.configureClaimableGas();
    }

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
        Push memory push = pushes[_address];
        if (push.from != address(0) && push.from != msg.sender) {
            revert("not owner of push");
        }

        pushes[_address] = Push(msg.sender, _from, _to, data);
        emit Created(pushes[_address]);
    }

    function claimContractGas() external onlyOwner {
        BLAST.claimAllGas(address(this), msg.sender);
    }

    function setPointsOperator(address _pointsOperator) external onlyOwner {
        BLAST_POINTS.configurePointsOperator(_pointsOperator);
    }
}
