import useFetch from "../../hooks/useFetch"
import { useParams } from "react-router-dom"
import "./styles.scss"
import DetailsBanner from "./detailBanner/DetailBanner"
import Cast from "./cast/Cast";
import VideosSection from "./videoSection/VideoSection";
import Similar from "./carousels/SimilarMovies";
import Recommendation from "./carousels/RecommendedMovies";

function Details() 
{
  const { mediaType, mediaId} = useParams();
  const {data, loading} = useFetch(`/${mediaType}/${mediaId}/videos`);
  const {data: credits, loading: creditsLoading} = useFetch(`/${mediaType}/${mediaId}/credits`);
  const {data: providers, loading: providersLoading } = useFetch(`/${mediaType}/${mediaId}/watch/providers`)
  return (
    <div>
      <DetailsBanner video={data?.results} crew={credits?.crew} watchProviders={providers?.results}/>
      <Cast data={credits?.cast} loading={creditsLoading}/>
      <VideosSection data={data} loading={loading}/>
      <Similar mediaType={mediaType} mediaId={mediaId}/>
      <Recommendation mediaType={mediaType} mediaId={mediaId}/>
    </div>
  )
}

export default Details;