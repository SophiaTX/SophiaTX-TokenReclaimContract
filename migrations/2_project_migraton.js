var TokenReclaim = artifacts.require("TokenReclaim");

module.exports = function(deployer) {
    deployer.deploy(TokenReclaim);
}