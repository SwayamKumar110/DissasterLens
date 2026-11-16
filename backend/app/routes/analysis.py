import os
from typing import Optional
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from pydantic import BaseModel

from app.models.schemas import AnalysisResponse
from app.services.multimodal_engine import multimodal_engine

router = APIRouter(prefix="/api", tags=["analysis"])

class AnalyzeJsonRequest(BaseModel):
    text: str
    example_id: Optional[str] = None
    image_filename: Optional[str] = None

@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_disaster(
    text: str = Form(...),
    file: Optional[UploadFile] = File(None),
    image_filename: Optional[str] = Form(None)
):
    """
    Multimodal disaster prediction and explainability endpoint.
    Accepts an uploaded image file (or referenced sample image) along with disaster text.
    """
    if not text or not text.strip():
        raise HTTPException(status_code=400, detail="Textual disaster report cannot be empty.")

    image_bytes = b""
    resolved_filename = "custom_upload.jpg"

    if file and file.filename:
        image_bytes = await file.read()
        resolved_filename = file.filename
    elif image_filename:
        # Load referenced sample image
        resolved_filename = os.path.basename(image_filename)
        path = os.path.join("backend", "static", "sample_images", resolved_filename)
        if not os.path.exists(path):
            path = os.path.join("static", "sample_images", resolved_filename)
        if os.path.exists(path):
            with open(path, "rb") as f:
                image_bytes = f.read()

    # Fallback if no bytes
    if not image_bytes:
        # Generate dummy 1x1 image or default bytes
        resolved_filename = "standard_observation.jpg"
        path = os.path.join("backend", "static", "sample_images", "flooding_sample.jpg")
        if not os.path.exists(path):
            path = os.path.join("static", "sample_images", "flooding_sample.jpg")
        if os.path.exists(path):
            with open(path, "rb") as f:
                image_bytes = f.read()

    return multimodal_engine.analyze(image_bytes=image_bytes, filename=resolved_filename, text=text)


@router.post("/analyze-json", response_model=AnalysisResponse)
async def analyze_disaster_json(req: AnalyzeJsonRequest):
    """
    JSON convenience endpoint for sample cases and automated requests.
    """
    if not req.text.strip():
        raise HTTPException(status_code=400, detail="Textual disaster report cannot be empty.")

    filename = req.image_filename or "sample.jpg"
    if req.example_id:
        if "flood" in req.example_id:
            filename = "flooding_sample.jpg"
        elif "earthquake" in req.example_id:
            filename = "earthquake_sample.jpg"
        elif "weather" in req.example_id or "normal" in req.example_id:
            filename = "normal_weather_sample.jpg"

    path = os.path.join("backend", "static", "sample_images", filename)
    if not os.path.exists(path):
        path = os.path.join("static", "sample_images", filename)

    image_bytes = b""
    if os.path.exists(path):
        with open(path, "rb") as f:
            image_bytes = f.read()

    return multimodal_engine.analyze(image_bytes=image_bytes, filename=filename, text=req.text)

