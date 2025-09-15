const Footer = () => {
  return (
    <footer className="w-screen bg-dark text-white py-4 mt-auto">
      <div className="container">
        <ul className="nav justify-content-center border-bottom border-secondary pb-3 mb-3">
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-secondary">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-secondary">
              About Us
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-secondary">
            About Project
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-secondary">
              Login
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-secondary">
              Signup
            </a>
          </li>
        </ul>
        <p className="text-center text-secondary mb-0">
          © {new Date().getFullYear()} All rights reserved @Data Seekers
        </p>
      </div>
    </footer>
  );
};

export default Footer;
