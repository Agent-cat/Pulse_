// import React, { useState, useEffect } from "react";
// import { motion, useSpring, useMotionValue } from "framer-motion";

// export default function CustomCursor() {
//   const [isHovering, setIsHovering] = useState(false);
//   const [isClicking, setIsClicking] = useState(false);

//   // Use left/top MotionValues to avoid transform composition issues
//   const left = useMotionValue(-100);
//   const top = useMotionValue(-100);

//   // gentle spring for left/top movement
//   const springConfig = { damping: 28, stiffness: 700 };
//   const leftSpring = useSpring(left, springConfig);
//   const topSpring = useSpring(top, springConfig);

//   useEffect(() => {
//     const onMove = (e) => {
//       left.set(e.clientX);
//       top.set(e.clientY);
//     };
//     const onDown = () => setIsClicking(true);
//     const onUp = () => setIsClicking(false);
//     const onOver = (e) => {
//       const t = e.target;
//       const isInteractive =
//         ["A", "BUTTON", "INPUT", "TEXTAREA", "SELECT"].includes(t.tagName) ||
//         t.closest?.("a,button,input,textarea,select") ||
//         t.onclick ||
//         window.getComputedStyle(t).cursor === "pointer";
//       setIsHovering(Boolean(isInteractive));
//     };

//     window.addEventListener("mousemove", onMove);
//     window.addEventListener("mousedown", onDown);
//     window.addEventListener("mouseup", onUp);
//     window.addEventListener("mouseover", onOver);

//     return () => {
//       window.removeEventListener("mousemove", onMove);
//       window.removeEventListener("mousedown", onDown);
//       window.removeEventListener("mouseup", onUp);
//       window.removeEventListener("mouseover", onOver);
//     };
//   }, [left, top]);

//   return (
//     <>
//       <style>{`
//         * { cursor: none !important; }
//       `}</style>

//       <motion.div
//         style={{
//           position: "fixed",
//           left: leftSpring,
//           top: topSpring,
//           pointerEvents: "none",
//           zIndex: 99999,
//           // center the container exactly at the mouse point
//           transform: `translate(-50%, -50%)`,
//         }}
//       >
//         <motion.div
//           initial={false}
//           animate={{
//             scale: isClicking ? 0.85 : isHovering ? 1.5 : 1,
//           }}
//           transition={{ type: "spring", stiffness: 500, damping: 28 }}
//           style={{
//             width: "12px",
//             height: "12px",
//             borderRadius: "50%",
//             background: "rgba(0, 255, 0, 1)",
//             boxShadow: "0 0 10px rgba(0, 255, 0, 0.85)",
//             zIndex: 2,
//           }}
//         />
//       </motion.div>
//     </>
//   );
// }
