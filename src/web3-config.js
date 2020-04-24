import Web3 from 'web3'
import {
  TOKEN_ABI,
  TOKEN_ADDRESS
} from './config'


export const initWeb3 = ({ props }) => {
  const connection = new Web3(Web3.givenProvider || "http://localhost:8545")
  
  return connection
}

export const loadNetwork = async (web3) => {
  const network = await web3.eth.net.getNetworkType()
  
  return network
}

export const loadAccounts = async (web3) => {
  const accounts = await web3.eth.getAccounts();
  
  return accounts
}