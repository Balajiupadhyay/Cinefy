import { useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import {fetchDataFromApi} from "./utils/api"
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration, getGenres } from './store/homeSlice'


import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import PageNotFound from "./pages/404/PageNotFound";
import Details from "./pages/details/Details";
import Explore from "./pages/explore/Explore";
import Home from "./pages/home/Home";
import SearchResult from "./pages/serachResult/SearchResult";




function App() {

  const {url} = useSelector((state) => state.home)
  const dispatch = useDispatch()
  // console.log(url)

  useEffect(
    () => {
      fetchDataConfig()
      generesCall()
    }, []);

  const fetchDataConfig = () => {
    fetchDataFromApi("/configuration")
    .then((res) => {
      // console.log(res)

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url))
    })
  }

  async function generesCall()
  {
    let promises = [];
    let endpoints = ["tv", "movie"];
    let allGeneres = {};

    endpoints.forEach((endPoint) => {
      promises.push(fetchDataFromApi(`/genre/${endPoint}/list`))
    })

    const data = await Promise.all(promises);
    data.map(({genres}) => {
        return genres.map((item) => (allGeneres[item.id] = item))
    })

    dispatch(getGenres(allGeneres))
  }


  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={ <Home/> }/>
        <Route path="/:mediaType/:mediaId" element={ <Details/> }/>
        <Route path="/search/:query" element={ <SearchResult/> }/>
        <Route path="/explore/:mediaType" element={ <Explore/> }/>
        <Route path="*" element={ <PageNotFound/> }/>  
      </Routes>
      <Footer/>
    </BrowserRouter>

  )
}

export default App
