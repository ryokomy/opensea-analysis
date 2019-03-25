import { getWeb3Instance, NetworkType } from './Web3'
import { address, abi } from './config/OpenSea.contract'

const main = async () => {
    console.log('start main')
    // Instantiates a web3
    const web3 = getWeb3Instance(NetworkType.main)

    // MonsterToken
    const OpenSea = new web3.eth.Contract(abi, address)


    console.log('finish main')
}

main()