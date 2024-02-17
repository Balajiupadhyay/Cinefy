import { useState } from "react";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchMediaButton from "../../../components/switchMediaTypeButton/SwitchMediaButton"
import Carousel from "../../../components/carousel/Carousel";

import useFetch from "../../../hooks/useFetch";


export default function Popular() {

  const [popularEndpoint, setPopularEndpoint] = useState("movie");
  const {data, loading} = useFetch(`/${popularEndpoint}/popular`);
  console.log(popularEndpoint)
  function onMediaChange(media)
  {
    setPopularEndpoint(media === "Movies" ? "movie" : "tv");
  }
  return (
    <div className="carouselSection">
        <ContentWrapper>
          {/* <div> */}
            <span className="carouselTitle"> What&#39;s Popular </span>
            <SwitchMediaButton data={["Movies", "TV Shows"]} onMediaChange={onMediaChange}/>

          {/* </div> */}
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} endpoint={popularEndpoint} />
    </div>
  )
}
