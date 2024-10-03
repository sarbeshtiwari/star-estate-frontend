import React, { useEffect, useState } from 'react';
import Banner from "./banner";
import CitywiseContainer from "./cities";
import InsightsTools from "./insight_tools";
import ProjectSlider from "./luxury_projects";
import NewsViews from "./news_views";
import SocialMediaFeed from "./social_media";
import LandingWrapper from "./add"; // Landing page wrapper

export default function Home() {
    // const [showLanding, setShowLanding] = useState(null); // Use null to indicate "loading"

    // useEffect(() => {
    //     // Check if the user has already accepted the disclaimer in the session
    //     const hasAccepted = sessionStorage.getItem('landingAccepted');
    //     if (hasAccepted) {
    //         setShowLanding(false); // Hide LandingWrapper if accepted
    //     } else {
    //         setShowLanding(true); // Show LandingWrapper if not accepted
    //     }
    // }, []);

    // const handleAccept = () => {
    //     // Set a flag in sessionStorage
    //     sessionStorage.setItem('landingAccepted', 'true');
    //     setShowLanding(false); // Hide the LandingWrapper
    // };

    // // Don't render anything until showLanding is determined
    // if (showLanding === null) {
    //     return null; // Or you can return a loader/spinner if desired
    // }

    return (
        <>
            {/* {showLanding ? (
                <LandingWrapper handleAccept={handleAccept} />
            ) : ( */}
                <>
                    <Banner />
                    <InsightsTools />
                    <ProjectSlider />
                    <CitywiseContainer />
                    <NewsViews />
                    <SocialMediaFeed />
                </>
            {/* )} */}
        </>
    );
}
