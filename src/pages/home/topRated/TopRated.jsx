import { useState } from "react";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchMediaButton from "../../../components/switchMediaTypeButton/SwitchMediaButton"
import Carousel from "../../../components/carousel/Carousel";

import useFetch from "../../../hooks/useFetch";


export default function TopRated() {

  const [topRatedEndpoint, setTopRatedEndpoint] = useState("movie");
  const {data, loading} = useFetch(`/${topRatedEndpoint}/top_rated`);

  function onMediaChange(media)
  {
    setTopRatedEndpoint(media === "Movies" ? "movie" : "tv");
  }
  return (
    <div className="carouselSection">
        <ContentWrapper>
          {/* <div> */}
            <span className="carouselTitle"> Top Rated</span>
            <SwitchMediaButton data={["Movies", "TV Shows"]} onMediaChange={onMediaChange}/>

          {/* </div> */}
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} endpoint={topRatedEndpoint} />
    </div>
  )
}
