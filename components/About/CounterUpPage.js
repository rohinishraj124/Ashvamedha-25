"use client";
import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";

const CounterUpPage = () => {
  const [counterOn, setCounterOn] = useState(false);
  const ref = useRef(null);

  const counterData = [
    { start: 1, end: 9, label: "SPORTS", suffix: "+" },
    { start: 10, end: 18, label: "COLLEGES", suffix: "" },
    { start: 100, end: 700, label: "PARTICIPANTS", suffix: "+" },
    { start: 1000, end: 3000, label: "FOOTFALL", suffix: "+" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setCounterOn(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="mx-auto my-8 max-w-7xl px-6 py-4 border-t-2 border-b-2 border-warm border-b-teal-border"
    >
      <div className="grid grid-cols-1 gap-5 text-center sm:grid-cols-2 lg:grid-cols-4">
        {counterData.map((counter, index) => (
          <div
            key={index}
            className="cursor-pointer p-5 text-white transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <h1 className="p-2.5 text-5xl font-bold text-warm">
              {counterOn && (
                <CountUp
                  start={counter.start}
                  end={counter.end}
                  duration={2}
                  delay={0}
                />
              )}
              {counter.suffix}
            </h1>
            <p className="text-xl font-medium tracking-wider">{counter.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CounterUpPage;
