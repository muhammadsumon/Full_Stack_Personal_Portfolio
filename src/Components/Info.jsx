import React, { useState } from "react";
import CloseIcon from "../Assets/Icons/ContactForm/CloseIcon";

const Info = () => {
  const [isVisible, setIsVisible] = useState(
    // It will Check is user use firefox browser or not.
    // If user use other browser instead of firefox, Notification will show
    "InstallTrigger" in window ? false : true
  );

  // Hide Notificatio after 5 seconds
  setTimeout(() => {
    setIsVisible(false);
  }, 8000);

  return (
    <div
      className={`bottom-5 smMax:w-[90%] font-mulish text-sm left-[50%] translate-x-[-50%] fixed bg-secondary text-white rounded-xl py-3 px-6 pr-12 transition-all ${
        isVisible ? "block" : "hidden"
      }`}
    >
      Please use “Firefox Browser” For Better User Experience
      <button
        onClick={(e) => setIsVisible(false)}
        className='cursor-pointer text-white absolute -right-2 -top-1 bg-white w-[35px] h-[35px] rounded-full border-[#0c0c0c91] border flex justify-center items-center'
      >
        <CloseIcon />
      </button>
    </div>
  );
};

export default Info;
