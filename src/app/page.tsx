"use client";

import DropBox from "@/components/dropBox";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useWavesurfer } from '@wavesurfer/react'
import Hover from 'wavesurfer.js/dist/plugins/hover.esm.js'
import PlayIcon from "@/components/icons/play";
import PauseIcon from "@/components/icons/pause";
import { formatTime } from "@/lib/helpers/formatTime";
import Slider from "@/components/slider";
import ZoomPlugin from 'wavesurfer.js/dist/plugins/zoom.esm.js'
// import { analyze } from 'web-audio-beat-detector';


export default function Home() {
  const [preview, setPreview] = useState<any>(null);
  const [volume, setVolume] = useState<number>(1);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  const containerRef = useRef(null)

  useEffect(() => {
    if (preview !== null) {
      setAudioUrl(URL.createObjectURL(preview));
    }
  }, [preview]);

  const { wavesurfer, isPlaying, currentTime, isReady } = useWavesurfer({
    container: containerRef,
    url: audioUrl as string,
    height: 60,
    waveColor: '#fca5a5',
    progressColor: '#dc2626',
    barWidth: 4,
    barGap: 2,
    barRadius: 99,
    plugins: useMemo(() => [
      Hover.create({
        lineColor: '#991b1b',
        lineWidth: 1,
        labelBackground: '#991b1b',
        labelColor: '#fff',
        labelSize: '10px'
      }),
      ZoomPlugin.create({
        scale: 0.5,
        maxZoom: 100,
      })
    ], []),
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

  const onPlaybackRateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newPlaybackRate = parseFloat(e.target.value);
    setPlaybackRate(newPlaybackRate);
    if (wavesurfer) {
      wavesurfer.setPlaybackRate(newPlaybackRate);
    }
  }, [wavesurfer]);

  
  return (
    <main className="h-dvh w-full flex flex-col items-center p-4">
      <section className="w-1/2 p-4 mt-32">
        <p className="text-xl uppercase font-bold text-center">grit<sup className="lowercase italic text-sm opacity-50">3000</sup></p>
        {!audioUrl && (
          <div className="mt-10">
            <DropBox 
              title="Upload audio" 
              optional={false} 
              acceptedFiles={{ audio: ["audio/*"] }} 
              setPreview={(file) => setPreview(file)}
            />
          </div>
        )}
        {audioUrl !== null ? (
          <div>
            <div className="mt-32 p-4 flex flex-col">
              <div ref={containerRef} />
              <div className="mt-4 p-2 self-center flex gap-4 items-center justify-center rounded-lg">
                <button onClick={onPlayPause}>
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
                <p>{formatTime(currentTime)} / 0:00</p>
                <Slider
                  value={volume}
                  width={"6"}
                  height={2}
                  onChange={onVolumeChange}
                  min={0}
                  max={1}
                  step={0.01}
                />
              </div>
            </div>
            <div className="w-full">
              <div>
                <p>Speed // {playbackRate}</p>
                <Slider
                  value={playbackRate}
                  width={"100%"}
                  height={2}
                  onChange={onPlaybackRateChange}
                  min={0.25}
                  max={4}
                  step={0.01}
                />
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}
