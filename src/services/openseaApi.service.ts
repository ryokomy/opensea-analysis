import { getWeb3Instance, NetworkType } from '../Web3'
import { OpenSeaPort, Network } from 'opensea-js'
import * as MyCryptoHerosConfig from '../config/MyCryptoHeros.config'
import { toInteger, toNumber } from 'lodash/fp'
import { outputJson } from '../services/io.service'

export interface IOpenSeaExchange {
    name: string // MCH Hero: #30040122 Lv.63
    description: string // HeroName: Mata Hari
    tokenAddress: string
    tokenId: number
    from: string
    to: string
    total_price: number // convert to ETH from Wei
    payment_token: string // ETH or WETH
    image_url: string
    image_thumbnail_url: string
    transaction_hash: string
    block_number: number
    transaction_index: number
    timestamp: string // 2019-03-26T05:13:51
    external_link: string
    event_type: string // api parameter
}

const parse = (asset_events) => {
    // Instantiates a web3
    const web3 = getWeb3Instance(NetworkType.main)

    return asset_events.map((asset_event) => {
        return {
            name: asset_event.asset.name,
            description: asset_event.asset.description,
            tokenAddress: asset_event.asset.asset_contract.address,
            tokenId: toInteger(asset_event.asset.token_id),
            from: asset_event.transaction.from_account.address,
            to: asset_event.transaction.to_account.address,
            total_price: toNumber(web3.utils.fromWei(asset_event.total_price)),
            payment_token: asset_event.payment_token.symbol,
            image_url: asset_event.asset.image_url,
            image_thumbnail_url: asset_event.asset.image_thumbnail_url,
            transaction_hash: asset_event.transaction.transaction_hash,
            block_number: toInteger(asset_event.transaction.block_number),
            transaction_index: toInteger(asset_event.transaction.transaction_index),
            timestamp: asset_event.transaction.timestamp,
            external_link: asset_event.asset.external_link,
            event_type: asset_event.event_type,
        } as IOpenSeaExchange
    })
}

export const getOpenSeaExchanges = async (
    offset: number, limit: number = 100
) : Promise<IOpenSeaExchange[]> => {
    
    // Instantiates a web3
    const web3 = getWeb3Instance(NetworkType.main)

    const seaport = new OpenSeaPort(web3.currentProvider, {
        networkName: Network.Main
    })

    const apiPath = '/api/v1/events'
    const query = {
        event_type: 'successful',
        asset_contract_address: MyCryptoHerosConfig.address,
        offset: offset,
        limit: limit,
    }

    try {
        const response = await seaport.api.get(apiPath, query)
        const asset_events = (await response.json()).asset_events
        return parse(asset_events)
    }
    catch (err) {
        throw err
    }
}

export const getAllOpenSeaExchanges = async (outputJsonName: string) => {
    let allExchanges: IOpenSeaExchange[] = []

    for(let i = 0; true; i++) {
        const limit = 100
        const offset = i * limit
        console.log(`getAllOpenSeaExchanges: ${offset + 1} - ${offset + limit}`)
        const exchanges = await getOpenSeaExchanges(offset, limit)
        allExchanges.push(...exchanges)

        // output json
        outputJson(outputJsonName, allExchanges)

        if(exchanges.length != 100) break
    }

    return allExchanges
}

export const analyzeOpenSeaExchanges = (exchanges: IOpenSeaExchange[]) => {
    const priceSortedExchanges = exchanges.sort((a, b) => toInteger(b.total_price) - toInteger(a.total_price))

    const numberOfExchanges = priceSortedExchanges.length
    const highestPrice = priceSortedExchanges[0].total_price
    let totalPrice: number = 0
    for(let exchange of priceSortedExchanges) {
        totalPrice += toNumber(exchange.total_price)
    }

    console.log('====== analysis ======')
    console.log(`Number of Exchanges: ${numberOfExchanges}`)
    console.log(`Highest Sold Price: ${highestPrice}`)
    console.log(`Total Sold Price: ${totalPrice}`)
    console.log('======================')
}