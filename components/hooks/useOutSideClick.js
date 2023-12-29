import React from "react";

function useOuterClick(callback) {
    const callbackRef = React.useRef(); // initialize mutable ref, which stores callback
    const innerRef = React.useRef(); // returned to client, who marks "border" element

    // update cb on each render, so second useEffect has access to current value 
    React.useEffect(() => { callbackRef.current = callback; });

    React.useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
        function handleClick(e) {
            if (innerRef.current && callbackRef.current &&
                !(innerRef.current).contains(e.target)
            ) (callbackRef).current(e);
        }
    }, []); // no dependencies -> stable click listener

    return innerRef; // convenience for client (doesn't need to init ref himself) 
}

export default useOuterClick