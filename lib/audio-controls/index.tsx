import React from "react";
import AudioPlayer from "./components/AudioPlayer";
import { AudioControlContext, Track } from "./context/AudioControlContext";

interface Props {
    track: string | "";
    playlist: Track[];
    playIcon?: string | React.ReactNode;
    pauseIcon?: string | React.ReactNode;
    nextIcon?: string | React.ReactNode;
    prevIcon?: string | React.ReactNode;
    replayIcon?: string | React.ReactNode;
}

export default function AudioControls({
    track,
    playlist,
    playIcon,
    pauseIcon,
    nextIcon,
    prevIcon,
    replayIcon,
}: Props) {
    const { play, setPlaylist } = React.useContext(AudioControlContext);

    React.useEffect(() => {
        if (track == "") return;
        play(track);
    }, [track]);

    React.useEffect(() => {
        setPlaylist(playlist);
    }, [playlist]);

    return <AudioPlayer />;
}
