import logo from "./logo.svg";
import "./App.css";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";

function App() {
    return (
        <div className="app">
            <header className="app-header">Hackathon MTC</header>
            <main className="app-main">
                <VideoPlayer></VideoPlayer>
            </main>
            <footer className="app-footer">Created by code_sisters</footer>
        </div>
    );
}

export default App;
