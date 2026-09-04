import React from 'react';
import { ArrowRight, Layers } from 'lucide-react';

interface RecommendationRow {
  id: string;
  option: string;
  category: string;
  technicalAction: string;
  tradeOffsAndImpact: string;
}

const RECOMMENDATIONS_DATA: RecommendationRow[] = [
  {
    id: 'speech-model',
    option: 'Speech Model Change',
    category: 'TTS Engine',
    technicalAction: 'Transition from heavier voice models (e.g., Chirp 3) to streamlined, lower-latency legacy speech models.',
    tradeOffsAndImpact: 'Significantly improves TTS processing time; voice fidelity will be lower.',
  },
  {
    id: 'pre-recorded-greetings',
    option: 'Pre-Recorded Greetings (Fallback)',
    category: 'Audio Caching',
    technicalAction: 'Play generalized welcome greeting from recording (same voice) - See webhook logic below.',
    tradeOffsAndImpact: 'Eliminates TTS synthesis latency entirely for opening prompts. Limits ability to dynamically personalize the initial sentence without webhooks.',
  },
  {
    id: 'webhook-tuning',
    option: 'Webhook Configuration Tuning',
    category: 'Backend API',
    technicalAction: 'Optimize webhook payloads, cache parameters if possible prior to load time, and enforce aggressive timeout/retry settings and fallback welcome.',
    tradeOffsAndImpact: 'Reduces execution delays on welcome intents; requires application logic review on custom webhook endpoints.',
  },
  {
    id: 'regional-deployment',
    option: 'Regional Deployment Alignment',
    category: 'Network Routing',
    technicalAction: 'Align the geographic location of the AWS integration connector and Dialogflow project endpoints (e.g., matching US-East or US-West regions).',
    tradeOffsAndImpact: 'Minimizes cross-country network hop traversal delays between AWS and Google Cloud infrastructure.',
  },
  {
    id: 'webhook-logging',
    option: 'Implement Webhook Logging & Monitoring to identify any latent dependencies',
    category: 'Observability',
    technicalAction: 'Penske should implement logging and alerting on any backend dependencies that Willow relies on to generate a response.',
    tradeOffsAndImpact: 'Will enhance reporting and visibility.',
  },
  {
    id: 'automate-qa',
    option: 'Automate QA analysis for calls to identify any of these issues (silence, drops, etc)',
    category: 'Quality Assurance',
    technicalAction: 'Can leverage Conversational Insights, or Gemini + BigQuery.',
    tradeOffsAndImpact: 'Provide additional insights into Agent performance and customer experiences.',
  },
];

export const RecommendationsSection: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
      {/* 1. SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono font-medium text-slate-700">
          <Layers className="w-3.5 h-3.5 text-blue-600" />
          <span>SECTION 03 · TECHNICAL RECOMMENDATIONS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
          Actionable Technical Recommendations
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed font-sans max-w-2xl mx-auto">
          To optimize latency and improve conversation responsiveness for Penske, the teams recommend evaluating the following configuration adjustments and trade-offs:
        </p>
      </div>

      {/* 2. RECOMMENDATIONS TABLE (1:1 with Customer Document) */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-mono font-semibold uppercase text-slate-600 tracking-wider">
                <th className="py-3.5 px-4 sm:px-6 w-1/4">Recommendation Option</th>
                <th className="py-3.5 px-4 sm:px-6 w-5/12">Technical Action</th>
                <th className="py-3.5 px-4 sm:px-6 w-1/3">Trade-Offs & Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 text-xs font-sans text-slate-800">
              {RECOMMENDATIONS_DATA.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* Option */}
                  <td className="py-4 px-4 sm:px-6 align-top font-medium">
                    <div className="space-y-1.5">
                      <span className="font-semibold text-slate-900 block">
                        {rec.option}
                      </span>
                      <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-semibold">
                        {rec.category}
                      </span>
                    </div>
                  </td>

                  {/* Technical Action */}
                  <td className="py-4 px-4 sm:px-6 align-top text-slate-700 leading-relaxed">
                    {rec.technicalAction}
                  </td>

                  {/* Trade-Offs & Impact */}
                  <td className="py-4 px-4 sm:px-6 align-top text-slate-600 leading-relaxed bg-slate-50/40">
                    <div className="flex items-start gap-2">
                      <ArrowRight className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
                      <span>{rec.tradeOffsAndImpact}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
