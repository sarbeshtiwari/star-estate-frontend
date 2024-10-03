import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import axiosInstance from '../views/utils/axiosInstance';

const SearchModal = ({ show, handleClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [multipleResults, setMultipleResults] = useState([]); // State for multiple project results
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchTerm(e.target.value); // Update searchTerm on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.get(`/addProjects/search`, {
        params: { searchTerm }
      });

      const results = response.data;

      if (results.length > 0) {
        const firstResult = results[0];

        // Handle navigation based on the first result's fields
        if (firstResult.projectBy) {
          closeModal();
          navigate(`/builder/${encodeURIComponent(firstResult.projectBy.value)}`);
        } else if (firstResult.cityLocation) {
          closeModal();
          navigate(`/city/${encodeURIComponent(firstResult.cityLocation.value)}`);
        } else if (firstResult.slugURL) {
          if (results.length === 1) {
            // Navigate to the single project
            navigate(`${firstResult.slugURL}`);
          } else if (results.length > 1) {
            // Set the multiple results to be displayed for user selection
            setMultipleResults(results);
          }
        }
      } else {
        Swal.fire({
          icon: 'info',
          title: 'No Results Found',
          text: `We are unable to find details for ${searchTerm}.`,
          confirmButtonText: 'OK'
        });
      }

      setSearchTerm(''); // Clear search term
      // handleClose(); // Only close modal if no multiple results are found
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const closeModal = () => {
    setSearchTerm(''); // Clear search term
    setMultipleResults([]); // Clear the multiple results when modal is closed
    handleClose(); // Close modal
  };

  const handleProjectSelection = (slugURL) => {
    navigate(`${slugURL}`); // Navigate to the selected project
    closeModal(); // Close the modal after selection
  };

    // Disable back button by overriding popstate event
    useEffect(() => {
      const handleBackButton = (event) => {
        event.preventDefault();
        // Push the current page again to the history, preventing back navigation
        window.history.pushState(null, null, window.location.href);
      };
  
      // Add event listener for popstate (back button)
      window.addEventListener('popstate', handleBackButton);
  
      return () => {
        // Clean up the event listener when the component unmounts
        window.removeEventListener('popstate', handleBackButton);
      };
    }, []);

  return (
    <div className={`modal fade ${show ? 'show d-block' : ''}`} id="searchModal" tabIndex="-1" aria-labelledby="searchModalLabel" aria-hidden={!show} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog modal-fullscreen modal-dialog-centered">
        <div className="modal-content p-0">
          <div className="modal-body d-flex align-items-center justify-content-center">
            <div className="search-filter w-100">
              <button type="button" className="close" onClick={closeModal} aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
              <div className="filter-form">
                <div className="heading">
                  <h5 className="mb-0">Search your dream home.</h5>
                </div>
                <form id="searchForm" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter builder, city, project name..."
                      value={searchTerm}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="readmore mt-0">
                    <input type="hidden" name="projectfltr" value="active" />
                    <button className="button w-100 h-100" type="submit">
                      Search
                    </button>
                  </div>
                </form>
              </div>

              {multipleResults.length > 1 && (
                <div className="project-selection">
                  <h6>Select a Project:</h6>
                  <ul className="list-group">
                    {multipleResults.map((result) => (
                      <li key={result._id} className="list-group-item list-group-item-action" onClick={() => handleProjectSelection(result.slugURL)} style={{ cursor: 'pointer' }}>
                        {result.projectName.value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
































// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// import { fetchCategories, fetchCities, fetchProjects } from '../../apis/home-page-api';

// const SearchModal = ({ show, handleClose }) => {
//   const [categories, setCategories] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [formData, setFormData] = useState({
//     projectName: '',
//     cityLocation: '',
//     projectConfiguration: '',
//     projectPrice: '',
//     property_type: '',
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCategories().then(data => setCategories(data)).catch(console.error);
//     fetchCities().then(data => setCities(data)).catch(console.error);
//   }, []);

//   useEffect(() => {
//     if (formData.property_type && formData.cityLocation) {
//       fetchProjects(formData.property_type)
//         .then(data => {
//           const filteredProjects = data.filter(project => project.cityLocation === formData.cityLocation);
//           setProjects(filteredProjects);
//         })
//         .catch(console.error);
//     }
//   }, [formData.property_type, formData.cityLocation]);

//   useEffect(() => {
//     const handlePopState = () => {
//       handleClose(); // Close the modal on back button press
//     };

//     if (show) {
//       window.history.pushState(null, null, window.location.href); // Disable back button
//       window.addEventListener('popstate', handlePopState);
//     }

//     return () => {
//       window.removeEventListener('popstate', handlePopState);
//     };
//   }, [show, handleClose]);

//   useEffect(() => {
//     if (show) {
//       document.body.style.overflow = 'hidden'; // Disable scrolling
//     } else {
//       document.body.style.overflow = 'unset'; // Enable scrolling
//     }

//     return () => {
//       document.body.style.overflow = 'unset'; // Ensure scrolling is enabled on unmount
//     };
//   }, [show]);

//   const handleChange = async (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });

//     if (name === 'property_type' && value) {
//       await fetchProjects(value).then(data => setProjects(data)).catch(console.error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       let minPrice = '';
//       let maxPrice = '';
//       if (formData.projectPrice.includes('-')) {
//         [minPrice, maxPrice] = formData.projectPrice.split('-');
//       } else {
//         minPrice = formData.projectPrice;
//         maxPrice = formData.projectPrice;
//       }

//       const queryParams = new URLSearchParams({
//         projectType: formData.property_type,
//         propertyLocation: formData.cityLocation,
//         minPrice: minPrice,
//         maxPrice: maxPrice,
//       }).toString();

//       navigate(`/projects?${queryParams}`);
//       handleClose(); // Close the modal after navigating
//     } catch (error) {
//       console.error('Error submitting search:', error);
//     }
//   };

//   return (
//     <div className={`modal fade ${show ? 'show d-block' : ''}`} id="searchModal" tabIndex="-1" aria-labelledby="searchModalLabel" aria-hidden={!show} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
//       <div className="modal-dialog modal-fullscreen modal-dialog-centered">
//         <div className="modal-content p-0">
//           <div className="modal-body d-flex align-items-center justify-content-center">
//             <div className="search-filter w-100">
//               <button type="button" className="close" onClick={handleClose} aria-label="Close">
//                 <span aria-hidden="true">×</span>
//               </button>
//               <div className="filter-form">
//                 <div className="heading">
//                   <h5 className="mb-0">Search your dream home.</h5>
//                 </div>
//                 <form id="categoryfilter" encType="multipart/form-data" onSubmit={handleSubmit}>
//                   <div className="row gx-0 gx-md-2 gap-form-row">
//                     <div className="col-md-10 px-0 px-md-2">
//                       <div className="inner">
//                         <div className="row gx-0 gy-3 gy-md-0">
//                           <div className="col px-0">
//                             <select
//                               name="property_type"
//                               id="property_type"
//                               className="form-control bg-white my-0"
//                               value={formData.property_type}
//                               onChange={handleChange}
//                             >
//                               <option value="">Property Type</option>
//                               {categories
//                                 .filter(category => category.status)
//                                 .map(filteredCategory => (
//                                   <option key={filteredCategory._id} value={filteredCategory.slugURL}>
//                                     {filteredCategory.category}
//                                   </option>
//                                 ))}
//                             </select>
//                           </div>
//                           <div className="col px-0">
//                             <select
//                               name="cityLocation"
//                               id="cityLocation"
//                               className="form-control bg-white my-0"
//                               value={formData.cityLocation}
//                               onChange={handleChange}
//                             >
//                               <option value="">Project Location</option>
//                               {cities.map(city => (
//                                 <option key={city._id} value={city.slugURL}>
//                                   {city.location}
//                                 </option>
//                               ))}
//                             </select>
//                           </div>
//                           <div className="col px-0">
//                             <select
//                               name="projectPrice"
//                               id="projectPrice"
//                               className="form-control bg-white my-0"
//                               value={formData.projectPrice}
//                               onChange={handleChange}
//                             >
//                               <option value="">Budget</option>
//                               <option value="10000000">UpTo 1 Cr.</option>
//                               <option value="10000000-30000000">1 - 3 Cr.</option>
//                               <option value="30000000-50000000">3 - 5 Cr.</option>
//                               <option value="50000000">Above 5 Cr.</option>
//                             </select>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-md-2 px-0 px-md-2 readmore w-auto mt-0">
//                       <input type="hidden" name="projectfltr" value="active" />
//                       <button className="button w-100 h-100" type="submit">
//                         Search
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchModal;
