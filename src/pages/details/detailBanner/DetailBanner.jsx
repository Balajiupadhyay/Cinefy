import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./styles.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import PosterFallback from "../../../assets/no-poster.png";
import Rating from "../../../components/rating/Rating";
import Image from "../../../components/lazyLoadingImage/Image";
import { PlayButton } from "../PlayButton";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

const DetailsBanner = ({ video, crew, watchProviders }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const { mediaType, mediaId} = useParams();
    const {data, loading} = useFetch(`/${mediaType}/${mediaId}`);
    // const {data, loading} = useFetch(`/${mediaType}/${mediaId}`);
    const {url} = useSelector((state) => state.home);
    const _genres = data?.genres?.map((g) => g.id);

    // console.log(url)
    const officialTrailer = video?.find(result => result.type === "Trailer");


    const director = crew?.filter((crewMember) => crewMember.job === "Director");
    const producer = crew?.filter((crewMember) => crewMember.job === "Producer");
    const writer = crew?.filter((crewMember) => crewMember.job === "Writer" );

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    console.log(watchProviders)
    const inProvidersBuy = watchProviders?.IN?.buy?.map((provider) => ({
        providerName:provider.provider_name, 
        logoPath: provider.logo_path
    })); 
    const inProvidersRent = watchProviders?.IN?.rent?.map((provider) => ({
        providerName:provider.provider_name, 
        logoPath: provider.logo_path
    })); 
    
    console.log(inProvidersBuy); 
    console.log(inProvidersRent); 

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {!!data && (
                        <React.Fragment>
                            <div className="backdropImg">
                                <Image src={url.backdrop + data.backdrop_path}/>
                            </div>
                            <div className="opacityLayer"></div>
                            <ContentWrapper>
                                <div className="content">
                                    <div className="left">
                                        {data.poster_path ? (
                                            <Image className="posterImg" src={url.backdrop + data.poster_path}/>
                                            
                                        ) : (
                                            <Image className="posterImg" src={PosterFallback}/>
                                        )}
                                    </div>
                                    <div className="right">
                                        <div className="title">
                                        {data.name || data.title} {mediaType === "movie" ? 
                                            `(${dayjs(data?.release_date).format("YYYY")})` : 
                                            `(${dayjs(data?.first_air_date).format("YYYY")})`}
                                        </div>
                                        <div className="tagline">
                                            {data.tagline}
                                        </div>
                                        <Genres data={_genres}/>
                                        <div className="row">
                                            <Rating rating={data.vote_average.toFixed(1)} className="rating" />
                                            <div 
                                                className="playbtn" 
                                                onClick={() => {
                                                    setShow(true) 
                                                    setVideoId(officialTrailer.key)
                                                }}
                                            >
                                                <PlayButton/>

                                                <span className="text">
                                                    Watch Trailer
                                                </span>
                                                

                                            </div>
                                            <div className="playbtn" >
                                                <a href={watchProviders?.IN?.link} target="_blank" className="watchOnline">
                                                    <PlayButton/>
                                                    <span className="text">
                                                        Watch {mediaType==="movie" ? "Movie" : "TV Show"}
                                                    </span>
                                                </a>
                                            </div>
                        
                                        </div>
                                      

                                        <div className="overview">
                                            <div className="heading">
                                                Overview
                                            </div>
                                            <div className="description">
                                                {data.overview}
                                            </div>
                                        </div>
                                        <div className="info">
                                            {data.status && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Status:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {data.status}
                                                    </span>
                                                </div>
                                            )}
                                            {data.release_date && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Release Date:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {dayjs(data?.release_date).format("MMM D, YYYY")}
                                                    </span>
                                                </div>
                                            )}
                                            {data.runtime && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Runtime:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {toHoursAndMinutes(data.runtime)}
                                                    </span>
                                                </div>
                                            )}
                                            {/* {watchProviders && (
                                                <div className="infoItem">
                                                    <span className="text bold watchOnline">
                                                        <a 
                                                            href={watchProviders?.IN?.link} 
                                                            target="_blank"
                                                        >
                                                            Watch {mediaType==="movie" ? "  Movie" : "  TV Show"}
                                                        </a>
                                                    </span>
                                                </div>
                                            )} */}
                                        </div>
                                        {director?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Director: {" "}
                                                </span>
                                                <span className="text">
                                                    {director?.map((direct, index) => (
                                                        <span key={index}>
                                                            {direct.name}
                                                            {director.length - 1 !== index && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}
                                        {producer?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Producer:{" "}
                                                </span>
                                                <span className="text">
                                                    {producer?.map((produce, index) => (
                                                        <span key={index}>
                                                            {produce.name}
                                                            {producer.length - 1 !== index && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}
                                        {writer?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Writer:{" "}
                                                </span>
                                                <span className="text">
                                                    {writer?.map((writ, index) => (
                                                        <span key={index}>
                                                            {writ.name}
                                                            {writer.length - 1 !== index && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}
                                        {data?.created_by?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Creator: {" "}
                                                </span>
                                                <span className="text">
                                                    {data?.created_by?.map((created, index) => (
                                                        <span key={index}>
                                                            {created.name}
                                                            {data?.created_by.length - 1 !== index && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}
                                        {mediaType === "tv" && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Total season:{" "}   
                                                </span>
                                                <span className="text">
                                                    {data?.number_of_seasons}
                                                </span>
                                                <span className="text bold">
                                                    Network:{" "}
                                                </span>
                                                <span className="text">
                                                    {data?.networks[0].name}
                                                </span>
                                                <span className="text bold">
                                                    Total episodes:{" "}
                                                </span>
                                                <span className="text">
                                                    {data?.number_of_episodes}
                                                </span>
                                                <span className="text bold">
                                                    Last aired on:{" "}
                                                </span>
                                                <span className="text">
                                                    {dayjs(data?.last_air_date).format("MMM D YYYY")}
                                                </span>
                                            </div>
                                        )}
                                        {mediaType === "tv" && (
                                            <div className="info">
                                                {data.status === "Ended" ? ("") : (
                                                    <div>
                                                        <span className="text bold">
                                                            Last aired:{" "}
                                                        </span>
                                                        <div>
                                                            <span className="text bold">
                                                                Season no.:{" "}
                                                            </span>
                                                            <span className="text">
                                                                {data?.seasons.length - 1}
                                                            </span>
                                                            <span className="text bold">
                                                                Season rating:{" "}
                                                            </span>
                                                            <span className="text">
                                                                {data?.seasons[data?.seasons.length-1].vote_average}
                                                            </span>
                                                            <span className="text bold">
                                                                Episode no.:{" "}
                                                            </span>
                                                            <span className="text">
                                                                {data?.last_episode_to_air.episode_number}
                                                            </span>
                                                            <span className="text bold">
                                                                Episode name:{" "}
                                                            </span>
                                                            <span className="text">
                                                                {data?.last_episode_to_air.name}
                                                            </span>
                                                            
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}


                                    </div>
                                </div>
                                <VideoPopup
                                    show={show}
                                    setShow={setShow}
                                    videoId={videoId}
                                    setVideoId={setVideoId}
                                />
                            </ContentWrapper>

                        </React.Fragment>
                    )}
                </>
                
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;
