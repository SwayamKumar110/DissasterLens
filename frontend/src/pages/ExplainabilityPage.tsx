import React, { useState } from 'react';
import { 
  Eye, 
  Layers, 
  FileText, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell, 
  CartesianGrid 
} from 'recharts';

import { AnalysisResponse, VisualRegion } from '../types';
import { INITIAL_ANALYSIS_RESULT } from '../data/fallbackData';
import { DisclaimerBanner } from '../components/DisclaimerBanner';

interface Props {
  currentResult: AnalysisResponse | null;
}

export const ExplainabilityPage: React.FC<Props> = ({ currentResult }) => {
  const result = currentResult || INITIAL_ANALYSIS_RESULT;
  const [selectedRegion, setSelectedRegion] = useState<VisualRegion | null>(
    result.visual_explanation.regions[0] || null
  );
  const [showOverlay, setShowOverlay] = useState<boolean>(true);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);

  const chartData = result.text_explanation.top_features.map((f) => ({
    name: f.feature,
    score: Math.abs(f.score),
    rawScore: f.score,
    impact: f.impact,
  }));

  const getTokenHighlightStyle = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-[#FDF2F2] border-[#F8D7D7] text-[#C24141] font-medium';
      case 'medium':
        return 'bg-[#FEF8ED] border-[#FBEAD0] text-[#B87D1F] font-medium';
      case 'low':
        return 'bg-[#F0F4F8] border-[#D5E1ED] text-[#2563A6]';
      default:
        return 'bg-transparent text-[#202B38] border-transparent';
    }
  };

  const getRegionBorder = (importance: string, isSelected: boolean) => {
    if (isSelected) return 'border-[#2563A6] ring-2 ring-[#2563A6]/20 bg-[#2563A6]/10';
    switch (importance) {
      case 'High':
        return 'border-[#D65B5B] bg-[#D65B5B]/10';
      case 'Medium':
        return 'border-[#D99A35] bg-[#D99A35]/10';
      default:
        return 'border-[#2563A6] bg-[#2563A6]/10';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-[26px] sm:text-[28px] font-semibold text-[#202B38] tracking-tight leading-tight">
            Explainable AI (LIME / SHAP)
          </h1>
          <p className="text-[14px] text-[#697586] mt-1 font-normal leading-normal">
            Understand how visual regions and text keywords contribute to the model's predictions.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#E7EAF0] text-[12px] text-[#697586] self-start sm:self-center">
          <Info className="w-3.5 h-3.5 text-[#2563A6]" />
          <span>Active Case: {result.analysis_id}</span>
        </div>
      </div>

      {/* Subtle Information Banner */}
      <DisclaimerBanner text="Illustrative Explainability Visualizations — Generated for research demonstration purposes; not computed via live gradient backpropagation." />

      {/* TWO-COLUMN LAYOUT: Left Textual Explanation, Right Visual Explanation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* LEFT COLUMN: Textual Explanation */}
        <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E7EAF0] card-shadow space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7EAF0]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-[#EFF6F9] text-[#3B82A0] flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <h3 className="text-[15px] font-semibold text-[#202B38]">
                Textual Explanation
              </h3>
            </div>
            <span className="text-[11px] text-[#697586] bg-[#F7F8FA] px-2 py-0.5 rounded border border-[#E7EAF0]">
              BERT Token Importance
            </span>
          </div>

          {/* Highlighted Report Text */}
          <div>
            <span className="text-[12px] font-medium text-[#697586] block mb-2">
              Disaster Report with Token Attribution Highlights:
            </span>
            <div className="p-4 rounded-lg bg-[#F7F8FA] border border-[#E7EAF0] text-[13.5px] leading-relaxed text-[#202B38]">
              {result.text_explanation.tokens.map((token, idx) => (
                <span
                  key={idx}
                  onClick={() => setSelectedToken(token.text)}
                  className={`inline-block px-1.5 py-0.5 m-0.5 rounded border transition-colors cursor-pointer ${getTokenHighlightStyle(
                    token.importance_level
                  )} ${selectedToken === token.text ? 'ring-2 ring-[#2563A6]' : ''}`}
                  title={`Weight: ${token.weight > 0 ? '+' : ''}${token.weight}`}
                >
                  {token.text}
                </span>
              ))}
            </div>

            {/* Token Legend */}
            <div className="flex flex-wrap items-center gap-4 mt-3 text-[12px] text-[#697586]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D65B5B]" />
                <span>High Urgency</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D99A35]" />
                <span>Moderate Severity</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563A6]" />
                <span>Neutral Qualifier</span>
              </div>
            </div>
          </div>

          {/* Feature Importance Bar Chart */}
          <div className="pt-3 border-t border-[#E7EAF0]">
            <h4 className="text-[12.5px] font-medium text-[#202B38] mb-2">
              Top Contributing Keywords
            </h4>
            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ top: 5, right: 20, left: 35, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F8" horizontal={false} />
                  <XAxis type="number" stroke="#8792A2" fontSize={10} domain={[0, 1]} tickLine={false} />
                  <YAxis type="category" dataKey="name" stroke="#4B5565" fontSize={11} tickLine={false} width={80} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E7EAF0',
                      borderRadius: '8px',
                      color: '#202B38',
                      fontSize: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                    }}
                    formatter={(val: any) => [`Impact: ${val}`, 'Attribution']}
                  />
                  <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.impact === 'positive' ? '#2563A6' : '#697586'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Research Linguistic Insight */}
          <div className="p-3.5 rounded-lg bg-[#F0F4F8] border border-[#D5E1ED] text-[12.5px] text-[#4B5565] leading-relaxed">
            <span className="font-semibold text-[#2563A6] block mb-1">Contextual Summary:</span>
            {result.text_explanation.summary}
          </div>
        </div>

        {/* RIGHT COLUMN: Visual Explanation */}
        <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E7EAF0] card-shadow space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7EAF0]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-[#F0F4F8] text-[#2563A6] flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-[15px] font-semibold text-[#202B38]">
                Visual Explanation
              </h3>
            </div>

            <button
              onClick={() => setShowOverlay(!showOverlay)}
              className={`px-2.5 py-1 rounded-md text-[12px] font-medium border transition cursor-pointer flex items-center gap-1.5 ${
                showOverlay
                  ? 'bg-[#F0F4F8] border-[#2563A6] text-[#2563A6]'
                  : 'bg-[#F7F8FA] border-[#E7EAF0] text-[#697586]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showOverlay ? 'Overlay: On' : 'Overlay: Off'}</span>
            </button>
          </div>

          {/* Image with Grad-CAM Attention Heatmap */}
          <div>
            <div className="relative rounded-lg overflow-hidden border border-[#E7EAF0] bg-[#F7F8FA] aspect-video">
              <img
                src={
                  result.image_info.filename === 'flooding_sample.jpg'
                    ? '/static/sample_images/flooding_sample.jpg'
                    : result.image_info.filename === 'earthquake_sample.jpg'
                    ? '/static/sample_images/earthquake_sample.jpg'
                    : '/static/sample_images/normal_weather_sample.jpg'
                }
                alt="Analyzed Scene"
                className="w-full h-full object-cover select-none"
              />

              {showOverlay &&
                result.visual_explanation.regions.map((region) => {
                  const [ymin, xmin, ymax, xmax] = region.box;
                  const isSelected = selectedRegion?.id === region.id;
                  return (
                    <div
                      key={region.id}
                      onClick={() => setSelectedRegion(region)}
                      style={{
                        top: `${ymin}%`,
                        left: `${xmin}%`,
                        height: `${ymax - ymin}%`,
                        width: `${xmax - xmin}%`,
                      }}
                      className={`absolute border-2 rounded transition-all cursor-pointer flex items-start justify-end p-1 ${getRegionBorder(
                        region.importance,
                        isSelected
                      )}`}
                    >
                      <span className="text-[10px] px-1 py-0.2 rounded bg-white text-[#202B38] font-medium shadow-xs">
                        {region.importance} ({(region.weight * 100).toFixed(0)}%)
                      </span>
                    </div>
                  );
                })}
            </div>

            {/* Importance Legend */}
            <div className="flex items-center justify-between mt-2.5 text-[12px] text-[#697586]">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D65B5B]" /> High
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D99A35]" /> Medium
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2563A6]" /> Low
                </span>
              </div>
              <span>ResNet-50 Layer-4 Attention</span>
            </div>
          </div>

          {/* Identified Visual Regions List */}
          <div>
            <span className="text-[12px] font-medium text-[#697586] block mb-2">
              Identified Regions of Interest:
            </span>
            <div className="space-y-2">
              {result.visual_explanation.regions.map((region) => {
                const isSelected = selectedRegion?.id === region.id;
                return (
                  <button
                    key={region.id}
                    onClick={() => setSelectedRegion(region)}
                    className={`w-full text-left p-2.5 rounded-lg border text-[12.5px] transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#F0F4F8] border-[#2563A6] text-[#202B38]'
                        : 'bg-[#F7F8FA] border-[#E7EAF0] hover:border-[#CBD5E1]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-semibold text-[#202B38]">{region.name}</span>
                      <span className="text-[11px] font-medium text-[#697586]">
                        {region.importance} ({(region.weight * 100).toFixed(0)}%)
                      </span>
                    </div>
                    <p className="text-[12px] text-[#4B5565] leading-normal">{region.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Damage Identification Rationale */}
          <div className="p-3.5 rounded-lg bg-[#F7F8FA] border border-[#E7EAF0] text-[12.5px] text-[#4B5565] leading-relaxed">
            <span className="font-semibold text-[#202B38] block mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#23856D]" /> Visual Damage Rationale:
            </span>
            {result.visual_explanation.summary}
          </div>
        </div>

      </div>
    </div>
  );
};
