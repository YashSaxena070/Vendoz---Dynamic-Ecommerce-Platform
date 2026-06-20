import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import TrackOrder from "../components/Profile/TrackOrder";

const TrackOrderPage = () => {
    return (
        <div>
            <Header isNavbarHidden={true} />
            <TrackOrder />
            <Footer />
        </div>
    )
}

export default TrackOrderPage