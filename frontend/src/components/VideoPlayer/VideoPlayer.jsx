import React from "react";
import "./VideoPlayer.css";

const VideoPlayer = () => {
    return (
        <div className="video-container">
            <video className="video" src="assets/4th-of-july-fireworks-4k.mp4" controls></video>
        </div>
    );
};

export default VideoPlayer;
