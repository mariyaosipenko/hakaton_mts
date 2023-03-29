import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVideoSrc } from "../../store/reducers/VideoPlayerSlice";
import "./ViewSettingsPanel.css";

const ViewSettingsPanel = () => {
    const dispatch = useDispatch();
    const { toggleViewSettings } = useSelector((state) => state.videoPlayerReducer);
    const setFlickerVideo = () => {
        dispatch(setVideoSrc({ videoSrc: "assets/4th-of-july-fireworks-4k-blinking.mp4" }));
    };

    const setRedDetectorVideo = () => {
        dispatch(setVideoSrc({ videoSrc: "assets/4th-of-july-fireworks-4k-flash-and-red.mp4" }));
    };

    return (
        <div className={`settings-panel-container ${toggleViewSettings ? "showed" : "hided"}`}>
            <p className="settings-panel-header">video</p>
            <button className="settings-panel-button" onClick={setFlickerVideo}>
                flicker
            </button>

            <button className="settings-panel-button" onClick={setRedDetectorVideo}>
                red detector
            </button>
        </div>
    );
};

export default ViewSettingsPanel;
