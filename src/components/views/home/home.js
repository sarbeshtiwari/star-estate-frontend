import React, { useState } from 'react';
import './App.css';
import Banner from "./banner";
import CitywiseContainer from "./cities";
import InsightsTools from "./insight_tools";
import ProjectSlider from "./luxury_projects";
import NewsViews from "./news_views";
import SocialMediaFeed from "./social_media";
import LandingWrapper from "./add";  // Import the LandingWrapper component

export default function Home() {
    const [showLanding, setShowLanding] = useState(true); // State to manage landing page visibility

    const handleAccept = () => {
        setShowLanding(false); // Hide the LandingWrapper when "Accept & Enter" is clicked
    };

    return (
        <>
            {showLanding ? (
                <LandingWrapper handleAccept={handleAccept} />
            ) : (
                <>
                    <header className="header"> {/* Show header when LandingWrapper is hidden */}
                        {/* Your header content goes here */}
                    </header>
                    
                    <Banner />
                    <InsightsTools />
                    <ProjectSlider />
                    <CitywiseContainer />
                    <NewsViews />
                    <SocialMediaFeed />
                    
                    <footer className="footer"> {/* Show footer when LandingWrapper is hidden */}
                        {/* Your footer content goes here */}
                    </footer>
                </>
            )}
        </>
    );
}
