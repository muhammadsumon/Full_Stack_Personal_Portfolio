import React from "react";
import { tw } from "twind";

const WorkingProcess = (props) => {
  return (
    <div
      {...props}
      className={`p-4 xl:container mx-auto workingProcess mb-[80px] sm:mb-[150px] ${props.className}`}
    >
      {/* Heading  */}
      <div className='xl:container mx-auto heading mb-[50px] sm:mb-[80px]'>
        <h2 className='text-[25px] text-center sm:text-[30px] !font-jost font-semibold w-fit mx-auto text-gray-900 leading-[35px] sm:leading-[45px] tracking-[0.03em] mt-[18px] mb-[17px]'>
          <span className='ms-hightlight ms-hightlight-2 py-2'>My</span> Wor
          <span className='ms-hightlight ms-hightlight-line'>king Pro</span>
          cess
        </h2>
        <p className='w-fit mx-auto text-gray-900 text-center leading-[26px] tracking-[0.01em]'>
          Know How I work or how i complete any project{" "}
        </p>
      </div>

      {/*Process*/}
      <div
        style={{
          backgroundImage: `url(${require("../../Assets/Images/services_bg.png")})`,
          backgroundRepeat: "no-repeat",
        }}
        className={tw`process flex flex-wrap justify-center gap-12 bg-fixed bg-left sm:!bg-none`}
      >
        <div
          data-aos='fade-up'
          data-aos-once='true'
          data-aos-delay='100'
          className='process-item bg-white z-10 p-4 mx-2 sm:m-0 px-6 shadow-service w-[480px]'
        >
          <div className='header flex-row-reverse sm:flex-row pt-2 pb-4 flex justify-between items-center'>
            <h3 className='ms-hightlight ms-hightlight-3 text-[46px] leading-6 !font-jost font-semibold tracking-[0.01em] text-gray-50 pl-5'>
              01
            </h3>
            <img
              className='w-[40%] mx-2 mr-4 h-[2px] hidden sm:block'
              src={require("../../Assets/Images/process.jpg")}
              alt='ProcessImage'
            />
            <h2 className='text-[19px] sm:text-[23px] whitespace-pre-wrap sm:whitespace-nowrap !font-jost font-[600] text-gray-900 leading-[35px] sm:leading-[45px] tracking-[0.09em] mb-[17px]'>
              <span className='ms-hightlight uppercase ms-hightlight-line before:w-[110%] before:bg-green-40 before:h-[40%] pb-6)'>
                Discussion
              </span>
            </h2>
          </div>
          <p className='mx-auto text-justify text-gray-900 text-[14px] leading-[23px] tracking-[0.01em]'>
            It is extremely important to me to understand the needs and
            requirements of the project. Such as What’s the cores features and
            functions? What’s the project deadline? Are there any key
            milestones, important dates, or time constraints? and so on
          </p>
        </div>

        <div
          data-aos='fade-up'
          data-aos-once='true'
          data-aos-delay='300'
          className='process-item bg-white z-10 p-4 mx-2 sm:m-0 px-6 shadow-service w-[480px]'
        >
          <div className='header pt-2 pb-4 flex justify-between items-center'>
            <h3 className='ms-hightlight ms-hightlight-3 text-[46px] leading-6 !font-jost font-semibold tracking-[0.01em] text-gray-50 pl-5'>
              02
            </h3>
            <img
              className='w-full mx-2 mr-4 h-[2px] hidden sm:block'
              src={require("../../Assets/Images/process.jpg")}
              alt='ProcessImage'
            />
            <h2 className='text-[19px] sm:text-[23px] whitespace-pre-wrap sm:whitespace-nowrap !font-jost font-[600] text-gray-900 leading-[35px] sm:leading-[45px] tracking-[0.09em] mb-[17px]'>
              <span className='ms-hightlight uppercase ms-hightlight-line before:w-[110%] before:bg-green-40 before:h-[40%] pb-6)'>
                Planning
              </span>
            </h2>
          </div>
          <p className='mx-auto text-justify text-gray-900 text-[14px] leading-[23px] tracking-[0.01em]'>
            Then I create a plan for interior projects that what is the best way
            to complete the project, how tips & technique should I apply etc.
            Planning provides a lot of potential for each project.
          </p>
        </div>

        <div
          data-aos='fade-up'
          data-aos-once='true'
          data-aos-delay='500'
          className='process-item bg-white z-10 p-4 mx-2 sm:m-0 px-6 shadow-service w-[480px]'
        >
          <div className='header pt-2 pb-4 flex-row-reverse sm:flex-row flex justify-between items-center'>
            <h3 className='ms-hightlight ms-hightlight-3 text-[46px] leading-6 !font-jost font-semibold tracking-[0.01em] text-gray-50 pl-5'>
              03
            </h3>
            <img
              className='w-full mx-2 mr-4 h-[2px] hidden sm:block'
              src={require("../../Assets/Images/process.jpg")}
              alt='ProcessImage'
            />
            <h2 className='text-[19px] whitespace-pre-wrap sm:whitespace-nowrap sm:text-[23px] !font-jost font-[600] text-gray-900 leading-[35px] sm:leading-[45px] tracking-[0.09em] mb-[17px]'>
              <span className='ms-hightlight uppercase ms-hightlight-line before:w-[106%] before:bg-green-40 before:h-[40%] pb-6)'>
                Design
              </span>
            </h2>
          </div>
          <p className='mx-auto text-justify text-gray-900 text-[14px] leading-[23px] tracking-[0.01em]'>
            Websites promote you 24/7: No employee will do that. So, when I
            design a website I try to give the best of myself to do an awesome,
            clean and service related design for the website. Good design can
            improve the quality of your business.
          </p>
        </div>

        <div
          data-aos='fade-up'
          data-aos-once='true'
          data-aos-delay='700'
          className='process-item bg-white z-10 p-4 mx-2 sm:m-0 px-6 shadow-service w-[480px]'
        >
          <div className='header pt-2 pb-4 flex justify-between items-center'>
            <h3 className='ms-hightlight ms-hightlight-3 text-[46px] leading-6 !font-jost font-semibold tracking-[0.01em] text-gray-50 pl-5'>
              04
            </h3>
            <img
              className='w-full mx-2 mr-4 h-[2px] hidden sm:block'
              src={require("../../Assets/Images/process.jpg")}
              alt='ProcessImage'
            />
            <h2 className='text-[19px] sm:text-[23px] whitespace-pre-wrap sm:whitespace-nowrap !font-jost font-[600] text-gray-900 leading-[35px] sm:leading-[45px] tracking-[0.09em] mb-[17px]'>
              <span className='ms-hightlight uppercase ms-hightlight-line before:w-[110%] before:bg-green-40 before:h-[40%] pb-6)'>
                Coding
              </span>
            </h2>
          </div>
          <p className='mx-auto text-justify text-gray-900 text-[14px] leading-[23px] tracking-[0.01em]'>
            The website is built by web language that’s why we need to code for
            every website. Clean & developer friendly & w3c validated coding can
            be a core part to make your website dynamic & full functional. I
            always do coding in the best & professional way.
          </p>
        </div>

        <div
          data-aos='fade-up'
          data-aos-once='true'
          data-aos-delay='900'
          className='process-item bg-white z-10 p-4 mx-2 sm:m-0 px-6 shadow-service w-[480px]'
        >
          <div className='header pt-2 pb-4 flex justify-between flex-row-reverse sm:flex-row items-center'>
            <h3 className='ms-hightlight ms-hightlight-3 text-[46px] leading-6 !font-jost font-semibold tracking-[0.01em] text-gray-50 pl-5'>
              05
            </h3>
            <img
              className='w-[10%] mx-2 mr-4 h-[2px] hidden sm:block'
              src={require("../../Assets/Images/process.jpg")}
              alt='ProcessImage'
            />
            <h2 className='text-[19px] sm:text-[23px] whitespace-pre-wrap sm:whitespace-nowrap !font-jost font-[600] text-gray-900 leading-[35px] sm:leading-[45px] tracking-[0.09em] mb-[17px]'>
              <span className='ms-hightlight uppercase ms-hightlight-line before:w-[110%] before:bg-green-40 before:h-[40%] pb-6)'>
                Submit for Review
              </span>
            </h2>
          </div>
          <p className='mx-auto text-justify text-gray-900 text-[14px] leading-[23px] tracking-[0.01em]'>
            Once the design and coding is complete, I send it to the client for
            review. After the client check, If it is necessary to modify or
            revise, I tell the client to send them all in a list and I am happy
            to make all the changes every time.
          </p>
        </div>

        <div
          data-aos='fade-up'
          data-aos-once='true'
          data-aos-delay='1100'
          className='process-item bg-white z-10 p-4 mx-2 sm:m-0 px-6 shadow-service w-[480px]'
        >
          <div className='header pt-2 pb-4 flex justify-between items-center'>
            <h3 className='ms-hightlight ms-hightlight-3 text-[46px] leading-6 !font-jost font-semibold tracking-[0.01em] text-gray-50 pl-5'>
              06
            </h3>
            <img
              className='w-[25%] mx-2 mr-4 h-[2px] hidden sm:block'
              src={require("../../Assets/Images/process.jpg")}
              alt='ProcessImage'
            />
            <h2 className='text-[19px] sm:text-[23px] whitespace-pre-wrap sm:whitespace-nowrap !font-jost font-[600] text-gray-900 leading-[35px] sm:leading-[45px] tracking-[0.09em] mb-[17px]'>
              <span className='ms-hightlight uppercase ms-hightlight-line before:w-[110%] before:bg-green-40 before:h-[40%] pb-6)'>
                Website Ready
              </span>
            </h2>
          </div>
          <p className='mx-auto text-justify text-gray-900 text-[14px] leading-[23px] tracking-[0.01em]'>
            After reviewing everything, we are going to the final step, if
            everything has done, then I can publish it for everyone.{" "}
            <span className='text-green-700'>
              It's not like that a website completed and the relationship with
              the client is also finished. I always give lifetime support to my
              client and help them when they face any website related problem.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkingProcess;
