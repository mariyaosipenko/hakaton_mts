import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToggleViewSettings } from "../../store/reducers/VideoPlayerSlice";
import "./ViewSettings.css";

const ViewSettings = () => {
    const dispatcher = useDispatch();
    const { toggleViewSettings } = useSelector((state) => state.videoPlayerReducer);

    const handlerClickViewSettings = () => {
        dispatcher(setToggleViewSettings());
    };

    return (
        <>
            <button
                className={`controls-button ${
                    !toggleViewSettings ? "view-settings-button" : "view-settings-exit-button"
                }`}
                onClick={handlerClickViewSettings}
            ></button>
        </>
    );
};

export default ViewSettings;
