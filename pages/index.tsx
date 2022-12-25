import Head from "next/head";
import { Play } from "phosphor-react";
import React from "react";
import AudioPlayer from "../src/components/AudioPlayer";

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
        <div className="h-screen w-full flex justify-center items-center bg-black">
            <div className="h-[800px] flex flex-col justify-center bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md p-6">
                <div className="text-xl font-bold mb-6">Music controls</div>

                {!loading && (
                    <div className="flex flex-col h-full w-full">
                        <div className="flex flex-col space-y-1 items-start mb-10">
                            <p className="text-xs">Playlist</p>
                            {playlist.map((track, index) => (
                                <button
                                    className="text-xs text-left p-2 text-gray-300 bg-black bg-opacity-30 rounded-md w-full flex flex-row space-x-1 items-center"
                                    onClick={() => setActive(track.url)}
                                    key={index}
                                >
                                    <Play />
                                    <span>{track.title}</span>
                                </button>
                            ))}
                        </div>
                        <div className="w-full bg-gray-800 rounded-md mt-auto">
                            <div className="w-full p-4 text-gray-300">
                                <AudioPlayer
                                    active={track}
                                    playlist={playlist}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
