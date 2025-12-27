import React from "react";
import Lottie from "lottie-react";
import { Badge } from "../components/ui/badge";
import councellorHero from "../assets/CoucellorHero.json";
import { SparklesIcon } from "lucide-react";
import { Button } from "../components/ui/button"; // shadcn Button
import Councellingbenifits,{ services_data as services_data } from "../components/Councellingbenifits"; 
import Councellorsinfo,{ teamMembers3D as teamMembers3D} from "../components/Councellorsinfo";
import { SmoothCursor } from '../components/ui/smooth-cursor';
import { useNavigate } from "react-router-dom";

export default function Councellors() {
  const router = useNavigate();
  return (
    <>
    {/* <SmoothCursor /> */}
    <section className="flex flex-col md:flex-row items-center justify-between w-full h-screen px-6 md:px-16">
      {/* Left Side - Text */}
      <div className="w-full md:w-2/5 pt-20 space-y-4 md:space-y-6">
        <Badge
          variant="outline"
          className="mb-6 rounded-[14px] border border-gray-300 bg-white text-lg text-gray-900"
        >
          <SparklesIcon className="mr-2 fill-orange-300 stroke-1 text-gray-900" />
          Expert Councellors
        </Badge>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-snug">
          Uncover Your <span className="text-orange-600">True Potential</span>
          <br /> Expert Support
        </h1>

        <p className="text-sm sm:text-base md:text-lg lg:text-lg text-gray-600">
          A modern approach to relax your mind, overcome challenges, and unlock your personal and professional growth.
        </p>

        {/* Book Appointment Button */}
        <Button
          size="lg"
          className="mt-4 rounded-xl bg-orange-600 text-white hover:bg-orange-500"
          onClick={() => router("/adhyaay/book")}
        >
          Book Your Session
        </Button>
      </div>

      {/* Right Side - Animation */}
      <div className="w-full md:w-3/5 flex justify-center">
        <Lottie
          animationData={councellorHero}
          loop={true}
          className="w-5/6 md:w-4/5"
        />
      </div>
    </section>
        <Councellingbenifits services={services_data} /> 
        <Councellorsinfo teamMembers={teamMembers3D} />
    </>
  );
}
