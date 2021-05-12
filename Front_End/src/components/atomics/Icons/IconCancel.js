
import React from "react";

const IconCancel = ({
  style = {},
  fill="green",
  width="15", 
  height="15", 
  viewBox="0 0 512 512"

  }) => (

    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" width={width} height={height}
        viewBox={viewBox} style={style} >
        {/* <ellipse style="fill:#E21B1B;" cx="256" cy="256" rx="256" ry="255.832"/> */}
        <g>
                <rect x="228.021" y="113.143" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -106.0178 256.0051)" style="fill:#FFFFFF;" width="55.991" height="285.669"/>
                <rect x="113.164" y="227.968" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -106.0134 255.9885)" style="fill:#FFFFFF;" width="285.669" height="55.991"/>
        </g>
    </svg>



);

export default IconCancel;

