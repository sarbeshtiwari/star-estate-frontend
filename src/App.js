// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle.min';
// import './props.css';
// import './assets/css/swiper.bundle.css';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Home from './components/views/home/home';
// import EmiCalculator from './components/insight-components.js/emi-calculator';
// import PropertyEvaluationReport from './components/insight-components.js/property-evaluation-report';
// import NriGuidelines from './components/insight-components.js/nri-guidelines';
// import RealityCheck from './components/insight-components.js/reality-check-before-buying';
// import AboutUs from './components/views/home/about-us';
// import ContactUs from './components/views/home/contact-us';
// import Career from './components/views/home/career';
// import CommercialProjects from './components/projects/commercial-projects';
// import CareerDetails from './components/views/home/career-details';
// import AllProjects from './components/projects/all-projects';
// import ProjectDetails from './components/projects/project-details';
// import ScrollToTop from './scrollToTop';
// import Advertisement from './components/views/home/advertisement';
// import './assets/css/responsive.css'
// import Awards from './components/views/home/awards';
// import Blogs from './components/views/home/blogs';
// import BlogDetails from './components/views/home/blog-details';
// import NewsDetails from './components/views/home/news-details';
// import News from './components/views/home/news';
// import Events from './components/views/home/events';
// import EventDetails from './components/views/home/eventsDetails';
// import AllCities from './components/views/home/allcities';
// import Builder from './components/projects/builder';
// import ClientsSpeak from './components/views/home/client-speak';
// import BuyerGuide from './components/views/home/buyersGuide';
// import SiteMap from './components/views/home/sitemap';
// import Header from './components/widgets/header';
// import Footer from './components/widgets/footer';

// function App() {
//   return (
//     <BrowserRouter basename='/star-estate-react'>
//       <ScrollToTop />
//       <Header/>
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/emi-calculator' element={<EmiCalculator />} />
//         <Route path='/property-evaluation-report' element={<PropertyEvaluationReport />} />
//         <Route path='/nri-guidelines' element={<NriGuidelines />} />
//         <Route path='/reality-check-before-buying' element={<RealityCheck />} />
//         <Route path='/:slugURL' element={<ProjectDetails />} />
//         <Route path='/about-us' element={<AboutUs />} />
//         <Route path='/contact-us' element={<ContactUs />} />
//         <Route path='/careers' element={<Career />} />
//         <Route path='/careers/:location/:id' element={<CareerDetails />} />
//         <Route path='/projects/:id' element={<CommercialProjects />} />
//         <Route path='/projects' element={<AllProjects />} />
//         <Route path="/city/:slugURL" element={<CommercialProjects />} />
//         <Route path="/builder/:slugURL" element={<Builder />} />
//         <Route path="/advertisements" element={<Advertisement />} />
//         <Route path="/awards" element={<Awards />} />
//         <Route path="/blogs" element={<Blogs />} />
//         <Route path='/blogs/:slugURL' element={<BlogDetails />} />
//         <Route path="/news" element={<News />} />
//         <Route path='/news/:slugURL' element={<NewsDetails />} />
//         <Route path="/events" element={<Events />} />
//         <Route path='/events/:slugURL' element={<EventDetails />} />
//         <Route path='/city' element={<AllCities />} />
//         <Route path='/clients-speak' element={<ClientsSpeak />} />
//         <Route path='/buyer-guide' element={<BuyerGuide/>}/>
//         <Route path='/sitemap' element={<SiteMap/>}/>


//       </Routes>
//       <Footer/>

//     </BrowserRouter>
//   );
// }

// export default App;


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './props.css';
import './assets/css/swiper.bundle.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/views/home/home';
import EmiCalculator from './components/insight-components.js/emi-calculator';
import PropertyEvaluationReport from './components/insight-components.js/property-evaluation-report';
import NriGuidelines from './components/insight-components.js/nri-guidelines';
import RealityCheck from './components/insight-components.js/reality-check-before-buying';
import AboutUs from './components/views/home/about-us';
import ContactUs from './components/views/home/contact-us';
import Career from './components/views/home/career';
import CommercialProjects from './components/projects/commercial-projects';
import CareerDetails from './components/views/home/career-details';
import AllProjects from './components/projects/all-projects';
import ProjectDetails from './components/projects/project-details';
import ScrollToTop from './scrollToTop';
import Advertisement from './components/views/home/advertisement';
import './assets/css/responsive.css';
import Awards from './components/views/home/awards';
import Blogs from './components/views/home/blogs';
import BlogDetails from './components/views/home/blog-details';
import NewsDetails from './components/views/home/news-details';
import News from './components/views/home/news';
import Events from './components/views/home/events';
import EventDetails from './components/views/home/eventsDetails';
import AllCities from './components/views/home/allcities';
import Builder from './components/projects/builder';
import ClientsSpeak from './components/views/home/client-speak';
import BuyerGuide from './components/views/home/buyersGuide';
import SiteMap from './components/views/home/sitemap';
import Header from './components/widgets/header';
import Footer from './components/widgets/footer';
import CPRegistration from './components/widgets/channelPartner';
import Faq from './components/views/home/faq';
import PrivacyPolicy from './components/views/home/privacy-policy';
import NewScreen from './components/views/home/desclaimer.js';

function AppContent() {
  const location = useLocation();

  // Hide Header and Footer for the dynamic ProjectDetails route
  const isProjectDetailsPage = /^\/[^/]+$/.test(location.pathname) && ![
    '/emi-calculator',
    '/property-valuation',
    '/nri-guidelines',
    '/reality-check-before-buying',
    '/about-us',
    '/contact-us',
    '/careers',
    '/projects',
    '/advertisements',
    '/awards',
    '/blogs',
    '/news',
    '/events',
    '/city',
    '/clients-speak',
    '/buyer-guide',
    '/sitemap',
    '/channel-partner-registration',
    '/faq',
    '/privacy-policy',
    '/desclaimer'
  ].includes(location.pathname);

  return (
    <>
      {!isProjectDetailsPage && <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/emi-calculator' element={<EmiCalculator />} />
        <Route path='/property-valuation' element={<PropertyEvaluationReport />} />
        <Route path='/nri-guidelines' element={<NriGuidelines />} />
        <Route path='/reality-check-before-buying' element={<RealityCheck />} />
        <Route path='/:slugURL' element={<ProjectDetails />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/careers' element={<Career />} />
        <Route path='/careers/:location/:id' element={<CareerDetails />} />
        <Route path='/projects/:id' element={<CommercialProjects />} />
        <Route path='/projects' element={<AllProjects />} />
        <Route path="/city/:slugURL" element={<CommercialProjects />} />
        <Route path="/builder/:slugURL" element={<Builder />} />
        <Route path="/advertisements" element={<Advertisement />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path='/blogs/:slugURL' element={<BlogDetails />} />
        <Route path="/news" element={<News />} />
        <Route path='/news/:slugURL' element={<NewsDetails />} />
        <Route path="/events" element={<Events />} />
        <Route path='/events/:slugURL' element={<EventDetails />} />
        <Route path='/city' element={<AllCities />} />
        <Route path='/clients-speak' element={<ClientsSpeak />} />
        <Route path='/buyer-guide' element={<BuyerGuide />} />
        <Route path='/sitemap' element={<SiteMap />} />
        <Route path='/channel-partner-registration' element={<CPRegistration />} />
        <Route path='/faq' element={<Faq />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
        <Route path= '/desclaimer' element={<NewScreen/>}/>
      </Routes>
      {!isProjectDetailsPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter basename='/star-estate-react'>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
