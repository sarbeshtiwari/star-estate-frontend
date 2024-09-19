import './App.css';
import Banner from "./banner";
import CitywiseContainer from "./cities";
import InsightsTools from "./insight_tools";
import ProjectSlider from "./luxury_projects";
import NewsViews from "./news_views";
import SocialMediaFeed from "./social_media";

export default function Home(){
    return (
        <>
        
        <Banner/>
        <InsightsTools/>
        <ProjectSlider/>
        <CitywiseContainer/>
        <NewsViews/>
        <SocialMediaFeed/>
        </>
    );
}