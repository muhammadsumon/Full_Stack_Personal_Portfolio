import axios from "axios";
import { FormikProvider, useFormik } from "formik";
import React, { useState } from "react";
import { tw } from "twind";
import * as yup from "yup";
import CloseIcon from "../../Assets/Icons/ContactForm/CloseIcon";
import EmailIcon from "../../Assets/Icons/ContactForm/EmailIcon";
import MoneyIcon from "../../Assets/Icons/ContactForm/MoneyIcon";
import NameIcon from "../../Assets/Icons/ContactForm/NameIcon";

const ContactWithMe = (props) => {
  // Alert
  const [alert, setAlert] = useState({
    message: "This is a alert",
    type: "",
    status: false,
  });

  const Alert = () => {
    return (
      <div
        className={`bottom-5 z-[999] smMax:w-[90%] font-mulish text-sm left-[50%] translate-x-[-50%] fixed bg-secondary text-white rounded-xl py-3 px-6 pr-12 transition-all ${
          alert.status ? "block" : "hidden"
        }`}
      >
        {alert.message}
        <button
          onClick={(e) => setAlert(false)}
          className='cursor-pointer text-white absolute -right-2 -top-1 bg-white w-[35px] h-[35px] rounded-full border-[#0c0c0c91] border flex justify-center items-center'
        >
          <CloseIcon />
        </button>
      </div>
    );
  };

  // Form Data Processing
  const FormSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    budget: yup.string().required(),
    brief: yup.string().required(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      budget: "",
      brief: "",
    },
    validationSchema: FormSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      await axios
        .post("https://formspree.io/f/mrgdgkqa", values)
        .then((res) => {
          if (res.data.ok === true) {
            setAlert({
              ...alert,
              status: true,
              message: "Form Submitted Successfully",
            });
            resetForm();
            setSubmitting = true;
          }
        })
        .catch((err) => {
          if (err.status !== 200) {
            setAlert({
              ...alert,
              status: true,
              message: "Internal server Error. Please contact with mail",
            });
            setSubmitting = false;
          }
        });
    },
  });

  const { errors, values, touched, handleSubmit, getFieldProps } = formik;

  return (
    <div
      {...props}
      className={`p-4 xl:container mx-auto flex lgMax:items-center lgMax:flex-col lgMax:justify-center justify-between mb-4 ${props.className}`}
    >
      {/* Left Side  */}
      <div className='left lgMax:text-center'>
        <div className='flex flex-col mx-auto heading mb-[50px] sm:mb-[80px]'>
          <h2 className='text-[25px] sm:text-[30px] font-mulish capitalize font-[600] text-gray-900 leading-[45px] tracking-[0.03em]'>
            <span className='ms-hightlight ms-hightlight-2 py-2'>Let’s</span>{" "}
            start a project <br className='hidden lg:block' />
            together !
          </h2>
          <p className='text-gray-900 text-[16px] mt-[27px] !font-jost leading-[28px] tracking-[0.03em]'>
            Have Any project on mind ? Let’s start together to make it{" "}
            <br className='hidden sm:block' /> live . Don’t like form ?{" "}
            <a
              href='.'
              className='text-blue-600'
              onClick={(e) => e.preventDefault()}
            >
              send email
            </a>
            .
          </p>
          <img
            className='-mt-10 -z-10 lgMax:w-full lgMax:max-w-[610px] lgMax:mx-auto block'
            src={require("../../Assets/Images/contact.png")}
            alt='vector'
          />
        </div>
      </div>

      {/* Right Side  */}
      <div className='right w-full max-w-[410px]'>
        <div className='contactForm'>
          <FormikProvider value={formik}>
            <form onSubmit={handleSubmit} noValidate autoComplete='off'>
              {/* Alert  */}
              <Alert />

              {/* Client Name  */}
              <div className='input-group mb-4'>
                <label
                  htmlFor='clientName'
                  className='text-gray-900 text-[16px] capitalize font-normal !font-jost leading-[28px] tracking-[0.03em]'
                >
                  What is your name ?
                  <sup className='text-red-600 text-[14px]'>*</sup>
                </label>
                <br />
                <div className='relative'>
                  <input
                    type='text'
                    id='clientName'
                    {...getFieldProps("name")}
                    value={values.name}
                    className='w-full sm:w-[389px] placeholder-gray-400 h-[50px] mt-2 rounded-md p-2 pl-14 border-blue-400 border border-opacity-80 focus:outline-none'
                    placeholder='Ex - Muhammad Sumon'
                  />
                  <NameIcon className='absolute bottom-[12px] left-[12px]' />
                </div>
                {touched.name && errors.name ? (
                  <div className='pt-2 capitalize text-red-600 text-[14px]'>
                    {errors.name}
                  </div>
                ) : null}
              </div>

              {/* Client Email  */}
              <div className='input-group mb-4'>
                <label
                  htmlFor='clientEmail'
                  className='text-gray-900 text-[16px] capitalize font-normal !font-jost leading-[28px] tracking-[0.03em]'
                >
                  What Is your Email address ?
                  <sup className='text-red-600 text-[14px]'>*</sup>
                </label>
                <br />
                <div className='relative'>
                  <input
                    type='text'
                    id='clientEmail'
                    {...getFieldProps("email")}
                    value={values.email}
                    className='w-full sm:w-[389px] placeholder-gray-400 h-[50px] mt-2 rounded-md p-2 pl-14 border-blue-400 border border-opacity-80 focus:outline-none'
                    placeholder='Ex - muhammadsumon.me@gmail.com'
                  />
                  <EmailIcon className='absolute bottom-[12px] left-[12px]' />
                </div>
                {touched.email && errors.email ? (
                  <div className='pt-2 capitalize text-red-600 text-[14px]'>
                    {errors.email}
                  </div>
                ) : null}
              </div>

              {/* Client Budget  */}
              <div className='input-group mb-4'>
                <label
                  htmlFor='clientBudget'
                  className='text-gray-900 text-[16px] capitalize font-normal !font-jost leading-[28px] tracking-[0.03em]'
                >
                  What is your budget Range ?
                  <sup className='text-red-600 text-[14px]'>*</sup>
                </label>
                <br />
                <div className='relative'>
                  <input
                    type='text'
                    id='clientBudget'
                    {...getFieldProps("budget")}
                    value={values.budget}
                    className='w-full sm:w-[389px] placeholder-gray-400 h-[50px] mt-2 rounded-md p-2 pl-14 border-blue-400 border border-opacity-80 focus:outline-none'
                    placeholder='Ex - 500 - 2500 $'
                  />
                  <MoneyIcon className='absolute bottom-[12px] left-[12px]' />
                </div>
                {touched.budget && errors.budget ? (
                  <div className='pt-2 capitalize text-red-600 text-[14px]'>
                    {errors.budget}
                  </div>
                ) : null}
              </div>

              {/* Project Brief  */}
              <div className='input-group mb-4'>
                <label
                  htmlFor='projectBrief'
                  className='text-gray-900 text-[16px] capitalize font-normal !font-jost leading-[28px] tracking-[0.03em]'
                >
                  Project Brief (Tell me about your project)
                  <sup className='text-red-600 text-[14px]'>*</sup>
                </label>
                <br />
                <div className='relative'>
                  <textarea
                    type='text'
                    id='projectBrief'
                    {...getFieldProps("brief")}
                    value={values.brief}
                    className='w-full sm:w-[389px] h-[120px] placeholder-gray-400 placeholder:capitalize mt-2 rounded-md p-3 px-4 border-blue-400 border border-opacity-80 focus:outline-none'
                    placeholder='Ex - I have a figma design you have to convert it into html. i’m attaching figma design link. Let me know total time and price'
                  />
                </div>
                {touched.brief && errors.brief ? (
                  <div className='pt-2 capitalize text-red-600 text-[14px]'>
                    {errors.brief}
                  </div>
                ) : null}
              </div>

              <button
                type='submit'
                className={tw`transition-all duration-300 px-8 py-2 font(jost normal) border border-1 outline-blue-500 text-gray-900 rounded mt-[25px] ml-auto block focus:( ring-4 ring-blue-200 outline-8))`}
              >
                Submit Form
              </button>
            </form>
          </FormikProvider>
        </div>
      </div>
    </div>
  );
};

export default ContactWithMe;
