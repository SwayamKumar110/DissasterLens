import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  FileText, 
  Cpu, 
  Binary, 
  Layers, 
  ArrowDown, 
  CheckCircle2, 
  Info,
  X
} from 'lucide-react';

interface ComponentDetail {
  title: string;
  subtitle: string;
  modality: 'visual' | 'textual' | 'fusion' | 'output';
  dimension?: string;
  description: string;
  specs: string[];
}

export const MultimodalPipeline: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<ComponentDetail | null>(null);

  const nodeDetails: Record<string, ComponentDetail> = {
    'image-input': {
      title: 'Disaster Image Input',
      subtitle: 'Visual evidence from scene',
      modality: 'visual',
      specs: ['Formats: JPG, JPEG, PNG', 'Variable resolution (standardized)', 'RGB 3-channel input'],
      description: 'Accepts ground-level disaster photographs, aerial surveillance, or community-submitted scene documentation representing the immediate disaster environment.'
    },
    'image-preproc': {
      title: 'Image Preprocessing',
      subtitle: 'Spatial normalization',
      modality: 'visual',
      dimension: '3 × 224 × 224',
      specs: ['Bilinear resizing to 224×224', 'ImageNet mean & std normalization', 'Center crop and aspect preservation'],
      description: 'Transforms arbitrary-sized images into normalized PyTorch tensors aligned with standard convolutional backbone receptive fields.'
    },
    'resnet': {
      title: 'ResNet-50 Visual Encoder',
      subtitle: 'Deep residual feature extraction',
      modality: 'visual',
      dimension: '2048 Feature Maps',
      specs: ['50 deep convolutional layers', 'Bottleneck residual blocks', 'Layer-4 Global Average Pooling (GAP)', 'Pretrained on ImageNet-1K'],
      description: 'Extracts hierarchical visual representations, capturing structural textures, debris boundaries, floodwater surfaces, and physical ruin.'
    },
    'visual-vector': {
      title: 'Visual Feature Vector (v_img)',
      subtitle: 'Dense spatial embedding',
      modality: 'visual',
      dimension: '2048 dimensions',
      specs: ['Dense numerical vector', 'Compact representation of physical damage', 'L2-normalized prior to fusion'],
      description: 'Encapsulates high-level visual semantic cues of structural collapse, water presence, or natural environment.'
    },
    'text-input': {
      title: 'Textual SITREP Input',
      subtitle: 'Situation report & context',
      modality: 'textual',
      specs: ['Emergency distress calls', 'Social media SITREPs', 'News wires & citizen updates'],
      description: 'Provides crucial narrative context that visual pixels cannot communicate, such as temporal timeline (past vs present) and rescue/food requirements.'
    },
    'text-preproc': {
      title: 'WordPiece Tokenization',
      subtitle: 'Subword encoding',
      modality: 'textual',
      dimension: 'Max Seq Length = 128 tokens',
      specs: ['Lowercased unaccented tokens', '[CLS] and [SEP] special delimiters', 'Attention mask generation'],
      description: 'Cleans noisy raw report strings, removes artifacts, and segments text into subword tokens for BERT contextual attention.'
    },
    'bert': {
      title: 'BERT-base Encoder',
      subtitle: 'Contextual transformer',
      modality: 'textual',
      dimension: '12 layers, 12 attention heads',
      specs: ['768 hidden units', 'Self-attention across full sequence', '[CLS] token extraction', 'Contextual semantic modeling'],
      description: 'Processes bidirectional context to detect urgency qualifiers, casualty mentions, and relief requests.'
    },
    'text-vector': {
      title: 'Textual Feature Vector (v_txt)',
      subtitle: 'Dense contextual embedding',
      modality: 'textual',
      dimension: '768 dimensions',
      specs: ['Extracted from pooled [CLS] head', 'Dense semantic vector', 'Captures situational urgency'],
      description: 'Dense embedding carrying contextual information on casualties, supply needs, and temporal situation.'
    },
    'fusion': {
      title: 'Multimodal Feature Fusion',
      subtitle: 'Cross-attention & gated concatenation',
      modality: 'fusion',
      dimension: '512 dimensions joint space',
      specs: ['Concatenation: [2048 + 768] = 2816-dim', 'Gated cross-attention mechanism', 'Linear bottleneck projection to 512-d', 'Dropout (p=0.3) + LayerNorm'],
      description: 'The core research contribution: bridges visual damage evidence with textual context, enabling joint cross-modal reasoning.'
    },
    'mlp-head': {
      title: 'MLP Classification Head',
      subtitle: 'Multi-task decision network',
      modality: 'output',
      dimension: '512 → 128 → Task Logits',
      specs: ['Parameter efficient (~1.51M total)', 'ReLU activation + residual skip', 'Independent projection per task'],
      description: 'Dispatches fused multimodal latent embeddings into five dedicated prediction heads simultaneously.'
    },
    'five-outputs': {
      title: 'Five Classification Tasks',
      subtitle: 'Operational decision outputs',
      modality: 'output',
      specs: [
        '1. Time Period: Current / Past / Future',
        '2. Urgency: High / Medium / Low',
        '3. Relevance: Relevant / Not Relevant',
        '4. Damage: Severe / Mild / Little/No Damage',
        '5. Relief: Required / Not Required'
      ],
      description: 'Comprehensive operational intelligence delivered to emergency coordinators for disaster response prioritization.'
    }
  };

  return (
    <div className="p-6 rounded-xl bg-[#FFFFFF] border border-[#E7EAF0] card-shadow my-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-[#E7EAF0]">
        <div>
          <h3 className="text-[17px] font-semibold text-[#202B38] tracking-tight">
            Multimodal Architecture Pipeline
          </h3>
          <p className="text-[13px] text-[#697586] mt-0.5 font-normal">
            Visualizing ResNet-50 visual extraction, BERT contextual encoding, and joint cross-modal feature fusion.
          </p>
        </div>
        <span className="text-[11.5px] text-[#697586] bg-[#F7F8FA] px-2.5 py-1 rounded-md border border-[#E7EAF0] self-start sm:self-center font-normal">
          Click any component for specifications
        </span>
      </div>

      {/* Dual Branches Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Visual Processing Branch (Left) */}
        <div className="p-4 rounded-xl bg-[#F7F8FA] border border-[#E7EAF0]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[13px] font-semibold text-[#202B38] flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-[#2563A6]" /> Visual Branch
            </span>
            <span className="text-[11px] text-[#697586] bg-[#FFFFFF] px-2 py-0.5 rounded border border-[#E7EAF0]">
              ResNet-50
            </span>
          </div>

          <div className="space-y-2.5">
            <button
              onClick={() => setSelectedNode(nodeDetails['image-input'])}
              className="w-full text-left p-3 rounded-lg bg-[#FFFFFF] border border-[#E7EAF0] hover:border-[#CBD5E1] transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-medium text-[#202B38]">1. Image Input</span>
                <span className="text-[11px] text-[#8792A2]">JPG/PNG</span>
              </div>
              <p className="text-[12px] text-[#697586] mt-0.5">Disaster scene photograph</p>
            </button>

            <div className="flex justify-center text-[#B0BCCE]">
              <ArrowDown className="w-3.5 h-3.5" />
            </div>

            <button
              onClick={() => setSelectedNode(nodeDetails['image-preproc'])}
              className="w-full text-left p-3 rounded-lg bg-[#FFFFFF] border border-[#E7EAF0] hover:border-[#CBD5E1] transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-medium text-[#202B38]">2. Image Preprocessing</span>
                <span className="text-[11px] text-[#2563A6]">3×224×224</span>
              </div>
              <p className="text-[12px] text-[#697586] mt-0.5">Resizing, crop, ImageNet normalization</p>
            </button>

            <div className="flex justify-center text-[#B0BCCE]">
              <ArrowDown className="w-3.5 h-3.5" />
            </div>

            <button
              onClick={() => setSelectedNode(nodeDetails['resnet'])}
              className="w-full text-left p-3 rounded-lg bg-[#FFFFFF] border border-[#E7EAF0] hover:border-[#CBD5E1] transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-medium text-[#202B38]">3. ResNet-50 Encoder</span>
                <span className="text-[11px] text-[#2563A6]">50 Layers</span>
              </div>
              <p className="text-[12px] text-[#697586] mt-0.5">Layer-4 Bottlenecks + GAP spatial pooling</p>
            </button>

            <div className="flex justify-center text-[#B0BCCE]">
              <ArrowDown className="w-3.5 h-3.5" />
            </div>

            <button
              onClick={() => setSelectedNode(nodeDetails['visual-vector'])}
              className="w-full text-left p-3 rounded-lg bg-[#F0F4F8] border border-[#D5E1ED] hover:border-[#2563A6] transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-semibold text-[#2563A6]">Visual Feature Vector (v_img)</span>
                <span className="text-[11.5px] font-semibold text-[#2563A6] bg-[#FFFFFF] px-2 py-0.5 rounded border border-[#D5E1ED]">
                  2048-dim
                </span>
              </div>
              <p className="text-[12px] text-[#4B5565] mt-0.5">Dense representation of physical damage</p>
            </button>
          </div>
        </div>

        {/* Textual Processing Branch (Right) */}
        <div className="p-4 rounded-xl bg-[#F7F8FA] border border-[#E7EAF0]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[13px] font-semibold text-[#202B38] flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#3B82A0]" /> Textual Branch
            </span>
            <span className="text-[11px] text-[#697586] bg-[#FFFFFF] px-2 py-0.5 rounded border border-[#E7EAF0]">
              BERT-base
            </span>
          </div>

          <div className="space-y-2.5">
            <button
              onClick={() => setSelectedNode(nodeDetails['text-input'])}
              className="w-full text-left p-3 rounded-lg bg-[#FFFFFF] border border-[#E7EAF0] hover:border-[#CBD5E1] transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-medium text-[#202B38]">1. Text Report Input</span>
                <span className="text-[11px] text-[#8792A2]">Natural Text</span>
              </div>
              <p className="text-[12px] text-[#697586] mt-0.5">SITREP narrative / emergency report</p>
            </button>

            <div className="flex justify-center text-[#B0BCCE]">
              <ArrowDown className="w-3.5 h-3.5" />
            </div>

            <button
              onClick={() => setSelectedNode(nodeDetails['text-preproc'])}
              className="w-full text-left p-3 rounded-lg bg-[#FFFFFF] border border-[#E7EAF0] hover:border-[#CBD5E1] transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-medium text-[#202B38]">2. WordPiece Tokenization</span>
                <span className="text-[11px] text-[#3B82A0]">Seq = 128</span>
              </div>
              <p className="text-[12px] text-[#697586] mt-0.5">Subword splitting, [CLS] / [SEP] padding</p>
            </button>

            <div className="flex justify-center text-[#B0BCCE]">
              <ArrowDown className="w-3.5 h-3.5" />
            </div>

            <button
              onClick={() => setSelectedNode(nodeDetails['bert'])}
              className="w-full text-left p-3 rounded-lg bg-[#FFFFFF] border border-[#E7EAF0] hover:border-[#CBD5E1] transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-medium text-[#202B38]">3. BERT-base Encoder</span>
                <span className="text-[11px] text-[#3B82A0]">12 Blocks</span>
              </div>
              <p className="text-[12px] text-[#697586] mt-0.5">Bidirectional self-attention contextualization</p>
            </button>

            <div className="flex justify-center text-[#B0BCCE]">
              <ArrowDown className="w-3.5 h-3.5" />
            </div>

            <button
              onClick={() => setSelectedNode(nodeDetails['text-vector'])}
              className="w-full text-left p-3 rounded-lg bg-[#EFF6F9] border border-[#D0E2EB] hover:border-[#3B82A0] transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-semibold text-[#3B82A0]">Textual Feature Vector (v_txt)</span>
                <span className="text-[11.5px] font-semibold text-[#3B82A0] bg-[#FFFFFF] px-2 py-0.5 rounded border border-[#D0E2EB]">
                  768-dim
                </span>
              </div>
              <p className="text-[12px] text-[#4B5565] mt-0.5">Dense embedding of situation narrative</p>
            </button>
          </div>
        </div>

      </div>

      {/* Fusion & Output Layers */}
      <div className="space-y-3">
        {/* Multimodal Feature Fusion Node */}
        <button
          onClick={() => setSelectedNode(nodeDetails['fusion'])}
          className="w-full text-left p-4 rounded-xl bg-[#F0F8F5] border border-[#D4EFE6] hover:border-[#23856D] transition-all cursor-pointer"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#FFFFFF] text-[#23856D] border border-[#D4EFE6] flex items-center justify-center shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-[14px] font-semibold text-[#202B38]">
                  Multimodal Feature Fusion [2048 + 768 → 512]
                </h4>
                <p className="text-[12px] text-[#4B5565] mt-0.5">
                  Concatenation + Gated Cross-Attention Linear Projection with Layer Normalization
                </p>
              </div>
            </div>
            <span className="text-[12px] font-semibold px-2.5 py-0.5 rounded bg-[#FFFFFF] border border-[#D4EFE6] text-[#23856D] self-start sm:self-center">
              512-dim Joint Space
            </span>
          </div>
        </button>

        {/* MLP Classification Head */}
        <button
          onClick={() => setSelectedNode(nodeDetails['mlp-head'])}
          className="w-full text-left p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E7EAF0] hover:border-[#CBD5E1] transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-[13px]">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#2563A6]" />
              <span className="font-semibold text-[#202B38]">
                Lightweight Multi-Task MLP Classification Head
              </span>
            </div>
            <span className="text-[11.5px] text-[#697586]">1.51M Parameters</span>
          </div>
          <p className="text-[12px] text-[#697586] mt-0.5">
            Feed-forward dense layers project 512-dim latent embedding into independent softmax distributions.
          </p>
        </button>

        {/* Five Classification Outputs */}
        <button
          onClick={() => setSelectedNode(nodeDetails['five-outputs'])}
          className="w-full text-left p-4 rounded-xl bg-[#F7F8FA] border border-[#E7EAF0] hover:border-[#CBD5E1] transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3 text-[13px]">
            <span className="font-semibold text-[#202B38] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#23856D]" /> Five Primary Classification Outputs
            </span>
            <span className="text-[11.5px] text-[#697586]">Operational Tasks</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            <div className="p-2.5 rounded-lg bg-[#FFFFFF] border border-[#E7EAF0] text-center">
              <span className="text-[11px] font-medium text-[#697586] block">1. Time Period</span>
              <span className="text-[12px] font-semibold text-[#202B38]">Current / Past / Future</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#FFFFFF] border border-[#E7EAF0] text-center">
              <span className="text-[11px] font-medium text-[#697586] block">2. Urgency</span>
              <span className="text-[12px] font-semibold text-[#202B38]">High / Med / Low</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#FFFFFF] border border-[#E7EAF0] text-center">
              <span className="text-[11px] font-medium text-[#697586] block">3. Relevance</span>
              <span className="text-[12px] font-semibold text-[#202B38]">Relevant / Not Rel</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#FFFFFF] border border-[#E7EAF0] text-center">
              <span className="text-[11px] font-medium text-[#697586] block">4. Damage</span>
              <span className="text-[12px] font-semibold text-[#202B38]">Severe / Mild / None</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#FFFFFF] border border-[#E7EAF0] text-center">
              <span className="text-[11px] font-medium text-[#697586] block">5. Relief</span>
              <span className="text-[12px] font-semibold text-[#202B38]">Required / Not Req</span>
            </div>
          </div>
        </button>
      </div>

      {/* Flyout Modal */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-xl bg-[#FFFFFF] border border-[#E7EAF0] p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setSelectedNode(null)}
              className="absolute top-4 right-4 p-1.5 rounded-md text-[#697586] hover:text-[#202B38] hover:bg-[#F0F4F8] cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-1 text-[#2563A6]">
              <Info className="w-4 h-4" />
              <span className="text-[12px] font-semibold uppercase tracking-wider">
                Component Specification
              </span>
            </div>

            <h3 className="text-[18px] font-semibold text-[#202B38] mb-0.5">{selectedNode.title}</h3>
            <p className="text-[13px] text-[#697586] mb-3">{selectedNode.subtitle}</p>

            {selectedNode.dimension && (
              <div className="mb-4 inline-block px-2.5 py-1 rounded bg-[#F0F4F8] border border-[#D5E1ED] text-[#2563A6] text-[12px] font-medium">
                Tensor Shape: {selectedNode.dimension}
              </div>
            )}

            <p className="text-[13.5px] text-[#4B5565] leading-relaxed mb-4 bg-[#F7F8FA] p-3.5 rounded-lg border border-[#E7EAF0]">
              {selectedNode.description}
            </p>

            <div>
              <h5 className="text-[12px] font-semibold text-[#202B38] uppercase tracking-wider mb-2">
                Technical Properties:
              </h5>
              <ul className="space-y-1.5">
                {selectedNode.specs.map((spec, i) => (
                  <li key={i} className="text-[13px] text-[#4B5565] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563A6] shrink-0"></span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setSelectedNode(null)}
              className="w-full mt-6 py-2 rounded-lg bg-[#2563A6] hover:bg-[#1D4F85] text-white font-medium text-[13px] transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
