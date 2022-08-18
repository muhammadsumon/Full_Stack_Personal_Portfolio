/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable no-loop-func */
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useReducer } from "react";
import { AiOutlineClose, AiOutlineLink } from "react-icons/ai";
import { tw } from "twind";
import CategoryIcon from "../../Assets/Icons/Portfolio/CategoryIcon";
import CheckBox from "../../Assets/Icons/Portfolio/CheckBox";
import CollapsIcon from "../../Assets/Icons/Portfolio/CollapsIcon";
import DownIcon from "../../Assets/Icons/Portfolio/DownIcon";
import FilterIcon from "../../Assets/Icons/Portfolio/FilterIcon";
import ProjectType from "../../Assets/Icons/Portfolio/ProjectType";
import fetcher from "../../Utils/api";
import InternalServerError from "../InternalServerError";
import Loading from "../Loading";
import ProjectNotFound from "../ProjectNotFound";

const initialValue = {
  isLoading: false,
  isModalOpen: false,
  isBackendError: false,
  screenDimension: 0,
  types: [],
  projects: [],
  categories: [],
  technologies: [],
  appliedFilter: [],
  projectDetails: {},
  unFilteredProjects: [],
  isFilterResultFound: true,
  projectFilter: {
    type: "",
    category: "",
    technology: [],
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setScreenDimension":
      const filterSidebar = document.querySelector(".filterSidebar");
      const filterSidebarShowHideBtn = document.querySelector(
        ".filterSidebar .filterBtn"
      );

      if (state.screenDimension > 991) {
        document.querySelector(".filterSidebar .filterBtn").innerHTML =
          "Filter Projects";
        filterSidebarShowHideBtn.innerText = "Filter Projects";
      } else {
        filterSidebar.classList.add("hidden");
        filterSidebarShowHideBtn.innerText = "Close Filter";
      }

      return { ...state, screenDimension: window.screen.width };
    case "setLoading":
      return { ...state, isLoading: true };

    // Project Filtering
    case "filterProject":
      const typeList = state.projectFilter.type;
      const categoryList = state.projectFilter.category;
      const technologyList = state.projectFilter.technology;

      // Filter Based on Type, Category
      const filteredByTypeCategory = state.unFilteredProjects.filter((pr) => {
        return (
          pr.category._id.includes(categoryList) &&
          pr.type._id.includes(typeList)
        );
      });

      // Get All Project which match with the filter used technology
      let isAllTechMatched = true;
      const arrWithDupValue = [];
      technologyList &&
        technologyList[0] &&
        technologyList.map((techItem01) => {
          let matchedProjects = [];
          filteredByTypeCategory.map((projectItem) => {
            projectItem.usedTechnology.map((techItem02) => {
              if (techItem02._id === techItem01._id) {
                matchedProjects.push(projectItem);
              }
            });
          });

          matchedProjects[0]
            ? arrWithDupValue.push(...matchedProjects)
            : arrWithDupValue.push(...matchedProjects) +
              (isAllTechMatched = false);
        });

      // Remove All Duplicates Project
      const uniqueIds = [];
      const arrWithUniqValue = arrWithDupValue.filter((element) => {
        const isDuplicate = uniqueIds.includes(element._id);

        if (!isDuplicate) {
          uniqueIds.push(element._id);

          return true;
        }

        return false;
      });

      // Final Result Based on Type, Category & Used Technology
      const finalResult = arrWithUniqValue[0]
        ? arrWithUniqValue
        : filteredByTypeCategory;

      // If No Filter Result Found
      isAllTechMatched && finalResult[0]
        ? (state.isFilterResultFound = true)
        : (state.isFilterResultFound = false);

      console.log({
        technology: state.projectFilter.technology,
      });

      return {
        ...state,
        projects: finalResult ? finalResult : state.unFilteredProjects,
      };
    case "setCurrentType":
      return {
        ...state,
        projectFilter: {
          ...state.projectFilter,
          type: action.currentType,
        },
      };
    case "setCurrentCategory":
      return {
        ...state,
        projectFilter: {
          ...state.projectFilter,
          category: action.currentCategory,
        },
      };
    case "setCurrentTech":
      if (action.isChecked) {
        return {
          ...state,
          projectFilter: {
            ...state.projectFilter,
            technology: [
              ...(state.projectFilter.technology
                ? state.projectFilter.technology
                : []),
              action.tech,
            ],
          },
        };
      } else if (!action.isChecked) {
        const filteredArr = state.projectFilter.technology
          ? state.projectFilter.technology.filter((tech) => {
              return tech._id !== action.tech._id;
            })
          : [];

        return {
          ...state,
          projectFilter: {
            ...state.projectFilter,
            technology: filteredArr,
          },
        };
      }

      return {
        ...state,
        projectFilter: {
          ...state.projectFilter,
          technology: action.currentTech,
        },
      };

    // Project Details Modal
    case "openModal":
      return { ...state, isModalOpen: true };
    case "closeModal":
      return { ...state, isModalOpen: false };
    case "setProjectDetails":
      const projectID = action.projectId;

      const currentProject = state.projects.find((res) => {
        return res._id === projectID;
      });

      return {
        ...state,
        projectDetails: currentProject,
        isModalOpen: true,
        isLoading: false,
        isBackendError: false,
      };

    // Set Data From API
    case "setProjects":
      return {
        ...state,
        projects: action.projects,
        unFilteredProjects: action.projects,
        isLoading: false,
        isBackendError: false,
      };
    case "setTypes":
      return {
        ...state,
        types: action.types,
        isLoading: false,
        isBackendError: false,
      };
    case "setCategories":
      return {
        ...state,
        categories: action.categories,
        isLoading: false,
        isBackendError: false,
      };
    case "setTechnologies":
      return {
        ...state,
        technologies: action.technologies,
        isLoading: false,
        isBackendError: false,
      };
    case "apiError":
      return {
        ...state,
        isLoading: false,
        isBackendError: true,
      };
    default:
      return state;
  }
};

const CompletedProjects = (props) => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  // Change Project Filter Sidebar Heading according to screen size (bugFix)
  useEffect(() => {
    function handleResize() {
      dispatch({ type: "setScreenDimension" });
    }
    window.addEventListener("resize", handleResize);
  }, []);

  // Project Filtering
  const getCurrentType = ({ e, id }) => {
    dispatch({ type: "setCurrentType", currentType: id });
    dispatch({ type: "filterProject" });
  };
  const getCurrentTech = ({ e, tech }) => {
    // If checked
    if (e.target.checked) {
      dispatch({ type: "setCurrentTech", isChecked: e.target.checked, tech });
      dispatch({ type: "filterProject" });
    } else if (!e.target.checked) {
      // If unChecked
      dispatch({ type: "setCurrentTech", isChecked: e.target.checked, tech });
      dispatch({ type: "filterProject" });
    }
  };
  const getCurrentCategory = ({ e, id }) => {
    dispatch({ type: "setCurrentCategory", currentCategory: id });
    dispatch({ type: "filterProject" });
  };

  // Initial Projects, Category, Types, Technology Load from Api
  useEffect(() => {
    dispatch({ type: "setLoading" });
    const initFetch = async () => {
      const projectsReq = await fetcher(
        `${process.env.React_App_Api_Url}/projects`
      ).catch((err) => {
        if (err && err.status !== 200) {
          dispatch({ type: "apiError" });
        }
      });
      dispatch({ type: "setProjects", projects: projectsReq.data });

      const typesReq = await fetcher(
        `${process.env.React_App_Api_Url}/projecttypes`
      ).catch((err) => {
        if (err && err.status !== 200) {
          dispatch({ type: "apiError" });
        }
      });
      dispatch({ type: "setTypes", types: typesReq.data });

      const categoriesReq = await fetcher(
        `${process.env.React_App_Api_Url}/categories`
      ).catch((err) => {
        if (err && err.status !== 200) {
          dispatch({ type: "apiError" });
        }
      });
      dispatch({ type: "setCategories", categories: categoriesReq.data });

      const technologiesReq = await fetcher(
        `${process.env.React_App_Api_Url}/technologies`
      ).catch((err) => {
        if (err && err.status !== 200) {
          dispatch({ type: "apiError" });
        }
      });
      dispatch({ type: "setTechnologies", technologies: technologiesReq.data });
    };

    initFetch();
  }, []);

  // Project Filter Sidebar Collapsed/Uncollapsed
  const PortfolioSideBarShowHide = (e) => {
    const filterSidebar = document.querySelector(".filterSidebar");

    if (state.screenDimension < 992) {
      if (filterSidebar.classList.contains("hidden")) {
        filterSidebar.classList.remove("hidden");
      } else {
        filterSidebar.classList.add("hidden");
      }
    }
  };

  return (
    <div
      {...props}
      id='portfolio'
      className={`p-4 xl:container mx-auto completedProjects mb-[80px] sm:mb-[150px] ${props.className}`}
    >
      {/* Heading  */}
      <div className='mx-auto heading mb-[50px] sm:mb-[80px]'>
        <h2 className='text-[25px] text-center sm:text-[30px] !font-jost font-semibold w-fit mx-auto text-gray-900 leading-[35px] sm:leading-[45px] tracking-[0.03em] mt-[18px] mb-[17px]'>
          <span className='ms-hightlight ms-hightlight-2 py-2'>My</span> All Com
          <span className='ms-hightlight ms-hightlight-line'>pleted Proj</span>
          ects
        </h2>
        <p className='w-fit mx-auto text-gray-900 text-center leading-[26px] tracking-[0.01em]'>
          Explore some of my awesome projects
        </p>
      </div>

      {/* Projects */}
      <div
        className={tw`w-full h-[650px] relative flex overflow-hidden outline outline-1 outline-gray-100`}
      >
        {/* Left Sidebar  */}
        <div className='filterSidebar lgMax:w-[calc(100%-52px)] lg:w-[291px] h-[650px] hidden lgMax:absolute lg:block overflow-y-scroll scrollbar-hide outline outline-1 outline-gray-100 bg-white lgMax:z-[100]'>
          {/* Heading  */}
          <div className='flex sticky w-full top-0 bg-white justify-between items-center px-4 py-3 outline outline-1 outline-gray-100 z-20'>
            <div
              onClick={(e) => PortfolioSideBarShowHide(e)}
              className='flex items-center select-none cursor-pointer'
            >
              <FilterIcon className='inline-block mr-3' />
              <span className='filterBtn inline-block !font-jost font-medium text-gray-800 tracking-[0.05em] leading-[20px]'>
                Filter Projects
              </span>
            </div>
            <CollapsIcon
              onClick={(e) => PortfolioSideBarShowHide(e)}
              className='mr-1 cursor-pointer box-content'
            />
          </div>

          {/* Project Type  */}
          <Disclosure defaultOpen={true} as='div'>
            {({ open }) => (
              <div className=''>
                {/* Heading  */}
                <Disclosure.Button
                  as='div'
                  className={tw`select-none cursor-pointer flex px-4 py-2 justify-between items-center border-t w-full `}
                >
                  <div className='flex items-center'>
                    <ProjectType className='mr-3' />
                    <p className='text-[15px] inline-block !font-jost font-medium text-gray-800 tracking-[0.05em] leading-[20px]'>
                      Project Type
                    </p>
                  </div>
                  <button className='p-3 -mr-3 focus-within:!outline-none'>
                    {open ? (
                      <DownIcon className='-scale-y-[1]' />
                    ) : (
                      <DownIcon />
                    )}
                  </button>
                </Disclosure.Button>

                {/* Project Types  */}
                <Disclosure.Panel
                  as='form'
                  className={`p-4 py-3 border-t flex flex-wrap`}
                >
                  {/* All */}
                  <label className='py-2 container cursor-pointer select-none relative ml-9 flex items-center !font-jost text-[15px] tracking-[0.05em] text-black85'>
                    All
                    <input
                      type='radio'
                      className='opacity-0 absolute peer'
                      value=''
                      defaultChecked={!state.projectFilter.type ? true : false}
                      onClick={(e) =>
                        getCurrentType({ e: e, id: e.target.value })
                      }
                      name='radio'
                    />
                    <span className='peer-checked:border-4 peer-checked:border-green-200 absolute -left-9 border-2 border-gray-300 rounded-full bg-transparent w-[20px] h-[20px]'></span>
                  </label>
                  {state.types &&
                    state.types[0] &&
                    state.types.map(({ name, _id }) => (
                      <label
                        key={_id}
                        className='py-2 container cursor-pointer select-none relative ml-9 flex items-center !font-jost text-[15px] tracking-[0.05em] text-black85'
                      >
                        {name}
                        <input
                          type='radio'
                          className='opacity-0 absolute peer'
                          value={_id}
                          defaultChecked={
                            _id === state.projectFilter.type ? true : false
                          }
                          onClick={(e) =>
                            getCurrentType({ e: e, id: e.target.value })
                          }
                          name='radio'
                        />
                        <span className='peer-checked:border-4 peer-checked:border-green-200 absolute -left-9 border-2 border-gray-300 rounded-full bg-transparent w-[20px] h-[20px]'></span>
                      </label>
                    ))}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>

          {/* Used Technology  */}
          <Disclosure
            defaultOpen={state.isBackendError ? false : true}
            as='div'
          >
            {({ open }) => (
              <div className=''>
                {/* Heading  */}
                <Disclosure.Button
                  as='div'
                  className={tw`select-none cursor-pointer flex px-4 py-2 border-t border-b justify-between items-center w-full`}
                >
                  <div className='flex items-center'>
                    <CategoryIcon className='mr-3' />
                    <p className='text-[15px] inline-block !font-jost font-medium text-gray-800 tracking-[0.05em] leading-[20px]'>
                      Used Technology
                    </p>
                  </div>
                  <button className='p-3 -mr-3 focus-within:!outline-none'>
                    {open ? (
                      <DownIcon className='-scale-y-[1]' />
                    ) : (
                      <DownIcon />
                    )}
                  </button>
                </Disclosure.Button>

                {/* Project Types  */}
                <Disclosure.Panel
                  as='form'
                  className={`p-4 border-b py-3 flex flex-wrap`}
                >
                  {state.technologies &&
                    state.technologies[0] &&
                    state.technologies.map(({ name, _id }) => (
                      <label
                        key={_id}
                        className='py-2 container cursor-pointer select-none relative ml-9 flex items-center !font-jost text-[15px] tracking-[0.05em] text-black85'
                      >
                        {name}
                        <input
                          type='checkbox'
                          className='opacity-0 absolute cursor-pointer peer'
                          name='radio'
                          value={_id}
                          defaultChecked={state.projectFilter.technology
                            .map((ele) => {
                              if (ele._id === _id) {
                                return true;
                              }
                              return false;
                            })
                            .some((ele) => (ele === true ? true : false))}
                          onClick={(e) =>
                            getCurrentTech({ e: e, tech: { _id, name } })
                          }
                        />
                        <span
                          className={tw`absolute -left-9 border-2 border-gray-300 rounded-md bg-transparent cursor-pointer w-[20px] h-[20px]`}
                        ></span>
                        <CheckBox className='absolute -left-9 cursor-pointer hidden peer-checked:block' />
                      </label>
                    ))}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>

          {/* Category */}
          <Disclosure
            defaultOpen={state.isBackendError ? true : false}
            as='div'
          >
            {({ open }) => (
              <div className=''>
                {/* Heading  */}
                <Disclosure.Button
                  as='div'
                  className={tw`select-none cursor-pointer flex px-4 py-2 justify-between items-center border-b w-full `}
                >
                  <div className='flex items-center'>
                    <ProjectType className='mr-3' />
                    <p className='text-[15px] inline-block !font-jost font-medium text-gray-800 tracking-[0.05em] leading-[20px]'>
                      Category
                    </p>
                  </div>
                  <button className='p-3 -mr-3 focus-within:!outline-none'>
                    {open ? (
                      <DownIcon className='-scale-y-[1]' />
                    ) : (
                      <DownIcon />
                    )}
                  </button>
                </Disclosure.Button>

                {/* Category  */}
                <Disclosure.Panel
                  as='form'
                  className={`p-4 py-3 flex flex-wrap`}
                >
                  <label className='py-2 container cursor-pointer select-none relative ml-9 flex items-center !font-jost text-[15px] tracking-[0.05em] text-black85'>
                    All
                    <input
                      type='radio'
                      value=''
                      defaultChecked={
                        !state.projectFilter.category ? true : false
                      }
                      onClick={(e) =>
                        getCurrentCategory({ e: e, id: e.target.value })
                      }
                      className='opacity-0 absolute peer'
                      name='radio'
                    />
                    <span className='peer-checked:border-4 peer-checked:border-green-200 absolute -left-9 border-2 border-gray-300 rounded-full bg-transparent w-[20px] h-[20px]'></span>
                  </label>
                  {state.categories &&
                    state.categories[0] &&
                    state.categories.map(({ name, _id }) => (
                      <label
                        key={_id}
                        className='py-2 container cursor-pointer select-none relative ml-9 flex items-center !font-jost text-[15px] tracking-[0.05em] text-black85'
                      >
                        {name}
                        <input
                          type='radio'
                          onClick={(e) =>
                            getCurrentCategory({ e: e, id: e.target.value })
                          }
                          value={_id}
                          defaultChecked={
                            _id === state.projectFilter.category ? true : false
                          }
                          className='opacity-0 absolute peer'
                          name='radio'
                        />
                        <span className='peer-checked:border-4 peer-checked:border-green-200 absolute -left-9 border-2 border-gray-300 rounded-full bg-transparent w-[20px] h-[20px]'></span>
                      </label>
                    ))}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        </div>

        {/* Main  */}
        <div
          id='projectMain'
          className='Main w-full h-[650px] md:w-[70%] overflow-scroll scrollbar-hide'
        >
          {/* Filter Button & Total Project */}
          <div className='flex sticky top-0 lg:border-l-[1px] lg:border-gray-100 bg-white justify-between items-center outline outline-1 outline-gray-100 z-20'>
            <button
              onClick={(e) => PortfolioSideBarShowHide(e)}
              className='lgMax:flex hidden items-center border-r px-4 py-3 focus:outline-none'
            >
              <FilterIcon className='inline-block mr-3' />
              <span className='inline-block !font-jost font-medium text-gray-800 tracking-[0.05em] leading-[20px]'>
                Filter Projects
              </span>
            </button>

            <div
              className={tw`cursor-pointer ml-auto border-l box-content px-4 py-3 !font-jost font-medium text-gray-800 tracking-[0.05em] leading-[20px]`}
            >
              {/* If all projects load from api successfully total project number will show else it will be 00 */}
              {state.projects
                ? state.projects.length < 10
                  ? `0` + state.projects.length
                  : state.projects.length
                : "00"}
            </div>
          </div>

          {/* Portfolio Items */}
          <div className='w-full h-full justify-center flex-wrap gap-6 flex p-3'>
            {state.isLoading ? (
              <Loading />
            ) : state.isBackendError ? (
              <InternalServerError />
            ) : !state.isFilterResultFound ? (
              <ProjectNotFound data-aos='fade-up' width='400' height='100%' />
            ) : (
              state.projects &&
              state.projects[0] &&
              state.projects?.map(({ link, _id, name, images, type }) => (
                <div
                  key={_id}
                  data-aos='fade-up'
                  data-aos-anchor='#projectMain'
                  className='item w-full group relative sm:!w-[45%] h-[250px] sm:h-[330px] flex justify-center items-center transition-opacity'
                >
                  <div
                    className='w-full group-hover:blur-[2px] h-full border border-1 flex justify-center overflow-hidden items-end px-6'
                    style={{
                      background: `url(${require("../../Assets/Images/portBg3.png")})`,
                      backgroundSize: "100%",
                      backgroundPosition: "center",
                    }}
                  >
                    <img
                      src={images[0].preview}
                      className='border w-[250px] z-10 h-[85%] -mr-8 object-cover object-top shadow-portfolio'
                      alt=''
                    />
                    <img
                      src={images[0].preview}
                      className='border w-[220px] h-[100%] -ml-8 object-cover object-bottom'
                      alt=''
                    />
                  </div>

                  {/* After Hover State */}
                  <div className='scale-95 group-hover:scale-100 text-[#000000cf] group-hover:flex flex items-center group-hover:visible duration-200 transition-transform absolute w-full h-full z-20 invisible '>
                    <div className='w-full h-fit bg-[#ffffffb3] py-2 flex flex-col justify-center items-center'>
                      <h2 className='text-[26px] mb-1 !font-jost text-center'>
                        {name}
                      </h2>
                      <p className='text-[16px] !font-jost'>{type.name}</p>
                      <div className='icon flex items-center gap-6 mt-4 !font-jost'>
                        <button
                          className='focus:outline-none'
                          onClick={(e) =>
                            dispatch({
                              type: "setProjectDetails",
                              projectId: _id,
                            })
                          }
                        >
                          <AiOutlineLink className='inline-block' />
                          <p className='inline-block ml-1'>DETAILS</p>
                        </button>
                        <a
                          href={link.live}
                          className='cursor-pointer'
                          target='_blank'
                          rel='noreferrer'
                        >
                          <AiOutlineLink className='inline-block' />
                          <p className='inline-block ml-1'>LIVE DEMO</p>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Project Details Modal */}
          <Transition
            appear
            show={state.isModalOpen ? true : false}
            as={Fragment}
          >
            <Dialog
              as='div'
              className='relative z-50'
              onClose={(e) => dispatch({ type: "closeModal" })}
            >
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div
                  onClick={(e) => dispatch({ type: "openModal" })}
                  className='fixed inset-0 bg-black bg-opacity-25'
                />
              </Transition.Child>

              <div className='fixed inset-0'>
                <div className='flex items-center justify-center flex-col p-3 text-center'>
                  <button
                    onClick={(e) => {
                      dispatch({ type: "closeModal" });
                    }}
                    className={tw`outline-none absolute bg-white lgMax:top-[40px] lgMax:left-[50%] lgMax:translate-x-[-50%] block lg:hidden z-[65] p-3 px-5 focus:outline-none rounded-lg lg:(right-0 top-0 scale-110)`}
                  >
                    <AiOutlineClose />
                  </button>
                  <div className='mt-[55px] z-[60] flex align-middle items-center justify-center flex-col'>
                    <Transition.Child
                      as={Fragment}
                      enter='ease-out duration-300'
                      enterFrom='opacity-0 scale-95'
                      enterTo='opacity-100 scale-100'
                      leave='ease-in duration-200'
                      leaveFrom='opacity-100 scale-100'
                      leaveTo='opacity-0 scale-95'
                    >
                      <div className='w-[400px] lg:w-[900px] smMax:w-full h-[500px] bg-slate-100 flex flex-col lg:!flex-row p-6 scrollbar-hide rounded-lg gap-8 lg:relative overflow-scroll'>
                        <button
                          onClick={(e) => {
                            dispatch({ type: "closeModal" });
                          }}
                          className={tw`outline-none absolute bg-white lgMax:top-[40px] lgMax:left-[50%] lgMax:translate-x-[-50%] lgMax:hidden lgMax:translate-y-[-50px] p-3 px-5 focus:outline-none rounded-lg lg:(right-0 top-0 scale-110)`}
                        >
                          <AiOutlineClose />
                        </button>
                        <div className='w-full sm:w-[40%] h-full p-2 relative flex items-center'>
                          {/* Project Preview Images */}
                          <img
                            src={
                              state.projectDetails.images &&
                              state.projectDetails.images[0].preview
                            }
                            className='w-full h-full object-cover object-top rounded-lg'
                            alt='portfolioImage'
                          />

                          {/* Project Preview Control */}
                          <div className='control absolute -left-[5px] flex flex-col gap-4 cursor-pointer'>
                            <div className='control-item w-[25px] h-[25px] bg-green-400 shadow-service rounded-md'></div>
                            <div className='control-item w-[25px] h-[25px] bg-white shadow-service rounded-md'></div>
                            <div className='control-item w-[25px] h-[25px] bg-white shadow-service rounded-md'></div>
                          </div>
                        </div>
                        <div className='w-full sm:w-[60%] h-full p-2 flex flex-col gap-8'>
                          <h2 className='font-mulish font-semibold text-[24px] text-gray-700 text-left'>
                            Project Information
                          </h2>
                          <div className='leading-7 flex flex-col gap-2'>
                            <p className='font-mulish text-[16px] text-gray-700 text-left'>
                              <span className='font-bold mr-2'>Type :</span>
                              {state.projectDetails.type?.name}
                            </p>
                            <p className='font-mulish text-[16px] text-gray-700 text-left'>
                              <span className='font-bold mr-2'>Category :</span>
                              {state.projectDetails.category?.name}
                            </p>
                            <p className='font-mulish text-[16px] text-gray-700 text-left'>
                              <span className='font-bold mr-2'>
                                Used Technology :
                              </span>
                              {state.projectDetails.usedTechnology?.map(
                                ({ name }, index) => {
                                  return `${
                                    name +
                                    (index + 1 ===
                                    state.projectDetails.usedTechnology.length
                                      ? `.`
                                      : ` , `)
                                  }`;
                                }
                              )}
                            </p>
                            <p className='font-mulish text-[16px] text-gray-700 text-left'>
                              <span className='font-bold mr-2'>
                                Responsibility :
                              </span>
                              {state.projectDetails.responsibility &&
                                state.projectDetails.responsibility}
                            </p>
                          </div>
                          <div>
                            <p className='font-mulish leading-7 text-[15px] text-gray-700 text-left'>
                              {state.projectDetails.description &&
                                state.projectDetails.description}
                            </p>
                            <div className='icon flex items-center gap-6 my-3 !font-jost'>
                              <a
                                href={state.projectDetails.link?.live}
                                target='_blank'
                                rel='noreferrer'
                              >
                                <AiOutlineLink className='inline-block' />
                                <p className='text-[14px] text-gray-700 inline-block ml-1'>
                                  Live Demo
                                </p>
                              </a>
                              <a
                                href={state.projectDetails.link?.code}
                                target='_blank'
                                rel='noreferrer'
                              >
                                <AiOutlineLink className='inline-block' />
                                <p className='text-[14px] text-gray-700 inline-block ml-1'>
                                  Code
                                </p>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Transition.Child>
                  </div>
                  <div
                    onClick={(e) => dispatch({ type: "openModal" })}
                    className='w-full min-h-full inset-0 z-0 bg-transparent absolute'
                  ></div>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      </div>
    </div>
  );
};

export default CompletedProjects;
