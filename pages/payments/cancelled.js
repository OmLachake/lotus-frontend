import { useRouter } from "next/router";
import React from "react";
import { BsBagCheckFill } from "react-icons/bs";

const Cancelled = () => {
  const router = useRouter();

  return (
    <main>
      <div className="w-full h-full flex justify-center items-center h-[50vh]">
        <div
          className="flex justify-center flex-col items-center my-10 md:w-[40vw] border-2 border-purple h-20vh
      p-5 py-10 bg-white rounded-lg
      "
        >
          <div className="font-josan text-2xl font-light text-red text-center">
            Payment Failed.
          </div>

          <div className="font-josan text-2xl font-light text-center"></div>
          <button
            className="my-10 text-xl py-4 btn-outline w-full md:w-auto "
            onClick={() => router.push("/")}
          >
            <BsBagCheckFill className="text-2xl md:text-lg" />
            Back To Shop
          </button>
        </div>
      </div>
    </main>
  );
};

export default Cancelled;
