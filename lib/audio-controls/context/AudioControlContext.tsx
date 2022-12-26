import React, { Dispatch } from "react";

export type Track = {
    url: string;
};

interface AudioContextInterface {
    activeTrack: string | string | "";
    setPlaylist: Dispatch<React.SetStateAction<Track[]>>;
    playing: boolean;
    play: (track: string) => void;
    pause: () => void;
    currentTime: number;
    skipTo: (event: React.ChangeEvent<HTMLInputElement>) => void;
    duration: number;
    volume: number;
    changeVolume: (event: React.ChangeEvent<HTMLInputElement>) => void;
    restart: (track: string) => void;
}

interface Props {
    children: React.ReactNode;
}

const AudioControlContext = React.createContext<AudioContextInterface>({
    activeTrack: "",
    setPlaylist: () => null,
    playing: false,
    play: () => {},
    pause: () => {},
    currentTime: 0,
    skipTo: () => {},
    duration: 0,
    volume: 1,
    changeVolume: () => {},
    restart: () => {},
});

const AudioControlProvider: React.FC<Props> = ({ children }) => {
    const player = React.useRef<HTMLAudioElement>(new Audio());
    const [playlist, setPlaylist] = React.useState<Track[]>([]);
    const [activeTrack, setActiveTrack] = React.useState<string>("");
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [playing, setPlaying] = React.useState(false);
    const [volume, setVolume] = React.useState(1);

    const setSrc = (track: string) => {
        if (player.current.currentSrc === track) return;
        player.current.src = track;
        setActiveTrack(track);
    };

    const play = (track: string) => {
        setSrc(track ? track : playlist[0].url);
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
        <AudioControlContext.Provider
            value={{
                activeTrack: activeTrack,
                setPlaylist: setPlaylist,
                playing: playing,
                play: play,
                pause: pause,
                currentTime: currentTime,
                skipTo: skipTo,
                duration: duration,
                volume: volume,
                changeVolume: changeVolume,
                restart: restart,
            }}
        >
            {children}
        </AudioControlContext.Provider>
    );
};

export { AudioControlProvider, AudioControlContext };
