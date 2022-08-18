import React from "react";

const CheckBox = (props) => {
  return (
    <svg
      width={19}
      height={19}
      {...props}
      viewBox='0 0 19 19'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect y='-0.000732422' width={19} height={19} rx={4} fill='#19A74B' />
      <path
        d='M4.5 9.99927L8 13.4993L15.5 5.99927'
        stroke='white'
        strokeWidth={2}
      />
    </svg>
  );
};

export default CheckBox;
