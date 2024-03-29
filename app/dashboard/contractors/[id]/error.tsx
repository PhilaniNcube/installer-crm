"use client"

import { useEffect } from "react";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {


    useEffect(() => {
      // Log the error to an error reporting service
      console.error(error);
    }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      {" "}
      <h2>Something went wrong! {error.message}</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
};
export default ErrorPage;
