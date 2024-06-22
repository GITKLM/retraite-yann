"use client"
import { useState, useEffect } from 'react';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';
import { IconContext } from 'react-icons';

interface BackgroundMusicProps {
    bgmsrc: string;
}

export default function BackgroundMusic({ bgmsrc }: BackgroundMusicProps) {
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        // Initialize audio when component mounts client-side
        if (typeof window !== 'undefined') {
            const newAudio = new Audio(bgmsrc);
            newAudio.loop = true;
            newAudio.volume = 0.5;
            setAudio(newAudio);

            // Autoplay when audio is ready
            const playPromise = newAudio.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(_ => {
                        // Autoplay started
                        setPlaying(true);
                    })
                    .catch(error => {
                        // Autoplay failed, handle error
                        console.error('Autoplay failed:', error);
                    });
            }
        }
    }, [bgmsrc]);

    const handleAudioPlay = () => {
        if (audio) {
            if (playing) {
                audio.pause();
            } else {
                audio.play();
            }
            setPlaying(!playing);
        }
    };

    if (!audio) return null;

    return (
        <div className='w-8 cursor-pointer'>
            <IconContext.Provider
                value={{
                    style: {
                        width: '100%',
                        height: '100%',
                    },
                }}
            >
                {playing ? (
                    <AiFillPauseCircle onClick={handleAudioPlay} />
                ) : (
                    <AiFillPlayCircle onClick={handleAudioPlay} />
                )}
            </IconContext.Provider>
        </div>
    );
}
