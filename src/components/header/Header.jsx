import  { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./styles.scss";

import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import logo from "../../assets/logo-no-background.png";
import logo1 from "../../assets/logo.png";


const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    function controlHeader()
    {
      if(window.scrollY > 200)
      {
        if(window.scrollY > lastScrollY && !mobileMenu)
        {
          setShow("hide");
        }
        else
        {
          setShow("show")
        }
      }
      else
      {
        setShow("top");
      }
      setLastScrollY(window.scrollY)
    }
    useEffect(() =>{
      window.addEventListener("scroll", controlHeader)
      return () => {
        window.removeEventListener("scroll" , controlHeader)
      }
    },[lastScrollY])

    useEffect(() => {
      window.scroll(0, 0)
    },[location])

    function searchQueryHandler(event){
      if(event.key === "Enter" && query.length > 0  ){
          navigate(`/search/${query}`);
          setTimeout(() => {
            setShowSearch(false)
          }, 1000)
      }
  }
    function openSearch()
    {
      setMobileMenu(false)
      setShowSearch(true)
    }

    function openMobileMenu()
    {
      setMobileMenu(true)
      setShowSearch(false)
    }

    function navigationHandler(type)
    {
      if(type === "movie")
      {
        navigate("/explore/movie")
      }
      else
      {
        navigate("/explore/tv")
      }
      setMobileMenu(false)
    }
    return (
      <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`  }>
          <ContentWrapper>
            <div className="logo" onClick={() => navigate("/")}>
              <img src={logo1} alt="" />
              <img src={logo}/>
            </div>
            <ul className="menuItems">
              <li onClick={()=> navigationHandler("movie")} className="menuItem">Movies</li>
              <li onClick={()=> navigationHandler("tvShow")} className="menuItem">TV Shows</li>
              <li className="menuItem"> <HiOutlineSearch onClick={openSearch}/> </li>
            </ul>
            <div className="mobileMenuItems">
              <HiOutlineSearch onClick={openSearch}/>
              {mobileMenu ? ( <VscChromeClose onClick={()=> setMobileMenu(false)}/>  ) : ( <SlMenu onClick={openMobileMenu}/> )}
            </div>
          </ContentWrapper>
          { showSearch && <div className="searchBar">
                <ContentWrapper>
                  <div className="searchBarInput">
                        <input 
                            type="text"
                            placeholder="Search for a movie or a TV show..." 
                            onChange={(event) => setQuery(event.target.value)}
                            onKeyUp={searchQueryHandler}
                        />
                        <VscChromeClose className="button" onClick={()=> setShowSearch(false)}/>
                  </div>
                </ContentWrapper>
            </div>}
      </header>
    );
};

export default Header;