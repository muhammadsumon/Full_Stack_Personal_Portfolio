import React from "react";

const FilterIcon = (props) => {
  return (
    <svg
      width={17}
      height={15}
      {...props}
      viewBox='0 0 17 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M0 3L17 3' stroke='#223340' strokeWidth={2} />
      <path d='M0 12L17 12' stroke='#223340' strokeWidth={2} />
      <circle
        cx='11.5'
        cy='3.5'
        r='2.5'
        fill='white'
        stroke='#223340'
        strokeWidth={2}
      />
      <circle
        cx='6.5'
        cy='11.5'
        r='2.5'
        fill='white'
        stroke='#223340'
        strokeWidth={2}
      />
    </svg>
  );
};

export default FilterIcon;
