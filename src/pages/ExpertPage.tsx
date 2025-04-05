
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Leaf, Send, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  cropType: z.string().min(1, { message: "Please select a crop type." }),
  issueDescription: z.string().min(10, { message: "Description must be at least 10 characters." }),
});

// Expert data
const experts = [
  {
    id: 1,
    name: "Dr. Anand Sharma",
    title: "Plant Pathologist",
    institution: "ICAR - Indian Agricultural Research Institute",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    expertise: ["Disease Diagnosis", "Sustainable Farming", "Crop Protection"],
  },
  {
    id: 2,
    name: "Prof. Lakshmi Rajan",
    title: "Soil Scientist",
    institution: "Tamil Nadu Agricultural University",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    expertise: ["Soil Health", "Organic Farming", "Fertilizer Management"],
  },
  {
    id: 3,
    name: "Dr. Vikram Patel",
    title: "Agronomist",
    institution: "Kerala Agricultural University",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    expertise: ["Crop Management", "Water Conservation", "Precision Agriculture"],
  },
];

const institutions = [
  {
    name: "ICAR - Indian Agricultural Research Institute",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    name: "Tamil Nadu Agricultural University",
    logo: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    name: "Kerala Agricultural University",
    logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
];

const ExpertPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [fileUploaded, setFileUploaded] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      cropType: "",
      issueDescription: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form values:", values);
      console.log("Uploaded file:", fileUploaded);
      
      setIsSubmitting(false);
      setSuccessDialog(true);
      form.reset();
      setFileUploaded(null);
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileUploaded(file);
    
    if (file) {
      toast({
        title: "File uploaded",
        description: `${file.name} has been successfully uploaded.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">Expert Advice Portal</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with agricultural experts from leading institutions. Our specialists
            will analyze your issues and provide personalized solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {experts.map((expert) => (
            <Card key={expert.id} className="overflow-hidden hover-scale card-shadow">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={expert.image} 
                  alt={expert.name} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">{expert.name}</h3>
                <p className="text-sm text-harvest-primary font-medium mb-2">{expert.title}</p>
                <p className="text-muted-foreground text-sm mb-3">{expert.institution}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {expert.expertise.map((skill, idx) => (
                    <span 
                      key={idx} 
                      className="bg-harvest-light text-harvest-primary text-xs px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Leaf className="mr-2 text-harvest-primary" />
              Ask an Expert
            </h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="cropType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Crop Type</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter crop type (e.g., Rice, Wheat)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="issueDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issue Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the issue you're facing with your crops..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Be specific about symptoms, affected areas, and when you first noticed the issue.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div>
                  <FormLabel htmlFor="image-upload">Upload Images (Optional)</FormLabel>
                  <div className="mt-2">
                    <label
                      htmlFor="image-upload"
                      className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-harvest-primary focus:outline-none"
                    >
                      <span className="flex flex-col items-center justify-center space-y-2">
                        <Upload className="w-6 h-6 text-harvest-primary" />
                        <span className="text-sm text-gray-600">
                          {fileUploaded ? fileUploaded.name : "Drop files here or click to upload"}
                        </span>
                      </span>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Submitting...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Send className="mr-2 h-4 w-4" />
                      Submit Query
                    </div>
                  )}
                </Button>
              </form>
            </Form>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6">Our Partner Institutions</h2>
            <div className="space-y-6">
              {institutions.map((institution, index) => (
                <div 
                  key={index} 
                  className="flex items-center p-4 bg-card rounded-lg border border-border hover:border-harvest-primary transition-colors"
                >
                  <div className="w-16 h-16 min-w-[64px] rounded-md overflow-hidden mr-4">
                    <img 
                      src={institution.logo} 
                      alt={institution.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{institution.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Partnered Expert Institution
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-harvest-light rounded-lg border border-harvest-primary/30">
              <h3 className="text-lg font-medium text-harvest-primary mb-2">How It Works</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Submit your query using the form</li>
                <li>Our team routes your question to the appropriate expert</li>
                <li>Receive a personalized response within 24-48 hours</li>
                <li>Follow up with additional questions if needed</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={successDialog} onOpenChange={setSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Query Submitted Successfully!</DialogTitle>
            <DialogDescription>
              Thank you for your query. Our experts will analyze your issue and provide
              a personalized response within 24-48 hours. You'll receive a notification
              at your provided email address.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={() => setSuccessDialog(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExpertPage;
