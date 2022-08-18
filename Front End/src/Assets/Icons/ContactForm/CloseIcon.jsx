import React from "react";

const CloseIcon = (props) => {
  return (
    <svg
      width='14'
      {...props}
      height='14'
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1 1L13 13M1 13L13 1'
        stroke='#333333'
        strokeOpacity='0.75'
        strokeWidth='1.5'
      />
    </svg>
  );
};

export default CloseIcon;
