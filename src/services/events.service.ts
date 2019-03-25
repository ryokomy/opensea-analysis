import { getWeb3Instance, NetworkType } from '../Web3'
import { address, abi } from '../config/OpenSea.contract'
import { EventLog } from 'web3/types'

export enum EventType {
    OrdersMatched = 'OrdersMatched'
}

export interface IOrderMatched {
    'buyHash' // bytes32 buyHash
    'sellHash' // bytes32 sellHash
    'maker' // address indexed maker
    'taker' // address indexed taker
    'price' // uint price
    'metadata' // bytes32 indexed metadata
}

export const getPastEvents = async (eventType: EventType) : Promise<EventLog[]> => {
    // Instantiates a web3
    const web3 = getWeb3Instance(NetworkType.main)
    // Instantiates a OpenSea contract
    const OpenSea = new web3.eth.Contract(abi, address)

    const events = await OpenSea.getPastEvents(
        eventType,
        {
            fromBlock: 7435000, // TODO: consider more
            toBlock: 'latest'
        }
    )

    return events
}

export const parseEvents = async (events: EventLog[], eventType: EventType) => {
    if (eventType == EventType.OrdersMatched) {
        return events.map((event) => {
            return event.returnValues as IOrderMatched
        })
    }
}