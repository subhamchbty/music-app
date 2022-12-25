import {
    ArrowCounterClockwise,
    Pause,
    Play,
    SkipBack,
    SkipForward,
} from "phosphor-react";
import React from "react";

type Track = {
    url: string;
};

export default function AudioPlayer({
    active: track,
    playlist,
}: {
    active: string | "";
    playlist: Track[];
}) {
    const player = React.useRef<HTMLAudioElement>(new Audio());
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [playing, setPlaying] = React.useState(false);
    const [volume, setVolume] = React.useState(1);

    React.useEffect(() => {
        if (track === "") return;
        play(track);
    }, [track]);

    const setSrc = (track: string) => {
        player.current.src = track;
    };

    const play = (track: string) => {
        if (player.current.currentSrc == "" && track == "") {
            setSrc(playlist[0].url);
        }
        if (
            player.current.currentSrc != "" ||
            player.current.currentSrc !== track
        ) {
            setSrc(track);
        }
        setPlaying(true);
        player.current.play();
    };

    const pause = () => {
        setPlaying(false);
        player.current.pause();
    };

    const restart = (track: string) => {
        player.current.currentTime = 0;
        play(track);
    };

    player.current.addEventListener("loadedmetadata", () => {
        setDuration(player.current.duration);
    });

    player.current.addEventListener("timeupdate", () => {
        setCurrentTime(player.current.currentTime);
    });

    const skipTo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentTime(parseFloat(event.target.value));
        player.current.currentTime = parseFloat(event.target.value);
    };

    const changeVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(parseFloat(event.target.value));
        player.current.volume = parseFloat(event.target.value);
    };

    return (
        <div className="flex flex-col items-center w-full">
            <div className="flex flex-row space-x-3 items-center justify-center w-full">
                <button className="">
                    <SkipBack />
                </button>
                <button
                    className=""
                    onClick={() => (playing ? pause() : play(track))}
                >
                    {playing ? <Pause /> : <Play />}
                </button>
                <button className="">
                    <SkipForward />
                </button>
                <button
                    className=""
                    disabled={!playing}
                    onClick={() => restart(track)}
                >
                    <ArrowCounterClockwise />
                </button>
            </div>

            <div className="flex flex-row space-x-3 items-center justify-center w-full mt-4">
                <div className="flex flex-row items-center space-x-2 w-3/4">
                    <p className="text-xs">
                        {Math.floor(currentTime / 60)}:
                        {Math.floor(currentTime % 60)}
                    </p>
                    <input
                        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"
                        type="range"
                        min="0"
                        max={duration}
                        value={currentTime}
                        onChange={skipTo}
                    />
                    <p className="text-xs">
                        {Math.floor(duration / 60)}:{Math.floor(duration % 60)}
                    </p>
                </div>

                <div className="flex flex-col items-center w-1/4">
                    <input
                        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={changeVolume}
                    />
                </div>
            </div>
        </div>
    );
}
