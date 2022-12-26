import {
    ArrowCounterClockwise,
    Pause,
    Play,
    SkipBack,
    SkipForward,
} from "phosphor-react";
import React from "react";
import { AudioControlContext } from "../context/AudioControlContext";

export default function AudioPlayer() {
    const {
        playing,
        play,
        pause,
        activeTrack,
        changeVolume,
        volume,
        restart,
        currentTime,
        skipTo,
        duration,
    } = React.useContext(AudioControlContext);

    return (
        <div>
            <div>
                <button>
                    <SkipBack />
                </button>
                <button onClick={() => (playing ? pause() : play(activeTrack))}>
                    {playing ? <Pause /> : <Play />}
                </button>
                <button>
                    <SkipForward />
                </button>
                <button onClick={() => restart(activeTrack)}>
                    <ArrowCounterClockwise />
                </button>
            </div>

            <div>
                <div>
                    <p>
                        {Math.floor(currentTime / 60)}:
                        {Math.floor(currentTime % 60)}
                    </p>
                    <input
                        type="range"
                        min="0"
                        max={duration}
                        value={currentTime}
                        onChange={skipTo}
                    />
                    <p>
                        {Math.floor(duration / 60)}:{Math.floor(duration % 60)}
                    </p>
                </div>

                <div>
                    <input
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
