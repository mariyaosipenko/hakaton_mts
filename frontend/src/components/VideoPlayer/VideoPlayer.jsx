import React, { useEffect, useRef } from "react";
import "./VideoPlayer.css";
import ViewSettings from "../ViewSettings/ViewSettings";
import PlayButton from "../PlayButton/PlayButton";
import FullScreenButton from "../FullScreenButton/FullScreenButton";
import ViewSettingsPanel from "../ViewSettingsPanel/ViewSettingsPanel";
import { useDispatch, useSelector } from "react-redux";
import { setVideoSrc } from "../../store/reducers/VideoPlayerSlice";

const VideoPlayer = () => {
    const dispatch = useDispatch();
    const { togglePlay, videoSrc } = useSelector((state) => state.videoPlayerReducer);

    useEffect(() => {
        dispatch(setVideoSrc({ videoSrc: "assets/4th-of-july-fireworks-4k.mp4" }));
    }, []);

    const videoRef = useRef(null);
    const videoContainerRef = useRef(null);
    const timelineRef = useRef(null);

    const handlerTimelineUpdate = (e) => {
        const rect = timelineRef.current.getBoundingClientRect();
        const percent = Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width;
        timelineRef.current.style.setProperty("--progress-position", percent);
        videoRef.current.currentTime = percent * videoRef.current.duration;
        e.preventDefault();
    };

    const handlerTimeUpdate = () => {
        const percent = videoRef.current.currentTime / videoRef.current.duration;
        timelineRef.current.style.setProperty("--progress-position", percent);
    };

    useEffect(() => {
        const handlerKeyDown = (e) => {
            switch (e.key.toLowerCase()) {
                case "arrowleft":
                case "j":
                    skip(-5);
                    break;

                case "arrowright":
                case "l":
                    skip(5);
                    break;
                default:
                    break;
            }
        };
        document.addEventListener("keydown", handlerKeyDown);
        return () => {
            document.removeEventListener("keydown", handlerKeyDown);
        };
    });

    function skip(duration) {
        videoRef.current.currentTime += duration;
    }

    return (
        <div
            className={`video-container ${togglePlay ? "played" : "paused"}`}
            ref={videoContainerRef}
        >
            <div className="video-controls-container">
                <ViewSettingsPanel></ViewSettingsPanel>
                <div className="controls">
                    <PlayButton videoRef={videoRef}></PlayButton>
                    <ViewSettings></ViewSettings>
                    <FullScreenButton videoContainerRef={videoContainerRef}></FullScreenButton>
                </div>
                <div
                    ref={timelineRef}
                    className="timeline-container"
                    onMouseUp={handlerTimelineUpdate}
                >
                    <div className="timeline">
                        <div className="thumb-indicator"></div>
                    </div>
                </div>
            </div>
            <video
                ref={videoRef}
                className="video"
                src={videoSrc}
                onTimeUpdate={handlerTimeUpdate}
            ></video>
        </div>
    );
};
export default VideoPlayer;
