// ScrollToTop.jsx

import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

function ScrollToTop() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const positions = useRef(new Map());

  useEffect(() => {
    if (window.history && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    if (navigationType === "POP") {
      const savedPosition = positions.current.get(location.key);
      if (savedPosition) {
        window.scrollTo(savedPosition.x, savedPosition.y);
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.key, navigationType]);

  useLayoutEffect(() => {
    return () => {
      positions.current.set(location.key, {
        x: window.scrollX,
        y: window.scrollY,
      });
    };
  }, [location.key]);

  

  return null;
}

export default ScrollToTop;