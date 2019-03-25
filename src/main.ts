import { EventType, getPastEvents, parseEvents } from './services/events.service'

const main = async () => {
    console.log('start main')

    const events = await getPastEvents(EventType.OrdersMatched)
    const parsedEvents = await parseEvents(events, EventType.OrdersMatched)

    console.log('finish main')
}

main()