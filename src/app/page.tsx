"use client";

import DropBox from "@/components/dropBox";
import { useCallback, useMemo, useRef, useState } from "react";
import { useWavesurfer } from '@wavesurfer/react'
import Hover from 'wavesurfer.js/dist/plugins/hover.esm.js'
import PlayIcon from "@/components/icons/play";
import PauseIcon from "@/components/icons/pause";
import { formatTime } from "@/lib/helpers/formatTime";
import Slider from "@/components/slider";


export default function Home() {
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [volume, setVolume] = useState<number>(100);
  
  const containerRef = useRef(null)

  const testAudioUrl = '/test.m4a'

  const { wavesurfer, isPlaying, currentTime, isReady } = useWavesurfer({
    container: containerRef,
    height: 60,
    waveColor: '#fca5a5',
    progressColor: '#dc2626',
    url: preview ?? testAudioUrl,
    barWidth: 4,
    barGap: 2,
    barRadius: 99,
    plugins: useMemo(() => [Hover.create({
      lineColor: '#991b1b',
      lineWidth: 1,
      labelBackground: '#991b1b',
      labelColor: '#fff',
      labelSize: '10px'
    },)], []),
  })

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause()
  }, [wavesurfer])

  // handle volume change
  const onVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (wavesurfer) {
      wavesurfer.setVolume(newVolume);
    }
  }, [wavesurfer]);

  
  return (
    <main className="h-dvh w-full flex flex-col items-center p-4">
      <section className="w-2/5 p-4 mt-32">
        <p className="text-xl uppercase font-bold text-center">grit<sup className="lowercase italic text-sm opacity-50">3000</sup></p>
        {/* <div className="mt-10">
          <DropBox 
            title="Upload audio" 
            optional={false} 
            acceptedFiles={{ audio: ["audio/*"] }} 
            setPreview={setPreview}
          />
        </div> */}
        <div className="mt-32 p-4 flex flex-col">
          <div ref={containerRef} />
          <div className="mt-4 p-2 self-center flex gap-4 items-center justify-center rounded-lg">
            {/* <PlayIcon />
            <PauseIcon /> */}
            <button onClick={onPlayPause}>
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <p>{formatTime(currentTime)} / 0:00</p>
            <Slider
              value={volume}
              width={60}
              onChange={onVolumeChange}
              min={0}
              max={1}
              step={0.01}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
