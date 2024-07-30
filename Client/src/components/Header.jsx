import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/VJTI_Logo.png";
import { FaBars } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { UserContext } from "../context/userContext";

const Header = () => {
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800);
  const { currentUser } = useContext(UserContext);

  const closeNavHandler = () => {
    if (window.innerWidth < 800) {
      setIsNavShowing(false);
    }
  };

  const toggleNavHandler = () => {
    setIsNavShowing((prevIsNavShowing) => !prevIsNavShowing);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsNavShowing(window.innerWidth > 800);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav>
      <div className="container nav__container">
        <div className="nav__title">
          <Link to="/" className="nav__logo" onClick={closeNavHandler}>
            <img src={Logo} alt="NAVlogo" />
          </Link>
          <Link to="/" onClick={closeNavHandler}>
            <h1 className="nav__title__text">VJTI Connect</h1>
          </Link>
        </div>
        {isNavShowing && (
          <ul className="nav__menu">
            {currentUser && currentUser.id ? (
              <>
                <li>
                  <Link to={`/profile/${currentUser.id}`} onClick={closeNavHandler}>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/create" onClick={closeNavHandler}>
                    Create post
                  </Link>
                </li>
                <li>
                  <Link to="/authors" onClick={closeNavHandler}>
                    Clubs
                  </Link>
                </li>
                <li>
                  <Link to="/logout" onClick={closeNavHandler}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/authors" onClick={closeNavHandler}>
                    Clubs
                  </Link>
                </li>
                <li>
                  <Link to="/login" onClick={closeNavHandler}>
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        )}
        <button className="nav__toggle-btn" onClick={toggleNavHandler}>
          {isNavShowing ? <AiOutlineClose /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Header;


