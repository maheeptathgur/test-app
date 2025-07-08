import { useState } from "react";
import { Plus, MessageSquare, Smartphone, Image, HelpCircle, Check, ChevronRight, ArrowLeft, Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface CreateCopilotModalProps {
  onCreateCopilot: (data: { name: string; description: string; type: string }) => void;
}

interface WizardStep {
  id: number;
  title: string;
  isCompleted: boolean;
}

export function CreateCopilotModal({ onCreateCopilot }: CreateCopilotModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    builderType: "",
    purpose: "",
    name: "",
    description: "",
    profileFields: [] as string[],
    userInputs: [] as string[],
    knowledgeFiles: [] as string[],
  });

  const steps: WizardStep[] = [
    { id: 1, title: "Choose Copilot", isCompleted: !!formData.builderType },
    { id: 2, title: "Define AI's Purpose", isCompleted: !!formData.purpose },
    { id: 3, title: "Choose a Name", isCompleted: !!formData.name },
    { id: 4, title: "Customize Profile", isCompleted: formData.profileFields.length > 0 },
    { id: 5, title: "User Inputs", isCompleted: formData.userInputs.length > 0 },
    { id: 6, title: "Upload Knowledge", isCompleted: formData.knowledgeFiles.length > 0 },
  ];

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Convert wizard data to copilot format
    onCreateCopilot({
      name: formData.name,
      description: formData.description || formData.purpose,
      type: formData.builderType === "chat" ? "general" : 
            formData.builderType === "app" ? "form" : 
            formData.builderType === "image" ? "content" : "general",
    });
    
    // Reset form
    setFormData({
      builderType: "",
      purpose: "",
      name: "",
      description: "",
      profileFields: [],
      userInputs: [],
      knowledgeFiles: [],
    });
    setCurrentStep(1);
    setIsOpen(false);
  };

  const resetWizard = () => {
    setCurrentStep(1);
    setFormData({
      builderType: "",
      purpose: "",
      name: "",
      description: "",
      profileFields: [],
      userInputs: [],
      knowledgeFiles: [],
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-2">Choose what you want to build</h2>
              <p className="text-muted-foreground">Select the type of application you want to create.</p>
            </div>
            
            <div className="grid gap-4">
              {/* Chat Copilot Builder - Featured */}
              <Card 
                className={`cursor-pointer transition-all border-2 ${
                  formData.builderType === "chat" 
                    ? "border-[var(--theme-primary)] theme-primary text-card-foreground" 
                    : "border-[hsl(var(--border))] hover:border-[var(--theme-primary)] hover:shadow-md"
                }`}
                onClick={() => setFormData({ ...formData, builderType: "chat" })}
              >
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className={`p-3 rounded-lg ${
                    formData.builderType === "chat" ? "bg-card/20" : "theme-primary text-card-foreground"
                  }`}>
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className={`text-lg ${formData.builderType === "chat" ? "text-card-foreground" : "text-[hsl(var(--foreground))]"}`}>
                      Chat Copilot Builder
                    </CardTitle>
                    <CardDescription className={formData.builderType === "chat" ? "text-card-foreground/80" : "text-muted-foreground"}>
                      Create an AI-powered chat assistant to answer questions and guide users in real time.
                    </CardDescription>
                  </div>
                  {formData.builderType === "chat" && (
                    <Check className="w-5 h-5 text-card-foreground" />
                  )}
                </CardHeader>
              </Card>

              {/* App Builder */}
              <Card 
                className={`cursor-pointer transition-all border-2 ${
                  formData.builderType === "app" 
                    ? "border-[var(--theme-primary)] bg-blue-50" 
                    : "border-[hsl(var(--border))] hover:border-[hsl(var(--border))] hover:shadow-md"
                }`}
                onClick={() => setFormData({ ...formData, builderType: "app" })}
              >
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg text-[hsl(var(--foreground))]">App Builder</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Build an AI-powered app with structured form inputs and AI-generated responses
                    </CardDescription>
                  </div>
                  {formData.builderType === "app" && (
                    <Check className="w-5 h-5 text-[var(--theme-primary)]" />
                  )}
                </CardHeader>
              </Card>

              {/* Image App Builder */}
              <Card 
                className={`cursor-pointer transition-all border-2 ${
                  formData.builderType === "image" 
                    ? "border-[var(--theme-primary)] bg-purple-50" 
                    : "border-[hsl(var(--border))] hover:border-[hsl(var(--border))] hover:shadow-md"
                }`}
                onClick={() => setFormData({ ...formData, builderType: "image" })}
              >
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                    <Image className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg text-[hsl(var(--foreground))]">Image App Builder</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Design an AI-powered app that generates images based on user inputs
                    </CardDescription>
                  </div>
                  {formData.builderType === "image" && (
                    <Check className="w-5 h-5 text-[var(--theme-primary)]" />
                  )}
                </CardHeader>
              </Card>
            </div>

            {/* Help Section */}
            <Card className="bg-[hsl(var(--muted))]">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-[hsl(var(--muted-foreground))] mt-0.5" />
                  <div>
                    <h4 className="font-medium text-[hsl(var(--foreground))] mb-2">Help me choose</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p><strong>Chat Copilot Builder:</strong> Choose this if you want an AI that chats with users in real time. Best for answering questions, offering support, or acting as a guide.</p>
                      <p><strong>App Builder:</strong> Choose this if you need an AI app where users enter structured inputs, and AI generates tailored responses.</p>
                      <p><strong>Image App Builder:</strong> Choose this if you want an AI app that generates images based on structured user inputs.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-2">Define AI's Purpose</h2>
              <p className="text-muted-foreground">What should your AI assistant do? Be specific about its role and capabilities.</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="purpose">AI Purpose & Description</Label>
                <Textarea
                  id="purpose"
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  placeholder="Describe what your AI should do, its expertise, and how it should help users..."
                  rows={6}
                  className="mt-2"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h4 className="font-medium text-[hsl(var(--foreground))] mb-2">Good examples:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Help customers with product support</li>
                    <li>• Generate marketing content ideas</li>
                    <li>• Analyze sales data and trends</li>
                    <li>• Create personalized workout plans</li>
                  </ul>
                </Card>
                
                <Card className="p-4">
                  <h4 className="font-medium text-[hsl(var(--foreground))] mb-2">Be specific about:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Target audience</li>
                    <li>• Key tasks it should perform</li>
                    <li>• Tone and style preferences</li>
                    <li>• Any limitations or boundaries</li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-2">Choose a Name</h2>
              <p className="text-muted-foreground">Give your AI assistant a memorable name that reflects its purpose.</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Copilot Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter a name for your AI assistant"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Short Description (Optional)</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description that appears on the copilot card"
                  className="mt-2"
                />
              </div>
              
              <Card className="p-4 bg-blue-50">
                <h4 className="font-medium text-blue-900 mb-2">Naming Tips:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Keep it short and memorable</li>
                  <li>• Reflect the AI's purpose or personality</li>
                  <li>• Consider your brand or team name</li>
                  <li>• Avoid generic names like "Assistant" or "Bot"</li>
                </ul>
              </Card>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-2">Customize Profile</h2>
              <p className="text-muted-foreground">What information should your AI collect about users to personalize responses?</p>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Job Title', 'Company', 'Industry', 'Experience Level',
                  'Location', 'Goals', 'Preferences', 'Use Case',
                  'Team Size', 'Budget Range', 'Timeline', 'Department'
                ].map((field) => (
                  <Card 
                    key={field}
                    className={`p-3 cursor-pointer transition-all border-2 ${
                      formData.profileFields.includes(field)
                        ? 'border-[var(--theme-primary)] bg-green-50'
                        : 'border-[hsl(var(--border))] hover:border-[hsl(var(--border))]'
                    }`}
                    onClick={() => {
                      const fields = formData.profileFields.includes(field)
                        ? formData.profileFields.filter(f => f !== field)
                        : [...formData.profileFields, field];
                      setFormData({ ...formData, profileFields: fields });
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{field}</span>
                      {formData.profileFields.includes(field) && (
                        <Check className="w-4 h-4 text-[var(--theme-primary)]" />
                      )}
                    </div>
                  </Card>
                ))}
              </div>
              
              <Card className="p-4 bg-yellow-50">
                <h4 className="font-medium text-yellow-900 mb-2">Privacy Note:</h4>
                <p className="text-sm text-yellow-800">
                  Only collect information that's necessary for your AI to provide better, more personalized responses. 
                  Users can always skip optional fields.
                </p>
              </Card>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-2">User Inputs</h2>
              <p className="text-muted-foreground">What types of input should users be able to provide to your AI?</p>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { name: 'Text Messages', icon: MessageSquare },
                  { name: 'File Uploads', icon: Upload },
                  { name: 'Documents', icon: FileText },
                  { name: 'Images', icon: Image },
                  { name: 'Voice Messages', icon: Smartphone },
                  { name: 'Structured Forms', icon: HelpCircle }
                ].map((input) => {
                  const IconComponent = input.icon;
                  return (
                    <Card 
                      key={input.name}
                      className={`p-4 cursor-pointer transition-all border-2 ${
                        formData.userInputs.includes(input.name)
                          ? 'border-[var(--theme-primary)] bg-green-50'
                          : 'border-[hsl(var(--border))] hover:border-[hsl(var(--border))]'
                      }`}
                      onClick={() => {
                        const inputs = formData.userInputs.includes(input.name)
                          ? formData.userInputs.filter(i => i !== input.name)
                          : [...formData.userInputs, input.name];
                        setFormData({ ...formData, userInputs: inputs });
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium flex-1">{input.name}</span>
                        {formData.userInputs.includes(input.name) && (
                          <Check className="w-4 h-4 text-[var(--theme-primary)]" />
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
              
              <Card className="p-4 bg-blue-50">
                <h4 className="font-medium text-blue-900 mb-2">Recommendation:</h4>
                <p className="text-sm text-blue-800">
                  For most copilots, we recommend enabling Text Messages and File Uploads at minimum. 
                  You can always add more input types later.
                </p>
              </Card>
            </div>
          </div>
        );
      
      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-2">Upload Knowledge</h2>
              <p className="text-muted-foreground">Add documents and data sources to make your AI more knowledgeable.</p>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Company Policies', 'Product Manuals', 'FAQ Documents', 'Training Materials',
                  'Knowledge Base', 'Process Guides', 'Templates', 'Industry Data',
                  'Customer Data', 'Historical Records', 'Best Practices', 'Troubleshooting Guides'
                ].map((source) => (
                  <Card 
                    key={source}
                    className={`p-3 cursor-pointer transition-all border-2 ${
                      formData.knowledgeFiles.includes(source)
                        ? 'border-[var(--theme-primary)] bg-green-50'
                        : 'border-[hsl(var(--border))] hover:border-[hsl(var(--border))]'
                    }`}
                    onClick={() => {
                      const files = formData.knowledgeFiles.includes(source)
                        ? formData.knowledgeFiles.filter(f => f !== source)
                        : [...formData.knowledgeFiles, source];
                      setFormData({ ...formData, knowledgeFiles: files });
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{source}</span>
                      {formData.knowledgeFiles.includes(source) && (
                        <Check className="w-4 h-4 text-[var(--theme-primary)]" />
                      )}
                    </div>
                  </Card>
                ))}
              </div>
              
              <Card className="p-4 border-2 border-dashed border-[hsl(var(--border))] bg-[hsl(var(--muted))]">
                <div className="text-center">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Drag and drop files here, or click to browse</p>
                  <Button variant="outline" size="sm">Choose Files</Button>
                </div>
              </Card>
              
              <Card className="p-4 bg-green-50">
                <h4 className="font-medium text-green-900 mb-2">Knowledge Sources:</h4>
                <p className="text-sm text-green-800">
                  You can upload documents now or add them later. Common formats include PDF, Word docs, 
                  text files, and spreadsheets. The AI will use this knowledge to provide better answers.
                </p>
              </Card>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) resetWizard();
    }}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          New Copilot
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          {/* Progress Steps */}
          <div className="flex items-center justify-between px-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium ${
                  step.id === currentStep 
                    ? 'theme-primary border-[var(--theme-primary)] text-card-foreground'
                    : step.isCompleted 
                    ? 'bg-green-100 border-green-500 text-green-700'
                    : 'bg-[hsl(var(--muted))] border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]'
                }`}>
                  {step.isCompleted && step.id !== currentStep ? <Check className="w-4 h-4" /> : step.id}
                </div>
                <div className="ml-2 hidden sm:block">
                  <div className={`text-xs font-medium ${
                    step.id === currentStep 
                      ? 'text-[var(--theme-primary)]'
                      : step.isCompleted 
                      ? 'text-green-700'
                      : 'text-[hsl(var(--muted-foreground))]'
                  }`}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-gray-300 ml-2 hidden sm:block" />
                )}
              </div>
            ))}
          </div>
          
          {/* Progress Bar */}
          <Progress value={(currentStep / 6) * 100} className="w-full" />
        </DialogHeader>
        
        <div className="px-6 py-4">
          {renderStepContent()}
        </div>
        
        <div className="flex justify-between items-center px-6 py-4 border-t">
          <div className="flex gap-2">
            {currentStep > 1 && (
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            {currentStep < 6 ? (
              <Button 
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && !formData.builderType) ||
                  (currentStep === 2 && !formData.purpose) ||
                  (currentStep === 3 && !formData.name)
                }
                className="theme-primary theme-primary-hover:hover text-card-foreground"
              >
                Next, you'll define your AI's purpose
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={handleComplete}
                className="theme-primary theme-primary-hover:hover text-card-foreground"
              >
                Create Copilot
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
