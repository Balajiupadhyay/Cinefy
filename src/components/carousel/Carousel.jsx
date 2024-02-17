/* eslint-disable react/prop-types */
import { useRef } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Image from "../lazyLoadingImage/Image";
import PosterFallback from "../../assets/no-poster.png";
import Genres from "../genres/Genres";
import Rating from "../rating/Rating";

import "./styles.scss";



function Carousel({data, loading, endpoint, title}) {

    const carouselDivRef = useRef();
    const {url} = useSelector((state) => state.home);
    const navigate = useNavigate();

    function navigation(direction)
    {
        const carouselDiv = carouselDivRef.current;
        const scrollAmount = 
            direction === "left"
            ? carouselDiv.scrollLeft -
            (carouselDiv.offsetWidth + 20)
            : carouselDiv.scrollLeft +
            (carouselDiv.offsetWidth + 20)
        
        carouselDiv.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        })
    }

    function skeleton()
    {
        return (

            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        )
    } 

  return (
    <div className="carousel">
        <ContentWrapper>
            {title && <div className="carouselTitle">{title}</div>}
            <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" onClick={() => navigation("left")}/>
            <BsFillArrowRightCircleFill className="carouselRighttNav arrow" onClick={() => navigation("right")}/>
            {loading ? (
                <div className="loadingSkeleton">
                    {skeleton()}
                    {skeleton()}
                    {skeleton()}
                    {skeleton()}
                    {skeleton()}
                    
                </div>
            ) : (
                <div ref={carouselDivRef} className="carouselItems">
                    {data?.map((item) => {
                        const posterURl = item.poster_path ? url.poster + item.poster_path : PosterFallback;
                        return (
                            <div 
                                className="carouselItem" 
                                key={item.id} 
                                onClick={() =>navigate(`/${item.media_type || endpoint}/${item.id}`)}
                            >
                                <div className="posterBlock">
                                    <span className="circleRating">
                                        <Rating rating={item.vote_average.toFixed(1)}/>
                                    </span>
                                    <Image src={posterURl}/>
                                    <Genres data={item.genre_ids.slice(0,3)}/>
                                </div>
                                <div className="textBlock">
                                    <span className="title">
                                            {item.title || item.name}
                                    </span>
                                    <span className="date">
                                        {dayjs(item.release_date).format("MMM D, YYYY")}
                                    </span>
                                   
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </ContentWrapper>
    </div>
  )
}

export default Carousel


