import { useState } from "react"
import "./styles.scss"


function SwitchMediaButton({data, onMediaChange}) {


  const [left, setLeft] = useState(0);
  const [selectedMedia, setSelectedMedia] = useState(0);

  function activeMedia(media, index)
  {
    setLeft(index * 80)
    setTimeout(() => {
      setSelectedMedia(index);
    },400);
    onMediaChange(media, index)
  }

  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((media, index) => (
          <span 
            key={index} 
            className={`tabItem ${selectedMedia === index ? "active" : ""}`}
            onClick={() => activeMedia(media, index)}
          >
            {media}
          </span>
        ))}
        <span className="movingBg" style={{left}}/>
      </div>
    </div>
  )
}

export default SwitchMediaButton