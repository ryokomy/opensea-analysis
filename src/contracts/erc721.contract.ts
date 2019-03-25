import { getWeb3Instance, NetworkType } from '../Web3'
import * as IERC721Contract from '../config/IERC721.config'
// import { abi } from '../config/IERC721.contract'
import { Log } from 'web3/types'

export interface ITransfer {
    'from': string
    'to': string
    'tokenId': string
}

export interface IJsonData {
    name: string
    description: string
    image: string
    attributes: object
}

export const decodeTransferLog = async (log: Log) => {
    // Instantiates a web3
    const web3 = getWeb3Instance(NetworkType.main)

    // Transfer
    const data = log.data
    const topics = log.topics.slice(1)
    const TransferEvent = web3.eth.abi.decodeLog(IERC721Contract.abi_event_Transfer, data, topics)
    return TransferEvent as ITransfer
}

export const tokenURI = async (tokenAddress: string, tokenId: number) => {
    // Instantiates a web3
    const web3 = getWeb3Instance(NetworkType.main)

    // Instantiates a OpenSea contract
    const contract = new web3.eth.Contract(IERC721Contract.abi, tokenAddress)

    return await contract.methods.tokenURI().call()
}