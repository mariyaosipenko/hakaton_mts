import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import "./App.css";

function App() {
    return (
        <div className="app">
            <header className="app-header">TRUE TECH HACK MTC</header>
            <main className="app-main">
                <VideoPlayer></VideoPlayer>
            </main>
            <footer className="app-footer">created by code_sisters 2023</footer>
        </div>
    );
}

export default App;
