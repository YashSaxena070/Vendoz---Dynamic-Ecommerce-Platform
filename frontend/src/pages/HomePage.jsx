import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import Header from "../components/Layout/Header";
import Hero from '../components/Route/Hero/Hero';
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import Events from "../components/Events/Events";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Sponsored from "../components/Route/Sponsored";
import Footer from "../components/Layout/Footer";
import EventPopupModal from "../components/Events/EventPopupModal";

const HomePage = () => {
    const { allEvents } = useSelector((state) => state.events);
    const [showPopup, setShowPopup] = useState(false);
    
    // Filter active running events to show up to 4 items
    const eventItems = allEvents ? allEvents.slice(0, 4) : [];

    useEffect(() => {
        const shown = sessionStorage.getItem("vendoz_event_popup_shown");
        if (!shown) {
            setShowPopup(true);
            sessionStorage.setItem("vendoz_event_popup_shown", "true");
        }
    }, []);

    return (
        <div>
            <Header activeHeading={1} />
            <Hero />
            <Categories />
            <BestDeals />
            <Events />
            <FeaturedProduct />
            <Sponsored />
            <Footer />
            <EventPopupModal 
                showPopup={showPopup} 
                setShowPopup={setShowPopup} 
                eventItems={eventItems} 
            />
        </div>
    )
}

export default HomePage;