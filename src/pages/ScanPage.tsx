
import { useState } from "react";
import { Upload, Check, Camera, Info, AlertTriangle, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface ScanResult {
  disease: string;
  confidence: number;
  description: string;
  treatment: string;
  severity: "low" | "medium" | "high";
}

const ScanPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image less than 5MB",
          variant: "destructive",
        });
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file",
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

  const handleScan = () => {
    if (!selectedImage) return;
    
    setIsScanning(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Mock result - in real app this would come from the API
      const mockResult: ScanResult = {
        disease: "Late Blight",
        confidence: 94.7,
        description: "Late blight is a potentially devastating disease of potato and tomato caused by the fungus Phytophthora infestans. It affects leaves, stems, and tubers during wet weather.",
        treatment: "Apply fungicides with chlorothalonil or copper compounds. Remove infected plants to prevent spread. Ensure proper plant spacing for air circulation.",
        severity: "high",
      };
      
      setScanResult(mockResult);
      setIsScanning(false);
      
      toast({
        title: "Scan Complete",
        description: "Disease detection successful",
      });
    }, 2500);
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
            <h1 className="text-3xl font-bold text-gray-900">Crop Disease Scanner</h1>
            <p className="mt-2 text-lg text-gray-600">
              Upload photos of your crops to identify diseases and get treatment recommendations
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Camera className="h-5 w-5 text-harvest-primary" />
                    <span>Crop Image Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center">
                  {!selectedImage ? (
                    <div className="w-full p-12 border-2 border-dashed border-gray-300 rounded-lg text-center">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900">Upload a crop image</h3>
                      <p className="mt-1 text-sm text-gray-500">PNG, JPG, or JPEG up to 5MB</p>
                      <div className="mt-6">
                        <Button
                          variant="outline"
                          onClick={() => document.getElementById("fileInput")?.click()}
                          className="text-harvest-primary border-harvest-primary hover:bg-harvest-light"
                        >
                          Select Image
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
                          alt="Selected crop" 
                          className="w-full h-auto max-h-[400px] object-contain"
                        />
                      </div>
                      <div className="flex justify-center space-x-4">
                        <Button
                          variant="outline"
                          onClick={resetScan}
                          className="border-red-500 text-red-500 hover:bg-red-50"
                        >
                          Reset
                        </Button>
                        <Button
                          onClick={handleScan}
                          disabled={isScanning}
                          className="bg-harvest-primary hover:bg-harvest-secondary"
                        >
                          {isScanning ? "Scanning..." : scanResult ? "Scan Again" : "Scan Image"}
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
                  <TabsTrigger value="results">Results</TabsTrigger>
                  <TabsTrigger value="tips">Photo Tips</TabsTrigger>
                </TabsList>
                
                <TabsContent value="results" className="h-full">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <AlertTriangle className="h-5 w-5 text-harvest-primary" />
                        <span>Detection Results</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isScanning ? (
                        <div className="text-center py-12">
                          <div className="animate-pulse flex flex-col items-center">
                            <div className="h-12 w-12 bg-harvest-light rounded-full mb-4"></div>
                            <div className="h-4 w-3/4 bg-harvest-light rounded mb-2"></div>
                            <div className="h-4 w-1/2 bg-harvest-light rounded"></div>
                          </div>
                          <p className="mt-4 text-gray-500">Analyzing image...</p>
                        </div>
                      ) : scanResult ? (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold text-gray-900">{scanResult.disease}</h3>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {scanResult.confidence.toFixed(1)}% match
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">Severity:</span>
                            <span className={`font-medium ${getSeverityColor(scanResult.severity)}`}>
                              {scanResult.severity.charAt(0).toUpperCase() + scanResult.severity.slice(1)}
                            </span>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-1">Description</h4>
                            <p className="text-sm text-gray-600">{scanResult.description}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-1">Recommended Treatment</h4>
                            <p className="text-sm text-gray-600">{scanResult.treatment}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900">No Results Yet</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Upload and scan an image to get disease detection results
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
                        <span>Photography Tips</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-harvest-primary mr-2 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Clear Focus</h4>
                            <p className="text-sm text-gray-600">
                              Ensure your image is in focus and the affected area is clearly visible.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-harvest-primary mr-2 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Good Lighting</h4>
                            <p className="text-sm text-gray-600">
                              Take photos in natural daylight without harsh shadows or glare.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-harvest-primary mr-2 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Multiple Angles</h4>
                            <p className="text-sm text-gray-600">
                              Capture the affected area from different angles for better detection.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-harvest-primary mr-2 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Include Context</h4>
                            <p className="text-sm text-gray-600">
                              Show both damaged and healthy parts of the plant for comparison.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-harvest-primary mr-2 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Close-up Details</h4>
                            <p className="text-sm text-gray-600">
                              Get close to capture fine details of spots, lesions, or discoloration.
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
