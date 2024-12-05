"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import Spinner from "./Spinner";
function TipTop() {
  const { pending } = useFormStatus();

  if (pending) {
    return <Spinner />;
  }

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Add property
      </button>
    </div>
  );
}

export default TipTop;
