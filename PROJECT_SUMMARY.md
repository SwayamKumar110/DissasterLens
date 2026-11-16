# DisasterLens AI: Technical System Summary and File Manual

> **Language Specification:** This document is written in accordance with **ASD-STE100** (Simplified Technical English).  
> **Target Audience:** System engineers, academic reviewers, and software developers.

---

## 1. What the Project Is

push this project

The project demonstrates the research paper:  
*"Explainable Foundation Model for Multimodal Disaster Prediction"*.  
The project focuses on Computer Science and Engineering research in multimodal deep learning.

### Primary Purpose
Single-input systems have technical limits:
- An image shows physical destruction. But an image does not tell when the event occurred.
- A text report tells urgent needs. But a text report does not verify structural damage.

DisasterLens AI combines the image and the text.  
This multimodal method gives a complete operational assessment.

The system performs five classification tasks:
1. **Time Period:** Current, Past, or Future.
2. **Urgency:** High, Medium, or Low.
3. **Relevance:** Relevant or Not Relevant.
4. **Damage:** Severe, Mild, or Little/No Damage.
5. **Relief:** Required or Not Required.

---

## 2. How the System Works

The system operates through five sequential stages:

```
  [Disaster Image]                      [Text Situation Report]
         |                                         |
         v                                         v
 [ResNet-50 Encoder]                      [BERT-base Encoder]
 (Extracts 2048-d vector)               (Extracts 768-d vector)
         |                                         |
         +--------------------+--------------------+
                              |
                              v
                 [Multimodal Fusion Layer]
              (Creates 512-d joint vector)
                              |
                              v
                 [Multi-Task Classification]
             (Outputs 5 decision predictions)
                              |
                              v
                [Explainability Visualizers]
            (Shows LIME tokens & Grad-CAM map)
```

### Stage 1: Data Ingestion
- The user provides an image file (JPG, JPEG, or PNG).
- The user inputs a text situation report.
- Or, the user selects a predefined demonstration case.

### Stage 2: Feature Extraction
- **Visual Encoder:** A modified ResNet-50 convolutional network processes the image. It generates a 2048-dimensional visual feature vector ($v_{img}$).
- **Textual Encoder:** A BERT-base-uncased transformer processes the text tokens. It generates a 768-dimensional textual feature vector ($v_{txt}$).

### Stage 3: Multimodal Feature Fusion
- The system concatenates the visual vector and textual vector into a 2816-dimensional array.
- A gated cross-attention mechanism projects this array into a compact 512-dimensional joint vector.

### Stage 4: Multi-Task Classification
- A lightweight Multi-Layer Perceptron (MLP) head with 1.51M parameters receives the 512-dimensional vector.
- Five linear branches calculate softmax probability scores for the five prediction tasks.

### Stage 5: Explainability Generation
- **Text Explainability:** The system calculates token importance weights. It highlights critical terms (for example, "submerged", "urgently", "rescue").
- **Visual Explainability:** The system generates illustrative Grad-CAM attention regions on the image. It highlights areas with damage evidence.

---

## 3. System Requirements

Ensure the host computer meets these requirements:
- **Operating System:** Windows 10/11, Linux, or macOS.
- **Node.js:** Version 18.0 or newer.
- **Python:** Version 3.10 or newer (Python 3.11 installed in the local environment).
- **Web Browser:** Google Chrome, Microsoft Edge, or Mozilla Firefox.

---

## 4. How Each File Works

### 4.1 Root Directory Files

#### `run_disasterlens.bat`
- **Purpose:** Starts the entire system with one click on Microsoft Windows.
- **Operation:**
  1. Opens a terminal window and starts the FastAPI backend server on port 8000.
  2. Opens a second terminal window and starts the Vite frontend server on port 5173.
  3. Pauses three seconds to let services initialize.
  4. Launches the default browser at `http://localhost:5173`.

#### `run_disasterlens.ps1`
- **Purpose:** PowerShell automation script for the project launcher.
- **Operation:** Uses PowerShell `Start-Process` commands to run the backend and frontend simultaneously.

#### `README.md`
- **Purpose:** Primary project overview and instructions.
- **Operation:** Contains technical specifications, installation steps, API definitions, and academic disclaimers.

#### `PROJECT_SUMMARY.md`
- **Purpose:** Controlled technical summary of the software system and file directory manual.
- **Operation:** Uses ASD-STE100 rules to explain system function and file operations.

---

### 4.2 Backend Files (`/backend`)

#### `backend/app/main.py`
- **Role:** Central entry point of the FastAPI application.
- **Operation:**
  - Instantiates the `FastAPI` application object.
  - Configures Cross-Origin Resource Sharing (CORS) middleware for the frontend.
  - Mounts the `/static` directory to serve sample disaster images.
  - Registers the API route modules (`analysis`, `dashboard`, `research`, `examples`).
  - Implements the `/api/health` diagnostic endpoint.

#### `backend/app/models/schemas.py`
- **Role:** Data contract definitions using Pydantic.
- **Operation:**
  - Defines data classes for request validation and response serialization.
  - Key schemas include:
    - `ClassificationResult`: Holds task label, predicted class, confidence, and explanation.
    - `FeatureImportance`: Stores token score, impact polarity, and modality type.
    - `VisualExplanation`: Stores attention region bounding coordinates and color keys.
    - `MultimodalFusionDetails`: Stores feature dimensions and processing stage logs.
    - `DashboardData`: Structures KPI metrics, distribution data, and timeline charts.
    - `ResearchInsights`: Stores paper accuracy, F1 scores, and efficiency metrics.

#### `backend/app/services/multimodal_engine.py`
- **Role:** Core inference and multimodal simulation engine.
- **Operation:**
  - Receives uploaded image bytes and textual report strings.
  - Reads image metadata (dimensions, brightness, variance) with Pillow and NumPy.
  - Tokenizes input text and counts characters and words.
  - Applies deterministic heuristic rules matching the ResNet-50 and BERT dual architecture.
  - Computes class probabilities and confidence scores for all five classification tasks.
  - Combines visual and textual weights into the `MultimodalFusionDetails` model.
  - Sets the `is_demo_mode` boolean to true to ensure research integrity.

#### `backend/app/services/explainability.py`
- **Role:** Generates Explainable AI (XAI) feature attributions.
- **Operation:**
  - `generate_text_explanation()`: Evaluates words against disaster severity lexicons. Assigns positive or negative weights to each token.
  - `generate_visual_explanation()`: Generates Grad-CAM visual attention bounding boxes based on the detected hazard category. Assigns High, Medium, or Low importance tags.

#### `backend/app/routes/analysis.py`
- **Role:** HTTP endpoints for disaster evaluation.
- **Operation:**
  - `POST /api/analyze`: Receives `multipart/form-data` with an image file and text report. Calls `multimodal_engine.analyze()`.
  - `POST /api/analyze-json`: Receives a JSON payload with an example identifier and text report. Used for fast demonstration cases.

#### `backend/app/routes/dashboard.py`
- **Role:** HTTP endpoint for overview dashboard analytics.
- **Operation:**
  - `GET /api/dashboard`: Returns summary KPI counts, category distribution data, activity timeline points, and recent analysis records.

#### `backend/app/routes/research.py`
- **Role:** HTTP endpoint for published research benchmarks.
- **Operation:**
  - `GET /api/research-results`: Returns the experimental accuracy table, Macro/Micro-F1 table, and computational complexity metrics from the research paper.

#### `backend/app/routes/examples.py`
- **Role:** HTTP endpoint for sample demonstration cases.
- **Operation:**
  - `GET /api/examples`: Returns three predefined demonstration incidents: Flooding, Earthquake, and Normal Weather.

#### `backend/app/data/mock_data.py`
- **Role:** Static dataset storage for benchmarks and historical records.
- **Operation:**
  - Stores the exact benchmark numbers published in the research paper.
  - Stores the demonstration incident configurations and sample analysis logs.

#### `backend/requirements.txt`
- **Role:** Python package dependency specification.
- **Operation:** Lists required Python libraries: `fastapi`, `uvicorn`, `python-multipart`, `pydantic`, `pillow`, `numpy`, `scikit-learn`, and `httpx`.

#### `backend/static/sample_images/`
- **Role:** Static image assets.
- **Files:**
  - `flooding_sample.jpg`: Residential flood scene with submerged structures.
  - `earthquake_sample.jpg`: Structural collapse scene with cracked masonry and debris.
  - `normal_weather_sample.jpg`: Clear weather scene with intact landscape.

---

### 4.3 Frontend Files (`/frontend`)

#### `frontend/src/main.tsx`
- **Role:** Application bootstrap script.
- **Operation:** Mounts the top-level React component tree into the `#root` DOM element in `index.html`.

#### `frontend/src/App.tsx`
- **Role:** Main application controller and layout orchestrator.
- **Operation:**
  - Manages active navigation state (`currentPage`).
  - Stores the shared analysis result (`currentResult`).
  - Controls mobile sidebar visibility.
  - Conditionally displays the active page view based on user selection.

#### `frontend/src/index.css`
- **Role:** Global stylesheet and design system definition.
- **Operation:**
  - Configures the dark color palette (`#0B1120`, `#111827`, `#172033`).
  - Sets scrollbar styles and glow pulse keyframe animations.
  - Imports Tailwind CSS v4 directives.

#### `frontend/src/types/index.ts`
- **Role:** TypeScript interface definitions.
- **Operation:** Defines strict contracts for classification outputs, tokens, visual regions, dashboard metrics, and navigation pages.

#### `frontend/src/services/api.ts`
- **Role:** Frontend HTTP communication client.
- **Operation:**
  - Executes asynchronous `fetch()` requests to the backend endpoints.
  - Includes `fetchDashboard()`, `fetchResearchResults()`, `fetchExamples()`, `analyzeDisaster()`, and `analyzeDisasterJson()`.

#### `frontend/src/data/fallbackData.ts`
- **Role:** Client-side offline cache and initial state data.
- **Operation:**
  - Provides default dashboard metrics, research benchmarks, sample cases, and baseline classification outputs.
  - Prevents user interface crashes if network calls delay or fail.

#### `frontend/src/components/Navbar.tsx`
- **Role:** Top navigation header bar.
- **Operation:** Displays the active page title, system status badges ("Demo Mode", "ResNet-50 + BERT"), and mobile menu toggle button.

#### `frontend/src/components/Sidebar.tsx`
- **Role:** Main lateral navigation menu.
- **Operation:**
  - Displays links to all six system pages.
  - Highlights the active page route.
  - Shows the department and research domain attribution.

#### `frontend/src/components/KPICard.tsx`
- **Role:** Key Performance Indicator visual card.
- **Operation:** Renders numeric metrics, title text, category icons, and percentage trend badges.

#### `frontend/src/components/ClassificationCard.tsx`
- **Role:** Displays single classification task results.
- **Operation:**
  - Shows task name, predicted label, confidence percentage bar, and rationale description.
  - Applies color codes (Red for High/Severe, Amber for Medium/Mild, Green for Low/None).
  - Displays probability percentages for all candidate classes.

#### `frontend/src/components/MultimodalPipeline.tsx`
- **Role:** Interactive architecture pipeline diagram.
- **Operation:**
  - Displays the sequential stages of the dual-branch neural architecture.
  - Shows tensor dimensions at each step ($224 \times 224 \rightarrow 2048 \rightarrow 512$).
  - Opens a technical specification modal window when the user clicks any node.

#### `frontend/src/components/DisclaimerBanner.tsx`
- **Role:** Academic transparency banner.
- **Operation:** Displays a permanent warning that live predictions are illustrative demonstrations.

#### `frontend/src/pages/OverviewPage.tsx`
- **Role:** Primary operations dashboard view.
- **Operation:**
  - Displays four KPI cards (Total Analyses, High Urgency, Damage Detected, Relief Required).
  - Renders a donut chart with disaster category distributions via Recharts.
  - Renders a 24-hour activity line chart.
  - Displays the recent disaster analyses table.
  - Features the "Start New Disaster Analysis" navigation button.

#### `frontend/src/pages/AnalysisPage.tsx`
- **Role:** Interactive multimodal analysis workspace.
- **Operation:**
  - Left panel: Manages image upload, drag-and-drop, and preview display.
  - Right panel: Manages text report input with character counters and keyword injection buttons.
  - Top panel: Provides 1-click loaders for Flooding, Earthquake, and Weather examples.
  - Middle section: Plays an animated six-stage neural execution sequence with progress bars.
  - Lower section: Renders the five classification output cards and the interactive architecture diagram.

#### `frontend/src/pages/ExplainabilityPage.tsx`
- **Role:** Model interpretability and explainability view.
- **Operation:**
  - Section A: Shows the text report with colored token highlight spans. Renders a horizontal bar chart of feature attribution scores.
  - Section B: Displays the disaster image with Grad-CAM style attention bounding overlays. Provides an interactive region inspector and an overlay toggle button.

#### `frontend/src/pages/ArchitecturePage.tsx`
- **Role:** Technical foundation model architecture explorer.
- **Operation:**
  - Architecture tab: Breaks down all seven layers from input ingestion to final multi-task outputs.
  - "Why Multimodal?" tab: Presents a comparative triad contrasting Image-Only, Text-Only, and Multimodal systems.

#### `frontend/src/pages/ResearchInsightsPage.tsx`
- **Role:** Experimental findings and benchmark view.
- **Operation:**
  - Displays a grouped bar chart comparing Baseline Accuracy with Proposed Model Accuracy.
  - Displays the Macro-F1 and Micro-F1 evaluation table.
  - Displays the computational complexity comparison table (DisasterNet vs. Dissa vs. Proposed Model).
  - Outlines key research conclusions and accuracy-F1 trade-offs.

#### `frontend/src/pages/AboutPage.tsx`
- **Role:** Project attribution and research domain profile.
- **Operation:**
  - Highlights core research scope within Computer Science and Engineering.
  - Displays technical focus cards across architecture, vision, NLP, and explainability.
  - Displays the formal project abstract, research motivation, objectives, and future scope items.

#### `frontend/index.html`
- **Role:** Top-level HTML shell.
- **Operation:** Defines viewport metadata, page title, external font imports, and mounts the DOM container `#root`.

#### `frontend/vite.config.ts`
- **Role:** Vite bundler and development server configuration.
- **Operation:**
  - Configures the `@vitejs/plugin-react` and `@tailwindcss/vite` plugins.
  - Proxies `/api` and `/static` requests to the FastAPI backend at `http://127.0.0.1:8000`.

#### `frontend/package.json`
- **Role:** Node.js project manifest.
- **Operation:** Lists package scripts (`dev`, `build`, `preview`) and external dependencies (`react`, `lucide-react`, `recharts`, `framer-motion`, `tailwindcss`).

---

## 5. Data Flow Matrix

| User Action | Frontend Source File | Backend Endpoint | Backend Handler File | Result Output |
| :--- | :--- | :--- | :--- | :--- |
| Load Dashboard | `OverviewPage.tsx` | `GET /api/dashboard` | `dashboard.py` | Renders KPI cards, donut chart, and recent table. |
| Click 1-Click Example | `AnalysisPage.tsx` | `GET /api/examples` | `examples.py` | Fills image preview and text input area. |
| Click "Analyse Disaster" | `AnalysisPage.tsx` | `POST /api/analyze` | `analysis.py` $\rightarrow$ `multimodal_engine.py` | Shows 6-step progress, generates 5 prediction cards. |
| Inspect Word Weights | `ExplainabilityPage.tsx` | Contained in analysis response | `explainability.py` | Highlights tokens and draws feature importance chart. |
| Inspect Image Regions | `ExplainabilityPage.tsx` | Contained in analysis response | `explainability.py` | Draws Grad-CAM bounding box overlays on image. |
| View Research Benchmarks | `ResearchInsightsPage.tsx` | `GET /api/research-results` | `research.py` | Renders grouped bar chart and complexity cards. |

---

## 6. Academic Integrity Notice

1. **Demonstration Mode:** Predictions generated in the live workspace are produced by a deterministic heuristic inference service. They represent the theoretical output of the ResNet-50 + BERT architecture for academic demonstration.
2. **Research Data:** Numbers displayed on the **Research Insights** page are exact historical results from the experimental research paper. They are not measured live from local hardware.

