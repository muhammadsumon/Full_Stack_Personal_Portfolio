import { useState } from "react";
import { GooSpinner } from "react-spinners-kit";

const Loading = () => {
  const [loading] = useState(true);

  return (
    <div className='w-full h-full flex items-center justify-center '>
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
