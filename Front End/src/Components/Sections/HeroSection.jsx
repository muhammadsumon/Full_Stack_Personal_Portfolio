import React from "react";
import { tw } from "twind";

const HeroSection = (props) => {
  return (
    <div
      {...props}
      id="heroSection"
      className={`p-4 xl:container mx-auto flex lgMax:justify-center justify-between lgMax:items-center lgMax:flex-col hero mb-[80px] sm:mb-[150px] ${props.className}`}
    >
      {/* Left  */}
      <div className='mt-16 sm:mt-36 order-1 md:order-0'>
        <p
          className={tw`tracking-[0.1em] relative w-fit text-[16px] after:(w-[12px] h-[12px] bg-black absolute) `}
        >
          Hi There ! I'm a{" "}
          <img
            className='ml-1 select-none inline-block -mb-1'
            alt='dot dot'
            src={require("../../Assets/Images/Intro.png")}
          ></img>
        </p>
        <h1 className='text-[25px] sm:text-[35px] !font-jost font-extrabold !text-gray-900 leading-[35px] sm:leading-[45px] tracking-[0.1em] mt-[18px] mb-[17px]'>
          <span className='ms-hightlight ms-hightlight-line'>
            Front End Developer
          </span>{" "}
          &<br className='hidden sm:block' /> WordPress Specialist
        </h1>
        <p className='mb-[30px] sm:mb-[39px] text-gray-900 leading-[26px] tracking-[0.01em] text-[15px]'>
          Nothing is impossible on the web, Let’s execute your idea into
          <br className='hidden sm:block' /> the website and start your business
          or startup today.
        </p>
        <div className='action flex flex-wrap'>
          <button
            type='button'
            className={tw`mr-[36px] my-2 transition-all duration-300 px-8 py-2 border(none) font(nunito normal) text-white bg-primary rounded focus:( ring-4 ring-green-200 outline-8))`}
          >
            Hire Me
          </button>
          <button
            type='button'
            className={tw`transition-all my-2 duration-300 px-10 py-2 border(1 primary) font(nunito normal) text-primary bg-white rounded focus:( ring-4 ring-green-200))`}
          >
            See My Projects
          </button>
        </div>
      </div>

      {/* Right  */}
      <div className='sm:mt-36 order-0 md:order-1'>
        <img
          src={require("../../Assets/Images/Hero_Image.png")}
          className={tw`my-6 lg:m-0 sm:w-[570px]`}
          alt=''
        />
      </div>
    </div>
  );
};

export default HeroSection;
