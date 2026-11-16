import { DashboardData, ResearchInsights, ExampleCase, AnalysisResponse } from '../types';

const API_BASE = '/api';

export async function fetchDashboard(): Promise<DashboardData> {
  const res = await fetch(`${API_BASE}/dashboard`);
  if (!res.ok) {
    throw new Error(`Failed to fetch dashboard: ${res.statusText}`);
  }
  return res.json();
}

export async function fetchResearchResults(): Promise<ResearchInsights> {
  const res = await fetch(`${API_BASE}/research-results`);
  if (!res.ok) {
    throw new Error(`Failed to fetch research results: ${res.statusText}`);
  }
  return res.json();
}

export async function fetchExamples(): Promise<ExampleCase[]> {
  const res = await fetch(`${API_BASE}/examples`);
  if (!res.ok) {
    throw new Error(`Failed to fetch examples: ${res.statusText}`);
  }
  return res.json();
}

export async function analyzeDisaster(formData: FormData): Promise<AnalysisResponse> {
  const res = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || `Analysis failed: ${res.statusText}`);
  }
  return res.json();
}

export async function analyzeDisasterJson(payload: {
  text: string;
  example_id?: string;
  image_filename?: string;
}): Promise<AnalysisResponse> {
  const res = await fetch(`${API_BASE}/analyze-json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || `Analysis failed: ${res.statusText}`);
  }
  return res.json();
}

