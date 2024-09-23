import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie
import Banner from "./banner";
import CitywiseContainer from "./cities";
import InsightsTools from "./insight_tools";
import ProjectSlider from "./luxury_projects";
import NewsViews from "./news_views";
import SocialMediaFeed from "./social_media";
import LandingWrapper from "./add";

export default function Home() {
    const [showLanding, setShowLanding] = useState(true); // State to manage landing page visibility

    useEffect(() => {
        // Cookies.remove('landingAccepted');
        // Check if the user has already accepted the disclaimer
        const hasAccepted = Cookies.get('landingAccepted');
        if (hasAccepted) {
            setShowLanding(false); // Hide LandingWrapper if accepted
        }
    }, []);

    const handleAccept = () => {
        // Set a cookie that expires in 2 minutes (120 seconds)
        Cookies.set('landingAccepted', 'true', { expires: 1 }); // 1 day
        // Cookies.set('landingAccepted', 'true', { expires: new Date(Date.now() + 2 * 60 * 1000) }); // 2 minutes
        setShowLanding(false); // Hide the LandingWrapper
    };

    return (
        <>
            {showLanding ? (
                <LandingWrapper handleAccept={handleAccept} />
            ) : (
                <>
                    <Banner />
                    <InsightsTools />
                    <ProjectSlider />
                    <CitywiseContainer />
                    <NewsViews />
                    <SocialMediaFeed />
                </>
            )}
        </>
    );
}
