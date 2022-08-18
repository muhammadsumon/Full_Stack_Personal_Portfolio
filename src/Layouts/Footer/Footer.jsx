import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        wordSpacing: "2px",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1637682184683-74e6d34ed72d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fGJsYWNrJTIwcGF0dGVybnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60')",
      }}
      className='bg-center p-4 text-white trac leading-[180%] spac font-nunito mx-0 text-center text-[14px]'
    >
      Ui/Ux Design & Developed Using Figma, React, Next, Node, Express, MongoDb
      By
      <span className='text-green-50'> Muhammad Sumon</span>
    </footer>
  );
};

export default Footer;
