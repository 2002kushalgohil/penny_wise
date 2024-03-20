import React from "react";

function Hero() {
  return (
    <div className="h-screen w-screen bg-[radial-gradient(#ffffff33_1px,#0D0D0D_1px)] bg-[size:30px_30px] flex items-center justify-center flex-col gap-4 md:gap-10">
      <img src="logo.png" className="w-10 md:w-20"/>
        <h1 className="text-4xl md:text-8xl">Penny Wise</h1>
        <p className="text-lg md:text-4xl">Comming Soon...</p>
    </div>
  );
}

export default Hero;
