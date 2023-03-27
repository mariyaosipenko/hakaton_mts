import React, { useEffect, useRef, useState } from "react";
import "./VideoPlayer.css";

const VideoPlayer = () => {
    const [togglePlay, setTogglePlay] = useState();
    const [toggleFullScreen, setToggleFullScreen] = useState();

    const videoRef = useRef(null);
    useEffect(() => {
        togglePlay ? videoRef.current.play() : videoRef.current.pause();
    }, [togglePlay]);

    const videoContainerRef = useRef(null);
    useEffect(() => {
        if (toggleFullScreen !== undefined) {
            toggleFullScreen
                ? videoContainerRef.current.requestFullscreen()
                : document.exitFullscreen();
        }
    }, [toggleFullScreen]);

    useEffect(() => {
        const handlerKeyDown = (e) => {
            const tagName = document.activeElement.tagName.toLowerCase();

            if (e.code === "Space") {
                if (tagName === "button") return;
                setTogglePlay((togglePlay) => !togglePlay);
            }
        };
        document.addEventListener("keydown", handlerKeyDown);

        return () => {
            document.removeEventListener("keydown", handlerKeyDown);
        };
    });

    return (
        <div
            className={`video-container ${togglePlay ? "played" : "paused"}`}
            ref={videoContainerRef}
        >
            <div className="video-controls-container">
                <div className="timeline-container"></div>
                <div className="controls">
                    <button
                        className={`controls-button ${
                            !togglePlay ? "play-button" : "pause-button"
                        }`}
                        onClick={() => setTogglePlay((togglePlay) => !togglePlay)}
                    ></button>
                    <button
                        className={`controls-button ${
                            !toggleFullScreen ? "full-screen-button" : "full-screen-exit-button"
                        }`}
                        onClick={() => setToggleFullScreen((toggleFullScreen) => !toggleFullScreen)}
                    ></button>
                </div>
            </div>
            <video
                ref={videoRef}
                className="video"
                src="assets/4th-of-july-fireworks-4k.mp4"
            ></video>
        </div>
    );
};

export default VideoPlayer;
