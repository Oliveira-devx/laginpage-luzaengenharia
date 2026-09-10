import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.65,
  y = 30,
  className = "",
}) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const shouldReduceMotion = useReducedMotion();

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
        y: shouldReduceMotion ? 0 : y,
      }}
      animate={
        isVisible
          ? {
              opacity: 1,
              y: 0,
            }
          : {
              opacity: 0,
              y: shouldReduceMotion ? 0 : y,
            }
      }
      transition={{
        duration: shouldReduceMotion
          ? 0
          : duration,
        delay: shouldReduceMotion
          ? 0
          : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}