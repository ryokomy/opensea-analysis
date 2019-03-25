import Web3 = require('web3')

export enum NetworkType {
  main = 1,
  ropsten = 2,
  rinkeby = 4,
}

const getHttpProvider = (network: NetworkType) => {
  switch (network) {
    case NetworkType.main:
      return new Web3.providers.HttpProvider('https://mainnet.infura.io/')
    case NetworkType.ropsten:
      return new Web3.providers.HttpProvider('https://ropsten.infura.io/')
    case NetworkType.rinkeby:
      return new Web3.providers.HttpProvider('https://rinkeby.infura.io/')
  }
}

export const getWeb3Instance = (network: NetworkType) : Web3 => {
  const httpProvider = getHttpProvider(network)
  return new Web3(httpProvider)
}