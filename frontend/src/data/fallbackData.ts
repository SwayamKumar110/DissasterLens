import { DashboardData, ResearchInsights, ExampleCase, AnalysisResponse } from '../types';

export const FALLBACK_EXAMPLES: ExampleCase[] = [
  {
    id: "case-1-flooding",
    title: "Urban Flash Flooding & Submerged Infrastructure",
    category: "Flooding",
    image_filename: "flooding_sample.jpg",
    image_url: "/static/sample_images/flooding_sample.jpg",
    text_report: "Heavy rainfall has caused flooding in residential areas. Houses are submerged, and residents need emergency rescue and food supplies.",
    expected_outputs: {
      Urgency: "High",
      Relevance: "Relevant",
      Damage: "Severe",
      Relief: "Required",
      "Time Period": "Current"
    }
  },
  {
    id: "case-2-earthquake",
    title: "Structural Collapse & Seismic Debris",
    category: "Earthquake",
    image_filename: "earthquake_sample.jpg",
    image_url: "/static/sample_images/earthquake_sample.jpg",
    text_report: "A strong earthquake has damaged multiple buildings. Roads are blocked and rescue teams are being requested.",
    expected_outputs: {
      Urgency: "High",
      Relevance: "Relevant",
      Damage: "Severe",
      Relief: "Required",
      "Time Period": "Current"
    }
  },
  {
    id: "case-3-normal-weather",
    title: "Routine Meteorological Observation",
    category: "Normal Weather",
    image_filename: "normal_weather_sample.jpg",
    image_url: "/static/sample_images/normal_weather_sample.jpg",
    text_report: "The weather is pleasant today with clear skies and normal conditions.",
    expected_outputs: {
      Urgency: "Low",
      Relevance: "Not Relevant",
      Damage: "Little/No Damage",
      Relief: "Not Required",
      "Time Period": "Current"
    }
  }
];

export const FALLBACK_DASHBOARD: DashboardData = {
  kpis: {
    total_analyses: 1284,
    high_urgency_cases: 412,
    damage_detected: 869,
    relief_required: 624
  },
  recent_analyses: [
    {
      case_id: "DL-8942",
      disaster_type: "Urban Flooding",
      urgency: "High",
      damage_level: "Severe",
      relief_required: "Required",
      analysis_date: "13 Nov, 18:45"
    },
    {
      case_id: "DL-8941",
      disaster_type: "Seismic Structural Collapse",
      urgency: "High",
      damage_level: "Severe",
      relief_required: "Required",
      analysis_date: "13 Nov, 17:30"
    },
    {
      case_id: "DL-8940",
      disaster_type: "Forest Wildfire Perimeter",
      urgency: "Medium",
      damage_level: "Mild",
      relief_required: "Required",
      analysis_date: "13 Nov, 16:15"
    },
    {
      case_id: "DL-8939",
      disaster_type: "Routine Weather Broadcast",
      urgency: "Low",
      damage_level: "Little/No Damage",
      relief_required: "Not Required",
      analysis_date: "13 Nov, 15:00"
    },
    {
      case_id: "DL-8938",
      disaster_type: "Coastal Storm Surge",
      urgency: "High",
      damage_level: "Severe",
      relief_required: "Required",
      analysis_date: "13 Nov, 14:10"
    },
    {
      case_id: "DL-8937",
      disaster_type: "Hillslope Landslide",
      urgency: "Medium",
      damage_level: "Mild",
      relief_required: "Required",
      analysis_date: "13 Nov, 12:40"
    },
    {
      case_id: "DL-8936",
      disaster_type: "Industrial Hazmat Leak",
      urgency: "High",
      damage_level: "Mild",
      relief_required: "Required",
      analysis_date: "13 Nov, 11:05"
    }
  ],
  distribution: [
    { name: "Flooding", value: 420, color: "#2563A6" },
    { name: "Earthquake", value: 285, color: "#D65B5B" },
    { name: "Wildfire", value: 195, color: "#D99A35" },
    { name: "Storm / Cyclone", value: 164, color: "#3B82A0" },
    { name: "Landslide", value: 95, color: "#697586" },
    { name: "Non-Disaster", value: 125, color: "#23856D" }
  ],
  activity_timeline: [
    { time: "00:00", analyses: 32, high_urgency: 8 },
    { time: "04:00", analyses: 18, high_urgency: 4 },
    { time: "08:00", analyses: 76, high_urgency: 24 },
    { time: "12:00", analyses: 142, high_urgency: 48 },
    { time: "16:00", analyses: 198, high_urgency: 68 },
    { time: "20:00", analyses: 165, high_urgency: 52 },
    { time: "Now", analyses: 89, high_urgency: 31 }
  ]
};

export const FALLBACK_RESEARCH: ResearchInsights = {
  accuracy_comparison: [
    { task: "Time Period", baseline_accuracy: 0.6770, proposed_accuracy: 0.5714 },
    { task: "Relevance", baseline_accuracy: 0.8186, proposed_accuracy: 0.8386 },
    { task: "Urgency", baseline_accuracy: 0.6195, proposed_accuracy: 0.6395 },
    { task: "Relief", baseline_accuracy: 0.9336, proposed_accuracy: 0.9343 },
    { task: "Damage", baseline_accuracy: 0.9023, proposed_accuracy: 0.9223 }
  ],
  f1_comparison: [
    { task: "Time Period", baseline_macro_f1: 0.3735, baseline_micro_f1: 0.5012, proposed_macro_f1: 0.5902, proposed_micro_f1: 0.5714 },
    { task: "Relevance", baseline_macro_f1: 0.7520, baseline_micro_f1: 0.8110, proposed_macro_f1: 0.6285, proposed_micro_f1: 0.7086 },
    { task: "Urgency", baseline_macro_f1: 0.5847, baseline_micro_f1: 0.6157, proposed_macro_f1: 0.6047, proposed_micro_f1: 0.6357 },
    { task: "Relief", baseline_macro_f1: 0.8240, baseline_micro_f1: 0.7568, proposed_macro_f1: 0.8440, proposed_micro_f1: 0.9343 },
    { task: "Damage", baseline_macro_f1: 0.6973, baseline_micro_f1: 0.4375, proposed_macro_f1: 0.8500, proposed_micro_f1: 0.8914 }
  ],
  computational_efficiency: [
    { model: "DisasterNet", parameters: "39.82M", flops: "15.42G", latency: "18.40ms", throughput: "434.77/s" },
    { model: "Dissa", parameters: "2.07M", flops: "4.13G", latency: "10.14ms", throughput: "788.99/s" },
    { model: "Proposed Model", parameters: "1.51M", flops: "3.02G", latency: "0.22ms", throughput: "35,797.50/s" }
  ],
  key_findings: [
    "Multimodal fusion improved damage classification performance.",
    "Urgency classification showed modest improvements.",
    "Relief classification showed a small accuracy improvement.",
    "Time-period classification demonstrated a trade-off between accuracy and Macro-F1.",
    "The proposed architecture demonstrated lower reported computational complexity."
  ],
  academic_disclaimer: "Results reproduced from the experimental findings reported in the research paper. They are not live measurements generated by this demonstration application."
};

export const INITIAL_ANALYSIS_RESULT: AnalysisResponse = {
  analysis_id: "DL-DEMO-01",
  timestamp: "2026-11-13 19:30:00",
  is_demo_mode: true,
  disclaimer: "Demonstration prediction — not generated by a trained research model.",
  image_info: {
    filename: "flooding_sample.jpg",
    dimensions: "800 × 600 px",
    width: 800,
    height: 600,
    format: "JPEG",
    color_mode: "RGB",
    file_size_kb: 142.5,
    visual_brightness: 94.2,
    texture_variance: 2180.4,
    feature_dimension: 2048,
    backbone: "ResNet-50 Layer-4 Average Pooling"
  },
  text_info: {
    token_count: 22,
    char_count: 148,
    embedding_dim: 768,
    encoder: "BERT-base-uncased ([CLS] token projection)",
    language: "en"
  },
  classifications: {
    time_period: {
      task: "Time Period",
      predicted_class: "Current",
      confidence: 96.5,
      all_probabilities: { "Current": 96.5, "Past": 2.3, "Future": 1.2 },
      explanation: "Real-time descriptions indicate an ongoing active situation.",
      status_type: "danger"
    },
    urgency: {
      task: "Urgency",
      predicted_class: "High",
      confidence: 94.6,
      all_probabilities: { "High": 94.6, "Medium": 4.2, "Low": 1.2 },
      explanation: "Critical situation requiring immediate search and rescue attention.",
      status_type: "danger"
    },
    relevance: {
      task: "Relevance",
      predicted_class: "Relevant",
      confidence: 98.4,
      all_probabilities: { "Relevant": 98.4, "Not Relevant": 1.6 },
      explanation: "Both image and text directly relate to a hazardous flooding disaster.",
      status_type: "danger"
    },
    damage: {
      task: "Damage",
      predicted_class: "Severe",
      confidence: 93.8,
      all_probabilities: { "Severe": 93.8, "Mild": 5.1, "Little/No Damage": 1.1 },
      explanation: "Extensive physical damage detected with residential structures submerged.",
      status_type: "danger"
    },
    relief: {
      task: "Relief",
      predicted_class: "Required",
      confidence: 96.2,
      all_probabilities: { "Required": 96.2, "Not Required": 3.8 },
      explanation: "Emergency food supplies, clean water, and boat rescue are requested.",
      status_type: "danger"
    }
  },
  text_explanation: {
    tokens: [
      { text: "Heavy", weight: 0.65, importance_level: "medium" },
      { text: "rainfall", weight: 0.62, importance_level: "medium" },
      { text: "has", weight: 0.05, importance_level: "neutral" },
      { text: "caused", weight: 0.05, importance_level: "neutral" },
      { text: "flooding", weight: 0.88, importance_level: "high" },
      { text: "in", weight: 0.05, importance_level: "neutral" },
      { text: "residential", weight: 0.05, importance_level: "neutral" },
      { text: "areas.", weight: 0.05, importance_level: "neutral" },
      { text: "Houses", weight: 0.05, importance_level: "neutral" },
      { text: "are", weight: 0.05, importance_level: "neutral" },
      { text: "submerged,", weight: 0.92, importance_level: "high" },
      { text: "and", weight: 0.05, importance_level: "neutral" },
      { text: "residents", weight: 0.05, importance_level: "neutral" },
      { text: "need", weight: 0.05, importance_level: "neutral" },
      { text: "emergency", weight: 0.87, importance_level: "high" },
      { text: "rescue", weight: 0.89, importance_level: "high" },
      { text: "and", weight: 0.05, importance_level: "neutral" },
      { text: "food", weight: 0.05, importance_level: "neutral" },
      { text: "supplies.", weight: 0.71, importance_level: "medium" }
    ],
    top_features: [
      { feature: "submerged", score: 0.92, impact: "positive", modality: "text" },
      { feature: "rescue", score: 0.89, impact: "positive", modality: "text" },
      { feature: "flooding", score: 0.88, impact: "positive", modality: "text" },
      { feature: "emergency", score: 0.87, impact: "positive", modality: "text" },
      { feature: "supplies", score: 0.71, impact: "positive", modality: "text" },
      { feature: "Heavy", score: 0.65, impact: "positive", modality: "text" },
      { feature: "rainfall", score: 0.62, impact: "positive", modality: "text" }
    ],
    summary: "Key disaster terms indicating high water levels, urgent rescue needs, and food shortages contribute most to the model's assessment."
  },
  visual_explanation: {
    regions: [
      {
        id: "vr-1",
        name: "Submerged Ground & Water Line",
        importance: "High",
        weight: 0.91,
        box: [58.0, 10.0, 92.0, 90.0],
        description: "Visual features show deep floodwaters covering roads and reaching house foundations."
      },
      {
        id: "vr-2",
        name: "Structural Rooflines & Entrapment Zone",
        importance: "Medium",
        weight: 0.74,
        box: [28.0, 15.0, 55.0, 42.0],
        description: "Detected building rooftops isolated above the flood waterline."
      },
      {
        id: "vr-3",
        name: "Overhead Horizon & Precipitation Field",
        importance: "Low",
        weight: 0.32,
        box: [5.0, 5.0, 25.0, 95.0],
        description: "Background overcast skies showing low relative salience."
      }
    ],
    summary: "Visual attention highlights ground-level water coverage and surrounded buildings as primary evidence for severe damage.",
    heatmap_colors: {
      High: "#D65B5B",
      Medium: "#D99A35",
      Low: "#2563A6"
    }
  },
  fusion_details: {
    visual_feature_dim: 2048,
    textual_feature_dim: 768,
    fused_dim: 512,
    visual_weight: 0.48,
    textual_weight: 0.52,
    fusion_method: "Concatenation + Gated Cross-Attention Linear Projection",
    stage_breakdown: [
      { stage: "1. Visual Preprocessing", desc: "Input image scaled to 224x224 RGB, normalized with ImageNet mean and std." },
      { stage: "2. ResNet-50 Visual Encoder", desc: "Bottleneck residual blocks extract low-to-high spatial feature maps; Layer-4 yields 2048-dim vector." },
      { stage: "3. BERT Textual Encoder", desc: "WordPiece tokenization through 12 transformer encoder blocks; [CLS] token yields 768-dim contextual embedding." },
      { stage: "4. Multimodal Fusion", desc: "Visual (2048-d) and Textual (768-d) representations are fused via cross-attention into a compact 512-d joint space." },
      { stage: "5. Multi-Task Classification", desc: "Independent task-specific linear MLP heads predict Time Period, Urgency, Relevance, Damage, and Relief." },
      { stage: "6. Explainability Layer", desc: "Generates LIME/SHAP token attributions and Grad-CAM spatial activation maps for model transparency." }
    ]
  }
};
