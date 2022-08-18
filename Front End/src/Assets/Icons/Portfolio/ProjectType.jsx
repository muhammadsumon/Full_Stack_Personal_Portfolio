import React from "react";

const ProjectType = (props) => {
  return (
    <svg
      width={18}
      height={15}
      {...props}
      viewBox='0 0 18 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='10.6072'
        y='2.15234'
        width='6.64286'
        height='7.05561'
        stroke='#223340'
        strokeWidth='1.5'
      />
      <path
        d='M2.10525 9.2079L6.10714 2.14577L10.109 9.2079H2.10525Z'
        stroke='#223340'
        strokeWidth='1.5'
      />
      <path
        d='M14.7643 10.3469C14.7643 12.2632 13.1278 13.8747 11.0358 13.8747C8.94374 13.8747 7.30719 12.2632 7.30719 10.3469C7.30719 8.43059 8.94374 6.81909 11.0358 6.81909C13.1278 6.81909 14.7643 8.43059 14.7643 10.3469Z'
        fill='white'
        stroke='#223340'
        strokeWidth='1.5'
      />
    </svg>
  );
};

export default ProjectType;
