import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Eye, 
  Image as ImageIcon,
  FileText,
  RotateCcw,
  Sparkles,
  Loader2
} from 'lucide-react';

import { AnalysisResponse, ExampleCase, NavPage } from '../types';
import { analyzeDisaster, analyzeDisasterJson, fetchExamples } from '../services/api';
import { FALLBACK_EXAMPLES, INITIAL_ANALYSIS_RESULT } from '../data/fallbackData';
import { ClassificationCard } from '../components/ClassificationCard';
import { MultimodalPipeline } from '../components/MultimodalPipeline';
import { DisclaimerBanner } from '../components/DisclaimerBanner';

interface Props {
  currentResult: AnalysisResponse | null;
  onUpdateResult: (result: AnalysisResponse) => void;
  onNavigate: (page: NavPage) => void;
}

export const AnalysisPage: React.FC<Props> = ({ currentResult, onUpdateResult, onNavigate }) => {
  const [examples, setExamples] = useState<ExampleCase[]>(FALLBACK_EXAMPLES);
  const [selectedExampleId, setSelectedExampleId] = useState<string>('case-1-flooding');
  
  // Inputs state
  const [textInput, setTextInput] = useState<string>(FALLBACK_EXAMPLES[0].text_report);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>(FALLBACK_EXAMPLES[0].image_url);
  const [imageMetadata, setImageMetadata] = useState<{ name: string; size: string; dimensions: string }>({
    name: 'flooding_sample.jpg',
    size: '142.5 KB',
    dimensions: '800 × 600 px'
  });

  // Processing state
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchExamples()
      .then((res) => setExamples(res))
      .catch((err) => console.warn('Using local fallback examples:', err));
  }, []);

  const processingSteps = [
    { label: 'Normalising visual input tensors', sub: 'Bilinear resize to 224×224 RGB, mean-std alignment' },
    { label: 'Extracting visual features using ResNet-50', sub: 'Bottleneck residual convolutions → 2048-dim spatial vector' },
    { label: 'Processing textual information using BERT', sub: 'WordPiece tokenization → 768-dim contextual [CLS] embedding' },
    { label: 'Performing multimodal feature fusion', sub: 'Cross-attention projection → 512-dim joint latent space' },
    { label: 'Calculating multi-task classifications', sub: 'Linear MLP heads predict Time, Urgency, Relevance, Damage, Relief' },
    { label: 'Preparing explainability attributions', sub: 'Extracting token importances & spatial attention heatmap' },
  ];

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload a valid image file (JPG, JPEG, or PNG).');
      return;
    }
    setErrorMessage(null);
    setImageFile(file);
    const objectUrl = URL.createObjectURL(file);
    setImagePreviewUrl(objectUrl);
    
    const img = new Image();
    img.onload = () => {
      setImageMetadata({
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        dimensions: `${img.width} × ${img.height} px`
      });
    };
    img.src = objectUrl;
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreviewUrl('');
    setImageMetadata({ name: '', size: '', dimensions: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 1-Click Load Example Case
  const handleLoadExample = (example: ExampleCase) => {
    setSelectedExampleId(example.id);
    setTextInput(example.text_report);
    setImageFile(null);
    setImagePreviewUrl(example.image_url);
    setImageMetadata({
      name: example.image_filename,
      size: '128.4 KB',
      dimensions: '800 × 600 px'
    });
    setErrorMessage(null);
  };

  // Run Multimodal Analysis
  const handleAnalyze = async () => {
    if (!textInput.trim()) {
      setErrorMessage('Please provide a short description or situation report.');
      return;
    }
    setErrorMessage(null);
    setIsAnalyzing(true);
    setCurrentStep(0);

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < processingSteps.length - 1) {
          return prev + 1;
        }
        clearInterval(stepInterval);
        return prev;
      });
    }, 400);

    try {
      let result: AnalysisResponse;
      if (imageFile) {
        const formData = new FormData();
        formData.append('text', textInput);
        formData.append('file', imageFile);
        result = await analyzeDisaster(formData);
      } else {
        result = await analyzeDisasterJson({
          text: textInput,
          example_id: selectedExampleId,
          image_filename: imageMetadata.name || 'flooding_sample.jpg'
        });
      }

      setTimeout(() => {
        clearInterval(stepInterval);
        setCurrentStep(processingSteps.length);
        setIsAnalyzing(false);
        onUpdateResult(result);

        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }, 2400);

    } catch (err: any) {
      clearInterval(stepInterval);
      setIsAnalyzing(false);
      setErrorMessage(err.message || 'Analysis could not be completed. Please check your inputs and try again.');
    }
  };

  const activeResult = currentResult || INITIAL_ANALYSIS_RESULT;

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-[26px] sm:text-[28px] font-semibold text-[#202B38] tracking-tight leading-tight">
            Analyse a Disaster Situation
          </h1>
          <p className="text-[14px] text-[#697586] mt-1 font-normal leading-normal">
            Upload an image and provide a short description to understand the situation through multimodal analysis.
          </p>
        </div>

        <button
          onClick={() => {
            setTextInput('');
            handleRemoveImage();
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#FFFFFF] hover:bg-[#F7F8FA] border border-[#E7EAF0] text-[#697586] hover:text-[#202B38] text-[13px] font-medium transition cursor-pointer self-start sm:self-center"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Form</span>
        </button>
      </div>

      {/* Subtle Information Banner */}
      <DisclaimerBanner text="Demonstration prediction — not generated by a trained research model." />

      {/* Predefined Demonstration Cases */}
      <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E7EAF0] card-shadow">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[12.5px] font-medium text-[#202B38]">
            Predefined Demonstration Cases
          </span>
          <span className="text-[11.5px] text-[#697586] font-normal hidden sm:inline">
            Select a sample to populate inputs
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {examples.map((ex) => {
            const isSelected = selectedExampleId === ex.id;
            return (
              <button
                key={ex.id}
                onClick={() => handleLoadExample(ex)}
                className={`p-3 rounded-lg text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#F0F4F8] border-[#2563A6] text-[#202B38]'
                    : 'bg-[#F7F8FA] border-[#E7EAF0] text-[#4B5565] hover:border-[#CBD5E1] hover:bg-[#FFFFFF]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[12px] font-semibold ${isSelected ? 'text-[#2563A6]' : 'text-[#202B38]'}`}>
                    {ex.category}
                  </span>
                  <span className="text-[10.5px] px-1.5 py-0.5 rounded bg-[#FFFFFF] text-[#697586] border border-[#E7EAF0]">
                    Sample
                  </span>
                </div>
                <p className="text-[12.5px] font-medium text-[#202B38] truncate">{ex.title}</p>
                <p className="text-[11.5px] text-[#697586] line-clamp-1 mt-0.5">{ex.text_report}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-3.5 rounded-lg bg-[#FDF2F2] border border-[#F8D7D7] text-[#C24141] text-[13px] flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-[#D65B5B]" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* TWO SEPARATED INPUT PANELS: Left Image, Right Text */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* LEFT PANEL: Upload Disaster Image */}
        <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E7EAF0] card-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[14px] font-semibold text-[#202B38] flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#2563A6]" /> Upload Disaster Image
              </span>
              <span className="text-[11.5px] text-[#697586]">JPG, JPEG, PNG</span>
            </div>
            <p className="text-[12.5px] text-[#697586] mb-3 font-normal">
              Provide visual documentation such as ground photographs or aerial surveillance.
            </p>

            {/* Drop Zone / Image Preview */}
            {imagePreviewUrl ? (
              <div className="relative rounded-lg overflow-hidden border border-[#E7EAF0] bg-[#F7F8FA] aspect-video flex items-center justify-center">
                <img
                  src={imagePreviewUrl}
                  alt="Disaster Scene Preview"
                  className="w-full h-full object-cover"
                />
                
                {/* Floating Image Metadata Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-center justify-between text-[12px] text-white">
                  <div>
                    <span className="font-medium block truncate max-w-[200px]">{imageMetadata.name}</span>
                    <span className="text-[11px] text-slate-300">{imageMetadata.dimensions} • {imageMetadata.size}</span>
                  </div>
                  <button
                    onClick={handleRemoveImage}
                    className="p-1.5 rounded-md bg-white/20 hover:bg-white/30 text-white transition cursor-pointer"
                    title="Remove Image"
                    aria-label="Remove Image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#E7EAF0] hover:border-[#2563A6] rounded-lg p-6 text-center bg-[#F7F8FA] hover:bg-[#FFFFFF] transition-all cursor-pointer aspect-video flex flex-col items-center justify-center"
              >
                <div className="w-10 h-10 rounded-lg bg-[#F0F4F8] text-[#2563A6] flex items-center justify-center mb-2">
                  <Upload className="w-5 h-5" />
                </div>
                <h4 className="text-[13.5px] font-semibold text-[#202B38] mb-0.5">Click to upload or drag an image here</h4>
                <p className="text-[12px] text-[#697586] max-w-xs">Supports aerial, drone, or ground camera photographs</p>
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              accept="image/png, image/jpeg, image/jpg"
              className="hidden"
            />
          </div>

          <div className="mt-4 pt-3 border-t border-[#E7EAF0] flex items-center justify-between text-[12px] text-[#697586]">
            <span>Visual Encoder: ResNet-50</span>
            <span className="text-[#2563A6] font-medium">2048-dim representation</span>
          </div>
        </div>

        {/* RIGHT PANEL: Describe the Situation */}
        <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E7EAF0] card-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[14px] font-semibold text-[#202B38] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#3B82A0]" /> Describe the Situation
              </span>
              <span className="text-[11.5px] text-[#697586]">
                {textInput.length} characters • {textInput.trim() ? textInput.trim().split(/\s+/).length : 0} words
              </span>
            </div>
            <p className="text-[12.5px] text-[#697586] mb-3 font-normal">
              Enter citizen messages, news updates, or emergency dispatcher logs.
            </p>

            <div>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Example: Severe flooding has been reported in several residential areas. Multiple houses are submerged, roads are blocked, and residents are requesting emergency food and rescue assistance."
                rows={7}
                className="w-full p-3.5 rounded-lg bg-[#F7F8FA] border border-[#E7EAF0] focus:border-[#2563A6] focus:bg-[#FFFFFF] focus:outline-none text-[13.5px] text-[#202B38] placeholder:text-[#9AA4B2] resize-none leading-relaxed transition-colors"
              />
            </div>

            {/* Helper keyword injection tags */}
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
              <span className="text-[11.5px] text-[#697586] mr-1">Insert phrase:</span>
              <button
                type="button"
                onClick={() => setTextInput((prev) => `${prev} Emergency rescue urgently required.`)}
                className="px-2 py-0.5 rounded bg-[#F0F4F8] hover:bg-[#E2ECF5] text-[#2563A6] text-[11.5px] font-normal transition cursor-pointer"
              >
                + Emergency Rescue
              </button>
              <button
                type="button"
                onClick={() => setTextInput((prev) => `${prev} Roads blocked by rubble.`)}
                className="px-2 py-0.5 rounded bg-[#FEF8ED] hover:bg-[#FCEFD9] text-[#B87D1F] text-[11.5px] font-normal transition cursor-pointer"
              >
                + Roads Blocked
              </button>
              <button
                type="button"
                onClick={() => setTextInput('')}
                className="px-2 py-0.5 rounded text-[11.5px] text-[#697586] hover:text-[#C24141] transition cursor-pointer ml-auto"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E7EAF0] flex items-center justify-between text-[12px] text-[#697586]">
            <span>Textual Encoder: BERT-base</span>
            <span className="text-[#3B82A0] font-medium">768-dim representation</span>
          </div>
        </div>

      </div>

      {/* PRIMARY ACTION BUTTON */}
      <div className="flex flex-col items-center justify-center pt-2">
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className={`px-8 py-2.5 rounded-lg font-medium text-[14px] card-shadow flex items-center gap-2 transition-colors cursor-pointer ${
            isAnalyzing
              ? 'bg-[#E7EAF0] text-[#8792A2] cursor-not-allowed'
              : 'bg-[#2563A6] hover:bg-[#1D4F85] text-white'
          }`}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing Situation...</span>
            </>
          ) : (
            <>
              <span>Analyse Situation</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
        <p className="text-[12px] text-[#697586] mt-1.5 font-normal">
          Combines visual damage features with textual situation semantics
        </p>
      </div>

      {/* CLEAN PROCESSING STATE */}
      {isAnalyzing && (
        <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E7EAF0] card-shadow animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-[#E7EAF0]">
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-[#2563A6] animate-spin" />
              <h3 className="text-[13.5px] font-semibold text-[#202B38]">
                Multimodal Analysis in Progress
              </h3>
            </div>
            <span className="text-[12px] text-[#697586]">
              Step {Math.min(currentStep + 1, processingSteps.length)} of {processingSteps.length}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {processingSteps.map((step, idx) => {
              const isCompleted = idx < currentStep;
              const isCurrent = idx === currentStep;
              return (
                <div
                  key={idx}
                  className={`p-2.5 rounded-lg border text-[12px] transition-colors ${
                    isCompleted
                      ? 'bg-[#F0F8F5] border-[#D4EFE6] text-[#1E705C]'
                      : isCurrent
                      ? 'bg-[#F0F4F8] border-[#2563A6] text-[#2563A6]'
                      : 'bg-[#F7F8FA] border-[#E7EAF0] text-[#8792A2]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-medium">
                    {isCompleted ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#23856D] shrink-0" />
                    ) : isCurrent ? (
                      <Loader2 className="w-3.5 h-3.5 text-[#2563A6] animate-spin shrink-0" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border border-[#CBD5E1] text-[9px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                    )}
                    <span className="truncate">{step.label}</span>
                  </div>
                  <p className="text-[11px] text-[#697586] mt-0.5 ml-5 truncate">{step.sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* PREDICTION RESULTS SECTION */}
      <div ref={resultsRef} className="pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#E7EAF0]">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#F0F8F5] text-[#23856D] border border-[#D4EFE6]">
                Analysis Complete
              </span>
              <span className="text-[12px] text-[#697586]">Case ID: {activeResult.analysis_id}</span>
            </div>
            <h2 className="text-[20px] font-semibold text-[#202B38] tracking-tight">
              Classification Results
            </h2>
          </div>

          <button
            onClick={() => onNavigate('explainability')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#FFFFFF] hover:bg-[#F7F8FA] border border-[#E7EAF0] text-[#2563A6] hover:text-[#1D4F85] text-[13px] font-medium transition cursor-pointer self-start sm:self-center"
          >
            <Eye className="w-4 h-4" />
            <span>View Explainable AI Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <ClassificationCard result={activeResult.classifications.time_period} />
          <ClassificationCard result={activeResult.classifications.urgency} />
          <ClassificationCard result={activeResult.classifications.relevance} />
          <ClassificationCard result={activeResult.classifications.damage} />
          <ClassificationCard result={activeResult.classifications.relief} />
        </div>

        {/* Multimodal Pipeline Diagram */}
        <MultimodalPipeline />
      </div>
    </div>
  );
};
