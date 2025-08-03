



import user from '../../assets/user.png';
import '../../header.css';
import dataseekers from '../../assets/dataseekers.png';
import uco from '../../assets/uco.png'
import { useState, useEffect, useRef } from 'react';



const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        // scrolling down
        setShowNavbar(false);
      } else {
        // scrolling up
        setShowNavbar(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`custom-navbar py-3 ${showNavbar ? 'show' : 'hide'}`}>
      <div className="container">
        {/* <div className="d-flex flex-wrap align-items-center justify-content-space-between">
         */}
         <div className="d-flex flex-wrap align-items-center justify-content-between w-100">

          <div className="d-flex align-items-center">
             <img src={uco} alt="UCO" className="logo-img" 
             style={{height:'100px',width:'100px',
              marginRight:'2rem',
             }}/>

            <img src={dataseekers} alt="DATA SEEKERS" className="logo-img" />
          </div>

          <button className="hamburger d-lg-none" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>

          {menuOpen && (
            <ul className="nav nav-links d-lg-none w-100 flex-column mt-3">
              <li><a href="/" className="nav-link custom-nav-btn">Home</a></li>
              <li><a href="/AboutUs" className="nav-link custom-nav-btn">About Us</a></li>
              <li><a href="/AboutProject" className="nav-link custom-nav-btn">About Project</a></li>
              <li><a href="/BankDashboard" className="nav-link custom-nav-btn">Bank Dashboard</a></li>
            </ul>
          )}

          <div className="d-none d-lg-flex align-items-center gap-3 ">
            <ul className="nav nav-links mb-0">
              <li><a href="/" className="nav-link custom-nav-btn">Home</a></li>
              <li><a href="/AboutUs" className="nav-link custom-nav-btn">About Us</a></li>
              <li><a href="/AboutProject" className="nav-link custom-nav-btn">About Project</a></li>
               <li><a href="/BankDashboard" className="nav-link custom-nav-btn">Bank Dashboard</a></li>
            </ul>
            <a
              href="#"
              className="d-block link-light text-decoration-none"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={user}
                alt="user"
                width="36"
                height="36"
                className="rounded-circle border border-white"
              />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
