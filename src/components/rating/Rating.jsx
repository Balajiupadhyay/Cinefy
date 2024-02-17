/* eslint-disable react/prop-types */


import "./styles.scss";

function Rating({rating})
{
  return  (  
    <span className="rating">
      {rating} ⭐
    </span>)
}

export default Rating;


