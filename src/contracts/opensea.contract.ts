import { getWeb3Instance, NetworkType } from '../Web3'
import * as OpenSeaContract from '../config/OpenSea.config'
import { EventLog, TransactionReceipt } from 'web3/types'
import { BlockType } from 'web3/eth/types'

export enum EventType {
    OrdersMatched = 'OrdersMatched'
}

export interface IOrderMatched {
    'buyHash': string // bytes32 buyHash
    'sellHash': string // bytes32 sellHash
    'maker': string // address indexed maker
    'taker': string // address indexed taker
    'price': string // uint price
    'metadata': string // bytes32 indexed metadata
}

export const getPastEvents = async (
        fromBlock: BlockType, toBlock: BlockType, eventType: EventType
    ) : Promise<EventLog[]> => {
    // Instantiates a web3
    const web3 = getWeb3Instance(NetworkType.main)
    // Instantiates a OpenSea contract
    const OpenSea = new web3.eth.Contract(OpenSeaContract.abi, OpenSeaContract.address)

    const events = await OpenSea.getPastEvents(
        eventType,
        {
            fromBlock,
            toBlock
        }
    )

    return events
}

// export const parseEvents = async (events: EventLog[], eventType: EventType) => {
//     if (eventType == EventType.OrdersMatched) {
//         return events.map((event) => {
//             return event.returnValues as IOrderMatched
//         })
//     }
// }

export const getTransactionReceipt = async (hash: string) : Promise<TransactionReceipt> => {
    // Instantiates a web3
    const web3 = getWeb3Instance(NetworkType.main)

    return await web3.eth.getTransactionReceipt(hash)
}