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
                <div className="timeline-container">
                    <div className="timeline">
                        <div className="thumb-indicator"></div>
                    </div>
                </div>
            </div>
            <video ref={videoRef} className="video" src={videoSrc}></video>
        </div>
    );
};
export default VideoPlayer;
