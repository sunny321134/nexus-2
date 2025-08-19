// Naive placeholder classifiers. Replace with real ML models or APIs later.

export type Diagnosis = {
  disease: string;
  confidence: number;
  precautions: string[];
};

const PRECAUTIONS: Record<string, string[]> = {
  "Leaf Spot": [
    "Remove affected leaves",
    "Improve air circulation",
    "Apply a copper-based fungicide",
  ],
  Blight: [
    "Prune infected parts",
    "Avoid overhead watering",
    "Use certified disease-free seeds",
  ],
  Mildew: [
    "Increase sunlight exposure",
    "Apply sulfur or potassium bicarbonate",
    "Water early in the day",
  ],
  Healthy: ["Maintain regular watering", "Balanced fertilization", "Monitor weekly"],
};

export async function classifyImage(file: File): Promise<Diagnosis> {
  // Heuristic based on file size and name for demo purposes
  const sizeKb = file.size / 1024;
  const name = file.name.toLowerCase();
  let disease = "Healthy";
  if (name.includes("spot") || sizeKb % 3 < 1) disease = "Leaf Spot";
  else if (name.includes("blight") || sizeKb % 5 < 1) disease = "Blight";
  else if (name.includes("mildew") || sizeKb % 7 < 1) disease = "Mildew";
  const confidence = Math.max(0.51, 0.9 - (sizeKb % 10) / 20);
  return { disease, confidence, precautions: PRECAUTIONS[disease] };
}

export async function classifyAudio(audioBlob: Blob): Promise<Diagnosis> {
  // Heuristic: use blob size to pick a class
  const sizeKb = audioBlob.size / 1024;
  let disease = "Healthy";
  if (sizeKb % 2 < 1) disease = "Leaf Spot";
  if (sizeKb % 3 < 1) disease = "Blight";
  if (sizeKb % 5 < 1) disease = "Mildew";
  const confidence = Math.max(0.5, 0.85 - (sizeKb % 8) / 18);
  return { disease, confidence, precautions: PRECAUTIONS[disease] };
}

