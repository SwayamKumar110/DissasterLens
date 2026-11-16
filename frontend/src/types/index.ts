export interface ClassificationResult {
  task: string;
  predicted_class: string;
  confidence: number;
  all_probabilities: Record<string, number>;
  explanation: string;
  status_type: 'danger' | 'warning' | 'success' | 'info';
}

export interface FeatureImportance {
  feature: string;
  score: number;
  impact: 'positive' | 'negative';
  modality: 'text' | 'visual';
}

export interface TextTokenExplanation {
  text: string;
  weight: number;
  importance_level: 'high' | 'medium' | 'neutral' | 'low';
}

export interface TextExplanation {
  tokens: TextTokenExplanation[];
  top_features: FeatureImportance[];
  summary: string;
}

export interface VisualRegion {
  id: string;
  name: string;
  importance: 'High' | 'Medium' | 'Low';
  weight: number;
  box: [number, number, number, number]; // [ymin, xmin, ymax, xmax] in %
  description: string;
}

export interface VisualExplanation {
  regions: VisualRegion[];
  summary: string;
  heatmap_colors: Record<string, string>;
}

export interface MultimodalFusionDetails {
  visual_feature_dim: number;
  textual_feature_dim: number;
  fused_dim: number;
  visual_weight: number;
  textual_weight: number;
  fusion_method: string;
  stage_breakdown: Array<{ stage: string; desc: string }>;
}

export interface AnalysisResponse {
  analysis_id: string;
  timestamp: string;
  is_demo_mode: boolean;
  disclaimer: string;
  image_info: {
    filename: string;
    dimensions: string;
    width: number;
    height: number;
    format: string;
    color_mode: string;
    file_size_kb: number;
    visual_brightness: number;
    texture_variance: number;
    feature_dimension: number;
    backbone: string;
  };
  text_info: {
    token_count: number;
    char_count: number;
    embedding_dim: number;
    encoder: string;
    language: string;
  };
  classifications: {
    time_period: ClassificationResult;
    urgency: ClassificationResult;
    relevance: ClassificationResult;
    damage: ClassificationResult;
    relief: ClassificationResult;
  };
  text_explanation: TextExplanation;
  visual_explanation: VisualExplanation;
  fusion_details: MultimodalFusionDetails;
}

export interface KPIData {
  total_analyses: number;
  high_urgency_cases: number;
  damage_detected: number;
  relief_required: number;
}

export interface RecentAnalysis {
  case_id: string;
  disaster_type: string;
  urgency: string;
  damage_level: string;
  relief_required: string;
  analysis_date: string;
}

export interface CategoryDistribution {
  name: string;
  value: number;
  color: string;
}

export interface ActivityDataPoint {
  time: string;
  analyses: number;
  high_urgency: number;
}

export interface DashboardData {
  kpis: KPIData;
  recent_analyses: RecentAnalysis[];
  distribution: CategoryDistribution[];
  activity_timeline: ActivityDataPoint[];
}

export interface AccuracyItem {
  task: string;
  baseline_accuracy: number;
  proposed_accuracy: number;
}

export interface F1Item {
  task: string;
  baseline_macro_f1: number;
  baseline_micro_f1: number;
  proposed_macro_f1: number;
  proposed_micro_f1: number;
}

export interface EfficiencyItem {
  model: string;
  parameters: string;
  flops: string;
  latency: string;
  throughput: string;
}

export interface ResearchInsights {
  accuracy_comparison: AccuracyItem[];
  f1_comparison: F1Item[];
  computational_efficiency: EfficiencyItem[];
  key_findings: string[];
  academic_disclaimer: string;
}

export interface ExampleCase {
  id: string;
  title: string;
  category: string;
  image_filename: string;
  image_url: string;
  text_report: string;
  expected_outputs: Record<string, string>;
}

export type NavPage = 'overview' | 'analysis' | 'explainability' | 'architecture' | 'insights' | 'about';

