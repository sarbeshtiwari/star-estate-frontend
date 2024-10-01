import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie
import Banner from "./banner";
import CitywiseContainer from "./cities";
import InsightsTools from "./insight_tools";
import ProjectSlider from "./luxury_projects";
import NewsViews from "./news_views";
import SocialMediaFeed from "./social_media";
import LandingWrapper from "./add"; // Landing page wrapper

export default function Home() {
    const [showLanding, setShowLanding] = useState(null); // Use null to indicate "loading"

    useEffect(() => {
        // Cookies.remove('landingAccepted');
        // Check if the user has already accepted the disclaimer
        const hasAccepted = Cookies.get('landingAccepted');
        if (hasAccepted) {
            setShowLanding(false); // Hide LandingWrapper if accepted
        } else {
            setShowLanding(true); // Show LandingWrapper if not accepted
        }
    }, []);

    const handleAccept = () => {
        // Set a cookie that expires in 1 day
        Cookies.set('landingAccepted', 'true', { expires: 1 }); // 1 day
        setShowLanding(false); // Hide the LandingWrapper
    };

    // Don't render anything until showLanding is determined
    if (showLanding === null) {
        return null; // Or you can return a loader/spinner if desired
    }

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
