import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronDown,
  FileText,
  ArrowDown,
  Copy,
  Check,
  Globe,
  Webhook,
  Sparkles,
  ArrowRight,
  Database,
  Bot
} from 'lucide-react';

interface SplunkLogEntry {
  id: string;
  displayTime: string;
  timeShort: string;
  highlightType?: 'info' | 'warning' | 'success';
  data: Record<string, unknown>;
}

const SPLUNK_LOGS: SplunkLogEntry[] = [
  {
    id: 'log-3-va-response',
    displayTime: '7/14/26 2:58:18.389 PM',
    timeShort: '2:58:18.389 PM',
    highlightType: 'success',
    data: {
      '@environment': 'dev',
      '@timestamp': '2026-07-14T14:58:18.38943128Z',
      '@version': 1,
      'conversation_id': 'd33ae48f-55b2-4962-a075-fc4de043d29f',
      'kubernetes': {
        'container_name': 'google-ccai-connector',
        'host': 'ip-10-200-36-207.ec2.internal',
        'pod_name': 'rtms-google-ccai-connector-f4b589576-4bmrs',
      },
      'level': 'INFO',
      'level_value': 20000,
      'logType': 'ladder',
      'logger_name': 'com.cisco.wcc.ccai.util.LadderLog$',
      'logtag': 'F',
      'message': 'Google->>Google-Connector: Received VA response',
      'org_id': 'aa4454b7-877c-4334-b224-0f97bfe438bc',
      'role': 'END_USER',
      'stream': 'stdout',
      'thread_name': 'grpc-default-executor-75049',
      'time': '2026-07-14T14:58:18.389568263Z',
    },
  },
  {
    id: 'log-2-non-streaming',
    displayTime: '7/14/26 2:58:08.134 PM',
    timeShort: '2:58:08.134 PM',
    highlightType: 'info',
    data: {
      '@environment': 'dev',
      '@timestamp': '2026-07-14T14:58:08.134039277Z',
      '@version': 1,
      'conversation_id': 'd33ae48f-55b2-4962-a075-fc4de043d29f',
      'kubernetes': {
        'container_name': 'google-ccai-connector',
        'host': 'ip-10-200-36-207.ec2.internal',
        'pod_name': 'rtms-google-ccai-connector-f4b589576-4bmrs',
      },
      'level': 'INFO',
      'level_value': 20000,
      'logType': 'ladder',
      'logger_name': 'com.cisco.wcc.ccai.util.LadderLog$',
      'logtag': 'F',
      'message': 'Google-Connector->>Google: Creating non streaming client',
      'org_id': 'aa4454b7-877c-4334-b224-0f97bfe438bc',
      'role': 'END_USER',
      'stream': 'stdout',
      'thread_name': 'grpc-default-executor-75049',
      'time': '2026-07-14T14:58:08.1341286Z',
    },
  },
  {
    id: 'log-1-welcome-event',
    displayTime: '7/14/26 2:58:08.134 PM',
    timeShort: '2:58:08.134 PM',
    highlightType: 'warning',
    data: {
      '@environment': 'dev',
      '@timestamp': '2026-07-14T14:58:08.134022676Z',
      '@version': 1,
      'conversation_id': 'd33ae48f-55b2-4962-a075-fc4de043d29f',
      'kubernetes': {
        'container_hash': '244386282524.dkr.ecr.us-west-2.amazonaws.com/ai/rtms-google-ccai-connector@sha256:9fe7ece9...',
        'container_image': '244386282524.dkr.ecr.us-west-2.amazonaws.com/ai/rtms-google-ccai-connector:44c3d00de1d1a386e53dddb34a66184366a1551d',
        'container_name': 'google-ccai-connector',
        'docker_id': '1199971b34ba10c0e36e21b25557fcc9bc54c988621e1f55ffacc5b147ad17e3',
        'host': 'ip-10-200-36-207.ec2.internal',
        'labels': {
          'app.kubernetes.io/name': 'rtms-google-ccai-connector',
          'appName': 'google-ccai-connector',
          'pod-template-hash': 'f4b589576',
        },
        'namespace_name': 'ai',
        'pod_id': '609b063d-795d-4ea0-a294-3ea38b21565f',
        'pod_ip': '10.200.41.114',
        'pod_name': 'rtms-google-ccai-connector-f4b589576-4bmrs',
      },
      'level': 'INFO',
      'level_value': 20000,
      'logger_name': 'com.cisco.wcc.ccai.google.GoogleAnalyzeImpl',
      'logtag': 'F',
      'message': 'Sending Event WELCOME',
      'org_id': 'aa4454b7-877c-4334-b224-0f97bfe438bc',
      'role': 'END_USER',
      'stream': 'stdout',
      'thread_name': 'grpc-default-executor-75049',
      'time': '2026-07-14T14:58:08.134124667Z',
      '_time': '2026-07-14T14:58:08.134+00:00',
      'index': 'prod-us1_rtms_k8s_logs',
      'splunk_server': 'idx-i-0bb0913fa4e3b0c29.cisco-wxcc-produs.splunkcloud.com',
    },
  },
];

export const NetworkSection: React.FC = () => {
  // Collapsed by default
  const [expandedLogs, setExpandedLogs] = useState<Record<string, boolean>>({});
  const [expandedK8s, setExpandedK8s] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleLog = (id: string) => {
    setExpandedLogs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleK8s = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedK8s((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAll = () => {
    const anyExpanded = Object.values(expandedLogs).some(Boolean);
    const newState = !anyExpanded;
    const update: Record<string, boolean> = {};
    SPLUNK_LOGS.forEach((l) => {
      update[l.id] = newState;
    });
    setExpandedLogs(update);
  };

  const copyJson = (data: unknown, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div id="layer-network" className="space-y-12 py-12 border-b border-slate-200/80 last:border-b-0 font-sans">
      {/* Top Header with Large Numeral */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <span className="inline-block px-2.5 py-0.5 rounded-full border border-slate-200 bg-white text-[10px] font-mono uppercase tracking-widest text-slate-600 font-semibold shadow-2xs">
              CROSS CLOUD INTEGRATIONS
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              Cross Cloud Integrations
            </h3>
          </div>
          <span className="text-6xl sm:text-7xl font-bold text-slate-200/80 select-none leading-none">
            03
          </span>
        </div>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
          This deployment of Cisco and Dialogflow is a common pattern but does not have SLAs around latency due to Cross Cloud integrations. It involves a variety of infrastructure, networking, backend services, and AI; all of which have the potential to introduce latency or performance issues on a small subset of interactions.
        </p>
      </div>

      {/* 1. Cloud to Cloud Connections (Latency across the internet + Cisco Splunk Logs) */}
      <div className="space-y-4 pt-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 text-sm font-bold text-slate-900">
            <div className="w-7 h-7 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 flex items-center justify-center">
              <Globe className="w-4 h-4" />
            </div>
            <span>Cloud to Cloud Connections</span>
          </div>
          <p className="text-xs text-slate-500 font-medium pl-9.5">
            Latency across the internet during cross-cloud handoffs between AWS and Google Cloud.
          </p>
        </div>

        {/* Cisco Splunk Logs Component */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <FileText className="w-4 h-4 text-[#049FD9]" />
              <span>Cisco Splunk Logs</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
                Splunk Cloud · Reverse Chronological
              </span>
              <button
                onClick={toggleAll}
                className="text-[11px] font-mono text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
              >
                {Object.values(expandedLogs).some(Boolean) ? 'Collapse All' : 'Expand All'}
              </button>
            </div>
          </div>

          {/* Splunk Log Container */}
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs divide-y divide-slate-150 font-mono text-xs">
            {/* Global Metadata Bar */}
            <div className="p-3 bg-slate-50/90 flex items-center justify-between text-[11px] text-slate-500 font-medium flex-wrap gap-2">
              <div className="flex items-center gap-4 flex-wrap">
                <div>
                  <span className="text-slate-400">host=</span>
                  <span className="text-slate-700 font-semibold">hec.prod-us1-pvt.cisco-wxcc-produs.splunkcloud.com</span>
                </div>
                <div className="hidden md:block">
                  <span className="text-slate-400">source=</span>
                  <span className="text-slate-700">http:prod-us1-hec-token</span>
                </div>
                <div className="hidden lg:block">
                  <span className="text-slate-400">sourcetype=</span>
                  <span className="text-slate-700">httpevent</span>
                </div>
              </div>
            </div>

            {/* Interactive Log Rows (Collapsed by default, with rich syntax and status highlight colors) */}
            {SPLUNK_LOGS.map((entry, index) => {
              const isExpanded = !!expandedLogs[entry.id];
              const isK8sExpanded = !!expandedK8s[entry.id];

              return (
                <React.Fragment key={entry.id}>
                  {/* Latency Gap Callout Banner */}
                  {index === 1 && (
                    <div className="py-2.5 px-4 bg-amber-50/80 border-y border-amber-200/80 flex items-center justify-between text-amber-900 text-xs font-sans font-medium">
                      <div className="flex items-center gap-2">
                        <ArrowDown className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>
                          Logs show a delay in receiving the VA response
                        </span>
                      </div>
                      <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-950 font-bold shrink-0">
                        Δ 10.255s Delay
                      </span>
                    </div>
                  )}

                  <div className="p-4 hover:bg-slate-50/40 transition-colors space-y-2">
                    {/* Top Line Summary */}
                    <div
                      onClick={() => toggleLog(entry.id)}
                      className="flex items-start justify-between gap-3 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-2.5">
                        <button className="text-slate-400 hover:text-slate-700 transition-colors">
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-slate-600" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          )}
                        </button>
                        <span className="font-bold text-slate-900 text-xs">
                          {entry.displayTime}
                        </span>
                        <span className="text-[11px] text-slate-400 font-normal">
                          {isExpanded ? '[-]' : '[+]'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => copyJson(entry.data, entry.id, e)}
                          className="text-[10px] text-slate-400 hover:text-slate-700 flex items-center gap-1 font-sans px-2 py-0.5 rounded border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
                          title="Copy JSON"
                        >
                          {copiedId === entry.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-600">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-slate-400" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Expanded JSON Field Tree */}
                    {isExpanded ? (
                      <div className="pl-6 space-y-1 text-[11px] leading-relaxed">
                        <div>
                          <span className="text-rose-600">@environment:</span>{' '}
                          <span className="text-blue-600">dev</span>
                        </div>
                        <div>
                          <span className="text-rose-600">@timestamp:</span>{' '}
                          <span className="text-slate-700">
                            {String(entry.data['@timestamp'])}
                          </span>
                        </div>
                        <div>
                          <span className="text-rose-600">@version:</span>{' '}
                          <span className="text-purple-600">1</span>
                        </div>
                        <div>
                          <span className="text-rose-600">conversation_id:</span>{' '}
                          <span className="text-blue-600">
                            {String(entry.data['conversation_id'])}
                          </span>
                        </div>

                        {/* Kubernetes Nested Tree */}
                        {entry.data['kubernetes'] ? (
                          <div className="space-y-0.5">
                            <div
                              onClick={(e) => toggleK8s(entry.id, e)}
                              className="cursor-pointer text-slate-700 hover:text-slate-900 select-none inline-flex items-center gap-1"
                            >
                              <span className="text-rose-600">kubernetes:</span>{' '}
                              <span className="text-slate-400 text-[10px]">
                                {isK8sExpanded ? '[-]' : '[+]'}
                              </span>
                            </div>

                            {isK8sExpanded && (
                              <div className="pl-4 space-y-0.5 border-l border-slate-200 my-1 text-[10px] text-slate-600">
                                {Object.entries(entry.data['kubernetes'] as Record<string, unknown>).map(
                                  ([kKey, kVal]) => (
                                    <div key={kKey} className="truncate">
                                      <span className="text-slate-500">{kKey}:</span>{' '}
                                      <span className="text-slate-800">
                                        {typeof kVal === 'object' ? JSON.stringify(kVal) : String(kVal)}
                                      </span>
                                    </div>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        ) : null}

                        <div>
                          <span className="text-rose-600">level:</span>{' '}
                          <span className="text-slate-700">INFO</span>
                        </div>
                        <div>
                          <span className="text-rose-600">level_value:</span>{' '}
                          <span className="text-purple-600">20000</span>
                        </div>
                        <div>
                          <span className="text-rose-600">logger_name:</span>{' '}
                          <span className="text-slate-700">
                            {String(entry.data['logger_name'])}
                          </span>
                        </div>
                        <div>
                          <span className="text-rose-600 font-bold">message:</span>{' '}
                          <span
                            className={`font-semibold ${
                              entry.highlightType === 'success'
                                ? 'text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded'
                                : entry.highlightType === 'warning'
                                ? 'text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded'
                                : 'text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded'
                            }`}
                          >
                            {String(entry.data['message'])}
                          </span>
                        </div>
                        <div>
                          <span className="text-rose-600">org_id:</span>{' '}
                          <span className="text-slate-700">
                            {String(entry.data['org_id'])}
                          </span>
                        </div>
                        <div>
                          <span className="text-rose-600">role:</span>{' '}
                          <span className="text-blue-600">END_USER</span>
                        </div>
                        <div>
                          <span className="text-rose-600">stream:</span>{' '}
                          <span className="text-blue-600">stdout</span>
                        </div>
                        <div>
                          <span className="text-rose-600">thread_name:</span>{' '}
                          <span className="text-slate-700">
                            {String(entry.data['thread_name'])}
                          </span>
                        </div>
                        <div>
                          <span className="text-rose-600">time:</span>{' '}
                          <span className="text-slate-700">{String(entry.data['time'])}</span>
                        </div>
                      </div>
                    ) : (
                      /* Collapsed Single-Line Preview with highlight colors */
                      <div className="pl-6 text-[11px] text-slate-500 truncate">
                        <span
                          className={`font-semibold mr-2 ${
                            entry.highlightType === 'success'
                              ? 'text-emerald-700'
                              : entry.highlightType === 'warning'
                              ? 'text-amber-700'
                              : 'text-blue-700'
                          }`}
                        >
                          {String(entry.data['message'])}
                        </span>
                        <span className="text-slate-400">
                          logger={String(entry.data['logger_name'])} · thread={String(entry.data['thread_name'])}
                        </span>
                      </div>
                    )}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Webhooks (Backend dependencies) - Visual Request/Response Placeholder */}
      <div className="space-y-4 pt-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 text-sm font-bold text-slate-900">
            <div className="w-7 h-7 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 flex items-center justify-center">
              <Webhook className="w-4 h-4" />
            </div>
            <span>Webhooks (Backend Dependencies)</span>
          </div>
          <p className="text-xs text-slate-500 font-medium pl-9.5">
            Delays in backend services responding to Dialogflow CX parameters during the initial turn.
          </p>
        </div>

        {/* Visual Parameter Exchange Diagram (Clean Black/White/Grey + Blue Pills) */}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            {/* Step 1: Inbound Call Event */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Step 01</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200/80 font-mono text-[10px] font-bold">
                  Inbound Event
                </span>
              </div>
              <h5 className="font-bold text-slate-900 text-xs">Dialogflow CX Turn Start</h5>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-150 font-mono text-[11px] text-slate-700 space-y-1">
                <div><span className="text-slate-400">caller_ani:</span> "678-360-8793"</div>
                <div><span className="text-slate-400">event:</span> "WELCOME"</div>
              </div>
            </div>

            {/* Step 2: Webhook Query */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Step 02</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200/80 font-mono text-[10px] font-bold">
                  Backend Query
                </span>
              </div>
              <h5 className="font-bold text-slate-900 text-xs">Dealership Parameter Request</h5>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-150 font-mono text-[11px] text-slate-700 space-y-1">
                <div className="text-slate-900 font-semibold">GET /api/v1/dealerships</div>
                <div className="text-[10px] text-slate-500">Resolving store identity for caller ANI...</div>
              </div>
            </div>

            {/* Step 3: Greeting Generation */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Step 03</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200/80 font-mono text-[10px] font-bold">
                  Payload Return
                </span>
              </div>
              <h5 className="font-bold text-slate-900 text-xs">Welcome Greeting Assembled</h5>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-150 font-mono text-[11px] text-slate-700 space-y-1">
                <div><span className="text-slate-400">dealership:</span> "United BMW"</div>
                <div><span className="text-slate-400">greeting:</span> "Thank you for calling..."</div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-150 text-slate-500 text-xs flex items-center gap-2">
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>
              If the webhook lookup encounters transit delay or slow backend response, Dialogflow CX holds the initial turn before synthesizing audio.
            </span>
          </div>
        </div>
      </div>

      {/* 3. Conversational AI Services (Including TTS with advanced voices) - Placeholder */}
      <div className="space-y-4 pt-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 text-sm font-bold text-slate-900">
            <div className="w-7 h-7 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <span>Conversational AI Services (Including TTS with Advanced Voices)</span>
          </div>
          <p className="text-xs text-slate-500 font-medium pl-9.5">
            Voice generation, speculative token streaming, and advanced neural text-to-speech synthesis.
          </p>
        </div>

        {/* AI Synthesis Pipeline Placeholder (Clean Black/White/Grey + Blue Accent) */}
        <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-900 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-slate-700" />
              <span>Voice Generation & Synthesis Architecture</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 font-normal">
              Neural Audio Generation Pipeline
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Input</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-mono text-[9px] font-bold">
                  SSML Text
                </span>
              </div>
              <h5 className="font-bold text-slate-900 text-xs">Text & SSML Generation</h5>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Dialogflow CX generates welcome greeting text following webhook completion.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Processing</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200/80 font-mono text-[9px] font-bold">
                  Neural Model
                </span>
              </div>
              <h5 className="font-bold text-slate-900 text-xs">Neural TTS Synthesis</h5>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Advanced voice model synthesizes natural audio waveform frames from text tokens.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Output</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-mono text-[9px] font-bold">
                  RTP Stream
                </span>
              </div>
              <h5 className="font-bold text-slate-900 text-xs">RTP Audio Streaming</h5>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Generated voice packets are streamed back across the network to Cisco CCAI connector.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
