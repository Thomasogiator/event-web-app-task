import React, { useState } from 'react'
import { useFetchEvents } from '../hooks/useEvents';

export interface Event{
    id: number,
    category: string,
    title: string,
    description: string,
    location: string,
    date: string,
    time: string,
    petsAllowed: boolean,
    organizer: string
}
const EventList = () => {
    const [openEvent, setOpenEvent] = useState<Event | null>(null)
    const [searchTerm, setSearchTerm] = useState("");
    const url = 'https://my-json-server.typicode.com/Code-Pop/Touring-Vue-Router/events'
    const {data, isPending, error, isError} = useFetchEvents(url)
    console.log(url)
    const filteredItems = data && data?.filter((item: Event) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const showEvent=(event: Event)=>{
        setOpenEvent(event)
    }

    const closeEvent=()=>{
        setOpenEvent(null)
    }

    if (isPending) return <p>Loading...</p>
  return (
    <div className='event-list'>
        <div className='event-search'>
            <input type="search" placeholder='search event by name' onChange={(e)=> setSearchTerm(e.target.value)}/>
        </div>
        <div>
            <button>Pets allowed</button>
            <button>No pets allowed</button>

        </div>
        {filteredItems > 0 && filteredItems?.map((event: Event)=> <div onClick={()=> showEvent(event)} className='single-event' key={event.id}>
            <p>Name: {event.title}</p>
            <p>Description: {event.description}</p>
            <p>Category: {event.category}</p>
            <p>Location: {event.location}</p>
            <p>Date: {event.date}</p>
            <p>Time: {event.time}</p>
            <p>Organizer: {event.organizer}</p>
        </div>)}
        {openEvent && <div className='opened-event'>
            <div onClick={closeEvent}>X</div>
            <p>Name: {openEvent.title}</p>
            <p>Description: {openEvent.description}</p>
            <p>Category: {openEvent.category}</p>
            <p>Location: {openEvent.location}</p>
            <p>Date: {openEvent.date}</p>
            <p>Time: {openEvent.time}</p>
            <p>Organizer: {openEvent.organizer}</p>
        </div>}

    </div>
  )
}

export default EventList