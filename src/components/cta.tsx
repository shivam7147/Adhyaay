import { useNavigate } from "react-router-dom";
import Business from "../assets/Business.json";
import Lottie from "lottie-react";

export default function CTA() {
  const router = useNavigate();
  return (
    <section className="flex py-16 md:py-20">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        {/* Combined CTA + Animation Box */}
        <div className="relative flex flex-col md:flex-row items-center justify-between overflow-hidden rounded-[40px] bg-orange-500 p-8 sm:p-12 md:p-16">
          
          {/* Background circles */}
          <div className="absolute inset-0 hidden md:block">
            <div className="absolute top-1/2 right-[-30%] aspect-square h-[900px] w-[900px] -translate-y-1/2">
              <div className="absolute inset-0 rounded-full bg-orange-400 opacity-30"></div>
              <div className="absolute inset-0 scale-[0.8] rounded-full bg-orange-300 opacity-30"></div>
              <div className="absolute inset-0 scale-[0.6] rounded-full bg-orange-200 opacity-30"></div>
              <div className="absolute inset-0 scale-[0.4] rounded-full bg-orange-100 opacity-30"></div>
            </div>
          </div>

            {/* CTA Text */}
            <div className="relative z-10 w-full md:w-1/2 text-center md:text-left">
              <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                Let&apos;s Get In Touch.
              </h1>
              <p className="mb-8 max-w-md text-base text-white sm:text-lg">
                For guidance, support, or mentorship, Adhyaay is here to listen and walk with you.
              </p>

              {/* Buttons side by side */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button
                  className="flex items-center justify-between rounded-full bg-black px-6 py-3 text-white sm:w-[240px]"
                  onClick={() => router("/adhyaay/councellors")}
                >
                  <span className="font-medium">Book Appointment</span>
                  <span className="h-5 w-5 flex-shrink-0 rounded-full bg-white"></span>
                </button>

                <button
                  className="flex items-center justify-between rounded-full bg-black px-6 py-3 text-white sm:w-[240px]"
                  onClick={() => router("/adhyaay/mentors")}
                >
                  <span className="font-medium">Meet Your Mentors</span>
                  <span className="h-5 w-5 flex-shrink-0 rounded-full bg-white"></span>
                </button>
              </div>
            </div>

          {/* Lottie Animation */}
          <div className="relative z-10 w-full md:w-1/2 mt-8 md:mt-0 flex justify-center">
            <div className="w-full max-w-md">
              <Lottie animationData={Business} loop={true} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
