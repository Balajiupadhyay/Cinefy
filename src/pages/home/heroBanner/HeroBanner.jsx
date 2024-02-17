import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import  useFetch  from "../../../hooks/useFetch"
import { useSelector } from "react-redux";


import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadingImage/Image";

import "./styles.scss"



function HeroBanner() {

    const [backgroundImage, setBackgroundImage] = useState("");
    const [query, setQuery] = useState("");
    const {url} = useSelector((state) => state.home)


    const navigate = useNavigate();

    const { data, loading } = useFetch("/movie/upcoming");
    useEffect(() => {
        const background = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackgroundImage(background)

    },[data,url.backdrop ])
    function searchQueryHandler(event){
        if(event.key === "Enter" && query.length > 0  ){
            navigate(`/search/${query}`);
        }
    }

    return (
        <div className="heroBanner">
            { !loading && <div className="backdropImage">
                <Img src={backgroundImage}/>
            </div>}
            <div className="opacityLayer"></div>
            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="welcomeTitle">Welcome.</span>
                    <span className="tagLine">Millions of movies, TV shows to discover. Explore now.</span>
                    <div className="searchBarInput">
                        <input 
                            type="text"
                            placeholder="Search for a movie or a TV show..." 
                            onChange={(event) => setQuery(event.target.value)}
                            onKeyUp={searchQueryHandler}
                        />
                        <button>Search</button>
                    </div>
                </div>
            </ContentWrapper>

        </div>
    )
}

export default HeroBanner;