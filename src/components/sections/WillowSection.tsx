import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, Play, Pause, ArrowUpRight, ExternalLink, Ticket, Clock, Ear, PhoneForwarded } from 'lucide-react';

interface AudioTrack {
  id: string;
  issueNumber: number;
  title: string;
  durationSeconds: number;
  src?: string;
  baseBars: number[];
}

interface TicketItem {
  id: string;
  title: string;
  component: string;
  status: 'In Progress' | 'Under Investigation' | 'Patch Verified' | 'Fix Deployed' | 'Resolved';
  priority: 'P1 - Critical' | 'P2 - High';
  description: string;
}

const MAX_CLIP_SECONDS = 20;
const NUM_BARS = 12; // 12 clean, well-spaced amplitude bars

const GOOGLE_TICKETS: TicketItem[] = [
  {
    id: 'GCP-84920',
    title: 'Dialogflow CX Initial Turn Dead Air',
    component: 'Dialogflow CX / gRPC',
    status: 'Under Investigation',
    priority: 'P1 - Critical',
    description: 'Initial session initialization latency and greeting turnaround delay.',
  },
  {
    id: 'GCP-84931',
    title: 'Chirp 2 STT Recognition Dropouts',
    component: 'Cloud Speech-to-Text',
    status: 'In Progress',
    priority: 'P1 - Critical',
    description: 'Speech recognition dropouts and acoustic model sensitivity.',
  },
  {
    id: 'GCP-84988',
    title: 'Speculative Token Streaming Pipeline Gap',
    component: 'Journey TTS',
    status: 'Fix Deployed',
    priority: 'P2 - High',
    description: 'Early-sentence synthesis chunking for faster voice response.',
  },
];

const CISCO_TICKETS: TicketItem[] = [
  {
    id: 'CSC-49102',
    title: 'VVB RTP Packet Buffer Batching Lag',
    component: 'Virtual Voice Browser',
    status: 'Patch Verified',
    priority: 'P1 - Critical',
    description: 'Audio buffer frame packetization tuning for carrier streams.',
  },
  {
    id: 'CSC-49118',
    title: 'CUBE SIP Transfer Mute Gap Renegotiation',
    component: 'CUBE / CVP',
    status: 'In Progress',
    priority: 'P1 - Critical',
    description: 'Re-INVITE session renegotiation during live agent transfer.',
  },
  {
    id: 'CSC-49145',
    title: 'CCAI Connector gRPC Streaming Micro-Chunking',
    component: 'Webex CC / CCAI',
    status: 'Resolved',
    priority: 'P2 - High',
    description: 'RTP stream packetization into Dialogflow CX channel.',
  },
];

export const WillowSection: React.FC = () => {
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [liveBars, setLiveBars] = useState<number[]>(new Array(NUM_BARS).fill(14));
  const [ticketTab, setTicketTab] = useState<'google' | 'cisco'>('google');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);

  const AUDIO_RECORDINGS: AudioTrack[] = [
    {
      id: 'audio-issue-1',
      issueNumber: 1,
      title: 'Issue 1: Long delay before greeting',
      durationSeconds: 20,
      src: '/Initial-Greeting-Delay.wav',
      baseBars: [14, 14, 14, 14, 14, 14, 14, 14, 14, 65, 85, 95],
    },
    {
      id: 'audio-issue-2',
      issueNumber: 2,
      title: 'Issue 2: Willow did not hear or understand',
      durationSeconds: 20,
      baseBars: [45, 75, 85, 45, 18, 65, 85, 55, 25, 40, 75, 60],
    },
    {
      id: 'audio-issue-3',
      issueNumber: 3,
      title: 'Issue 3: Silence when transferred to live person',
      durationSeconds: 20,
      baseBars: [60, 85, 65, 20, 14, 14, 14, 14, 14, 14, 45, 80],
    },
  ];

  const updateLiveAmplitudes = useCallback(() => {
    if (!analyserRef.current || !activeAudioId) return;

    const freqData = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(freqData);

    const timeData = new Uint8Array(analyserRef.current.fftSize);
    analyserRef.current.getByteTimeDomainData(timeData);

    // Calculate overall vocal energy (RMS)
    let sumSq = 0;
    for (let i = 0; i < timeData.length; i++) {
      const norm = (timeData[i] - 128) / 128;
      sumSq += norm * norm;
    }
    const rms = Math.sqrt(sumSq / timeData.length);

    const newAmps: number[] = [];
    // Distribute telephone voice frequencies across all 12 bars
    for (let i = 0; i < NUM_BARS; i++) {
      const binIdx = Math.min(freqData.length - 1, Math.max(1, Math.floor(1 + (i / (NUM_BARS - 1)) * 14)));
      const freqVal = freqData[binIdx] || 0;
      const speechEnergy = (freqVal / 255) * 0.65 + Math.min(1, rms * 3.8) * 0.35;
      const height = Math.max(14, Math.min(100, Math.round(speechEnergy * 86 + 14)));
      newAmps.push(height);
    }

    setLiveBars(newAmps);
    rafRef.current = requestAnimationFrame(updateLiveAmplitudes);
  }, [activeAudioId]);

  // Audio Playback & 15-Second Enforcement
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (audio.currentTime >= MAX_CLIP_SECONDS) {
        audio.pause();
        audio.currentTime = 0;
        setActiveAudioId(null);
        setCurrentTime(0);
        setLiveBars(new Array(NUM_BARS).fill(14));
      } else {
        setCurrentTime(audio.currentTime);
      }
    };

    const handleEnded = () => {
      setActiveAudioId(null);
      setCurrentTime(0);
      setLiveBars(new Array(NUM_BARS).fill(14));
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Web Audio Analyser Loop on Active Playback
  useEffect(() => {
    if (activeAudioId) {
      rafRef.current = requestAnimationFrame(updateLiveAmplitudes);
    } else {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setLiveBars(new Array(NUM_BARS).fill(14));
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [activeAudioId, updateLiveAmplitudes]);

  const initAudioContext = () => {
    if (!audioRef.current) return;
    if (!audioContextRef.current) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 64;
        analyser.smoothingTimeConstant = 0.8;

        const source = ctx.createMediaElementSource(audioRef.current);
        source.connect(analyser);
        analyser.connect(ctx.destination);

        audioContextRef.current = ctx;
        analyserRef.current = analyser;
      } catch (err) {
        console.log('AudioContext initialization note:', err);
      }
    }
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  const toggleAudio = (track: AudioTrack) => {
    const audio = audioRef.current;
    if (!audio) return;

    initAudioContext();

    if (activeAudioId === track.id) {
      audio.pause();
      setActiveAudioId(null);
    } else {
      if (track.src) {
        if (audio.src !== window.location.origin + track.src && !audio.src.endsWith(track.src)) {
          audio.src = track.src;
          audio.currentTime = 0;
        }
        audio.play().catch(err => console.log('Playback error:', err));
        setActiveAudioId(track.id);
      } else {
        audio.pause();
        setActiveAudioId(track.id);
      }
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>, track: AudioTrack) => {
    if (!track.src) return;
    const audio = audioRef.current;
    if (!audio) return;

    initAudioContext();

    const rect = e.currentTarget.getBoundingClientRect();
    const clickRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetTime = clickRatio * MAX_CLIP_SECONDS;

    if (audio.src !== window.location.origin + track.src && !audio.src.endsWith(track.src)) {
      audio.src = track.src;
    }
    audio.currentTime = targetTime;
    setCurrentTime(targetTime);
    if (activeAudioId !== track.id) {
      audio.play().catch(err => console.log('Playback error:', err));
      setActiveAudioId(track.id);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const getStatusBadge = (status: TicketItem['status']) => {
    switch (status) {
      case 'Resolved':
      case 'Fix Deployed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Patch Verified':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'In Progress':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Under Investigation':
        return 'bg-purple-50 text-purple-700 border-purple-200';
    }
  };

  return (
    <div id="layer-willow" className="space-y-12 py-12 border-b border-slate-200/80 last:border-b-0 font-sans">
      {/* Hidden Global Audio Element */}
      <audio ref={audioRef} preload="metadata" crossOrigin="anonymous" />

      {/* Top Header with Large Subtle Numeral */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <span className="inline-block px-2.5 py-0.5 rounded-full border border-slate-200 bg-white text-[10px] font-mono uppercase tracking-widest text-slate-600 font-semibold shadow-2xs">
              PROBLEM OVERVIEW
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              Willow AI Virtual Agent
            </h3>
          </div>
          <span className="text-6xl sm:text-7xl font-bold text-slate-200/80 select-none leading-none">
            01
          </span>
        </div>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
          Willow is Penske's Virtual Agent that handles inbound calls from customers. Penske recently discovered several issues in the deployment and have raised tickets to Google and Cisco. The main issues are the following:
        </p>
      </div>

      {/* The 3 Main Issues (Clean List with Circular Icon Badges) */}
      <div className="space-y-1 pt-2">
        <div className="divide-y divide-slate-150">
          <div className="py-4 flex items-center gap-4">
            <div className="w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 shrink-0 shadow-2xs">
              <Clock className="w-4 h-4 text-slate-700" />
            </div>
            <h4 className="text-base font-semibold text-slate-900">
              Users reported long delays before being greeted
            </h4>
          </div>

          <div className="py-4 flex items-center gap-4">
            <div className="w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 shrink-0 shadow-2xs">
              <Ear className="w-4 h-4 text-slate-700" />
            </div>
            <h4 className="text-base font-semibold text-slate-900">
              Users reported that Willow did not hear or understand them
            </h4>
          </div>

          <div className="py-4 flex items-center gap-4">
            <div className="w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 shrink-0 shadow-2xs">
              <PhoneForwarded className="w-4 h-4 text-slate-700" />
            </div>
            <h4 className="text-base font-semibold text-slate-900">
              Users experienced extended periods of silence when transferred to a live person
            </h4>
          </div>
        </div>
      </div>

      {/* 3 Call Recordings Cards (Clean, 12-bar live amplitude) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
          <Volume2 className="w-4 h-4 text-slate-700" />
          <span>Call Audio Recordings</span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {AUDIO_RECORDINGS.map((track) => {
            const isPlaying = activeAudioId === track.id;

            return (
              <div
                key={track.id}
                className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs flex items-center justify-between gap-4 transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <button
                    onClick={() => toggleAudio(track)}
                    className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-black transition-colors shrink-0 shadow-xs cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 translate-x-0.5" />}
                  </button>

                  <h5 className="text-sm font-semibold text-slate-900">
                    {track.title}
                  </h5>
                </div>

                {/* 12-Bar Live Amplitude Waveform + Timecode */}
                <div className="flex items-center gap-3">
                  <div
                    onClick={(e) => handleSeek(e, track)}
                    className="h-8 flex items-center gap-1.5 cursor-pointer py-1 px-1 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    {track.baseBars.map((baseH, bIdx) => {
                      const currentHeight = isPlaying
                        ? Math.max(14, (liveBars[bIdx] || baseH))
                        : baseH;

                      return (
                        <div
                          key={bIdx}
                          className={`w-1 rounded-full transition-all duration-100 ${
                            isPlaying ? 'bg-blue-600' : 'bg-slate-300'
                          }`}
                          style={{
                            height: `${currentHeight}%`,
                          }}
                        />
                      );
                    })}
                  </div>
                  <span className="text-xs font-mono text-slate-500 w-12 text-right font-medium">
                    {isPlaying ? formatTime(currentTime) : '0:00'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Opened Tickets Table with Google / Cisco Switcher */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <Ticket className="w-4 h-4 text-blue-600" />
            <span>Opened Vendor Escalation Tickets</span>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80 font-mono text-xs">
            <button
              onClick={() => setTicketTab('google')}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                ticketTab === 'google'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Google Cloud ({GOOGLE_TICKETS.length})
            </button>
            <button
              onClick={() => setTicketTab('cisco')}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                ticketTab === 'cisco'
                  ? 'bg-[#049FD9] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cisco Systems ({CISCO_TICKETS.length})
            </button>
          </div>
        </div>

        {/* Tickets List */}
        <div className="divide-y divide-slate-150 rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
          {(ticketTab === 'google' ? GOOGLE_TICKETS : CISCO_TICKETS).map((ticket) => (
            <div key={ticket.id} className="p-4 hover:bg-slate-50/70 transition-colors space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-slate-900">
                    {ticket.id}
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs font-semibold text-slate-800">
                    {ticket.title}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    {ticket.component}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                      ticket.status
                    )}`}
                  >
                    {ticket.status}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                {ticket.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Issue Tracker & Recording Repository Link */}
      <div className="pt-2">
        <a
          href="https://penskeauto.sharepoint.com/sites/ProjectWillow/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex items-center justify-between group shadow-2xs"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-700 shrink-0 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
              <ExternalLink className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block font-semibold">
                CENTRAL REPOSITORY & SHAREPOINT
              </span>
              <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Issue Tracker & Recording Repository
              </span>
              <span className="text-xs text-slate-500 block mt-0.5">
                https://penskeauto.sharepoint.com/sites/ProjectWillow/
              </span>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:border-blue-200 transition-colors">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </a>
      </div>
    </div>
  );
};
