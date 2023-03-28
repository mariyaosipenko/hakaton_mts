import "./FullScreenButton.css";
import React, { useEffect, useState } from "react";

const FullScreenButton = ({ videoContainerRef }) => {
    const [toggleFullScreen, setToggleFullScreen] = useState();
    useEffect(() => {
        if (toggleFullScreen !== undefined) {
            toggleFullScreen
                ? videoContainerRef.current.requestFullscreen()
                : document.exitFullscreen();
        }
    }, [toggleFullScreen]);

    return (
        <button
            className={`controls-button ${
                !toggleFullScreen ? "full-screen-button" : "full-screen-exit-button"
            }`}
            onClick={() => setToggleFullScreen((toggleFullScreen) => !toggleFullScreen)}
        ></button>
    );
};

export default FullScreenButton;
