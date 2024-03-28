"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// Interface for testimonial data
interface TestimonialData {
  name: string;
  testimonial: string;
  company: string;
  avatar: string;
}

// Testimonial component
function Testimonial() {
  // Testimonial data
  const testimonialData: TestimonialData[] = [
    {
      name: "Amit Patel",
      testimonial:
        "“Penny Wise helped me gain better control over my finances. Its intuitive design and powerful tools made budget management effortless.”",
      company: "Tech Solutions Pvt. Ltd.",
      avatar: "https://avatar.example.com/amit_patel.jpg",
    },
    {
      name: "Priya Sharma",
      testimonial:
        "“Managing expenses has never been easier! Penny Wise simplifies budget tracking with its user-friendly interface and insightful analytics.”",
      company: "Global Marketing Agency",
      avatar: "https://avatar.example.com/priya_sharma.jpg",
    },
    {
      name: "Rahul Gupta",
      testimonial:
        "“Penny Wise is a game-changer for entrepreneurs like me. It streamlines financial management, allowing me to focus more on growing my business.”",
      company: "Tech Start-Up",
      avatar: "https://avatar.example.com/rahul_gupta.jpg",
    },
    {
      name: "Neha Singh",
      testimonial:
        "“As a freelancer, Penny Wise has been invaluable in tracking my income and expenses. Its simplicity and versatility make it a must-have tool for freelancers.”",
      company: "Self-Employed",
      avatar: "https://avatar.example.com/neha_singh.jpg",
    },
    {
      name: "Kunal Shah",
      testimonial:
        "“Penny Wise has transformed how I manage my finances. Its features are tailored perfectly for freelancers like me, helping me stay on top of my budget effortlessly.”",
      company: "Design Studio",
      avatar: "https://avatar.example.com/kunal_shah.jpg",
    },
  ];

  return (
    <div className="globalPadding relative">
      <div className="h-80 w-80 rounded-full bg-secondary blur-[200px] absolute -top-40 -left-40" />
      <div className="h-80 w-80 rounded-full bg-primary blur-[250px] absolute bottom-0 left-2/6" />
      <h2 className="gradientText text-2xl md:text-4xl font-semibold !z-20">
        What our users say ?
      </h2>
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          1200: {
            slidesPerView: 3,
          },
        }}
        autoplay={{
          delay: 2500,
        }}
        modules={[Pagination, Autoplay]}
        className="testimonialSwiper mt-10"
        centeredSlides={true}
        initialSlide={1}
      >
        {/* Mapping through testimonial data */}
        {testimonialData.map((data, index) => (
          <SwiperSlide key={index} className="mb-20">
            <div className="customCard w-full !z-10 flex items-start justify-between flex-col gap-10">
              {/* Displaying testimonial */}
              <p>{data.testimonial}</p>

              {/* Displaying testimonial author details */}
              <div className="flex items-center justify-center gap-5">
                <img
                  src={`https://i.pravatar.cc/150?img=${index + 1}`}
                  className="w-16 rounded-full"
                />

                <div>
                  <p>{data.name}</p>
                  <h3 className="text-sm">{data.company}</h3>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Testimonial;
