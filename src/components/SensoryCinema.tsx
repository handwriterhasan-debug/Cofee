/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Maximize, RefreshCw, Sparkles, Film, Compass, Tv, Repeat } from 'lucide-react';

export default function SensoryCinema() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isCinemaMode, setIsCinemaMode] = useState(false);
  const [isPhaseLoop, setIsPhaseLoop] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isPhaseLoopRef = useRef(isPhaseLoop);
  const activeStepRef = useRef(activeStep);

  useEffect(() => {
    isPhaseLoopRef.current = isPhaseLoop;
  }, [isPhaseLoop]);

  useEffect(() => {
    activeStepRef.current = activeStep;
  }, [activeStep]);

  const videoUrl = 'https://res.cloudinary.com/dxxjtyvmk/video/upload/v1780132101/Create_smooth_animation_202605301340_w2fvtw.mp4';
  
  // Custom narrative steps that change as the video plays to deepen the sensory immersion
  const cinematicSteps = [
    { time: 0, title: 'I. Kinetic Saturation', desc: 'Bean thermal contact, triggering oil expansion & aroma blooming.' },
    { time: 5, title: 'II. Pressure Extraction', desc: 'Hot water infusion under exact bars, capturing rich caramelized compound density.' },
    { time: 10, title: 'III. The Velvet Stream', desc: 'Dense hazelnut crema stream settling under thermal equilibrium.' }
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const curr = video.currentTime;

      // Handle phase lock loop constraints if enabled
      if (isPhaseLoopRef.current) {
        const startTime = cinematicSteps[activeStepRef.current].time;
        const nextStep = cinematicSteps[activeStepRef.current + 1];
        const endTime = nextStep ? nextStep.time : (video.duration || 15);

        // Reset if boundary exceeded
        if (curr >= endTime - 0.2 || curr < startTime) {
          video.currentTime = startTime;
          setCurrentTime(startTime);
          if (video.duration) {
            setProgress((startTime / video.duration) * 100);
          }
          return;
        }
      }

      setCurrentTime(curr);
      if (video.duration) {
        setProgress((curr / video.duration) * 100);
      }

      // Update interactive active step based on current progress percentage or time
      let stepIndex = 0;
      for (let i = cinematicSteps.length - 1; i >= 0; i--) {
        if (curr >= cinematicSteps[i].time) {
          stepIndex = i;
          break;
        }
      }
      setActiveStep(stepIndex);
    };

    const handleDurationChange = () => {
      setDuration(video.duration);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    // Initial check in case loaded metadata came quickly
    if (video.duration) {
      setDuration(video.duration);
    }

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  // Handle auto-hide controls on mouse idle
  const resetControlsTimeout = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 2500);
  };

  useEffect(() => {
    resetControlsTimeout();
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCinemaMode(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch((err) => console.log('Autoplay or interactive block:', err));
    }
    resetControlsTimeout();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
    resetControlsTimeout();
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickRatio = clickX / width;
    
    video.currentTime = clickRatio * duration;
    resetControlsTimeout();
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return '0:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const jumpToStep = (time: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    let stepIndex = 0;
    for (let i = cinematicSteps.length - 1; i >= 0; i--) {
      if (time >= cinematicSteps[i].time) {
        stepIndex = i;
        break;
      }
    }
    setActiveStep(stepIndex);
    activeStepRef.current = stepIndex;

    video.currentTime = time;
    if (!isPlaying) {
      video.play().catch(() => {});
    }
  };

  return (
    <section 
      id="sensory-cinema" 
      className={`py-24 bg-[#1E1613] text-[#FFFDF9] relative transition-all duration-500 ${
        isCinemaMode ? 'z-[98]' : 'relative overflow-hidden z-10'
      }`}
    >
      {/* Cinema Mode Fullscreen Dimmer Backdrop */}
      <AnimatePresence>
        {isCinemaMode && (
          <motion.div
            id="cinema-mode-overlay-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-[#0B0604]/96 cursor-pointer z-[90] pb-24 flex flex-col items-center justify-end"
            onClick={() => setIsCinemaMode(false)}
          >
            {/* Guide message */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ delay: 0.3 }}
              className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xs font-mono text-[9px] text-[#D9B9A0] uppercase tracking-widest font-extrabold flex items-center gap-1.5 pointer-events-none select-none mb-6"
            >
              <Sparkles className="w-3 h-3 text-[#C67B3D]" />
              <span>Click anywhere or press Esc to exit Cinema Mode</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Dynamic Animated Cinematic Film Grain Jitter Overlay */}
      <style>{`
        @keyframes veloura-grain-flicker {
          0%, 100% { transform:translate(0, 0); }
          10% { transform:translate(-1%, -1%); }
          20% { transform:translate(-2%, 2%); }
          30% { transform:translate(1%, -2%); }
          40% { transform:translate(-1%, 3%); }
          50% { transform:translate(-2%, -1%); }
          60% { transform:translate(2%, 1%); }
          70% { transform:translate(-3%, -2%); }
          80% { transform:translate(1%, 3%); }
          90% { transform:translate(-2%, -3%); }
        }
        .veloura-film-grain-active {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          animation: veloura-grain-flicker 1.8s steps(10) infinite;
        }
      `}</style>
      
      <div 
        id="cinema-film-grain-overlay"
        className="absolute -inset-[5%] w-[110%] h-[110%] pointer-events-none opacity-[0.04] mix-blend-overlay z-40 veloura-film-grain-active"
        aria-hidden="true"
      />

      {/* Dynamic cinema theater subtle backdrop gradients */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C67B3D]/30 to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[70%] h-[70%] bg-gradient-to-b from-[#C67B3D]/10 to-transparent blur-[120px] pointer-events-none rounded-full" />
      
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#FFFDF9_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Headings Structure */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-3 py-1 bg-white/5 rounded-full border border-white/10"
          >
            <Film className="w-3.5 h-3.5 text-[#C67B3D]" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#D9B9A0] font-extrabold">
              Veloura Artistry Cinema • Living Canvas
            </span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-serif italic text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight"
          >
            A Symphony of <br />
            Slow Cinematic Espresso
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="font-sans text-xs sm:text-sm text-[#D9B9A0]/70 max-w-2xl mx-auto leading-relaxed font-semibold"
          >
            Observe the delicate mechanical ballet behind each selection. Hover over the video viewport 
            to scrub timelines, toggle audio streams, and explore the micro-stages of brewing perfection.
          </motion.p>
        </div>

        {/* Cinematic Grid Layout: Left is Main Videoplayer, Right is Narratives */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Main Video Section (16:9 Aspect Ratio) */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            
            {/* 16:9 Inner Container */}
            <motion.div
              id="cinema-viewport-container"
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onMouseMove={resetControlsTimeout}
              onMouseLeave={() => isPlaying && setShowControls(false)}
              className={`w-full aspect-[16/9] bg-black rounded-3xl overflow-hidden border border-white/[0.08] group transition-all duration-500 ${
                isCinemaMode 
                  ? 'relative z-[95] shadow-[0_45px_100px_rgba(198,123,61,0.25)] scale-[1.02]' 
                  : 'relative z-10 shadow-[0_30px_70px_rgba(0,0,0,0.6)]'
              }`}
            >
              
              {/* Dynamic ambient video glow layer behind frame */}
              <div className="absolute inset-0 bg-[#C67B3D]/5 opacity-40 mix-blend-color-dodge transition-opacity duration-500 pointer-events-none group-hover:opacity-60" />

              {/* The Video Element */}
              <video
                ref={videoRef}
                src={videoUrl}
                poster="https://i.ibb.co/QvkmHXw9/Chat-GPT-Image-May-28-2026-04-39-11-PM.png"
                className="w-full h-full object-cover cursor-pointer transition-transform duration-700 ease-out origin-center hover:scale-110"
                loop
                muted={isMuted}
                playsInline
                onClick={togglePlay}
              />

              {/* Big Center Play Overlay (visible when paused) */}
              <AnimatePresence>
                {!isPlaying && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs cursor-pointer z-20"
                  >
                    <motion.button
                      id="cinema-center-play-trigger"
                      whileHover={{ scale: 1.15, shadow: '0 0 30px rgba(198,123,61,0.5)' }}
                      whileTap={{ scale: 0.9 }}
                      className="w-16 h-16 rounded-full bg-[#C67B3D] text-[#FFFDF9] flex items-center justify-center shadow-2xl border border-white/20"
                      aria-label="Play video animation"
                    >
                      <Play className="w-7 h-7 fill-white stroke-none translate-x-0.5" />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Custom Dark Glass Controls Bar */}
              <AnimatePresence>
                {showControls && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                    className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/65 to-transparent z-30 flex flex-col space-y-3"
                  >
                    
                    {/* Scrubbable Progress Bar */}
                    <div 
                      id="cinema-scrub-bar"
                      onClick={handleScrub}
                      className="group/progress w-full h-1.5 bg-white/15 rounded-full cursor-pointer relative transition-all duration-200 hover:h-2"
                    >
                      {/* Filled Progress indicator */}
                      <div 
                        className="h-full bg-gradient-to-r from-[#C67B3D] to-[#E7C9B2] rounded-full relative"
                        style={{ width: `${progress}%` }}
                      >
                        {/* Interactive Handle dot */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#FFFDF9] border-2 border-[#C67B3D] rounded-full scale-0 group-hover/progress:scale-100 transition-transform duration-200 shadow-md shadow-black/80" />
                      </div>
                    </div>

                    {/* Bottom Controls strip */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        
                        {/* Play/Pause Button */}
                        <motion.button
                          id="cinema-bottom-play-btn"
                          onClick={togglePlay}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-[#FFFDF9] hover:text-[#C67B3D] transition-colors focus:outline-none cursor-pointer"
                        >
                          {isPlaying ? (
                            <Pause className="w-5 h-5 fill-[#FFFDF9]" />
                          ) : (
                            <Play className="w-5 h-5 fill-[#FFFDF9]" />
                          )}
                        </motion.button>

                        {/* Mute/Sound Button */}
                        <motion.button
                          id="cinema-bottom-mute-btn"
                          onClick={toggleMute}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-[#FFFDF9] hover:text-[#C67B3D] transition-colors focus:outline-none flex items-center space-x-1.5 cursor-pointer"
                          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                        >
                          {isMuted ? (
                            <VolumeX className="w-5 h-5" />
                          ) : (
                            <Volume2 className="w-5 h-5" />
                          )}
                          <span className="font-mono text-[9px] uppercase font-bold tracking-widest text-[#FFFDF9]/60 leading-none">
                            {isMuted ? 'Muted' : 'Sound On'}
                          </span>
                        </motion.button>

                        {/* Elapsed Real-time / Total duration display */}
                        <span className="font-mono text-[10px] text-[#D9B9A0]/70 font-semibold select-none">
                          {formatTime(currentTime)} <span className="opacity-40">/</span> {formatTime(duration || 15)}
                        </span>
                      </div>

                      <div className="flex items-center space-x-3.5">
                        {/* Playback rate pill */}
                        <span className="font-mono text-[8px] bg-white/10 border border-white/5 px-2 py-0.5 rounded-md uppercase font-extrabold tracking-widest text-[#FFFDF9]/60">
                          1080p • Real-Time
                        </span>

                        {/* Phase Loop Button */}
                        <motion.button
                          id="cinema-bottom-loop-btn"
                          onClick={() => setIsPhaseLoop(!isPhaseLoop)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className={`transition-all focus:outline-none cursor-pointer flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-bold font-sans uppercase tracking-wider ${
                            isPhaseLoop 
                              ? 'text-[#C67B3D] border-[#C67B3D]/30 bg-[#C67B3D]/10 font-bold' 
                              : 'text-[#FFFDF9] border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/15'
                          }`}
                          title={isPhaseLoop ? 'Disable Step Loop' : 'Enable Step Loop'}
                        >
                          <Repeat className={`w-3.5 h-3.5 ${isPhaseLoop ? 'animate-spin-slow' : ''}`} style={{ animationDuration: '8s' }} />
                          <span className="font-mono text-[9px] uppercase font-bold tracking-widest hidden sm:inline">
                            {isPhaseLoop ? 'Locked Step' : 'Loop Phase'}
                          </span>
                        </motion.button>

                        {/* Cinema Mode Button */}
                        <motion.button
                          id="cinema-bottom-toggle-btn"
                          onClick={() => setIsCinemaMode(!isCinemaMode)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className={`transition-all focus:outline-none cursor-pointer flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-bold font-sans uppercase tracking-wider ${
                            isCinemaMode 
                              ? 'text-[#C67B3D] border-[#C67B3D]/30 bg-[#C67B3D]/10 font-bold' 
                              : 'text-[#FFFDF9] border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/15'
                          }`}
                          title={isCinemaMode ? 'Exit Cinema Mode' : 'Enter Cinema Mode'}
                        >
                          <Tv className="w-3.5 h-3.5" />
                          <span className="font-mono text-[9px] uppercase font-bold tracking-widest hidden sm:inline">
                            Cinema Mode
                          </span>
                        </motion.button>

                        {/* Fullscreen Button */}
                        <motion.button
                          id="cinema-bottom-fullscreen-btn"
                          onClick={handleFullscreen}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-[#FFFDF9] hover:text-[#C67B3D] transition-colors focus:outline-none cursor-pointer"
                          title="Enter Fullscreen"
                        >
                          <Maximize className="w-4.5 h-4.5" />
                        </motion.button>
                      </div>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </div>

          {/* Right Section: Interactive Cinematic Step Notes */}
          <div className="lg:col-span-4 flex flex-col justify-between py-2 space-y-6">
            
            {/* Description Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-between h-full"
            >
              <div>
                <span className="font-mono text-[9px] tracking-widest text-[#C67B3D] uppercase font-bold block mb-2">
                  Interactive Timelines
                </span>
                <h4 className="font-serif italic font-extrabold text-white text-xl sm:text-2xl mb-4 leading-normal">
                  Micro-Roast Sequence
                </h4>
                <p className="font-sans text-[11.5px] leading-relaxed text-[#D9B9A0]/80 font-medium">
                  Each segment demonstrates critical physical stages during the thermal extraction process. Click any phase below to jump the video directly to its coordinates.
                </p>
              </div>

              {/* Step triggers list */}
              <div className="space-y-4.5 mt-8">
                {cinematicSteps.map((step, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <button
                      id={`cinema-step-pills-${idx}`}
                      key={step.title}
                      onClick={() => jumpToStep(step.time)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 relative group cursor-pointer ${
                        isActive 
                          ? 'bg-[#C67B3D] border-[#C67B3D] text-white shadow-lg shadow-[#C67B3D]/10' 
                          : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      {/* Active indicator dot */}
                      {isActive && (
                        <div className="absolute right-4 top-4">
                          <Compass className="w-4 h-4 text-white animate-spin-slow" style={{ animationDuration: '6s' }} />
                        </div>
                      )}

                      <div className="flex items-center space-x-2.5 mb-1.5">
                        <span className={`font-mono text-[9px] font-extrabold uppercase tracking-widest ${isActive ? 'text-white' : 'text-[#C67B3D] group-hover:text-[#FFFDF9]'}`}>
                          {step.title}
                        </span>
                      </div>
                      
                      <p className={`font-sans text-[11px] leading-relaxed font-semibold transition-colors duration-300 ${isActive ? 'text-white' : 'text-[#D9B9A0]/70 group-hover:text-white'}`}>
                        {step.desc}
                      </p>
                    </button>
                  );
                })}
              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
