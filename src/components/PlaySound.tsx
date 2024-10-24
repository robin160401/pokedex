import { useEffect, useRef } from "react";

export default function PlaySound({ audioURL }: { audioURL: string }) {
    const audioRef = useRef<HTMLAudioElement>(null);
    useEffect(() => {
      audioRef.current!.play().catch((e) => console.error(e));
    }, [audioURL]);
    return <audio src={audioURL} ref={audioRef} />;
}