import { useState, useEffect } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { useParams } from "react-router-dom"

import { fetchDataFromApi } from "../../utils/api";
import noResults from "../../assets/no-results.png";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

import "./styles.scss";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import NoResult from "../../assets/no-result-found.jpg";
import NotFound from "../../assets/not-found.svg";
import MovieCard from "../../components/movieCard/MovieCard";


function SearchResult() 
{
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  function fetchInitialData()
  {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
    .then((res) => {
      setData(res);
      setPageNum((prev) => prev +1);
      setLoading(false);
    })
  }

  function fetchNextPageData()
  {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`) 
    .then((res) => {
      if(data?.results)
      {
        setData({
          ...data, results: [...data.results, ...res.results]
        })
      }
      else
      {
        setData(res);
      }
      setPageNum((prev) => prev + 1 )
    })
  }
  useEffect(() => {
    setPageNum(1)
    fetchInitialData()
  },[query])

  return (
    <div className="searchResultsPage">
      {loading && <LoadingSpinner initial={true}/>}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
              <>
                <div className="pageTitle">
                  {`Search ${data?.total_results > 1 ? "results" : "result"} of '${query.charAt(0).toUpperCase() + query.slice(1)}'`}
                </div>
                <InfiniteScroll
                  className="content"
                  dataLength={data?.results?.length || []}
                  next={fetchNextPageData}
                  hasMore={pageNum <= data?.total_pages}
                  loader={<LoadingSpinner/>}
                >
                  {data?.results.map((item, index) => {
                    if(item.media_type === "person") return;
                    return (
                      <MovieCard key={index} data={item} fromSearch={true}/>
                    )
                  })}
                </InfiniteScroll>
              </>
          ) : (
            <div className="resultNotFound">
              Kehna Kya Chahate ho
              <div className="notFoundImg">
                {/* <img src={noResults} alt="" /> */}
                {/* <img src={NotFound} alt="" /> */}
              </div>
            </div>
          )}
        </ContentWrapper>
      )}
    </div>
  )
}

export default SearchResult;