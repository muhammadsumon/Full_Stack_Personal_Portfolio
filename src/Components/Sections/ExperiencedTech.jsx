import React from "react";
import { ImHtmlFive } from "react-icons/im";
import { IoLogoCss3 } from "react-icons/io";
import Bootstrap from "../../Assets/Icons/Skills/Bootstrap";
import Express from "../../Assets/Icons/Skills/Express";
import Figma from "../../Assets/Icons/Skills/Figma";
import GitGithub from "../../Assets/Icons/Skills/GitGithub";
import Js from "../../Assets/Icons/Skills/Js";
import MongoDb from "../../Assets/Icons/Skills/MongoDb";
import Nodejs from "../../Assets/Icons/Skills/Nodejs";
import ReactIcon from "../../Assets/Icons/Skills/ReactIcon";
import Sass from "../../Assets/Icons/Skills/Sass";
import Tailwind from "../../Assets/Icons/Skills/Tailwind";

const ExperiencedTech = (props) => {
  return (
    <div
      {...props}
      className={`p-4 xl:container mx-auto experience mb-[80px] sm:mb-[150px] ${props.className}`}
    >
      {/* Heading  */}
      <div className='heading mb-[50px] sm:mb-[50px]'>
        <h2 className='text-[24px] text-center sm:text-[30px] !font-jost font-semibold w-fit mx-auto text-gray-900 leading-[35px] sm:leading-[45px] tracking-[0.1em] mt-[18px] mb-[17px]'>
          <span className='py-2 ms-hightlight ms-hightlight-2'>
            Technologies
          </span>{" "}
          I{" "}
          <span className='ms-hightlight ms-hightlight-line'>
            have Experience
          </span>
        </h2>
        <p className='w-fit mx-auto text-gray-900 text-center leading-[26px] tracking-[0.01em]'>
          I know a lot of technologies & Tools, but I have expertise in{" "}
          <br className='hidden sm:block' />
          following
        </p>
      </div>

      {/* Skills  */}
      <div className='skills'>
        <div className='flex flex-wrap items-center justify-center gap-10 mx-auto expertise sm:gap-14'>
          <div
            data-aos='fade-up'
            data-aos-once='true'
            data-aos-delay='100'
            className='flex items-center gap-2 p-3 w-52 sm:w-fit whitespace-nowrap html shadow-skill '
          >
            <ImHtmlFive className='icon text-[22px] mr-2 text-red-400' />
            <h2 className='text-gray-900 font-semibold border-l-2 border-gray-300 pl-4 text-[20px]'>
              HTML 5
            </h2>
          </div>

          <div
            data-aos='fade-up'
            data-aos-once='true'
            data-aos-delay='300'
            className='flex items-center gap-2 p-3 w-52 sm:w-fit whitespace-nowrap css shadow-skill '
          >
            <IoLogoCss3 className='icon text-[25px] mr-2 text-blue-600' />
            <h2 className='text-gray-900 font-semibold border-l-2 border-gray-300 pl-4 text-[20px]'>
              CSS 3
            </h2>
          </div>

          <div
            data-aos='fade-up'
            data-aos-once='true'
            data-aos-delay='500'
            className='flex items-center gap-2 p-3 w-52 sm:w-fit whitespace-nowrap js shadow-skill '
          >
            <Js />
            <h2 className='text-gray-900 font-semibold border-l-2 border-gray-300 pl-4 text-[20px]'>
              JavaScript
            </h2>
          </div>

          <div
            data-aos='fade-up'
            data-aos-once='true'
            data-aos-delay='700'
            className='flex items-center gap-2 p-3 w-52 sm:w-fit whitespace-nowrap bootstrap shadow-skill '
          >
            <Bootstrap className='icon text-[22px] mr-2' />
            <h2 className=' text-gray-900 font-semibold border-l-2 border-gray-300 pl-4 text-[20px]'>
              Bootstrap
            </h2>
          </div>

          <div
            data-aos='fade-up'
            data-aos-once='true'
            data-aos-delay='900'
            className='flex items-center gap-2 p-3 w-52 sm:w-fit whitespace-nowrap sass shadow-skill '
          >
            <Sass className='icon text-[22px] mr-2' />
            <h2 className='text-gray-900 font-semibold border-l-2 border-gray-300 pl-4 text-[20px]'>
              Sass
            </h2>
          </div>

          <div
            data-aos='fade-up'
            data-aos-once='true'
            data-aos-delay='1100'
            className='flex items-center gap-2 p-3 w-52 sm:w-fit whitespace-nowrap tailwind shadow-skill '
          >
            <Tailwind className='icon text-[22px] mr-2' />
            <h2 className='text-gray-900 font-semibold border-l-2 border-gray-300 pl-4 text-[20px]'>
              Tailwind CSS
            </h2>
          </div>

          <div
            data-aos='fade-up'
            data-aos-once='true'
            data-aos-delay='1300'
            className='flex items-center gap-2 p-3 w-52 sm:w-fit whitespace-nowrap figma shadow-skill '
          >
            <Figma className='icon text-[22px] mr-2' />
            <h2 className='text-gray-900 font-semibold border-l-2 border-gray-300 pl-4 text-[20px]'>
              Figma
            </h2>
          </div>

          <div
            data-aos='fade-up'
            data-aos-once='true'
            data-aos-delay='1500'
            className='flex items-center gap-2 p-3 w-52 sm:w-fit whitespace-nowrap github shadow-skill '
          >
            <GitGithub className='icon text-[22px] mr-2' />
            <h2 className='text-gray-900 font-semibold border-l-2 border-gray-300 pl-4 text-[20px]'>
              Git & Github
            </h2>
          </div>
        </div>

        {/* Other Tech I Know  */}
        <div className='other mt-[50px] sm:mt-[70px]'>
          <div
            data-aos='fade-up'
            data-aos-once='true'
            data-aos-delay='1800'
            className='heading mb-[50px]'
          >
            <h2 className='text-[22px] text-left sm:text-[24px] !font-jost w-fit mx-auto lg:mr-auto text-gray-900 leading-[40px] sm:leading-[45px] tracking-[0.1em] mt-[18px]'>
              <span className='py-1 pl-2 ms-hightlight ms-hightlight-h-full'>
                Other Technologies
              </span>{" "}
              Which I know
            </h2>
          </div>

          <div className='flex flex-wrap items-center justify-center gap-10 mx-auto other sm:gap-14'>
            <div
              data-aos='fade-up'
              data-aos-once='true'
              data-aos-delay='2200'
              className='flex items-center gap-2 p-3 w-52 sm:w-fit whitespace-nowrap react shadow-skill '
            >
              <ReactIcon className='icon text-[22px] mr-2' />
              <h2 className='text-gray-900 font-semibold border-l-2 border-gray-300 pl-4 text-[20px]'>
                React
              </h2>
            </div>

            <div
              data-aos='fade-up'
              data-aos-once='true'
              data-aos-delay='2400'
              className='flex items-center gap-2 p-3 w-52 sm:w-fit whitespace-nowrap nodeJs shadow-skill '
            >
              <Nodejs className='icon text-[22px] mr-2' />
              <h2 className='text-gray-900 font-semibold border-l-2 border-gray-300 pl-4 text-[20px]'>
                Node JS
              </h2>
            </div>

            <div
              data-aos='fade-up'
              data-aos-once='true'
              data-aos-delay='2600'
              className='flex items-center gap-2 p-3 w-52 sm:w-fit whitespace-nowrap shadow-skill '
            >
              <Express className='icon text-[22px] mr-2' />
              <h2 className='text-gray-900 font-semibold border-l-2 border-gray-300 pl-4 text-[20px]'>
                Express JS
              </h2>
            </div>

            <div
              data-aos='fade-up'
              data-aos-once='true'
              data-aos-delay='2800'
              className='flex items-center gap-2 p-3 w-52 sm:w-fit whitespace-nowrap shadow-skill '
            >
              <MongoDb className='icon text-[22px] mr-2' />
              <h2 className=' text-gray-900 font-semibold border-l-2 border-gray-300 pl-4 text-[20px]'>
                Mongo DB
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperiencedTech;
