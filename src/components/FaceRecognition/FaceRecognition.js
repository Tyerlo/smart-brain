import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputimage" alt="" src={imageUrl} width="500px" heigh="auto" />
        {box.map(boxes => {
          return (
            <div key={`box${box.topRow}${box.rightCol}`}
              className="bounding-box"
              style={{
                top: boxes.topRow,
                right: boxes.rightCol,
                bottom: boxes.bottomRow,
                left: boxes.leftCol
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default FaceRecognition;
