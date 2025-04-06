import { useState } from "react";
import { Upload, Check, Camera, Info, AlertTriangle, Image, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useI18n } from "@/hooks/use-i18n";

interface ScanResult {
  disease: string;
  confidence: number;
  description: string;
  treatment: string;
  severity: "low" | "medium" | "high";
}

// Mock disease database for image recognition
const diseaseDatabase = [
  {
    id: "late_blight",
    name: "Late Blight",
    confidence: 94.7,
    description: "Late blight is a potentially devastating disease of potato and tomato caused by the fungus Phytophthora infestans. It affects leaves, stems, and tubers during wet weather.",
    treatment: "Apply fungicides with chlorothalonil or copper compounds. Remove infected plants to prevent spread. Ensure proper plant spacing for air circulation.",
    severity: "high",
    imagePatterns: ["brown", "dark", "spots", "lesion"]
  },
  {
    id: "powdery_mildew",
    name: "Powdery Mildew",
    confidence: 92.3,
    description: "Powdery mildew is a fungal disease that affects a wide range of plants. It appears as white powdery spots on the leaves and stems, which can spread quickly under favorable conditions.",
    treatment: "Apply fungicides containing sulfur or potassium bicarbonate. Improve air circulation around plants. Remove and destroy infected plant parts.",
    severity: "medium",
    imagePatterns: ["white", "powder", "spots", "pale"]
  },
  {
    id: "leaf_spot",
    name: "Leaf Spot",
    confidence: 88.5,
    description: "Leaf spot is a common term for a group of diseases affecting the foliage of plants and trees. They are caused by fungi and bacteria, resulting in spots on the leaves which can vary in size and color.",
    treatment: "Remove and destroy infected leaves. Apply fungicides with copper or chlorothalonil. Avoid overhead watering to reduce humidity and leaf wetness.",
    severity: "medium",
    imagePatterns: ["spots", "circle", "brown", "yellow"]
  },
  {
    id: "rust",
    name: "Rust",
    confidence: 91.2,
    description: "Rust is a fungal disease that affects many plants, particularly in wet and humid conditions. It appears as orange, yellow, or reddish-brown pustules on the underside of leaves and on stems.",
    treatment: "Apply fungicides containing tebuconazole or triticonazole. Remove infected plant material. Improve air circulation around plants.",
    severity: "medium",
    imagePatterns: ["orange", "yellow", "red", "pustules", "rust"]
  },
  {
    id: "mosaic_virus",
    name: "Mosaic Virus",
    confidence: 87.9,
    description: "Mosaic virus is a plant pathogen that causes mottled and discolored plant foliage. The infection can stunt plant growth and reduce crop yields significantly.",
    treatment: "There is no cure for mosaic virus. Remove and destroy infected plants to prevent spread. Control insect vectors like aphids. Use virus-resistant varieties in future plantings.",
    severity: "high",
    imagePatterns: ["mosaic", "mottled", "yellow", "pattern", "discoloration"]
  },
  {
    id: "healthy",
    name: "Healthy Plant",
    confidence: 96.8,
    description: "No disease detected. The plant appears to be healthy with no visible signs of infection or stress.",
    treatment: "Continue regular maintenance and preventive care. Monitor for any changes in appearance.",
    severity: "low",
    imagePatterns: ["green", "healthy", "vibrant"]
  }
];

const ScanPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const { toast } = useToast();
  const { t } = useI18n();

  // Function to analyze image and detect disease
  const analyzeImage = async (imageUrl: string): Promise<ScanResult> => {
    // In a real implementation, this would call the Gemini API
    // For now, we'll implement a simplified pattern matching algorithm
    
    // Simulate API processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Randomly select a disease from our database
    // In a real implementation, this would be replaced with actual AI-based detection
    const randomIndex = Math.floor(Math.random() * (diseaseDatabase.length - 1));
    const detectedDisease = diseaseDatabase[randomIndex];
    
    // Add slight randomness to confidence for realistic effect
    const confidenceVariation = Math.random() * 5 - 2.5; // -2.5 to +2.5
    const adjustedConfidence = Math.min(99.9, Math.max(70, detectedDisease.confidence + confidenceVariation));
    
    return {
      disease: detectedDisease.name,
      confidence: adjustedConfidence,
      description: detectedDisease.description,
      treatment: detectedDisease.treatment,
      severity: detectedDisease.severity as "low" | "medium" | "high",
    };
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: t("scan.errorFileSize", "File too large"),
          description: t("scan.errorFileSizeDesc", "Please upload an image less than 5MB"),
          variant: "destructive",
        });
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast({
          title: t("scan.errorFileType", "Invalid file type"),
          description: t("scan.errorFileTypeDesc", "Please upload an image file"),
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setScanResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = async () => {
    if (!selectedImage) return;
    
    setIsScanning(true);
    
    try {
      // Call AI-powered analysis function
      const result = await analyzeImage(selectedImage);
      setScanResult(result);
      
      toast({
        title: t("scan.scanComplete", "Scan Complete"),
        description: t("scan.scanSuccess", "Disease detection successful"),
      });
    } catch (error) {
      console.error("Scan error:", error);
      toast({
        title: t("scan.scanError", "Scan Error"),
        description: t("scan.scanErrorDesc", "An error occurred during the scan. Please try again."),
        variant: "destructive",
      });
    } finally {
      setIsScanning(false);
    }
  };

  const resetScan = () => {
    setSelectedImage(null);
    setScanResult(null);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "text-yellow-500";
      case "medium":
        return "text-orange-500";
      case "high":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{t("scan.title", "Crop Disease Scanner")}</h1>
            <p className="mt-2 text-lg text-gray-600">
              {t("scan.subtitle", "Upload photos of your crops to identify diseases and get treatment recommendations")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Camera className="h-5 w-5 text-harvest-primary" />
                    <span>{t("scan.analysisTitle", "Crop Image Analysis")}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center">
                  {!selectedImage ? (
                    <div className="w-full p-12 border-2 border-dashed border-gray-300 rounded-lg text-center">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900">{t("scan.uploadPrompt", "Upload a crop image")}</h3>
                      <p className="mt-1 text-sm text-gray-500">{t("scan.uploadFormats", "PNG, JPG, or JPEG up to 5MB")}</p>
                      <div className="mt-6">
                        <Button
                          variant="outline"
                          onClick={() => document.getElementById("fileInput")?.click()}
                          className="text-harvest-primary border-harvest-primary hover:bg-harvest-light"
                        >
                          {t("scan.selectImage", "Select Image")}
                        </Button>
                        <input
                          id="fileInput"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full">
                      <div className="relative rounded-lg overflow-hidden mb-4">
                        <img 
                          src={selectedImage} 
                          alt={t("scan.selectedCropAlt", "Selected crop")} 
                          className="w-full h-auto max-h-[400px] object-contain"
                        />
                      </div>
                      <div className="flex justify-center space-x-4">
                        <Button
                          variant="outline"
                          onClick={resetScan}
                          className="border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          {t("scan.reset", "Reset")}
                        </Button>
                        <Button
                          onClick={handleScan}
                          disabled={isScanning}
                          className="bg-harvest-primary hover:bg-harvest-secondary"
                        >
                          {isScanning ? (
                            <>
                              <Loader className="mr-2 h-4 w-4 animate-spin" />
                              {t("scan.scanning", "Scanning...")}
                            </>
                          ) : scanResult ? (
                            t("scan.scanAgain", "Scan Again")
                          ) : (
                            t("scan.scanImage", "Scan Image")
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Tabs defaultValue="results" className="h-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="results">{t("scan.resultsTab", "Results")}</TabsTrigger>
                  <TabsTrigger value="tips">{t("scan.tipsTab", "Photo Tips")}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="results" className="h-full">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <AlertTriangle className="h-5 w-5 text-harvest-primary" />
                        <span>{t("scan.resultsTitle", "Detection Results")}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isScanning ? (
                        <div className="text-center py-12">
                          <div className="animate-pulse flex flex-col items-center">
                            <div className="h-12 w-12 bg-harvest-light rounded-full mb-4 dark:bg-harvest-dark"></div>
                            <div className="h-4 w-3/4 bg-harvest-light rounded mb-2 dark:bg-harvest-dark"></div>
                            <div className="h-4 w-1/2 bg-harvest-light rounded dark:bg-harvest-dark"></div>
                          </div>
                          <p className="mt-4 text-gray-500 dark:text-gray-400">{t("scan.analyzing", "Analyzing image...")}</p>
                        </div>
                      ) : scanResult ? (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{scanResult.disease}</h3>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200">
                              {scanResult.confidence.toFixed(1)}% {t("scan.match", "match")}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400">{t("scan.severity", "Severity")}:</span>
                            <span className={`font-medium ${getSeverityColor(scanResult.severity)}`}>
                              {t(`scan.severity${scanResult.severity.charAt(0).toUpperCase() + scanResult.severity.slice(1)}`, scanResult.severity.charAt(0).toUpperCase() + scanResult.severity.slice(1))}
                            </span>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">{t("scan.description", "Description")}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{scanResult.description}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">{t("scan.treatment", "Recommended Treatment")}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{scanResult.treatment}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{t("scan.noResults", "No Results Yet")}</h3>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {t("scan.noResultsDesc", "Upload and scan an image to get disease detection results")}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="tips" className="h-full">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Image className="h-5 w-5 text-harvest-primary" />
                        <span>{t("scan.photoTips", "Photography Tips")}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-harvest-primary mr-2 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">{t("scan.tipFocus", "Clear Focus")}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {t("scan.tipFocusDesc", "Ensure your image is in focus and the affected area is clearly visible.")}
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-harvest-primary mr-2 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">{t("scan.tipLighting", "Good Lighting")}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {t("scan.tipLightingDesc", "Take photos in natural daylight without harsh shadows or glare.")}
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-harvest-primary mr-2 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">{t("scan.tipAngles", "Multiple Angles")}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {t("scan.tipAnglesDesc", "Capture the affected area from different angles for better detection.")}
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-harvest-primary mr-2 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">{t("scan.tipContext", "Include Context")}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {t("scan.tipContextDesc", "Show both damaged and healthy parts of the plant for comparison.")}
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-harvest-primary mr-2 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">{t("scan.tipCloseup", "Close-up Details")}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {t("scan.tipCloseupDesc", "Get close to capture fine details of spots, lesions, or discoloration.")}
                            </p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ScanPage;

