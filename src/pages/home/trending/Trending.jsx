import { useState } from "react";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchMediaButton from "../../../components/switchMediaTypeButton/SwitchMediaButton"
import Carousel from "../../../components/carousel/Carousel";

import useFetch from "../../../hooks/useFetch";
export default function Trending() {

  const [trendingEndpoint, setTrendingEndpoint] = useState("day");
  const {data, loading} = useFetch(`/trending/all/${trendingEndpoint}`);
  
  function onMediaChange(media)
  {
    setTrendingEndpoint(media === "Day" ? "day" : "week");
  }
  return (
    <div className="carouselSection">
        <ContentWrapper>
          {/* <div> */}
            <span className="carouselTitle">Trending</span>
            <SwitchMediaButton data={["Day", "Week"]} onMediaChange={onMediaChange}/>

          {/* </div> */}
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} endpoint={trendingEndpoint} />
    </div>
  )
}
