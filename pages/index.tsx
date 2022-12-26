import React from "react";
import AudioControls from "../lib/audio-controls";
import { AudioControlProvider } from "../lib/audio-controls/context/AudioControlContext";

const playlist = [
    {
        artist: "orangiromusik",
        title: "Instrument 14092021-2",
        url: "https://firebasestorage.googleapis.com/v0/b/devsvillage.appspot.com/o/audio_2667f0165a.mp3?alt=media&token=cdfc7d2a-0b2d-4f9c-afb3-dc7b9548600f",
    },
    {
        artist: "OBmusic",
        title: "Legendary [Cinematic Piano] by O.B.",
        url: "https://firebasestorage.googleapis.com/v0/b/devsvillage.appspot.com/o/audio_656f5574c1.mp3?alt=media&token=24267b56-89cc-4194-8611-feef31ec54b0",
    },
];

export default function Home() {
    const [loading, setLoading] = React.useState(true);
    const [track, setActive] = React.useState<string>("");

    React.useEffect(() => {
        window && setLoading(false);
    }, []);

    return (
        <div>
            {!loading && (
                <div>
                    <div>
                        <p>
                            <strong>Playlist</strong>
                        </p>
                        {playlist.map((track, index) => (
                            <div key={index}>
                                <button onClick={() => setActive(track.url)}>
                                    <span>{track.title}</span>
                                </button>
                                <br />
                            </div>
                        ))}
                    </div>
                    <div>
                        <div>
                            <AudioControlProvider>
                                <AudioControls
                                    track={track}
                                    playlist={playlist}
                                />
                            </AudioControlProvider>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
