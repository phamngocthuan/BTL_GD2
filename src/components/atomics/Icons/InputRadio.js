import React from "react";

const InputRadio = ({
  style = {},
  fill="green",
  width="15", 
  height="15", 
  viewBox="0 0 510 510"

  }) => (
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" 
	 width={width} height={height} viewBox={viewBox} style={style} >
        <g>
            <g id="radio-button-on">
                <path d="M255,127.5c-71.4,0-127.5,56.1-127.5,127.5c0,71.4,56.1,127.5,127.5,127.5c71.4,0,127.5-56.1,127.5-127.5
                    C382.5,183.6,326.4,127.5,255,127.5z M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z
                    M255,459c-112.2,0-204-91.8-204-204S142.8,51,255,51s204,91.8,204,204S367.2,459,255,459z"
                    fill={fill}
                    />
            </g>
        </g>

</svg>

);

export default InputRadio;

