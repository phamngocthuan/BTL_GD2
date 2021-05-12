
import React from "react";

const IconDone = ({
  style = {},
  fill="green",
  width="15", 
  height="15", 
  viewBox="0 0 426.667 426.667"

  }) => (
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" 
            viewBox={viewBox} style={style}  width={width} height={height}>
        <g>
            <g>
                <polygon points="293.333,135.04 190.08,240.213 137.173,187.093 108.8,215.467 192.213,298.667 326.187,168.747 " fill={"#FFF"}/>
            </g>
        </g>
        <g>
            <g>
                <path d="M213.333,0C95.513,0,0,95.513,0,213.333s95.513,213.333,213.333,213.333s213.333-95.513,213.333-213.333
                    S331.154,0,213.333,0z M213.333,388.053c-96.495,0-174.72-78.225-174.72-174.72s78.225-174.72,174.72-174.72
                    c96.446,0.117,174.602,78.273,174.72,174.72C388.053,309.829,309.829,388.053,213.333,388.053z" fill={"#FFF"}/>
            </g>
        </g>
    </svg>


);

export default IconDone;

