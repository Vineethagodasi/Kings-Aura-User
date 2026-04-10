import { useState, useEffect } from "react"
import { Toaster } from "react-hot-toast"
import AppRoutes from "./routes/AppRoutes"
import IntroOverlay from "./components/IntroOverlay"

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    const introSeen = sessionStorage.getItem("introSeen");
      const isVerifyPage = window.location.pathname === "/verify";
        if (isVerifyPage) return false;


    return !introSeen;
  });

  const handleIntroFinish = () => {
    setShowIntro(false);
    sessionStorage.setItem("introSeen", "true");
  };



  return (
    <>
      {showIntro ? (
        <IntroOverlay onFinish={handleIntroFinish} />
      ) : (
        <>
          <Toaster position="top-center" />
          <AppRoutes />
        </>
      )}
    </>
  );
}

export default App
