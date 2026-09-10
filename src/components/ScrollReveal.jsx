import { useEffect, useRef, useState } from "react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

const directionOffset = {
  left: {
    x: -70,
    y: 0,
  },

  right: {
    x: 70,
    y: 0,
  },

  up: {
    x: 0,
    y: 45,
  },

  down: {
    x: 0,
    y: -45,
  },
};

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.65,
  direction = "up",
  distance,
  className = "",
}) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  const selectedDirection =
    directionOffset[direction] ||
    directionOffset.up;

  const hasCustomDistance =
    distance !== undefined &&
    typeof distance === "number";

  const initialX = hasCustomDistance &&
    (direction === "left" ||
      direction === "right")
    ? direction === "left"
      ? -distance
      : distance
    : selectedDirection.x;

  const initialY = hasCustomDistance &&
    (direction === "up" ||
      direction === "down")
    ? direction === "up"
      ? distance
      : -distance
    : selectedDirection.y;

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    if (shouldReduceMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          observer.unobserve(element);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [shouldReduceMotion]);

  return (
    <motion.div
      ref={elementRef}
      className={`scroll-reveal ${className}`}
      initial={{
        opacity: 0,
        x: shouldReduceMotion ? 0 : initialX,
        y: shouldReduceMotion ? 0 : initialY,
      }}
      animate={
        isVisible
          ? {
              opacity: 1,
              x: 0,
              y: 0,
            }
          : {
              opacity: 0,
              x: shouldReduceMotion ? 0 : initialX,
              y: shouldReduceMotion ? 0 : initialY,
            }
      }
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}