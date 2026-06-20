import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from '../components/Layout/Header'
import styles from "../styles/styles";
import ProfileSideBar from "../components/Profile/ProfileSidebar";
import ProfileContent from "../components/Profile/ProfileContent";


const ProfilePage = () => {
    const [searchParams] = useSearchParams();
    const [active, setActive] = useState(1);

    useEffect(() => {
        const activeTab = searchParams.get("active");
        if (activeTab) {
            setActive(parseInt(activeTab));
        }
    }, [searchParams]);

    return (
        <div>
            <Header isNavbarHidden={true} />
            <div className={`${styles.section} flex bg-[#f5f5f5] py-10 gap-6`}>
                <div className="w-[50px] 800px:w-[335px]">
                    <ProfileSideBar active={active} setActive={setActive} />
                </div>
                <div className="flex-1">
                    <ProfileContent active={active} />
                </div>
            </div>
        </div>
    )
}

export default ProfilePage