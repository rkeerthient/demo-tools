import { useState } from "react";
import * as React from "react";

export default function SlideFromCenterToLeft() {
  const [position, setPosition] = useState(true);

  return (
    <div
      className={`flex justify-center ${position} ${
        position
          ? `translate-x-0`
          : `translate-x-[-50%] transition-transform duration-500 ease-in-out`
      }`}
    >
      <div className="bg-red-500 w-50 h-50">This is the sliding div</div>
      <button
        onClick={() => setPosition(!position)}
        className="bg-blue-500 p-2"
      >
        Slide
      </button>
    </div>
  );
}
