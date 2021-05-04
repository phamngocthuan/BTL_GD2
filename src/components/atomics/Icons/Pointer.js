import React from "react";

const Pointer = ({
  style = {},
  fill="green",
  width="15", 
  height="15", 
  viewBox="0 0 494.148 494.148"

  }) => (
    <svg  id="Layer_1" xmlns="http://www.w3.org/1999/xlink" 
        viewBox={viewBox} style={style} width={width} height={height} >
            <g>
            <g>
                <path d="M405.284,201.188L130.804,13.28C118.128,4.596,105.356,0,94.74,0C74.216,0,61.52,16.472,61.52,44.044v406.124
                    c0,27.54,12.68,43.98,33.156,43.98c10.632,0,23.2-4.6,35.904-13.308l274.608-187.904c17.66-12.104,27.44-28.392,27.44-45.884
                    C432.632,229.572,422.964,213.288,405.284,201.188z"
                    fill={fill} 
                    />
            </g>
            </g>
    </svg>

);

export default Pointer;

