import type { LayerInfo, LatencyHop, PenskeCallScenario } from '../types';

export const INFRASTRUCTURE_LAYERS: LayerInfo[] = [
  {
    id: 'willow',
    index: 1,
    title: 'Willow — AI Virtual Agent',
    subtitle: 'Conversational Voice Experience & Utterance Capture',
    tag: 'LAYER 1 • CONVERSATIONAL VOICE AGENT',
    badgeColor: 'bg-willow-soft text-willow-primary border-willow-warm/30',
    accentColor: '#E06D53',
    borderColor: 'border-orange-200',
    bgGradient: 'from-orange-50/70 via-white to-orange-50/30',
    description: 'The top surface where Penske customers interact. Willow handles speech recognition visual feedback, audio playback, barge-in detection, and real-time conversation state.',
    roleInPenske: 'Manages incoming 24/7 truck rental bookings, roadside assistance triage, commercial fleet billing inquiries, and live transfer handoffs.',
    baseLatencyMs: {
      before: 120,
      after: 25,
    },
    metrics: [
      { label: 'Voice Activity Latency', value: '<25ms', subtext: 'Client-side VAD' },
      { label: 'Barge-In Interrupt', value: '18ms', subtext: 'Instant audio cutoff' },
      { label: 'Playback Buffer', value: '20ms', subtext: 'Continuous stream' },
      { label: 'Customer CSAT', value: '94.8%', subtext: 'Up from 78.2%' },
    ],
    keyIssues: [
      {
        title: 'Customer Voice Overlap & False Barge-in',
        description: 'Road background noise from truck drivers was misidentified as user interruption, cutting off Willow mid-sentence.',
        impact: 'Choppy conversations and repeated prompts for Penske drivers on highways.',
        fix: 'Deployed noise-robust client Voice Activity Detection (VAD) with directional speech filtering.',
        resolvedBy: 'Google',
      },
      {
        title: 'End-of-Utterance Dead Air',
        description: 'Willow waited 1,100ms after the customer stopped talking before deciding the turn was complete.',
        impact: 'Uncomfortable pauses that caused callers to say "Hello? Are you there?".',
        fix: 'Tuned dynamic speech endpointer with conversational intent prediction, reducing turn-end detection to 380ms.',
        resolvedBy: 'Joint',
      }
    ],
    techSpecs: [
      { key: 'Audio Sampling', value: '16kHz / 24kHz Opus & G.711u' },
      { key: 'Turn Detection', value: 'Hybrid Acoustic + Semantic Endpointer' },
      { key: 'Barge-in Mode', value: 'Dynamic Acoustic Echo Cancellation (AEC)' },
      { key: 'UI State Engine', value: 'Streaming Reactive Event Loop' },
    ]
  },
  {
    id: 'cisco',
    index: 2,
    title: 'Cisco Telephony',
    subtitle: 'Webex Contact Center & Voice Gateway Infrastructure',
    tag: 'LAYER 2 • TELECOM & MEDIA BRIDGING',
    badgeColor: 'bg-sky-50 text-cisco-cyan border-cisco-cyan/30',
    accentColor: '#049FD9',
    borderColor: 'border-sky-200',
    bgGradient: 'from-sky-50/70 via-white to-blue-50/30',
    description: 'The enterprise telephony foundation routing calls between PSTN carriers, Cisco Unified Customer Voice Portal (CVP), Virtual Voice Browser (VVB), and Cloud Gateways.',
    roleInPenske: 'Connects inbound 678-360-8793 Penske customer phone lines to modern AI microservices while maintaining contact center agent handoff capabilities.',
    baseLatencyMs: {
      before: 380,
      after: 85,
    },
    metrics: [
      { label: 'SIP Signaling Handshake', value: '45ms', subtext: 'Pre-warmed sessions' },
      { label: 'RTP Media Packet Chunking', value: '20ms', subtext: 'Optimized from 60ms' },
      { label: 'VVB Audio Jitter Buffer', value: '15ms', subtext: 'Adaptive queue' },
      { label: 'Call Transfer Success', value: '99.94%', subtext: 'Zero dropped SIP handoffs' },
    ],
    keyIssues: [
      {
        title: 'RTP Audio Packet Chunking Delay',
        description: 'Legacy Cisco VVB was buffering 60ms of audio packets before sending to the media connector, adding compounding pipeline delay.',
        impact: 'Overall audio transmission latency was inflated by 180ms across the full round-trip.',
        fix: 'Configured Cisco Media Sense / Webex Cloud Connector to 20ms RTP frame streaming with direct gRPC bridge.',
        resolvedBy: 'Cisco',
      },
      {
        title: 'SIP Re-INVITE Media Renegotiation Freezes',
        description: 'When transferring from IVR to AI or AI to human agent, SIP session renegotiation caused a 400ms mute gap.',
        impact: 'Callers heard silence during critical moments of handoff.',
        fix: 'Implemented early media negotiation and dual-leg pre-established media sessions.',
        resolvedBy: 'Cisco',
      }
    ],
    techSpecs: [
      { key: 'Telephony Core', value: 'Cisco Webex Contact Center / CVP Enterprise' },
      { key: 'Voice Browser', value: 'Cisco Virtual Voice Browser (VVB 12.6+)' },
      { key: 'Session Border', value: 'Cisco Unified Border Element (CUBE)' },
      { key: 'Signaling Protocol', value: 'SIP over TLS / Secure RTP (SRTP)' },
    ]
  },
  {
    id: 'network',
    index: 3,
    title: 'Networking & Internet Transit',
    subtitle: 'Backbone Routing, Jitter Buffers & Cloud Interconnect',
    tag: 'LAYER 3 • NETWORK & PACKET FABRIC',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-300',
    accentColor: '#10B981',
    borderColor: 'border-emerald-200',
    bgGradient: 'from-emerald-50/60 via-white to-teal-50/30',
    description: 'The physical and logical transit layer spanning public Internet hops, BGP routing, QoS packet tagging, and dedicated Google Cloud Interconnect fibers.',
    roleInPenske: 'Carries uninterrupted high-priority voice packets from Penske telecom datacenters across North America to Google Cloud AI processing regions.',
    baseLatencyMs: {
      before: 210,
      after: 32,
    },
    metrics: [
      { label: 'Direct Interconnect RTT', value: '28ms', subtext: 'Dedicated 10G fiber' },
      { label: 'Packet Jitter Variance', value: '<3.2ms', subtext: 'Down from 48ms' },
      { label: 'Packet Loss Rate', value: '0.01%', subtext: 'Carrier grade SLA' },
      { label: 'QoS Priority', value: 'DSCP EF (46)', subtext: 'Expedited forwarding' },
    ],
    keyIssues: [
      {
        title: 'Public Internet Transit Jitter & Asymmetric Routing',
        description: 'Voice traffic routed over public internet experienced packet arrival jitter during mid-day carrier congestion.',
        impact: 'Robotic distortion in customer audio, forcing STT to re-process corrupted phonemes.',
        fix: 'Provisioned dedicated Google Cloud Interconnect directly linked to Cisco Webex Edge POPs with DSCP EF tagging.',
        resolvedBy: 'Joint',
      },
      {
        title: 'MTU Packet Fragmentation on TLS Payloads',
        description: 'Encrypted SRTP packets exceeded standard MTU over certain VPN tunnels, causing packet fragmentation.',
        impact: 'Packet loss spikes up to 4.2% on regional Penske logistics hubs.',
        fix: 'Standardized path MTU discovery and adjusted TCP/UDP MSS clamps to 1420 bytes.',
        resolvedBy: 'Cisco',
      }
    ],
    techSpecs: [
      { key: 'Transit Pipe', value: 'Google Cloud Dedicated Interconnect (10 Gbps)' },
      { key: 'Routing Protocol', value: 'BGP Multi-Exit Discriminator (MED)' },
      { key: 'QoS Marking', value: 'DiffServ Expedited Forwarding (DSCP 46)' },
      { key: 'Redundancy', value: 'Dual-Zone Active-Active Carrier Diversity' },
    ]
  },
  {
    id: 'google',
    index: 4,
    title: 'Google AI & Transformers',
    subtitle: 'Speech-to-Text, Gemini Intelligence & Neural Voice Synthesis',
    tag: 'LAYER 4 • TRANSFORMERS & AI BRAIN',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-300',
    accentColor: '#4285F4',
    borderColor: 'border-blue-200',
    bgGradient: 'from-blue-50/70 via-white to-indigo-50/40',
    description: 'The foundation AI intelligence tier comprising Google Chirp Speech-to-Text, Gemini 1.5 Flash conversational reasoning, Dialogflow CX flow logic, and Journey Neural Text-to-Speech.',
    roleInPenske: 'Understands complex fleet logistics terminology, verifies driver reservations in real-time, reasons through policy rules, and generates warm, natural voice responses.',
    baseLatencyMs: {
      before: 1140,
      after: 480,
    },
    metrics: [
      { label: 'STT Recognition Latency', value: '145ms', subtext: 'Streaming Chirp 2' },
      { label: 'Gemini 1.5 TTFT', value: '240ms', subtext: 'Time to first token' },
      { label: 'TTS First Audio Chunk', value: '95ms', subtext: 'Neural Journey' },
      { label: 'Total AI Turnaround', value: '480ms', subtext: 'Down from 1,140ms' },
    ],
    keyIssues: [
      {
        title: 'LLM Complete-Response Wait Delay',
        description: 'Legacy pipeline waited for the full LLM sentence response to finish generation before sending text to the TTS engine.',
        impact: 'Added 600-800ms unnecessary latency for multi-sentence answers.',
        fix: 'Deployed Vertex LLM and TTS latency hedges with retry mechanisms to mitigate long-tail latency on the Google side.',
        resolvedBy: 'Google',
      },
      {
        title: 'Custom Automotive & Logistics Terminology Misses',
        description: 'Standard speech models frequently misspelled vehicle classes (e.g., "26ft box truck with liftgate", "DEF fluid", "DOT inspection").',
        impact: 'Wrong booking modifications requiring repeated customer clarification.',
        fix: 'Fine-tuned Chirp STT acoustic & language adaptation specifically for Penske fleet management vocabulary.',
        resolvedBy: 'Google',
      }
    ],
    techSpecs: [
      { key: 'Conversational LLM', value: 'Gemini 1.5 Flash (Fine-tuned for Penske)' },
      { key: 'Speech Recognition', value: 'Google Cloud Chirp 2 (Streaming Conformer)' },
      { key: 'Speech Synthesis', value: 'Neural Journey TTS (Streaming gRPC)' },
      { key: 'Context Cache', value: 'Vertex AI Context Caching (Sub-50ms retrieval)' },
    ]
  },
];

export const LATENCY_HOPS: LatencyHop[] = [
  {
    id: 'hop-1',
    layerId: 'willow',
    name: 'Customer Speech & Voice Activity Detection',
    beforeMs: 120,
    afterMs: 25,
    description: 'Acoustic voice detection and initial audio buffer capture on client side.',
    status: 'optimal',
    details: 'Reduced from 120ms to 25ms using lightweight WebAssembly on-device VAD.',
  },
  {
    id: 'hop-2',
    layerId: 'cisco',
    name: 'Cisco CVP / VVB RTP Audio Chunking',
    beforeMs: 180,
    afterMs: 40,
    description: 'Packaging voice packets into continuous 20ms RTP frames.',
    status: 'optimal',
    details: 'Replaced 60ms batch buffer with real-time 20ms micro-chunking directly to media gateway.',
  },
  {
    id: 'hop-3',
    layerId: 'network',
    name: 'Transit Network & Google Cloud Interconnect',
    beforeMs: 210,
    afterMs: 32,
    description: 'Carrier fiber hop between Cisco Webex POP and Google GCP datacenter.',
    status: 'optimal',
    details: 'Bypassed public internet hops by provisioning 10Gbps dedicated interconnect with DSCP EF priority.',
  },
  {
    id: 'hop-4',
    layerId: 'google',
    name: 'Google Chirp STT (Streaming Transcribe)',
    beforeMs: 380,
    afterMs: 145,
    description: 'Streaming acoustic speech-to-text transcription with custom Penske lexicon.',
    status: 'optimal',
    details: 'Chirp 2 streaming conformer model processes phonemes in real-time as words are spoken.',
  },
  {
    id: 'hop-5',
    layerId: 'google',
    name: 'Gemini 1.5 Flash Reasoning (TTFT)',
    beforeMs: 520,
    afterMs: 240,
    description: 'Time to First Token (TTFT) for reservation logic and Penske policy verification.',
    status: 'optimal',
    details: 'Prompt caching + Gemini 1.5 Flash optimization cut inference start time by over 50%.',
  },
  {
    id: 'hop-6',
    layerId: 'google',
    name: 'Google Neural Journey TTS Streaming',
    beforeMs: 240,
    afterMs: 95,
    description: 'Generating lifelike voice audio from streaming token chunks.',
    status: 'optimal',
    details: 'TTS synthesizes and emits the first audio packet before the LLM finishes generating the full sentence.',
  },
  {
    id: 'hop-7',
    layerId: 'cisco',
    name: 'Cisco Telephony Outbound Stream Bridge',
    beforeMs: 200,
    afterMs: 45,
    description: 'Injecting synthesized voice audio back into caller PSTN phone call stream.',
    status: 'optimal',
    details: 'Zero-copy ring buffer in Cisco VVB eliminates playback underflow.',
  },
];

export const PENSKE_SCENARIOS: PenskeCallScenario[] = [
  {
    id: 'reservation-extension',
    title: 'Truck Reservation Extension',
    caller: 'Commercial Fleet Manager (Dallas, TX)',
    utterance: '"Hi Willow, I need to extend our 26-foot box truck reservation by two days because of weather."',
    expectedAction: 'Check vehicle availability at Dallas Hub, verify rate tier, update booking, and confirm with driver.',
    totalBeforeMs: 1850,
    totalAfterMs: 622,
    hops: [
      { hopId: 'h1', layer: 'willow', label: 'Audio Capture & VAD', beforeDuration: 120, afterDuration: 25, detail: 'Clean audio frame captured without road rumble distortion' },
      { hopId: 'h2', layer: 'cisco', label: 'Cisco CVP RTP Stream', beforeDuration: 180, afterDuration: 40, detail: '20ms Opus frame stream over secure Webex link' },
      { hopId: 'h3', layer: 'network', label: 'GCP Dedicated Interconnect', beforeDuration: 210, afterDuration: 32, detail: 'Direct BGP peering route, 0% jitter' },
      { hopId: 'h4', layer: 'google', label: 'Chirp STT Recognition', beforeDuration: 380, afterDuration: 145, detail: 'Recognized "26-foot box truck" and "Dallas Hub" instantly' },
      { hopId: 'h5', layer: 'google', label: 'Gemini 1.5 Logic & TTFT', beforeDuration: 520, afterDuration: 240, detail: 'Checked Penske reservation API & computed rate diff' },
      { hopId: 'h6', layer: 'google', label: 'Journey TTS First Chunk', beforeDuration: 240, afterDuration: 95, detail: '"Certainly! I have extended your 26-foot truck..."' },
      { hopId: 'h7', layer: 'cisco', label: 'Telephony Playback Return', beforeDuration: 200, afterDuration: 45, detail: 'Immediate caller voice playback over PSTN trunk' },
    ]
  },
  {
    id: 'roadside-dispatch',
    title: 'Emergency Roadside Tire Service',
    caller: 'Long-haul Driver (I-80 Mile 142, OH)',
    utterance: '"Willow, I got a flat steer tire on a Freightliner Cascadia on I-80 eastbound near mile marker 142."',
    expectedAction: 'Extract highway location, vehicle VIN/Model, dispatch nearest 24/7 service vendor, and send GPS link via SMS.',
    totalBeforeMs: 2100,
    totalAfterMs: 590,
    hops: [
      { hopId: 'h1', layer: 'willow', label: 'Audio Capture & VAD', beforeDuration: 140, afterDuration: 28, detail: 'Filtered out 75dB diesel engine cab noise' },
      { hopId: 'h2', layer: 'cisco', label: 'Cisco CVP RTP Stream', beforeDuration: 190, afterDuration: 38, detail: 'High-priority voice channel flag' },
      { hopId: 'h3', layer: 'network', label: 'GCP Dedicated Interconnect', beforeDuration: 220, afterDuration: 30, detail: 'Under 30ms cross-country transit' },
      { hopId: 'h4', layer: 'google', label: 'Chirp STT Recognition', beforeDuration: 410, afterDuration: 138, detail: 'Exact recognition of "Freightliner Cascadia" and "mile marker 142"' },
      { hopId: 'h5', layer: 'google', label: 'Gemini 1.5 Emergency Route', beforeDuration: 640, afterDuration: 225, detail: 'Automated GPS vendor lookup & geofence match' },
      { hopId: 'h6', layer: 'google', label: 'Journey TTS First Chunk', beforeDuration: 260, afterDuration: 88, detail: '"Emergency dispatch is notified. Help is on the way to mile 142..."' },
      { hopId: 'h7', layer: 'cisco', label: 'Telephony Playback Return', beforeDuration: 240, afterDuration: 43, detail: 'Instant driver response' },
    ]
  }
];
