import { getWeb3Instance, NetworkType } from '../Web3'
import { TransactionReceipt } from 'web3/types'

export const getTransactionReceipt = async (hash: string) : Promise<TransactionReceipt> => {
    // Instantiates a web3
    const web3 = getWeb3Instance(NetworkType.main)

    return await web3.eth.getTransactionReceipt(hash)
}