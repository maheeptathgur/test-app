import { useState, useEffect, useRef } from "react";
import { X, UserCog, FileText, Wand2, Download, RefreshCw, Check, Edit3, Upload, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";

import { CopilotData, ProfileField } from "@/lib/types";

interface FormInterfaceProps {
  isOpen: boolean;
  copilot: CopilotData | null;
  onClose: () => void;
}

export function FormInterface({ isOpen, copilot, onClose }: FormInterfaceProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [showProfileFields, setShowProfileFields] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize form data with default values
  useEffect(() => {
    if (copilot?.name === 'Resume Assistant') {
      setFormData({
        prompt: '',
        job_description: '',
        current_resume: ''
      });
    }
  }, [copilot]);

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Read file content and set it as current_resume
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setFormData(prev => ({ ...prev, current_resume: content }));
      };
      reader.readAsText(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setFormData(prev => ({ ...prev, current_resume: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedContent(`# Optimized Resume Content

**Professional Summary**
Dynamic ${profileData.career_level || 'professional'} with proven expertise in ${profileData.target_industry || 'technology'} seeking ${profileData.job_type || 'full-time'} opportunities. Demonstrated ability to deliver results through strategic thinking and collaborative leadership.

**Key Improvements Applied:**

✅ **ATS Optimization:** Added relevant keywords from job description
✅ **Impact Metrics:** Quantified achievements with specific numbers
✅ **Skills Alignment:** Highlighted skills matching job requirements
✅ **Format Enhancement:** Improved structure for better readability

**Enhanced Skills Section:**
- ${formData.job_description ? 'Skills extracted and matched from job posting' : 'Core competencies aligned with industry standards'}
- Leadership and team management
- Project coordination and delivery
- Data analysis and reporting
- Cross-functional collaboration

**Experience Highlights:**
• Led cross-functional teams of 8+ members to deliver projects 20% ahead of schedule
• Increased process efficiency by 35% through strategic workflow optimization
• Managed budgets exceeding $500K while maintaining 98% accuracy
• Developed training programs that improved team productivity by 25%

**Recommendations:**
1. Add 2-3 specific achievements with quantifiable results
2. Include relevant certifications for your target industry
3. Customize skills section for each job application
4. Use action verbs to start each bullet point

**ATS Score:** 87/100 (Excellent)
**Keyword Match:** 92% alignment with job description
**Overall Rating:** Highly optimized for ${profileData.target_industry || 'target'} roles`);
      setIsGenerating(false);
      setShowResult(true);
    }, 3000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'optimized_resume_content.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    
    // Simulate modifying the content based on the chat input
    setIsGenerating(true);
    setTimeout(() => {
      // Add a modification note to the generated content
      const modification = `\n\n[MODIFICATION APPLIED: ${chatInput}]\n\nThe content has been updated based on your request. Here's the revised version:\n\n${generatedContent}`;
      setGeneratedContent(modification);
      setChatInput('');
      setIsGenerating(false);
    }, 2000);
  };

  const renderProfileField = (field: ProfileField) => {
    const value = profileData[field.name] || '';
    
    switch (field.type) {
      case 'select':
        return (
          <Select value={value} onValueChange={(value) => handleProfileChange(field.name, value)} disabled={!isEditingProfile}>
            <SelectTrigger className="h-8">
              <SelectValue placeholder={field.description} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={(e) => handleProfileChange(field.name, e.target.value)}
            className="h-20"
            placeholder={field.description}
            disabled={!isEditingProfile}
          />
        );
      default:
        return (
          <Input
            value={value}
            onChange={(e) => handleProfileChange(field.name, e.target.value)}
            className="h-8"
            placeholder={field.description}
            disabled={!isEditingProfile}
          />
        );
    }
  };

  if (!isOpen || !copilot) return null;

  return (
    <>
      {/* Form Sidebar - positioned next to main sidebar */}
      <div className="w-80 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{copilot.name}</h3>
                <p className="text-xs text-muted-foreground">{copilot.description}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onClose} 
              className="h-7 w-7 p-0 hover:bg-[#00d2a0] hover:text-white"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Profile Fields Toggle */}
        {copilot?.profileFields && copilot.profileFields.length > 0 && (
          <div className="p-4 border-b border-gray-200">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowProfileFields(!showProfileFields)}
              className="w-full flex items-center gap-2"
            >
              <UserCog className="h-3 w-3" />
              {showProfileFields ? 'Hide Profile' : 'Show Profile'}
            </Button>
          </div>
        )}

        {/* Profile Fields Section */}
        {showProfileFields && copilot?.profileFields && copilot.profileFields.length > 0 && (
          <div className="p-4 border-b border-gray-200 max-h-60 overflow-y-auto">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-xs text-foreground">Tell us about yourself</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (isEditingProfile) {
                      setIsEditingProfile(false);
                      setShowProfileFields(false);
                    } else {
                      setIsEditingProfile(true);
                    }
                  }}
                  className="h-6 px-2 text-xs"
                >
                  {isEditingProfile ? 'Save' : 'Edit'}
                </Button>
              </div>
              <div className="space-y-2">
                {copilot.profileFields.map((field) => (
                  <div key={field.id} className="space-y-1">
                    <label className="text-xs font-medium text-foreground">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {renderProfileField(field)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Sidebar Form Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-foreground mb-1 block">
                Your Prompt <span className="text-red-500">*</span>
              </label>
              <Textarea
                placeholder="Enter your prompt"
                value={formData.prompt || ''}
                onChange={(e) => handleFormChange('prompt', e.target.value)}
                className="min-h-[80px] resize-none text-sm"
              />
            </div>
            
            <div>
              <label className="text-xs font-medium text-foreground mb-1 block">
                Job Description
              </label>
              <Textarea
                placeholder="Paste job description to optimize for this role"
                value={formData.job_description || ''}
                onChange={(e) => handleFormChange('job_description', e.target.value)}
                className="min-h-[100px] resize-none text-sm"
              />
            </div>
            
            <div>
              <label className="text-xs font-medium text-foreground mb-1 block">
                Current Resume
              </label>
              {uploadedFile ? (
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <File className="w-4 h-4 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{uploadedFile.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(uploadedFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleRemoveFile}
                      className="h-6 w-6 p-0"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div 
                  className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:border-gray-300 transition-colors"
                  onClick={handleUploadClick}
                >
                  <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-1">Click to upload resume</p>
                  <p className="text-xs text-gray-400">PDF, DOC, DOCX, or TXT files</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>
        
        {/* Sidebar Generate Button */}
        <div className="p-4 border-t border-gray-200">
          <Button 
            onClick={handleGenerate}
            disabled={!formData.prompt?.trim() || isGenerating}
            className="w-full"
            size="sm"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-3 h-3 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="w-3 h-3 mr-2" />
                Generate
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Main Content Area - Results and Chat */}
      <div className="flex-1 flex flex-col bg-white w-full">
        {/* Results Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h2 className="font-semibold text-foreground">AI-Generated Results</h2>
            <p className="text-sm text-muted-foreground">
              {showResult ? 'Use the chat below to refine your content' : 'Generated content will appear here'}
            </p>
          </div>
          {showResult && (
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          )}
        </div>

        {/* Results Content */}
        <div className="flex-1 overflow-y-auto p-6 w-full">
          {showResult ? (
            <div className="h-full w-full">
              <div className="prose prose-lg max-w-none h-full w-full overflow-y-auto text-foreground leading-relaxed">
                <div className="whitespace-pre-wrap font-sans">
                  {generatedContent}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center w-full">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
                  <FileText className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Ready to generate</p>
                  <p className="text-xs text-gray-500">Fill out the form and click Generate to see your results</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input Area - Only shown after generation */}
        {showResult && (
          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-3">
              <Textarea
                placeholder="Ask me to modify the content, add sections, change tone..."
                className="flex-1 min-h-[60px] resize-none"
                rows={2}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleChatSend();
                  }
                }}
              />
              <Button 
                size="sm" 
                className="self-end"
                onClick={handleChatSend}
                disabled={!chatInput.trim() || isGenerating}
              >
                {isGenerating ? 'Updating...' : 'Send'}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Ask for changes like "make it more professional" or "add a skills section"
            </p>
          </div>
        )}
      </div>
    </>
  );
}