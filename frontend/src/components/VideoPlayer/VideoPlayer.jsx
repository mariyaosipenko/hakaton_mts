import React, { useEffect, useRef, useState } from "react";
import "./VideoPlayer.css";

const VideoPlayer = () => {
    const [togglePlay, setTogglePlay] = useState();
    const [toggleFullScreen, setToggleFullScreen] = useState();
    const [toggleViewSettings, setToggleViewSettings] = useState();
    const [urlVideo, setUrlVideo] = useState();

    useEffect(() => {
        setUrlVideo("assets/4th-of-july-fireworks-4k.mp4");
    }, []);

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

    const handlerClickViewSettings = () => {
        setToggleViewSettings((toggleViewSettings) => !toggleViewSettings);
        setUrlVideo(
            toggleViewSettings
                ? "assets/4th-of-july-fireworks-4k.mp4"
                : "assets/4th-of-july-fireworks-4k-blinking.mp4"
        );
    };

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
                        className={`controls-button  ${
                            !toggleViewSettings
                                ? "view-settings-button"
                                : "view-settings-exit-button"
                        }`}
                        onClick={handlerClickViewSettings}
                    ></button>
                    <button
                        className={`controls-button ${
                            !toggleFullScreen ? "full-screen-button" : "full-screen-exit-button"
                        }`}
                        onClick={() => setToggleFullScreen((toggleFullScreen) => !toggleFullScreen)}
                    ></button>
                </div>
            </div>
            <video ref={videoRef} className="video" src={urlVideo}></video>
        </div>
    );
};

export default VideoPlayer;
