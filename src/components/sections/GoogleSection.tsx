import React from 'react';
import {
  Phone,
  Mic,
  Bot,
  Volume2,
  Webhook,
  Database,
  Sparkles,
  ArrowRight,
  ArrowDown
} from 'lucide-react';

export const GoogleSection: React.FC = () => {
  return (
    <div id="layer-google" className="space-y-12 py-12 border-b border-slate-200/80 last:border-b-0 font-sans">
      {/* Top Header with Large Subtle Numeral */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <span className="inline-block px-2.5 py-0.5 rounded-full border border-slate-200 bg-white text-[10px] font-mono uppercase tracking-widest text-blue-600 font-semibold shadow-2xs">
              LAYER 04 · DIALOGFLOW CX & CONVERSATIONAL AI
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              Dialogflow CX & Conversational AI Services
            </h3>
          </div>
          <span className="text-6xl sm:text-7xl font-bold text-slate-200/80 select-none leading-none">
            04
          </span>
        </div>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
          Google Dialogflow CX serves as the core conversational brain for Willow. It ingests streaming caller audio from Cisco, manages conversational state and intent transitions, executes Gemini Flash generative models, coordinates backend webhook lookups to fulfill dynamic fleet parameters, and synthesizes audio responses via neural Text-to-Speech.
        </p>
      </div>

      {/* 1. Conversational AI Services */}
      <div className="space-y-4 pt-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 text-sm font-bold text-slate-900">
            <div className="w-7 h-7 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 flex items-center justify-center">
              <Bot className="w-4 h-4 text-blue-600" />
            </div>
            <span>Conversational AI Services (Speech, Orchestration & Synthesis)</span>
          </div>
          <p className="text-xs text-slate-500 font-medium pl-9.5">
            End-to-end voice processing: real-time speech transcription, agent flow logic, and advanced neural voice generation.
          </p>
        </div>

        {/* Visual Pipeline Strip: Audio In -> STT (Audio In) -> DFCX -> TTS (Audio Out) */}
        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-900 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Voice Processing Pipeline Flow</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 font-normal">
              Telephony Stream · gRPC
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {/* Step 1: Audio In */}
            <div className="flex-1 p-3 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-2xs">
                  <Phone className="w-3.5 h-3.5 text-slate-700" />
                </div>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-white text-slate-500 border border-slate-200">
                  RTP
                </span>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Audio In</div>
                <div className="text-[11px] text-slate-500 font-mono">Caller Voice Stream</div>
              </div>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-300 hidden sm:block shrink-0" />
            <ArrowDown className="w-4 h-4 text-slate-300 sm:hidden self-center my-0.5" />

            {/* Step 2: STT (Audio In) */}
            <div className="flex-1 p-3 rounded-xl border border-blue-200 bg-blue-50/40 space-y-1.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="w-7 h-7 rounded-lg bg-white border border-blue-200 flex items-center justify-center text-blue-600 shadow-2xs">
                  <Mic className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  Chirp 3
                </span>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">STT (Audio In)</div>
                <div className="text-[11px] text-slate-500 font-mono">Speech-to-Text</div>
              </div>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-300 hidden sm:block shrink-0" />
            <ArrowDown className="w-4 h-4 text-slate-300 sm:hidden self-center my-0.5" />

            {/* Step 3: DFCX */}
            <div className="flex-1 p-3 rounded-xl border border-blue-200 bg-blue-50/40 space-y-1.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="w-7 h-7 rounded-lg bg-white border border-blue-200 flex items-center justify-center text-blue-600 shadow-2xs">
                  <Bot className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  Engine
                </span>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">DFCX</div>
                <div className="text-[11px] text-slate-500 font-mono">Agent Logic & State</div>
              </div>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-300 hidden sm:block shrink-0" />
            <ArrowDown className="w-4 h-4 text-slate-300 sm:hidden self-center my-0.5" />

            {/* Step 4: TTS (Audio Out) */}
            <div className="flex-1 p-3 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-1.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="w-7 h-7 rounded-lg bg-white border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-2xs">
                  <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Voice
                </span>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">TTS (Audio Out)</div>
                <div className="text-[11px] text-slate-500 font-mono">Neural Voice Output</div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Detailed Voice Processing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* Card 1: STT */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Stage 01</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-mono text-[9px] font-bold flex items-center gap-1">
                  <Mic className="w-2.5 h-2.5" /> Chirp 3 STT
                </span>
              </div>
              <h5 className="font-bold text-slate-900 text-xs">Streaming Speech Recognition</h5>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Ingests real-time 20ms audio frames from Cisco over gRPC, converting caller voice to text with Penske fleet vocabulary adaptation.
              </p>
            </div>
          </div>

          {/* Card 2: DFCX */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Stage 02</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200/80 font-mono text-[9px] font-bold flex items-center gap-1">
                  <Bot className="w-2.5 h-2.5" /> Dialogflow CX
                </span>
              </div>
              <h5 className="font-bold text-slate-900 text-xs">State & Generative Execution</h5>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Dialogflow CX manages state machine transitions, intent classification, and executes Gemini Flash generators for customer turns.
              </p>
            </div>
          </div>

          {/* Card 3: TTS */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Stage 03</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-mono text-[9px] font-bold flex items-center gap-1">
                  <Volume2 className="w-2.5 h-2.5" /> Chirp 3 TTS
                </span>
              </div>
              <h5 className="font-bold text-slate-900 text-xs">Neural Voice Synthesis</h5>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Synthesizes natural voice audio frames and streams RTP packets back through the network hops to Cisco for caller playback.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Webhooks (Backend Dependencies) */}
      <div className="space-y-4 pt-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 text-sm font-bold text-slate-900">
            <div className="w-7 h-7 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 flex items-center justify-center">
              <Webhook className="w-4 h-4 text-blue-600" />
            </div>
            <span>Webhooks (Backend Dependencies)</span>
          </div>
          <p className="text-xs text-slate-500 font-medium pl-9.5">
            Delays in external backend services responding to Dialogflow CX parameter fulfillment during conversation turns.
          </p>
        </div>

        {/* Visual Parameter Exchange Diagram (Fixed Balanced Grid) */}
        <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-900 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-slate-700" />
              <span>Dealership Parameter Lookup Flow</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 font-normal">
              Webhook Request / Response Execution
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs items-stretch">
            {/* Step 1: Inbound Call Event */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs flex flex-col justify-between h-full space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Step 01</span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200/80 font-mono text-[10px] font-bold">
                    Inbound Event
                  </span>
                </div>
                <h5 className="font-bold text-slate-900 text-xs min-h-[2rem] flex items-center">
                  Dialogflow CX Turn Start
                </h5>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-150 font-mono text-[11px] text-slate-700 space-y-1.5 flex-1 flex flex-col justify-center min-h-[5.5rem]">
                <div><span className="text-slate-400">caller_ani:</span> "678-360-8793"</div>
                <div><span className="text-slate-400">event:</span> "WELCOME"</div>
                <div><span className="text-slate-400">turn:</span> "initial_session"</div>
              </div>
            </div>

            {/* Step 2: Webhook Query */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs flex flex-col justify-between h-full space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Step 02</span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200/80 font-mono text-[10px] font-bold">
                    Backend Query
                  </span>
                </div>
                <h5 className="font-bold text-slate-900 text-xs min-h-[2rem] flex items-center">
                  Dealership Parameter Request
                </h5>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-150 font-mono text-[11px] text-slate-700 space-y-1.5 flex-1 flex flex-col justify-center min-h-[5.5rem]">
                <div><span className="text-slate-400">method:</span> "GET /dealerships"</div>
                <div><span className="text-slate-400">lookup_ani:</span> "678-360-8793"</div>
                <div><span className="text-slate-400">service:</span> "Penske Fleet API"</div>
              </div>
            </div>

            {/* Step 3: Greeting Generation */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs flex flex-col justify-between h-full space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Step 03</span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200/80 font-mono text-[10px] font-bold">
                    Payload Return
                  </span>
                </div>
                <h5 className="font-bold text-slate-900 text-xs min-h-[2rem] flex items-center">
                  Welcome Greeting Assembled
                </h5>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-150 font-mono text-[11px] text-slate-700 space-y-1.5 flex-1 flex flex-col justify-center min-h-[5.5rem]">
                <div><span className="text-slate-400">status:</span> "200 OK"</div>
                <div><span className="text-slate-400">dealership:</span> "United BMW"</div>
                <div><span className="text-slate-400">greeting:</span> "Resolved Greeting"</div>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-150 text-slate-600 text-xs flex items-center gap-2.5">
            <ArrowRight className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="leading-relaxed">
              <strong>Latency Impact:</strong> When Dialogflow CX issues a webhook lookup, it holds the conversational turn until the response returns or reaches its timeout. Slow backend queries directly postpone audio synthesis, causing caller-reported delay before the greeting or turn reply.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};


