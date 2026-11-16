# DisasterLens AI: Explainable Multimodal Disaster Prediction & Analysis System

> **Research Capstone Project**  
> **Paper Title:** *"Explainable Foundation Model for Multimodal Disaster Prediction"*  
> **Field:** Computer Science & Engineering (Multimodal Deep Learning & Explainable AI)

---

## 1. Project Overview

**DisasterLens AI** is an interactive, explainable artificial intelligence web dashboard demonstrating how multimodal fusion—combining visual evidence (aerial, satellite, and ground photography) with textual contextual narratives (SITREPs, emergency 911 transcripts, citizen reports)—substantially improves disaster intelligence over unimodal systems.

### Core Research Thesis
> *"Combining visual and textual information provides better contextual understanding of disaster situations than analysing either modality independently."*

In catastrophic disaster events:
- **Visual-only models** accurately perceive structural rubble and submerged terrain, but cannot infer whether an event happened hours ago or months ago, nor can they determine whether victims inside are in need of medical supplies or food rations.
- **Textual-only models** capture urgency and specific humanitarian requests, but are prone to exaggeration, rumors, and lack direct physical ground truth.
- **The Proposed Multimodal Model** fuses deep visual representations from a modified **ResNet-50** with contextual embeddings from **BERT-base-uncased**, using cross-attention linear projection into a joint 512-dimensional latent space to solve 5 critical disaster assessment tasks simultaneously.

---

## 2. Key Features

- **Disaster Intelligence Overview Dashboard**:
  - Live operational KPIs (Total Analyses, High Urgency Cases, Damage Detected, Relief Required).
  - Disaster classification distribution donut chart.
  - 24-hour activity timeline tracking analyses vs. high-urgency alerts.
  - Recent analysis table with urgency, damage, and relief flags.
- **Multimodal Disaster Analysis Workspace**:
  - Drag-and-drop or file upload supporting JPG, JPEG, and PNG.
  - Natural language SITREP input with live character/word counters and keyword injectors.
  - 1-click loading for 3 predefined research demonstration cases (Flooding, Earthquake, Normal Weather).
  - Stepped, animated neural processing sequence (Image Preprocessing → ResNet-50 → BERT → Multimodal Fusion → Classification → Explainability).
  - 5 standardized classification output cards (Time Period, Urgency, Relevance, Damage, Relief) with confidence percentages and class probabilities.
  - Interactive Multimodal Fusion Architecture Pipeline diagram with clickable nodes revealing tensor dimensions and layer specifications.
- **Explainable AI (XAI) Suite**:
  - **Text Explanation (LIME / SHAP)**: Token-level background highlighting with positive/negative attribution scores and horizontal feature importance bar chart.
  - **Visual Explanation (Grad-CAM Attention)**: Spatial attention heatmap overlays with high, medium, and low importance bounding regions detailing damage identification rationale.
- **Model Architecture Explorer**:
  - 7-layer architecture decomposition (Input, ResNet-50 visual branch, BERT text branch, Gated fusion, MLP head, XAI layer, 5 outputs).
  - Interactive "Why Multimodal Learning?" comparative triad contrasting unimodal failure modes against multimodal fusion advantages.
- **Empirical Research Findings & Benchmarks**:
  - Exact experimental values reproduced from the published research paper.
  - Grouped bar chart comparing Baseline Accuracy vs. Proposed Model Accuracy.
  - Macro-F1 and Micro-F1 balanced metrics table.
  - Computational complexity benchmarks (DisasterNet vs. Dissa vs. Proposed Model: 1.51M parameters, 3.02G FLOPs, 0.22ms latency, 35,797 samples/sec throughput).
- **Academic Demo Mode Transparency**:
  - Explicit disclaimers throughout the UI highlighting that live predictions are illustrative demonstrations and results in the Insights tab represent paper findings.

---

## 3. Technology Stack

### Frontend
- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4 (Custom Palantir-inspired dark theme)
- **Charts & Data Viz**: Recharts (Pie/Donut, Line, Grouped Bar, Horizontal Bar)
- **Icons**: Lucide React
- **Build Tool**: Vite 8

### Backend
- **Framework**: FastAPI (Python 3.11+)
- **Server**: Uvicorn
- **Image & Data Processing**: Pillow (PIL), NumPy, Scikit-learn
- **API Client Testing**: HTTPX

---

## 4. Project Structure

```
DisasterLens/
├── backend/
│   ├── app/
│   │   ├── data/
│   │   │   └── mock_data.py          # Paper experimental metrics & default SITREPs
│   │   ├── models/
│   │   │   └── schemas.py            # Pydantic schemas for 5 tasks & XAI
│   │   ├── routes/
│   │   │   ├── analysis.py           # POST /api/analyze & /api/analyze-json
│   │   │   ├── dashboard.py          # GET /api/dashboard
│   │   │   ├── examples.py           # GET /api/examples
│   │   │   └── research.py           # GET /api/research-results
│   │   ├── services/
│   │   │   ├── explainability.py     # Token attribution & spatial heatmaps
│   │   │   └── multimodal_engine.py  # Dual-branch inference engine
│   │   └── main.py                   # FastAPI application & static mounts
│   ├── static/sample_images/         # Generated high-res test imagery
│   └── requirements.txt
├── frontend/
│   ├── public/static/sample_images/  # Static demo images
│   ├── src/
│   │   ├── components/               # KPICard, ClassificationCard, MultimodalPipeline, etc.
│   │   ├── data/                     # Fallback research data & default states
│   │   ├── pages/                    # 6 Complete Pages (Overview, Analysis, Explainability, etc.)
│   │   ├── services/                 # API client (fetchDashboard, analyzeDisaster, etc.)
│   │   ├── types/                    # TypeScript interfaces
│   │   ├── App.tsx                   # Main layout & navigation
│   │   ├── index.css                 # Dark theme palette & scrollbars
│   │   └── main.tsx
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
└── README.md
```

---

## 5. How to Run the Project

You can run the project using any of the following methods:

---

### Method A: One-Click Windows Launcher (Recommended & Easiest)

A launcher script is included in the project root directory:

1. Double-click **`run_disasterlens.bat`** (or right-click $\rightarrow$ Run).
2. The script will automatically:
   - Start the **FastAPI Backend Server** in a separate terminal window on port `8000`.
   - Start the **Vite React Frontend Server** in a separate terminal window on port `5173`.
   - Automatically open **`http://localhost:5173`** in your default web browser.
3. Keep the two terminal windows open while using the application. Close them when you want to stop the servers.

> *PowerShell alternative:* You can also right-click and run `run_disasterlens.ps1` with PowerShell.

---

### Method B: Manual Execution via PowerShell

Open two separate PowerShell terminal tabs or windows:

#### Terminal 1 — Start the Backend (FastAPI):
```powershell
cd C:\Users\swym2\Desktop\DisasterLens\backend
.\.venv\Scripts\uvicorn.exe app.main:app --host 127.0.0.1 --port 8000 --reload
```
*Expected output: `Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)`*

#### Terminal 2 — Start the Frontend (Vite + React):
```powershell
cd C:\Users\swym2\Desktop\DisasterLens\frontend
npm.cmd run dev
```
> **PowerShell Tip:** On Windows systems where `.ps1` script execution is disabled by default, use `npm.cmd` instead of `npm` to avoid `PSSecurityException`.

Now open your web browser and navigate to:
- **Web Dashboard:** [http://localhost:5173](http://localhost:5173)
- **Backend API Docs:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

### Method C: Manual Execution via Command Prompt (`cmd.exe`)

#### Terminal 1 — Start Backend:
```cmd
cd C:\Users\swym2\Desktop\DisasterLens\backend
.venv\Scripts\uvicorn.exe app.main:app --host 127.0.0.1 --port 8000 --reload
```

#### Terminal 2 — Start Frontend:
```cmd
cd C:\Users\swym2\Desktop\DisasterLens\frontend
npm run dev
```

---

### First-Time Installation (If Setting Up on a New Machine)

If you are cloning or moving this project to a new computer, run the following setup once:

#### 1. Backend Setup:
```bash
cd backend

# Create virtual environment (using Python 3.10+ or uv)
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# Linux/macOS:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

#### 2. Frontend Setup:
```bash
cd frontend

# Install Node modules
npm install
```

---

### How to Stop the Servers
- In each terminal window, press `Ctrl + C` (or simply close the terminal window).

---

## 6. API Documentation

### Key Endpoints

- `GET /api/health`
  - Returns backend health status and active mode declaration.
- `GET /api/dashboard`
  - Returns high-level operational KPIs, recent analyses table, category distribution, and 24-hr activity timeline.
- `GET /api/research-results`
  - Returns paper findings: Baseline vs. Proposed Accuracy, Macro/Micro-F1 scores, and computational efficiency metrics.
- `GET /api/examples`
  - Returns the 3 predefined demonstration cases (Flooding, Earthquake, Normal Weather).
- `POST /api/analyze`
  - Accepts `multipart/form-data` with `text: string`, `file: UploadFile` (optional), and `image_filename: string` (optional).
  - Returns 5 classification results, token attributions, spatial heatmaps, and multimodal fusion layer breakdown.
- `POST /api/analyze-json`
  - JSON equivalent for programmatic API testing and fast sample case execution.

---

## 7. Demonstration Mode & Academic Integrity

- **Demonstration Predictions**: In this academic demonstration application, predictions and explanations are produced by a modular, transparent heuristic rules and feature-extraction engine. They are explicitly labelled:
  > *"Demonstration prediction — not generated by a trained research model."*
- **Research Benchmarks**: All figures presented in the **Research Insights** section are accurately transcribed from the research paper's empirical tables and reflect the true experimental findings (including performance trade-offs such as Time Period accuracy vs. Macro-F1).

