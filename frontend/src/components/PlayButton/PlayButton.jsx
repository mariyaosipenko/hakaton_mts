import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./PlayButton.css";
import { setTogglePlay } from "../../store/reducers/VideoPlayerSlice";

const PlayButton = ({ videoRef }) => {
    const dispatch = useDispatch();
    const { togglePlay } = useSelector((state) => state.videoPlayerReducer);

    useEffect(() => {
        togglePlay ? videoRef.current.play() : videoRef.current.pause();
    }, [togglePlay]);

    useEffect(() => {
        const handlerKeyDown = (e) => {
            const tagName = document.activeElement.tagName.toLowerCase();

            if (e.code === "Space") {
                if (tagName === "button") return;
                dispatch(setTogglePlay());
            }
        };
        document.addEventListener("keydown", handlerKeyDown);

        return () => {
            document.removeEventListener("keydown", handlerKeyDown);
        };
    });

    return (
        <button
            className={`controls-button ${!togglePlay ? "play-button" : "pause-button"}`}
            onClick={() => dispatch(setTogglePlay())}
        ></button>
    );
};

export default PlayButton;
