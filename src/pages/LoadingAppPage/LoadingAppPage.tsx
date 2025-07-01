import { LoadingSpinner } from "@deskpro/app-sdk";
import { Button } from "@deskpro/deskpro-ui";
import { useState, useEffect } from "react";
// import { useCheckIsAuth } from "./hooks";

const LoadingAppPage = () => {
  // useCheckIsAuth();
  const [errorState, setErrorState] = useState<string | null>(null)


  useEffect(() => {
    if (errorState === "left") {
      throw new Error("Hello from Zoom")
    }

    if (errorState === "right") {
      throw "HI from Zoom"
    }
  }, [errorState])

  return (
    <>
      <Button
        text="Left Error"
        onClick={() => { setErrorState("left") }}
      />
      <Button
        text="Right Error"
        onClick={() => { setErrorState("right") }}
      />
      <LoadingSpinner />
    </>
  );
};

export { LoadingAppPage };
