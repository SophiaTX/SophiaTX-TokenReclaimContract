pragma solidity ^0.4.23;

contract TokenReclaim{
    mapping (address=>string) internal _ethToPubKey;
    event AccountRegister (address ethAccount, string pubKey);

    function register(string pubKey) public{
        require(bytes(pubKey).length <= 64 && bytes(pubKey).length >= 50 );

        _ethToPubKey[msg.sender] = pubKey;
        emit AccountRegister(msg.sender, pubKey);
    }

    function keys(address addr) constant public returns (string){
        return _ethToPubKey[addr];
    }
}
