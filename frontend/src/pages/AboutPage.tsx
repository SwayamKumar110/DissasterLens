import React from 'react';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Target, 
  Compass, 
  Satellite, 
  CloudRain, 
  Radio, 
  MapPin, 
  Activity, 
  Globe2
} from 'lucide-react';
import { DisclaimerBanner } from '../components/DisclaimerBanner';

export const AboutPage: React.FC = () => {
  const researchDomains = [
    { title: 'Multimodal Foundation Architecture', desc: 'Dual-branch network topology with joint cross-attention feature fusion.' },
    { title: 'Deep Visual Representation', desc: 'Layer-4 bottleneck residual convolutions extracting 2048-dim spatial descriptors.' },
    { title: 'Contextual NLP & Semantic Modeling', desc: 'BERT-base transformer layers generating 768-dim situational embeddings.' },
    { title: 'Lightweight Multi-Task Inference', desc: 'Parameter-efficient classification head optimized for 0.22ms low-latency triage.' },
    { title: 'Explainable AI Frameworks', desc: 'SHAP game-theoretic token attribution and Grad-CAM spatial activation mapping.' },
    { title: 'Empirical Benchmarking & Validation', desc: 'Rigorous comparative evaluation against unimodal baselines and disaster datasets.' },
  ];

  const futureScopeItems = [
    {
      title: 'Satellite Imagery Integration',
      desc: 'Multispectral and SAR satellite feeds for broad cloud-penetrating disaster mapping.',
      icon: <Satellite className="w-4 h-4 text-[#2563A6]" />
    },
    {
      title: 'Meteorological Data Integration',
      desc: 'Numerical weather prediction forecasts, atmospheric pressure indices, and radar telemetry.',
      icon: <CloudRain className="w-4 h-4 text-[#3B82A0]" />
    },
    {
      title: 'Sensor-Based Information',
      desc: 'Ground seismographs, IoT river stage gauges, acoustic sensors, and air quality telemetry.',
      icon: <Radio className="w-4 h-4 text-[#2563A6]" />
    },
    {
      title: 'Geospatial Information (GIS)',
      desc: 'Vector road network topology, population density layers, and floodway hazard maps.',
      icon: <MapPin className="w-4 h-4 text-[#23856D]" />
    },
    {
      title: 'Real-Time Disaster Monitoring',
      desc: 'Low-latency streaming ingestion of emergency dispatches with autonomous alerting.',
      icon: <Activity className="w-4 h-4 text-[#D65B5B]" />
    },
    {
      title: 'Cross-Region Disaster Validation',
      desc: 'Zero-shot and few-shot cross-continent generalisation testing across diverse urban and rural topologies.',
      icon: <Globe2 className="w-4 h-4 text-[#D99A35]" />
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <DisclaimerBanner 
        text="Academic Research Capstone — Computer Science & Engineering Research." 
      />

      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-xl bg-[#FFFFFF] border border-[#E7EAF0] card-shadow">
        <div className="flex items-center gap-2 text-[#2563A6] text-[12.5px] font-medium mb-2">
          <GraduationCap className="w-4 h-4" />
          <span>Academic Research Capstone • Computer Science and Engineering</span>
        </div>

        <h1 className="text-[24px] sm:text-[30px] font-semibold text-[#202B38] tracking-tight leading-tight mb-2">
          Explainable Foundation Model for Multimodal Disaster Prediction
        </h1>

        <p className="text-[14px] text-[#4B5565] max-w-3xl leading-relaxed font-normal">
          An academic research project establishing a unified multimodal architecture that fuses deep visual feature extraction (ResNet-50) with contextual transformer embeddings (BERT) to deliver explainable, high-throughput situational disaster assessment.
        </p>
      </div>

      {/* RESEARCH DOMAINS & ARCHITECTURE FOCUS */}
      <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E7EAF0] card-shadow">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E7EAF0]">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#2563A6]" />
            <h3 className="text-[15px] font-semibold text-[#202B38]">Research Scope & Technical Focus</h3>
          </div>
          <span className="text-[12px] text-[#697586]">Computer Science & Engineering</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {researchDomains.map((domain, index) => (
            <div
              key={index}
              className="p-3.5 rounded-lg bg-[#F7F8FA] border border-[#E7EAF0] flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-medium text-[#2563A6] block mb-1">Pillar {index + 1}</span>
                <h4 className="text-[13.5px] font-semibold text-[#202B38] mb-1">{domain.title}</h4>
                <p className="text-[12px] text-[#697586] leading-normal">{domain.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ABSTRACT & MOTIVATION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Project Abstract */}
        <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E7EAF0] card-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <BookOpen className="w-4 h-4 text-[#2563A6]" />
              <h3 className="text-[15px] font-semibold text-[#202B38]">Project Abstract</h3>
            </div>
            <p className="text-[13px] text-[#4B5565] leading-relaxed mb-3">
              Rapid disaster triage necessitates immediate, reliable situational awareness. Unimodal architectures that evaluate either solely photographs or solely textual messages suffer from distinct failure modes: imagery cannot easily convey temporal nuance or medical supply requisitions, while textual reports frequently lack verifiable physical ground truth.
            </p>
            <p className="text-[13px] text-[#4B5565] leading-relaxed">
              This research proposes an explainable foundation model for multimodal disaster prediction. By modifying a ResNet-50 visual backbone and coupling it with BERT-base uncased embeddings through a gated cross-attention linear projection layer, the architecture models cross-modal interactions simultaneously across five primary tasks: Time Period, Urgency, Relevance, Damage, and Relief.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#E7EAF0] text-[11.5px] text-[#2563A6] font-medium">
            Research Theme: Multimodal AI & Emergency Response
          </div>
        </div>

        {/* Motivation & Objectives */}
        <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E7EAF0] card-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <Target className="w-4 h-4 text-[#23856D]" />
              <h3 className="text-[15px] font-semibold text-[#202B38]">Research Motivation & Objectives</h3>
            </div>
            
            <div className="space-y-2.5 text-[13px]">
              <div className="p-3 rounded-lg bg-[#F7F8FA] border border-[#E7EAF0]">
                <span className="font-semibold text-[#202B38] block mb-0.5">Core Motivation:</span>
                <p className="text-[#4B5565] leading-relaxed">
                  First responders require rapid, verified intelligence during emergency events. Combining multimodal inputs significantly improves contextual understanding over isolated single modalities.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#F7F8FA] border border-[#E7EAF0]">
                <span className="font-semibold text-[#202B38] block mb-0.5">Key Objectives:</span>
                <ul className="space-y-1 text-[#4B5565] list-disc list-inside">
                  <li>Construct parameter-efficient multimodal fusion (1.51M parameters).</li>
                  <li>Achieve ultra-low inference latency (0.22ms) for real-time edge triage.</li>
                  <li>Integrate transparent SHAP and LIME interpretability into emergency workflows.</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#E7EAF0] text-[11.5px] text-[#697586]">
            Validated across multiple hazard modalities
          </div>
        </div>

      </div>

      {/* FUTURE SCOPE */}
      <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E7EAF0] card-shadow">
        <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-[#E7EAF0]">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#2563A6]" />
            <h3 className="text-[15px] font-semibold text-[#202B38]">Future Scope & Extensions</h3>
          </div>
          <span className="text-[12px] text-[#697586]">Planned Research Roadmap</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {futureScopeItems.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-lg bg-[#F7F8FA] border border-[#E7EAF0] flex flex-col justify-between"
            >
              <div>
                <div className="w-7 h-7 rounded-md bg-[#FFFFFF] border border-[#E7EAF0] flex items-center justify-center mb-2">
                  {item.icon}
                </div>
                <h4 className="text-[13px] font-semibold text-[#202B38] mb-0.5">{item.title}</h4>
                <p className="text-[12px] text-[#697586] leading-normal">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
