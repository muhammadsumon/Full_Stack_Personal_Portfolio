import React from "react";

const CrossIcon = (props) => {
  return (
    <svg
      {...props}
      width={10}
      height={10}
      viewBox='0 0 10 10'
      fill='#333333'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1 1L8.82469 8.82475'
        stroke={`${props.color ? props.color : "#647079"}`}
        strokeWidth={2}
      />
      <path
        d='M9 1L1.17531 8.82472'
        stroke={`${props.color ? props.color : "#647079"}`}
        strokeWidth={2}
      />
    </svg>
  );
};

export default CrossIcon;
