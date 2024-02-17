/* eslint-disable react/prop-types */
import {  useSelector } from "react-redux";

import "./styles.scss";


function Genres({data}) {

    const { genres } = useSelector((state) => state.home)
  return (
    <div className="genres">
        {data?.map((genre) => {
            if(!genres[genre]?.name) return;
            return (
                <div key={genre} className="genre">
                    {genres[genre]?.name}
                </div>
            )
        })}
    </div>
  )
}

export default Genres