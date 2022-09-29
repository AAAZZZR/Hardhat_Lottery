//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Lottery{
    address public owner;//who control the game
    address payable[] public players;//who participate the game

    constructor(){
        owner = msg.sender;//who deploy the contract
    }

    receive () payable external{
        // each player sends exactly 0.1 ETH 
        //require(msg.value == 0.1 ether);
        // appending the player to the players array
        players.push(payable(msg.sender));
    }

    function get_balance() public view returns(uint){
        //require(msg.sender == manager);
        return address(this).balance; //to see how many eth in the contract
    }

    function get_random() public view returns(uint){
        return uint(keccak256(abi.encodePacked(block.difficulty,block.timestamp,players.length)));
    }

    function pick_winner() public{
        require(msg.sender == owner);
        require(players.length >= 3);

        uint r = get_random();
        address payable winner;

        uint index = r % players.length;
        winner = players[index];

        winner.transfer(get_balance());
        players = new address payable[](0);
    }

    function get_Balance() public view returns (uint256) {
        return address(this).balance;
    }
}
