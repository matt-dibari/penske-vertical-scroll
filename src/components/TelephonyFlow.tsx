import React, { useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  Handle,
  Position,
  MarkerType,
  type Node,
  type Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {
  Phone,
  Server,
  Cpu,
  Cloud,
  Globe,
  Bot,
  Network,
  Radio,
  Layers,
} from 'lucide-react';

interface TelephonyNodeData {
  hop: string;
  title: string;
  subtitle: string;
  environment: string;
  envBadgeStyle: string;
  iconType: 'phone' | 'server' | 'cpu' | 'cloud' | 'globe' | 'bot' | 'network' | 'radio' | 'layers';
}

const ICONS = {
  phone: Phone,
  server: Server,
  cpu: Cpu,
  cloud: Cloud,
  globe: Globe,
  bot: Bot,
  network: Network,
  radio: Radio,
  layers: Layers,
};

const CustomTelephonyNode = ({ data }: { data: TelephonyNodeData }) => {
  const IconComponent = ICONS[data.iconType] || Server;

  return (
    <div className="w-[320px] sm:w-[360px] p-3.5 rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-xs shadow-md hover:shadow-lg transition-all text-left font-sans group">
      <Handle
        type="target"
        position={Position.Top}
        className="w-2.5 h-2.5 bg-[#049FD9] border-2 border-white !-top-1.5"
      />

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-center text-slate-700 shrink-0 group-hover:bg-sky-50 group-hover:text-[#049FD9] transition-colors shadow-2xs">
            <IconComponent className="w-4 h-4" />
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-400">
                {data.hop}
              </span>
              <h4 className="text-sm font-bold text-slate-900 leading-tight">
                {data.title}
              </h4>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              {data.subtitle}
            </p>
          </div>
        </div>

        <span
          className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border shrink-0 ${data.envBadgeStyle}`}
        >
          {data.environment}
        </span>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2.5 h-2.5 bg-[#049FD9] border-2 border-white !-bottom-1.5"
      />
    </div>
  );
};

export const TelephonyFlow: React.FC = () => {
  const nodeTypes = useMemo(() => ({ telephonyNode: CustomTelephonyNode }), []);

  const initialNodes: Node[] = [
    {
      id: '1',
      type: 'telephonyNode',
      position: { x: 0, y: 0 },
      data: {
        hop: '01',
        title: 'PSTN Inbound Carrier',
        subtitle: 'Customer caller ANI: 678-360-8793 (United BMW)',
        environment: 'Carrier Trunk',
        envBadgeStyle: 'bg-slate-100 text-slate-600 border-slate-200',
        iconType: 'phone',
      },
    },
    {
      id: '2',
      type: 'telephonyNode',
      position: { x: 0, y: 120 },
      data: {
        hop: '02',
        title: 'Data Center CUBE',
        subtitle: 'On-premise enterprise session border controller',
        environment: 'Penske On-Prem',
        envBadgeStyle: 'bg-slate-100 text-slate-600 border-slate-200',
        iconType: 'server',
      },
    },
    {
      id: '3',
      type: 'telephonyNode',
      position: { x: 0, y: 240 },
      data: {
        hop: '03',
        title: 'Cisco Call Manager (CUCM)',
        subtitle: 'Enterprise PBX routing & call policy engine',
        environment: 'Penske On-Prem',
        envBadgeStyle: 'bg-slate-100 text-slate-600 border-slate-200',
        iconType: 'cpu',
      },
    },
    {
      id: '4',
      type: 'telephonyNode',
      position: { x: 0, y: 360 },
      data: {
        hop: '04',
        title: 'Virtual CUBE (vCUBE)',
        subtitle: 'Virtualized SIP gateway bridge to Webex Cloud',
        environment: 'Penske On-Prem',
        envBadgeStyle: 'bg-slate-100 text-slate-600 border-slate-200',
        iconType: 'network',
      },
    },
    {
      id: '5',
      type: 'telephonyNode',
      position: { x: 0, y: 480 },
      data: {
        hop: '05',
        title: 'Webex Contact Center (WxCC)',
        subtitle: 'Cloud contact center orchestration platform',
        environment: 'Cisco Cloud',
        envBadgeStyle: 'bg-slate-100 text-slate-600 border-slate-200',
        iconType: 'cloud',
      },
    },
    {
      id: '6',
      type: 'telephonyNode',
      position: { x: 0, y: 600 },
      data: {
        hop: '06',
        title: 'CCAI Connector',
        subtitle: 'Cisco-deployed integration service in AWS',
        environment: 'Cisco AWS',
        envBadgeStyle: 'bg-slate-100 text-slate-600 border-slate-200',
        iconType: 'layers',
      },
    },
    {
      id: '7',
      type: 'telephonyNode',
      position: { x: 0, y: 720 },
      data: {
        hop: '07',
        title: 'Public Internet Transit',
        subtitle: 'Encrypted public WAN transport & gRPC egress',
        environment: 'Transit WAN',
        envBadgeStyle: 'bg-slate-100 text-slate-600 border-slate-200',
        iconType: 'globe',
      },
    },
    {
      id: '8',
      type: 'telephonyNode',
      position: { x: 0, y: 840 },
      data: {
        hop: '08',
        title: 'Google Front End (GFE)',
        subtitle: 'Global ingress reverse proxy & edge balancer',
        environment: 'Google Cloud',
        envBadgeStyle: 'bg-slate-100 text-slate-600 border-slate-200',
        iconType: 'radio',
      },
    },
    {
      id: '9',
      type: 'telephonyNode',
      position: { x: 0, y: 960 },
      data: {
        hop: '09',
        title: 'Google Dialogflow CX',
        subtitle: 'Willow Virtual Agent conversational engine',
        environment: 'Google Cloud',
        envBadgeStyle: 'bg-slate-100 text-slate-600 border-slate-200',
        iconType: 'bot',
      },
    },
  ];

  const initialEdges: Edge[] = [
    {
      id: 'e1-2',
      source: '1',
      target: '2',
      animated: true,
      style: { stroke: '#049FD9', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#049FD9' },
    },
    {
      id: 'e2-3',
      source: '2',
      target: '3',
      animated: true,
      style: { stroke: '#049FD9', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#049FD9' },
    },
    {
      id: 'e3-4',
      source: '3',
      target: '4',
      animated: true,
      style: { stroke: '#049FD9', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#049FD9' },
    },
    {
      id: 'e4-5',
      source: '4',
      target: '5',
      animated: true,
      style: { stroke: '#049FD9', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#049FD9' },
    },
    {
      id: 'e5-6',
      source: '5',
      target: '6',
      animated: true,
      style: { stroke: '#049FD9', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#049FD9' },
    },
    {
      id: 'e6-7',
      source: '6',
      target: '7',
      animated: true,
      style: { stroke: '#049FD9', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#049FD9' },
    },
    {
      id: 'e7-8',
      source: '7',
      target: '8',
      animated: true,
      style: { stroke: '#049FD9', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#049FD9' },
    },
    {
      id: 'e8-9',
      source: '8',
      target: '9',
      animated: true,
      style: { stroke: '#049FD9', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#049FD9' },
    },
  ];

  return (
    <div className="w-full h-[880px] rounded-2xl border border-slate-200 bg-slate-50/50 overflow-hidden relative shadow-2xs">
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.5}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#cbd5e1" gap={16} size={1} />
        <Controls
          showInteractive={false}
          className="!bg-white !border-slate-200 !shadow-sm !rounded-xl overflow-hidden"
        />
      </ReactFlow>
    </div>
  );
};
