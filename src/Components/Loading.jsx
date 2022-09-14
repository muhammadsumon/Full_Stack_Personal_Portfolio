import { useState } from "react";
import { GooSpinner } from "react-spinners-kit";

const Loading = () => {
  const [loading] = useState(true);

  return (
    <div className='flex items-center justify-center w-full h-full '>
      <GooSpinner
        size={70}
        postion='absolute'
        color='#686769'
        loading={loading}
      />
    </div>
  );
};

export default Loading;
