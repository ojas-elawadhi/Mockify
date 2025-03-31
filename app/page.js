import React from "react";
import { Button } from "@/components/ui/button";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

const page = () => {
  return (
    <div>
      <Head>
        <title>Mockify</title>
        <meta
          name="description"
          content="Ace your next interview with AI-powered mock interviews"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        {/* Header Section */}
        <header className="w-full bg-gray-100 shadow-md">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
            <Link href="/" className="text-3xl font-bold text-black">
              <Image src={"/mockify.png"} width={80} height={40} alt="logo" />
            </Link>
            <nav className="flex flex-col sm:flex-row flex-wrap items-center justify-between mt-4 md:mt-0 space-y-4 sm:space-y-0 sm:space-x-4 text-black">
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0">
                <a
                  href="#features"
                  className="text-lg text-black hover:text-destructive hover:font-bold mx-2 md:mx-4"
                >
                  Features
                </a>
                <a
                  href="#testimonials"
                  className="text-lg text-black hover:text-destructive hover:font-bold mx-2 md:mx-4"
                >
                  Testimonials
                </a>
              </div>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-r from-gray-900 to-gray-400  px-6 md:px-0">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Ace Your Next Interview
          </h2>
          <p className="mt-4 text-lg md:text-xl text-white ">
            Practice with AI-powered mock interviews and get personalized
            feedback
          </p>
          <div className="mt-6 flex flex-col md:flex-row">
            <a
              href="/dashboard"
              className="px-6 py-3 mb-4 md:mb-0 md:mr-4 text-lg font-semibold bg-white text-black rounded-lg shadow-lg hover:bg-gray-100"
            >
              Get Started
            </a>
            <a
              href="#features"
              className="px-6 py-3 text-lg font-semibold border border-white rounded-lg text-black hover:bg-white hover:text-black"
            >
              Learn More
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="py-16 bg-white px-16 md:px-0 lg:px-8 xl:px-16"
        >
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800">Features</h2>
            <p className="mt-4 text-lg text-gray-800">
              Our AI Mock Interview platform offers a range of powerful
              features:
            </p>
            <div className="flex flex-wrap justify-center mt-8">
              <div className="w-full md:w-1/3 px-4 py-8">
                <div className="bg-blue-100 rounded-lg p-6 shadow-md">
                  <h3 className="text-2xl font-semibold text-black">
                    AI Mock Interviews
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Experience realistic interview scenarios with our advanced
                    AI.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-4 py-8">
                <div className="bg-blue-100 rounded-lg p-6 shadow-md">
                  <h3 className="text-2xl font-semibold text-black">
                    Instant Feedback
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Get instant, personalized feedback to improve your
                    performance.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-4 py-8">
                <div className="bg-blue-100 rounded-lg p-6 shadow-md">
                  <h3 className="text-2xl font-semibold text-black">
                    Comprehensive Reports
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Receive detailed reports highlighting your strengths and
                    weaknesses.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 bg-gray-50 px-6 md:px-0">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800">
              What Our Users Say
            </h2>
            <div className="flex flex-wrap justify-center mt-8">
              <div className="w-full md:w-1/2 px-4 py-8">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <p className="text-gray-600">
                    "The AI mock interviews were incredibly helpful. I felt much
                    more confident going into my real interview."
                  </p>
                  <h4 className="mt-4 text-lg font-semibold text-blue-600">
                    - Alex Johnson
                  </h4>
                </div>
              </div>
              <div className="w-full md:w-1/2 px-4 py-8">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <p className="text-gray-600">
                    "The feedback was spot on and helped me improve my answers.
                    Highly recommend this service!"
                  </p>
                  <h4 className="mt-4 text-lg font-semibold text-blue-600">
                    - Sarah Williams
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default page;
