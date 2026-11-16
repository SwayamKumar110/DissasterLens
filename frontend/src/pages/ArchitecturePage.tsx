import React, { useState } from 'react';
import { 
  Layers, 
  Image as ImageIcon, 
  FileText, 
  Cpu, 
  Eye, 
  CheckCircle2
} from 'lucide-react';
import { DisclaimerBanner } from '../components/DisclaimerBanner';

export const ArchitecturePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'comparison'>('architecture');

  const architectureLayers = [
    {
      step: '1. Input Layer',
      name: 'Bimodal Disaster Data Ingestion',
      icon: <Layers className="w-4 h-4 text-[#2563A6]" />,
      tag: 'Raw Inputs',
      items: [
        { label: 'Disaster Image', desc: 'RGB photographs (aerial UAV, satellite, ground photos) standardized to 224×224 px.' },
        { label: 'Associated Textual Report', desc: 'Raw situation reports, emergency calls, social media alerts, or field SITREPs.' },
      ]
    },
    {
      step: '2. Visual Processing Branch',
      name: 'ResNet-50 Spatial Encoder',
      icon: <ImageIcon className="w-4 h-4 text-[#2563A6]" />,
      tag: 'Visual Backbone',
      items: [
        { label: 'Modified ResNet-50', desc: '50-layer deep residual network with bottleneck residual building blocks.' },
        { label: 'Visual Feature Extraction', desc: 'Global Average Pooling over Layer-4 feature maps generates dense 2048-dim representation (v_img).' },
      ]
    },
    {
      step: '3. Text Processing Branch',
      name: 'BERT-base Contextual Transformer',
      icon: <FileText className="w-4 h-4 text-[#3B82A0]" />,
      tag: 'Text Backbone',
      items: [
        { label: 'BERT-base-uncased', desc: '12 transformer encoder blocks, 12 attention heads, pretrained on BookCorpus & Wikipedia.' },
        { label: 'Contextual Textual Embeddings', desc: 'Special classification [CLS] token pooled to produce a rich 768-dim semantic vector (v_txt).' },
      ]
    },
    {
      step: '4. Fusion Layer',
      name: 'Multimodal Feature Fusion',
      icon: <Cpu className="w-4 h-4 text-[#23856D]" />,
      tag: 'Core Innovation',
      items: [
        { label: 'Cross-Attention Projection', desc: 'Joint cross-attention mechanism combining visual (2048-d) and textual (768-d) modalities.' },
        { label: 'Dimensionality Reduction', desc: 'Gated linear mapping with LayerNorm and Dropout (p=0.3) yielding compact 512-dim joint latent space.' },
      ]
    },
    {
      step: '5. Output Layer',
      name: 'Lightweight MLP Classification Head',
      icon: <Cpu className="w-4 h-4 text-[#D99A35]" />,
      tag: '1.51M Params',
      items: [
        { label: 'Linear Classification Head', desc: 'Projection heads mapping the 512-dim joint vector into task-specific logit spaces with Softmax.' },
        { label: 'Inference Efficiency', desc: 'Rapid 0.22ms latency and 35,797 samples/sec throughput reported in paper benchmarks.' },
      ]
    },
    {
      step: '6. Explainability Layer',
      name: 'Post-Hoc Interpretability Engine',
      icon: <Eye className="w-4 h-4 text-[#697586]" />,
      tag: 'XAI Framework',
      items: [
        { label: 'SHAP (Shapley Additive exPlanations)', desc: 'Game-theoretic feature attributions quantifying marginal contribution of individual terms.' },
        { label: 'LIME (Local Interpretable Model-agnostic Explanations)', desc: 'Local perturbations identifying salient visual patches and textual urgency drivers.' },
      ]
    },
    {
      step: '7. Final Outputs',
      name: 'Five Classification Tasks',
      icon: <CheckCircle2 className="w-4 h-4 text-[#2563A6]" />,
      tag: 'Operational Decision Feed',
      items: [
        { label: '1. Time Period', desc: 'Current vs Past vs Future incident classification.' },
        { label: '2. Urgency', desc: 'High vs Medium vs Low response urgency.' },
        { label: '3. Relevance', desc: 'Relevant vs Not Relevant disaster filtering.' },
        { label: '4. Damage', desc: 'Severe vs Mild vs Little/No Damage assessment.' },
        { label: '5. Relief', desc: 'Required vs Not Required humanitarian aid determination.' },
      ]
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-[26px] sm:text-[28px] font-semibold text-[#202B38] tracking-tight leading-tight">
            Proposed Multimodal Foundation Model
          </h1>
          <p className="text-[14px] text-[#697586] mt-1 font-normal leading-normal">
            Dual-branch architecture combining ResNet-50 visual features with BERT contextual embeddings.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex p-1 rounded-lg bg-[#FFFFFF] border border-[#E7EAF0] card-shadow text-[13px] font-medium self-start sm:self-center">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              activeTab === 'architecture' ? 'bg-[#F0F4F8] text-[#2563A6]' : 'text-[#697586] hover:text-[#202B38]'
            }`}
          >
            Model Architecture
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              activeTab === 'comparison' ? 'bg-[#F0F4F8] text-[#2563A6]' : 'text-[#697586] hover:text-[#202B38]'
            }`}
          >
            Why Multimodal?
          </button>
        </div>
      </div>

      <DisclaimerBanner text="Academic Research Architecture — Conceptual model design and pipeline reproduced from the research paper." />

      {/* TAB 1: ARCHITECTURE BREAKDOWN */}
      {activeTab === 'architecture' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {architectureLayers.map((layer, index) => (
            <div
              key={index}
              className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E7EAF0] card-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11.5px] font-medium text-[#697586]">
                    {layer.step}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-[#F7F8FA] text-[#697586] border border-[#E7EAF0]">
                    {layer.tag}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-md bg-[#F0F4F8] flex items-center justify-center shrink-0">
                    {layer.icon}
                  </div>
                  <h3 className="text-[14px] font-semibold text-[#202B38] tracking-tight">{layer.name}</h3>
                </div>

                <div className="space-y-2">
                  {layer.items.map((item, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-[#F7F8FA] border border-[#E7EAF0] text-[12.5px]">
                      <span className="font-semibold text-[#202B38] block mb-0.5">{item.label}</span>
                      <p className="text-[#697586] leading-normal">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: WHY MULTIMODAL LEARNING? */}
      {activeTab === 'comparison' && (
        <div className="p-6 rounded-xl bg-[#FFFFFF] border border-[#E7EAF0] card-shadow space-y-6">
          <div>
            <h2 className="text-[18px] font-semibold text-[#202B38] tracking-tight mb-1">
              Why Multimodal Learning?
            </h2>
            <p className="text-[13.5px] text-[#697586] max-w-3xl leading-relaxed">
              In disaster scenarios, evaluating only one modality leads to operational blind spots. Visual imagery captures physical damage but lacks situational context. Text captures urgency and aid needs but cannot verify structural integrity. Multimodal learning brings both together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* IMAGE ONLY CARD */}
            <div className="p-5 rounded-xl bg-[#F7F8FA] border border-[#E7EAF0] flex flex-col justify-between">
              <div>
                <span className="text-[11.5px] font-medium text-[#697586] block mb-1">Unimodal System A</span>
                <div className="flex items-center gap-2 mb-2">
                  <ImageIcon className="w-4 h-4 text-[#2563A6]" />
                  <h3 className="text-[15px] font-semibold text-[#202B38]">IMAGE ONLY</h3>
                </div>
                <p className="text-[13px] text-[#4B5565] font-medium mb-3">
                  Understands visual damage but may miss context.
                </p>
                
                <div className="space-y-2 text-[12px]">
                  <div className="p-2.5 rounded bg-[#FFFFFF] border border-[#E7EAF0]">
                    <span className="text-[#23856D] font-semibold block mb-0.5">Strength:</span>
                    <p className="text-[#697586]">Identifies rubble piles, submerged house roofs, and road washouts accurately.</p>
                  </div>
                  <div className="p-2.5 rounded bg-[#FFFFFF] border border-[#E7EAF0]">
                    <span className="text-[#D65B5B] font-semibold block mb-0.5">Limitation:</span>
                    <p className="text-[#697586]">Cannot determine if the event is active or past, nor identify whether people inside need medicine or food.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* TEXT ONLY CARD */}
            <div className="p-5 rounded-xl bg-[#F7F8FA] border border-[#E7EAF0] flex flex-col justify-between">
              <div>
                <span className="text-[11.5px] font-medium text-[#697586] block mb-1">Unimodal System B</span>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-[#3B82A0]" />
                  <h3 className="text-[15px] font-semibold text-[#202B38]">TEXT ONLY</h3>
                </div>
                <p className="text-[13px] text-[#4B5565] font-medium mb-3">
                  Understands contextual information but cannot directly inspect physical damage.
                </p>
                
                <div className="space-y-2 text-[12px]">
                  <div className="p-2.5 rounded bg-[#FFFFFF] border border-[#E7EAF0]">
                    <span className="text-[#23856D] font-semibold block mb-0.5">Strength:</span>
                    <p className="text-[#697586]">Extracts urgent calls for help, medical requests, and temporal descriptions.</p>
                  </div>
                  <div className="p-2.5 rounded bg-[#FFFFFF] border border-[#E7EAF0]">
                    <span className="text-[#D65B5B] font-semibold block mb-0.5">Limitation:</span>
                    <p className="text-[#697586]">Vulnerable to rumor or exaggeration, with no way to verify actual physical damage on the ground.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* MULTIMODAL CARD */}
            <div className="p-5 rounded-xl bg-[#F0F8F5] border border-[#D4EFE6] flex flex-col justify-between">
              <div>
                <span className="text-[11.5px] font-semibold text-[#23856D] block mb-1">Proposed Architecture</span>
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="w-4 h-4 text-[#23856D]" />
                  <h3 className="text-[15px] font-semibold text-[#202B38]">MULTIMODAL FUSION</h3>
                </div>
                <p className="text-[13px] text-[#1E705C] font-medium mb-3">
                  Combines visual evidence and textual context.
                </p>
                
                <div className="space-y-2 text-[12px]">
                  <div className="p-2.5 rounded bg-[#FFFFFF] border border-[#D4EFE6]">
                    <span className="text-[#23856D] font-semibold block mb-0.5">Joint Understanding:</span>
                    <p className="text-[#4B5565]">Verifies reported distress against visual evidence, improving damage and relief accuracy significantly.</p>
                  </div>
                  <div className="p-2.5 rounded bg-[#FFFFFF] border border-[#D4EFE6]">
                    <span className="text-[#2563A6] font-semibold block mb-0.5">Operational Benefit:</span>
                    <p className="text-[#4B5565]">Allows emergency coordinators to prioritize rescue teams based on verified severity and verified need.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
