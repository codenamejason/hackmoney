import Web3 from 'web3'


export const loadWeb3 = async () => {
  let web3
  if (window.ethereum) {
    web3 = new Web3(window.ethereum)
    await window.ethereum.enable()
  }
  else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider)
    console.log(web3)
  }
  else {
    // Do nothing....
  }
  
  return web3
}

export const loadAccount = async (web3) => {
  const accounts = await web3.eth.getAccounts()
  const account = accounts[0]
  
  return account
}