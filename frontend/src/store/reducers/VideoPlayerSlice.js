import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    togglePlay: false,
    toggleViewSettings: false,
    videoSrc: "",
};

const videoPlayerSlice = createSlice({
    name: "videoPlayer",
    initialState,
    reducers: {
        setTogglePlay(state) {
            state.togglePlay = !state.togglePlay;
        },
        setToggleViewSettings(state) {
            state.toggleViewSettings = !state.toggleViewSettings;
        },
        setVideoSrc(state, action) {
            state.videoSrc = action.payload.videoSrc;
        },
    },
});

export const { setTogglePlay, setToggleViewSettings, setVideoSrc } = videoPlayerSlice.actions;

export default videoPlayerSlice.reducer;
