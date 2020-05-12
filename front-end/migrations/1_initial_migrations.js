const Migrations = artifacts.require("Migrations");
//const DaiFaucet = artifacts.require('DaiFaucet');

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  //deployer.deploy(DaiFaucet);
};