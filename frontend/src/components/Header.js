import React,{useState} from 'react';
import { FiSearch } from 'react-icons/fi'; // <-- import a real search icon
import './Header.css'; // Import the CSS for this component
// import logo from '../../assets/images/logo.svg'; // Example: uncomment and adjust path if you have a logo image in src/assets


export default function Header() {
// --- State for the Search Input ---
 // Holds the current value typed into the search bar
 const [searchQuery, setSearchQuery] = useState('');


 // --- Handler for Input Change ---
 // Updates the searchQuery state whenever the user types
 const handleInputChange = (event) => {
   setSearchQuery(event.target.value);
 };


 // --- Handler for Search Submission ---
 // Called when the form is submitted (e.g., user presses Enter)
 const handleSearchSubmit = (event) => {
   event.preventDefault(); // Prevent the default form submission behavior (page reload)
   console.log('Search Submitted:', searchQuery); // Log the query for now
   // --- !!! Add your actual search logic here !!! ---
   // This could involve:
   // - Navigating to a search results page (/search?q=...)
   // - Calling an API endpoint with the searchQuery
   // - Filtering data displayed on the current page
   // -------------------------------------------------
   // Optionally clear the input after submission:
   // setSearchQuery('');
 };


 return (
   <header className="site-header">
     <div className="nav-left"> {/* Optional container for layout */}
       <button className="tab-button">Globe</button>
     </div>


       <div className="nav-center">
         <h1>Protect Our Pals</h1>
       </div>
       <div className="nav-right">
           {/* Wrap input in a form for handling submission */}
           <form className = "search-form" onSubmit={handleSearchSubmit}>
             <input
               type="search"
               className="search-input"
               placeholder="Search for an animal!"
               value={searchQuery}
               onChange={handleInputChange}
               aria-label="Search site content"
               />
               {/* Optional: Keep the icon as a submit button */}
               <button type="submit" className="search-submit-button" aria-label="Submit search">
                 <FiSearch className="search-icon"/> {/* Reuse the icon */}
               </button>
             </form>
           </div>
         </header>
       );
}
