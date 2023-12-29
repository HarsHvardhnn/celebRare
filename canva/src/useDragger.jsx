// import React, { useEffect, useRef } from "react";

// function useDragger(id) {

//   const isClicked = useRef(false);

//   const coords = useRef({
//     startX:100,
//     startY: 100,
//     lastX: 0,
//     lastY: 0
//   })

//   useEffect(() => {

//     const target = document.getElementById(id);
//     if (!target) throw new Error("Element with given id doesn't exist");

//     const container = target.parentElement;
//     if (!container) throw new Error("target element must have a parent");



//     const onMouseDown = (e) => {
//       isClicked.current = true;
//       coords.current.startX = e.clientX;
//       coords.current.startY = e.clientY;
//     }

//     const onMouseUp = (e) => {
//       isClicked.current = false;
//       coords.current.lastX = target.offsetLeft;
//       coords.current.lastY = target.offsetTop;
//     }

//     const onMouseMove = (e) => {
//       if (!isClicked.current) return;

//       const nextX = e.clientX - coords.current.startX + coords.current.lastX;
//       const nextY = e.clientY - coords.current.startY + coords.current.lastY;

//       target.style.top = `${nextY}px`;
//       target.style.left = `${nextX}px`;
//     }

//     target.addEventListener('mousedown', onMouseDown);
//     target.addEventListener('mouseup', onMouseUp);
//     container.addEventListener('mousemove', onMouseMove);
//     container.addEventListener('mouseleave', onMouseUp);

//     const cleanup = () => {
//       target.removeEventListener('mousedown', onMouseDown);
//       target.removeEventListener('mouseup', onMouseUp);
//       container.removeEventListener('mousemove', onMouseMove);
//       container.removeEventListener('mouseleave', onMouseUp);
//     }

//     return cleanup;
//   }, [id])

// }

// export default useDragger;
// useDragger.js

// import { useEffect, useRef } from 'react';

// function useDragger(id, initialPosition) {
//   const isClicked = useRef(false);
//   const isFirstRender = useRef(true);

//   const coords = useRef({
//     startX: 0,
//     startY: 0,
//     lastX: initialPosition.left || 0,
//     lastY: initialPosition.top || 0,
//   });

//   useEffect(() => {
//     const target = document.getElementById(id);
//     if (!target) throw new Error("Element with given id doesn't exist");

//     const container = target.parentElement;
//     if (!container) throw new Error("target element must have a parent");

//     const onMouseDown = (e) => {
//       isClicked.current = true;
//       coords.current.startX = e.clientX;
//       coords.current.startY = e.clientY;
//     };

//     const onMouseUp = () => {
//       isClicked.current = false;
//       coords.current.lastX = parseInt(target.style.left, 10) || 0;
//       coords.current.lastY = parseInt(target.style.top, 10) || 0;
//     };

//     const onMouseMove = (e) => {
//       if (!isClicked.current) return;

//       const nextX = e.clientX - coords.current.startX + coords.current.lastX;
//       const nextY = e.clientY - coords.current.startY + coords.current.lastY;

//       target.style.top = `${nextY}px`;
//       target.style.left = `${nextX}px`;
//     };

//     if (isFirstRender.current) {
//       // Set initial position only during the first render
//       target.style.top = `${initialPosition.top || 0}px`;
//       target.style.left = `${initialPosition.left || 0}px`;
//       isFirstRender.current = false;
//     }

//     target.addEventListener("mousedown", onMouseDown);
//     document.addEventListener("mouseup", onMouseUp);
//     container.addEventListener("mousemove", onMouseMove);

//     const cleanup = () => {
//       target.removeEventListener("mousedown", onMouseDown);
//       document.removeEventListener("mouseup", onMouseUp);
//       container.removeEventListener("mousemove", onMouseMove);
//     };

//     return cleanup;
//   }, [id, initialPosition]);

// }

// export default useDragger;

///=====================latest used==================================////

import React, { useEffect, useRef } from "react";

 
function useDragger(id ) {
  const isClicked = useRef(false);
  const isFirstRender = useRef(true);


  const coords = useRef({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY:0
  });

  useEffect(() => {
    const target = document.getElementById(id);
    if (!target) throw new Error("Element with given id doesn't exist");

    const container = target.parentElement;
    if (!container) throw new Error("target element must have a parent");

    const onMouseDown = (e) => {
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
    };

    const onMouseUp = () => {
      isClicked.current = false;
      coords.current.lastX = parseInt(target.style.left, 10) || 0;
      coords.current.lastY = parseInt(target.style.top, 10) || 0;
    };

    const onMouseMove = (e) => {
      if (!isClicked.current) return;

      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      target.style.top = `${nextY}px`;
      target.style.left = `${nextX}px`;
    };

    if (isFirstRender.current) {
      // Set initial position only during the first render
      target.style.top = `${0}px`;
      target.style.left = `${0}px`;
      isFirstRender.current = false;
    }

    target.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);

    const cleanup = () => {
      target.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
    };

    return cleanup;
  }, [id]);

}

export default useDragger;


// useDragger.js
// useDragger.js
// import { useEffect, useRef } from 'react';
// useDragger.js
// import { useEffect, useRef } from 'react';
// function useDragger(id, initialX, initialY) {
//   const isClicked = useRef(false);
//   const isFirstRender = useRef(true);

//   const coords = useRef({
//     startX: 0,
//     startY: 0,
//     lastX: initialX,
//     lastY: initialY,
//   });

//   useEffect(() => {
//     const target = document.getElementById(id);
//     if (!target) {
//       console.warn(`Element with id ${id} not found. Skipping useDragger initialization.`);
//       return;
//     }

//     const container = target.parentElement;
//     if (!container) {
//       console.warn(`Parent container for element with id ${id} not found. Skipping useDragger initialization.`);
//       return;
//     }

//     const onMouseDown = (e) => {
//       isClicked.current = true;
//       coords.current.startX = e.clientX;
//       coords.current.startY = e.clientY;
//     };

//     const onMouseUp = () => {
//       isClicked.current = false;
//       coords.current.lastX = parseInt(target.style.left, 10) || 0;
//       coords.current.lastY = parseInt(target.style.top, 10) || 0;
//     };

//     const onMouseMove = (e) => {
//       if (!isClicked.current) return;

//       const nextX = e.clientX - coords.current.startX + coords.current.lastX;
//       const nextY = e.clientY - coords.current.startY + coords.current.lastY;

//       target.style.top = `${nextY}px`;
//       target.style.left = `${nextX}px`;
//     };

//     if (isFirstRender.current) {
//       // Set initial position only during the first render
//       target.style.top = `${initialY}px`;
//       target.style.left = `${initialX}px`;
//       isFirstRender.current = false;
//     }

//     target.addEventListener("mousedown", onMouseDown);
//     document.addEventListener("mouseup", onMouseUp);
//     container.addEventListener("mousemove", onMouseMove);

//     const cleanup = () => {
//       target.removeEventListener("mousedown", onMouseDown);
//       document.removeEventListener("mouseup", onMouseUp);
//       container.removeEventListener("mousemove", onMouseMove);
//     };

//     return cleanup;
//   }, [id, initialX, initialY]);
// }

// export default useDragger;


