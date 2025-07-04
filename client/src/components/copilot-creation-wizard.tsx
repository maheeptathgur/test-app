import { useState } from "react";
import { MessageSquare, Smartphone, Image, HelpCircle, Check, ChevronRight, ArrowLeft, Upload, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface CopilotCreationWizardProps {
  onCreateCopilot: (data: { name: string; description: string; type: string }) => void;
  onClose: () => void;
}

interface WizardStep {
  id: number;
  title: string;
  isCompleted: boolean;
}

export function CopilotCreationWizard({ onCreateCopilot, onClose }: CopilotCreationWizardProps) {
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
    onCreateCopilot({
      name: formData.name,
      description: formData.description || formData.purpose,
      type: formData.builderType === "chat" ? "general" : 
            formData.builderType === "app" ? "form" : 
            formData.builderType === "image" ? "content" : "general",
    });
    onClose();
  };

  const getNextButtonText = () => {
    switch (currentStep) {
      case 1: return "Next, you'll define your AI's purpose";
      case 2: return "Next, choose a name";
      case 3: return "Next, customize profile";
      case 4: return "Next, select user inputs";
      case 5: return "Next, upload knowledge";
      default: return "Next";
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose what you want to build</h2>
              <p className="text-gray-600">Select the type of application you want to create.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {/* Chat Copilot Builder - Featured */}
              <Card 
                className={`cursor-pointer transition-all border-2 ${
                  formData.builderType === "chat" 
                    ? "border-[#008062] bg-[#008062] text-white" 
                    : "border-gray-200 hover:border-[#008062] hover:shadow-md"
                }`}
                onClick={() => setFormData({ ...formData, builderType: "chat" })}
              >
                <CardHeader className="text-center">
                  <div className={`p-3 rounded-lg mx-auto w-fit mb-3 ${
                    formData.builderType === "chat" ? "bg-white/20" : "bg-[#008062] text-white"
                  }`}>
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <CardTitle className={`text-lg ${formData.builderType === "chat" ? "text-white" : "text-gray-900"}`}>
                    Chat Copilot Builder
                  </CardTitle>
                  <CardDescription className={`${formData.builderType === "chat" ? "text-white/80" : "text-gray-600"} text-sm`}>
                    Create an AI-powered chat assistant to answer questions and guide users in real time.
                  </CardDescription>
                  {formData.builderType === "chat" && (
                    <Check className="w-5 h-5 text-white mx-auto mt-2" />
                  )}
                </CardHeader>
              </Card>

              {/* App Builder */}
              <Card 
                className={`cursor-pointer transition-all border-2 ${
                  formData.builderType === "app" 
                    ? "border-[#008062] bg-blue-50" 
                    : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                }`}
                onClick={() => setFormData({ ...formData, builderType: "app" })}
              >
                <CardHeader className="text-center">
                  <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mx-auto w-fit mb-3">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg text-gray-900">App Builder</CardTitle>
                  <CardDescription className="text-gray-600 text-sm">
                    Build an AI-powered app with structured form inputs and AI-generated responses
                  </CardDescription>
                  {formData.builderType === "app" && (
                    <Check className="w-5 h-5 text-[#008062] mx-auto mt-2" />
                  )}
                </CardHeader>
              </Card>

              {/* Image App Builder */}
              <Card 
                className={`cursor-pointer transition-all border-2 ${
                  formData.builderType === "image" 
                    ? "border-[#008062] bg-purple-50" 
                    : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                }`}
                onClick={() => setFormData({ ...formData, builderType: "image" })}
              >
                <CardHeader className="text-center">
                  <div className="p-3 rounded-lg bg-purple-100 text-purple-600 mx-auto w-fit mb-3">
                    <Image className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg text-gray-900">Image App Builder</CardTitle>
                  <CardDescription className="text-gray-600 text-sm">
                    Design an AI-powered app that generates images based on user inputs
                  </CardDescription>
                  {formData.builderType === "image" && (
                    <Check className="w-5 h-5 text-[#008062] mx-auto mt-2" />
                  )}
                </CardHeader>
              </Card>
            </div>

            {/* Help Section */}
            <Card className="bg-gray-50 max-w-4xl mx-auto">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Help me choose</h4>
                    <div className="space-y-2 text-sm text-gray-600">
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
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Define AI's Purpose</h2>
              <p className="text-gray-600">What should your AI assistant do? Be specific about its role and capabilities.</p>
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
                  <h4 className="font-medium text-gray-900 mb-2">Good examples:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Help customers with product support</li>
                    <li>• Generate marketing content ideas</li>
                    <li>• Analyze sales data and trends</li>
                    <li>• Create personalized workout plans</li>
                  </ul>
                </Card>
                
                <Card className="p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Be specific about:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
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
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose a Name</h2>
              <p className="text-gray-600">Give your AI assistant a memorable name that reflects its purpose.</p>
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
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Customize Profile</h2>
              <p className="text-gray-600">What information should your AI collect about users to personalize responses?</p>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  'Job Title', 'Company', 'Industry', 'Experience Level',
                  'Location', 'Goals', 'Preferences', 'Use Case',
                  'Team Size', 'Budget Range', 'Timeline', 'Department'
                ].map((field) => (
                  <Card 
                    key={field}
                    className={`p-3 cursor-pointer transition-all border-2 ${
                      formData.profileFields.includes(field)
                        ? 'border-[#008062] bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
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
                        <Check className="w-4 h-4 text-[#008062]" />
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
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">User Inputs</h2>
              <p className="text-gray-600">What types of input should users be able to provide to your AI?</p>
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
                          ? 'border-[#008062] bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => {
                        const inputs = formData.userInputs.includes(input.name)
                          ? formData.userInputs.filter(i => i !== input.name)
                          : [...formData.userInputs, input.name];
                        setFormData({ ...formData, userInputs: inputs });
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className="w-5 h-5 text-gray-600" />
                        <span className="font-medium flex-1">{input.name}</span>
                        {formData.userInputs.includes(input.name) && (
                          <Check className="w-4 h-4 text-[#008062]" />
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
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Knowledge</h2>
              <p className="text-gray-600">Add documents and data sources to make your AI more knowledgeable.</p>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  'Company Policies', 'Product Manuals', 'FAQ Documents', 'Training Materials',
                  'Knowledge Base', 'Process Guides', 'Templates', 'Industry Data',
                  'Customer Data', 'Historical Records', 'Best Practices', 'Troubleshooting Guides'
                ].map((source) => (
                  <Card 
                    key={source}
                    className={`p-3 cursor-pointer transition-all border-2 ${
                      formData.knowledgeFiles.includes(source)
                        ? 'border-[#008062] bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => {
                      const files = formData.knowledgeFiles.includes(source)
                        ? formData.knowledgeFiles.filter(f => f !== source)
                        : [...formData.knowledgeFiles, source];
                      setFormData({ ...formData, knowledgeFiles: files });
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{source}</span>
                      {formData.knowledgeFiles.includes(source) && (
                        <Check className="w-4 h-4 text-[#008062]" />
                      )}
                    </div>
                  </Card>
                ))}
              </div>
              
              <Card className="p-4 border-2 border-dashed border-gray-300 bg-gray-50">
                <div className="text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
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
    <div className="h-full bg-white">
      {/* Header with close button */}
      <div className="border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create New Copilot</h1>
            <p className="text-gray-600 mt-1">Follow the steps below to set up your AI assistant</p>
          </div>
          <Button variant="ghost" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Progress Steps */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium ${
                  step.id === currentStep 
                    ? 'bg-[#008062] border-[#008062] text-white'
                    : step.isCompleted 
                    ? 'bg-green-100 border-green-500 text-green-700'
                    : 'bg-gray-100 border-gray-300 text-gray-500'
                }`}>
                  {step.isCompleted && step.id !== currentStep ? <Check className="w-4 h-4" /> : step.id}
                </div>
                <div className="mt-2 hidden sm:block">
                  <div className={`text-xs font-medium text-center ${
                    step.id === currentStep 
                      ? 'text-[#008062]'
                      : step.isCompleted 
                      ? 'text-green-700'
                      : 'text-gray-500'
                  }`}>
                    {step.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Progress Bar */}
          <Progress value={(currentStep / 6) * 100} className="w-full" />
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 py-8">
        {renderStepContent()}
      </div>
      
      {/* Footer */}
      <div className="border-t border-gray-200 px-8 py-6 bg-gray-50">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {currentStep > 1 && (
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
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
                className="bg-[#008062] hover:bg-[#00d2a0] text-white"
              >
                {getNextButtonText()}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={handleComplete}
                className="bg-[#008062] hover:bg-[#00d2a0] text-white"
              >
                Create Copilot
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}