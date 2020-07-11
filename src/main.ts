import { IExchange, getExchanges } from './services/myCryptoHeros.service'
import { outputJson, readJson } from './services/io.service'
import { toInteger } from 'lodash/fp'
import { getOpenSeaExchanges, getAllOpenSeaExchanges, IOpenSeaExchange, analyzeOpenSeaExchanges } from './services/openseaApi.service'

const main = async () => {
    console.log('-- start main --')
    console.log()

    // const exchanges = await getExchanges(7441700, 'latest')
    // await outputJson(exchanges)

    // let exchanges = await readJson() as IExchange[]
    // exchanges = exchanges.sort((a, b) => toInteger(b.price) - toInteger(a.price))

    // const numberOfExchanges = exchanges.length
    // let totalPrice = 0
    // for (let exchange of exchanges) {
    //     totalPrice += toInteger(exchange.price)
    // }
    // console.log(numberOfExchanges)
    // console.log(totalPrice)


    // const exchanges = await getAllOpenSeaExchanges(`OpenSeaMyCryptoHeroes_extension.json`)

    let exchanges = await readJson('OpenSeaMyCryptoHeroes_hero_until_20190326_1820.json') as IOpenSeaExchange[]
//    let exchanges = await readJson('OpenSeaMyCryptoHeroes_extension_until_20190326_1905.json') as IOpenSeaExchange[]
//    let exchanges = await readJson('OpenSeaMyCryptoHeroes_land_until_20190326_1900.json') as IOpenSeaExchange[]

    await analyzeOpenSeaExchanges(exchanges)

    console.log()
    console.log('-- finish main --')
}

main()