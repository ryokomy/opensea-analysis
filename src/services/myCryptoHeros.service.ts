import { getWeb3Instance, NetworkType } from '../Web3'
import { EventType, IOrderMatched, getPastEvents, getTransactionReceipt } from '../contracts/opensea.contract'
import { decodeTransferLog } from '../contracts/erc721.contract'
import { getBlock } from '../services/web3Util.service'
import * as MyCryptoHerosConfig from '../config/MyCryptoHeros.config'
import { BlockType } from 'web3/eth/types';

export interface IExchange {
    transactionHash: string
    price: string
    tokenAddress: string
    tokenId: string
    from: string
    to: string
    date: string
}

export const getExchanges = async (fromBlock: BlockType, toBlock: BlockType) => {
    // Instantiates a web3
    const web3 = getWeb3Instance(NetworkType.main)

    const events = await getPastEvents(fromBlock, toBlock, EventType.OrdersMatched)
    let exchanges: IExchange[] = []
    let count = 1
    for (const event of events) {
        console.log('------------------------------')
        console.log(`processing : ${count++}/${events.length}`)
        
        let exchange : IExchange = {
            transactionHash: '',
            price: '',
            tokenAddress: '',
            tokenId: '',
            from: '',
            to: '',
            date: '',
        }

        // check if MyCryptoHeroes:Hero or not
        const receipt = await getTransactionReceipt(event.transactionHash)
        const logs = receipt.logs
        if (logs.length != 2) {
            console.log(`logs.length != 2, transactionHash: ${event.transactionHash}, logs.length != 2`)
            console.log()
            continue
        }
        const log = logs[0]
        exchange.tokenAddress = log.address
        if (exchange.tokenAddress.toLowerCase() != MyCryptoHerosConfig.address.toLowerCase()) {
            console.log(`not MyCryptoHeros:Hero, transactionHash: ${event.transactionHash}`)
            console.log()
            continue
        }

        // decode to get transfer
        const transfer = await decodeTransferLog(log)
        exchange.tokenId = transfer.tokenId
        exchange.from = transfer.from
        exchange.to = transfer.to

        // get others
        exchange.transactionHash = event.transactionHash
        exchange.price = web3.utils.fromWei((event.returnValues as IOrderMatched).price)
        const block = await getBlock(event.blockNumber)
        exchange.date = (new Date(block.timestamp * 1000)).toLocaleString()

        exchanges.push(exchange)

        console.log(`MyCryptoHeros:Hero on OpenSea`)
        console.log(exchange)
        console.log()
    }

    return exchanges
}

