import { getExchanges } from './services/myCryptoHeros.service'

const main = async () => {
    console.log('-- start main --')
    console.log()

    const exchanges = await getExchanges(7436241, 'latest')

    console.log()
    console.log('-- finish main --')
}

main()