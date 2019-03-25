import { getExchanges } from './services/myCryptoHeros.service'

const main = async () => {
    console.log('start main')

    const exchanges = await getExchanges()
    console.log(exchanges)

    console.log('finish main')
}

main()