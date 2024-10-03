import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function BuyerGuide() {

    const [activeSection, setActiveSection] = useState('what');

    const handleToggle = (section) => {
        setActiveSection(section);
    };

    return (
        <div>
            <div className="insideBanner">
                <picture>
                    <source media="(max-width: 820px)" srcSet="/star-estate-react/assets/images/banner-emi-calculator-m.jpg" />
                    <img src="/star-estate-react/assets/images/banner-emi-calculator.jpg" className="h-100 object-cover" alt="Star Estate" />
                </picture>
            </div>
            <div className="w-100">
                <div className="container-lg">
                    <div className="breadcrumbContainer" aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                            <li className="breadcrumb-item active">Buyer Guide</li>

                        </ol>
                    </div>
                </div>
            </div>
            <div className="w-100 padding">
                <div className="container-lg">
                    <div className="heading mx-sm-auto text-sm-center">
                        <h1 className="h3 mb-0">Buyer Guide</h1>
                    </div>
                    <div className="toggleHead flex-wrap">
                        <button
                            className={`toggleBtn buyerToggleBtn ${activeSection === 'what' ? 'active' : ''}`}
                            onClick={() => handleToggle('what')}
                            style={{ '--clr': 'var(--primary-color)' }}
                        >
                            What to Buy
                        </button>
                        <button
                            className={`toggleBtn buyerToggleBtn ${activeSection === 'when' ? 'active' : ''}`}
                            onClick={() => handleToggle('when')}
                            style={{ '--clr': 'var(--primary-color)' }}
                        >
                            When to Buy
                        </button>
                        <button
                            className={`toggleBtn buyerToggleBtn ${activeSection === 'where' ? 'active' : ''}`}
                            onClick={() => handleToggle('where')}
                            style={{ '--clr': 'var(--primary-color)' }}
                        >
                            Where to Buy
                        </button>
                        <button
                            className={`toggleBtn buyerToggleBtn ${activeSection === 'how' ? 'active' : ''}`}
                            onClick={() => handleToggle('how')}
                            style={{ '--clr': 'var(--primary-color)' }}
                        >
                            How to Buy
                        </button>
                        {/* <button
                            className={`toggleBtn buyerToggleBtn ${activeSection === 'financials' ? 'active' : ''}`}
                            onClick={() => handleToggle('financials')}
                            style={{ '--clr': 'var(--primary-color)' }}
                        >
                            Financials
                        </button> */}
                    </div>

                    <div className={`buyers-container toggleWrapper ${activeSection === 'what' ? 'show' : ''}`} id="toggleWrapper-what">
                        <div className="heading">
                            <h2 className="mb-0 text-texture">
                                What to Buy?
                            </h2>
                        </div>

                        <div className="buyer-text-box mb-4">
                            <div className="heading">
                                <h6 className="mb-0 text-primary"># Under-Construction Vs. Ready-To-Move-In</h6>
                            </div>
                            <p className="mb-0">Buying the home in the modern day is not an easy task. Many homebuyers are confused about whether to buy the under-construction or a ready-to-move-In residential project. When you are choosing the ready-to-move unit ten it is important to know the quality of construction. Making proper verification is quite important before buying the project. Under-construction homes have been developed with many numbers pf amenities that includes green spaces, lifts, swimming pools, parking space, and many more. Homebuyers can take more possession of flats with better- highlighted features. Normally, the under-construction home is always the best option for those who like to gain better investment along with higher property returns. The cost of the under- construction homes escalates along with the stages of completion. Normally, when you like to move to a city immediately for your job or any other reasons, then choosing the ready-to-move- in option is a better way. Under-Construction projects are best for your long-term investment.</p>
                        </div>
                        <div className="buyer-text-box mb-4">
                            <div className="heading">
                                <h6 className="mb-0 text-primary"># Investing Vs. End-Use</h6>
                            </div>
                            <p className="mb-0">Whether you are choosing the real estate asset, then choosing the particular property with the best buying guide is quite important. Investing and end-use are mainly considered as the most important to be considered when you are buying a property.</p>
                        </div>
                        <div className="buyer-text-box mb-4">
                            <div className="heading">
                                <h6 className="mb-0 text-primary"># Location</h6>
                            </div>
                            <ul className="list mb-0" >
                                <li><strong>For End-Users:</strong> Before buying a property, it is important to know about the stage of construction. These would determine the complete monthly outflow in EMIs for availing the home loan.</li>
                                <li><strong>For Investors:</strong> Getting quick returns are easier with the economic sense on entering into the launch stage or pre-launch. There will be no surety of any timely delivery</li>
                            </ul>
                        </div>
                        <hr className="my-4 border-dotted mb-4" />
                        <div className="buyer-text-box">
                            <div className="heading">
                                <h6 className="mb-0 text-primary"># Leasehold Vs. Freehold</h6>
                            </div>
                            <p className="mb-0">Buying the freehold property makes you the complete option for owning the land that it is built on. You can live in the freehold property as long as you desire. You have the complete right to make alterations such as the structural changes in the house anytime. When you have the leasehold Property, then you have the right to reside for the stipulated time. In this case, the buyer is not the owner of the property. You need to pay ground rent to the owner or leaseholder. Ownership of the property will be automatically be given back to the landowner when the duration of the lease expires.</p>
                        </div>
                        <hr className="my-4 border-dotted mb-4" />
                        <div className="buyer-text-box">
                            <div className="heading">
                                <h6 className="mb-0 text-primary"># Apartment Vs Villa Vs Plot</h6>
                            </div>
                            <p className="mb-0">When you are looking to buy the new home, then you would be confused about whether to choose the Apartment, Villa, or a Plot. When you are buying a plot, then you would get complete satisfaction as well as the freedom to build your own home. Villas is available with various attributes that give more pride to living in the independent house. These would add the complete freedom and privacy without any requirement of the huge investment for construction. Gated villas are attracting the attention of affluent class buyers for paying ore amount these days. Most homebuyer prefers to choose the flats compared to the plots. The main reason is that they have a lesser initial investment needed.</p>
                        </div>

                    </div>

                    <div className={`buyers-container toggleWrapper ${activeSection === 'when' ? 'show' : ''}`} id="toggleWrapper-when">
                        <div className="heading">
                            <h2 className="mb-0 text-texture">
                                When to Buy?
                            </h2>
                        </div>
                        <div className="buyer-text-box mb-4">
                            <div className="heading">
                                <h6 className="mb-0 text-primary"># Assessing Your Affordability</h6>
                            </div>
                            <p className="mb-0">When you are buying a new home, then it is important to know about the economic strain in the future. Before finalizing the purchase, you need to estimate how you could finance the home.</p>
                        </div>
                        <div className="buyer-text-box mb-4">
                            <div className="heading">
                                <h6 className="mb-0 text-primary"># EMI Affordability</h6>
                            </div>
                            <p className="mb-0">EMI or Equated Monthly Installment is most preferred for home loans. When you are buying a new home, then it is important to analyze whether the EMI is available within the comfort zone. EMI must not exceed 40% of the monthly income.</p>
                        </div>
                        <div className="buyer-text-box mb-4">
                            <div className="heading">
                                <h6 className="mb-0 text-primary"># Down Payment</h6>
                            </div>
                            <p className="mb-0">Paying the down payment of 20 to 25% of the total cost of your house is quite important for buying a new home.</p>
                        </div>
                        <div className="buyer-text-box mb-4">
                            <div className="heading">
                                <h6 className="mb-0 text-primary"># Role Of CIBIL Score</h6>
                            </div>
                            <p className="mb-0">CIBIL credit scores are mainly enabled with the three-digit numeric outline in the credit card history, and it is included in the credit profile. When you have the higher credit score, such as 900 or higher, then you could easily get more loans. Credit scores are directly correlated with financial status. Having a higher credit score would also lower the risk of loan rejection. When you have a bad credit history, it will affect your status as the lender would analyze that you are a low-risk investment. The minimum credit score for buying the house is 620. Improve Bad Credit with these techniques:
                            </p>
                            <ol className="list mb-0">
                                <li>Make payments on time</li>
                                <li>Use the credit card wisely</li>
                                <li>Do not take too much credit</li>
                                <li>Keep the check on a credit report</li>
                                <li>Avoid applying for too many loans</li>
                            </ol>
                        </div>
                        <div className="buyer-text-box mb-4">
                            <div className="heading">
                                <h6 className="mb-0 text-primary"># The Consumer Buying Cycle</h6>
                            </div>
                            <p className="mb-0">When you like to buy a property, then choosing the best time is quite important. The main reason is that the timing of the property purchase gives you a better saving option. Thorough market research is quite important for buying a property. When you are buying property young or less than 30 years of age, then they are referred to as the young in the property. Young professionals have been earning to the tune of Rs 10 lakh before reaching 30s of age. Investing in property mainly entails with huge tax benefits. Below are the list of common buying cycles that includes:</p>
                            <ol className="list mb-0">
                                <li>Better planning</li>
                                <li>Fewer financial liabilities in old age</li>
                                <li>Limited available funds</li>
                                <li>Buying in middle age</li>
                                <li>Partner’s contribution</li>
                                <li>More disposable income</li>
                            </ol>
                        </div>
                        <div className="buyer-text-box mb-4">
                            <div className="heading">
                                <h6 className="mb-0 text-primary"># Buying Around Festive</h6>
                            </div>
                            <p className="mb-0">Many numbers of Investors are looking for an effective way to save their money while buying the property. When you are end-user planning to buy his dream home, then knowing about the pessimistic market scenario would be suitable for gaining more benefits. Buying the home during the festive seasons would be suitable for getting special discounts or avoid making split-second decisions. When you have the right information and exercise due diligence, then you would gain better transactions. You could easily bargain the deals so that there is a huge inventory pile-up ready-to-move-in houses available. Property prices are at their ‘lowest best,’ and it is difficult to lower the price of real estate.</p>
                        </div>
                        {/* Add more buyer-text-boxes here */}
                    </div>

                    <div className={`buyers-container toggleWrapper ${activeSection === 'where' ? 'show' : ''}`} id="toggleWrapper-where">
                        <div className="heading">
                            <h2 className="mb-0 text-texture">
                                Where to Buy?
                            </h2>
                        </div>
                        <div className="buyer-text-box mb-4">
                            <div className="heading">
                                <h6 className="mb-0 text-primary"># City Or Suburbs?</h6>
                            </div>
                            <p className="mb-0">One of the biggest questions while buying a new home is the location. Everyone is looking for spacious housing units, social infrastructure, competitive pricing, and the best features in the metro cities. New age investors are looking to gain better attraction in the city as there would be a lot of amenities that could be seen. The decision of buying in the city or the suburb ideally be the function of requirements. When you are looking to buy the property for end-use, then you could opt for the city lifestyle. When you like to buy the property for investment, then suburbs yield higher returns then Investing in cities provides you the well-established social and physical infrastructure. When you are planning to buy the property as the investment, then you can make it as the investment for the economic sense.</p>
                        </div>
                        <div className="buyer-text-box mb-4">
                            <div className="heading">
                                <h6 className="mb-0 text-primary"># Metros Or Other Cities?</h6>
                            </div>
                            <p className="mb-0">The most common decision in buying the property is whether to invest in small cities or metro cities. It mainly depends on the purpose of purchase. When you are buying a property in the metro city, then it would be quite expensive compared to buying in the Tier II or Tier III city. Location is the key criterion while making the decision on the real estate purchase. When you are an end-user, then you should own a home in a location that gives the self-sufficient physical as well as social infrastructure. Choosing the metro cities also brings you the better option for planning and settling for job opportunities.</p>
                        </div>
                        <div className="buyer-text-box mb-4">
                            <div className="heading">
                                <h6 className="mb-0 text-primary"># Developed Vs. Developing Localities</h6>
                            </div>
                            <p className="mb-0">Choosing between the Developed and Developing Localities for buying the property is quite an important option. It is necessary to weigh various attributes such as quality of social and civic infrastructure, accessibility, and appreciation in the locality for making a purchase. When you are investing in a developed locality, then there is only low risk when the capital appreciation is slower. There is a growing demand for pressurizing existing supply, and this mainly results in the limited scope of price dip and even the negotiation. Well-developed area has the robust infrastructure. Investing in developing localities also helps you to attain better returns as these would contribute to future growth attributes. There is higher land availability in the emerging locality compared to the developed area. This would mainly keep the prices under check and a more convenient option to find the better rate of absorption of land. It is also important to make sure that the area is a dependable Municipal Corporation with burgeoning infrastructure.</p>
                        </div>
                        <div className="buyer-text-box mb-4">
                            <div className="heading">
                                <h6 className="mb-0 text-primary"># Home Hunting Comparison</h6>
                            </div>
                            <p className="mb-0">Purchasing the dream home mainly involves more research across various attributes. When you are on the hunting of the new home, then making the right comparison of the property, accessibility, location, price, amenities, and many others are quite important. Drawing comparisons among different options available are common. These are mainly cumbersome processes, so that they would provide you the complete aspects. Having the Comparison Checklist on the various property is quite helpful for you to easily save your time. These are also a suitable option for shortlisting the properties along with the varied attributes. These also mainly give the better scope of healthy appreciation on the invested amount.</p>
                        </div>
                        {/* Add more buyer-text-boxes here */}
                    </div>

                    <div className={`buyers-container toggleWrapper ${activeSection === 'how' ? 'show' : ''}`} id="toggleWrapper-how">
                        <div className="heading">
                            <h2 className="mb-0 text-texture">
                                How to Buy?
                            </h2>
                        </div>
                        <div className="buyer-text-box mb-4">
                            <div className="heading">
                                <h6 className="mb-0 text-primary"># Using Online &amp; Offline Sources</h6>
                            </div>
                            <p className="mb-0">In the modern-day, home buying becomes highly easier with the introduction of technology and high-speed online networking. You could easily do the quick search about the availability of property in a certain location using the online aspects. It is also quite an efficient option for searching and shortlisting properties on online websites. Normally, the complete home buying cycle requires both offline and online sources so that they would make the buying process more effective.</p>
                        </div>
                        <div className="buyer-text-box mb-4">
                            <div className="heading">
                                <h6 className="mb-0 text-primary"># Offline</h6>
                            </div>
                            <p className="mb-0">Homebuyers also have been considering the advice of friends and family. Viewing the property on-site makes it more reliable before purchasing the dream home. Valuable information could be easily gathered by paying heed to the property buyers and seasoned investors.</p>
                        </div>
                        <div className="buyer-text-box mb-4">
                            <div className="heading">
                                <h6 className="mb-0 text-primary"># Online</h6>
                            </div>
                            <p className="mb-0">There are lots of real estate portals available so that it gives better home buying option. You can easily enjoy viewing the property listings with more features like:</p>
                            <ol className="list mb-0">
                                <li>Micro search engines</li>
                                <li>Map-based searches</li>
                                <li>Virtual tours</li>
                                <li>Locality wise prices</li>
                                <li>3D floor plans</li>
                            </ol>
                        </div>
                        <div className="buyer-text-box mb-4">
                            <div className="heading">
                                <h6 className="mb-0 text-primary"># Finding A Good Broker</h6>
                            </div>
                            <p className="mb-0">A real estate broker is the middleman between the buyer and seller. When the real estate broker is genuine and trustworthy, then it would give you the healthy deal. It is quite imperative to select the right broker with multiple options. Before finding a broker, it is important to have the best research, so it helps to make the informed decision.</p>
                            <ul className="list mb-0">
                                <li>Be aware of the local market dynamics.</li>
                                <li>The broker needs to be well-versed with rules and regulations with the property.</li>
                                <li>Opt for the licensed broker</li>
                                <li>Brokers need to be registered under RERA</li>
                                <li>Credible broker networks with multiple developers and property owners</li>
                                <li>Reviews about the broker</li>
                            </ul>
                        </div>
                        <div className="buyer-text-box mb-4">
                            <div className="heading">
                                <h6 className="mb-0 text-primary"># Shortlisting Safe Builder</h6>
                            </div>
                            <p className="mb-0">Normally, the budget and location are considered as the most important thing for making a decision on home buying. When the builder is of utmost importance, then it is quite important to choose the best builder accordingly. You need to have the comprehensive background check of the builder. These would mainly ensure the complete future security of the investment. Below are the steps for shortlisting or determining the safe builders:</p>
                            <ul className="list mb-0">
                                <li>All developers need to be registered under their respective State regulatory authority.</li>
                                <li>Check whether the builder has a RERA certificate</li>
                                <li>Visit completed projects of the builder</li>
                                <li>Know about the Reputation and background check</li>
                                <li>Verification of builder through credible brokers, banks, as well as other builders’</li>
                                <li>association bodies</li>
                                <li>Learn about the reputation of the builder</li>
                                <li>Make sure the company is <b>ISO 9000+ certified</b></li>
                            </ul>
                        </div>
                        <div className="buyer-text-box">
                            <div className="heading">
                                <h6 className="mb-0 text-primary"># Important Documents</h6>
                            </div>
                            <p>When you are Verifying the documentation related to property that you are about to purchase, then it is important to have legal adversities associated with the process. when you are buying the property from an individual owner or a builder, then you need to take care of the below documents, such as:</p>
                            <div className="row">
                                <div className="col-xl-6">
                                    <ul className="list">
                                        <li>Systematic Registered Agreement for sale</li>
                                        <li>RERA certificate</li>
                                        <li>Approvals and sanctions obtained by the</li>
                                        <li>Payment clauses</li>
                                        <li>Project completion timeline</li>
                                        <li>Title deed</li>
                                        <li>Funding source</li>
                                        <li>Loans or mortgages</li>
                                    </ul>
                                </div>
                                <div className="col-xl-6">
                                    <ul className="list mb-0">
                                        <li>Approved project layout</li>
                                        <li>Interest and penalties to be levied on a buyer</li>
                                        <li>Information about the previous ownership and occupancy</li>
                                        <li>Owner’s name</li>
                                        <li>Land’s survey number</li>
                                        <li>The total area of the land</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BuyerGuide