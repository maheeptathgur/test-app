import { useState, useEffect } from "react";
import { X, UserCog, FileText, Wand2, Download, RefreshCw, Check, Edit3 } from "lucide-react";
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
    <div className="flex flex-col h-full overflow-hidden bg-white">
      <div className="flex-1 overflow-hidden flex">
        {/* Main Form Area */}
        <div className="flex-1 flex flex-col relative">
          {/* Top right controls */}
          <div className="absolute top-3 right-3 z-50 flex items-center gap-1">
            <Button 
              variant="outline" 
              size="sm"
              className="h-7 w-7 p-0 bg-white/90 hover:bg-[#00d2a0] hover:text-white shadow-sm" 
              onClick={() => setShowProfileFields(!showProfileFields)}
              title="Toggle Profile Fields"
            >
              <UserCog className="h-3 w-3" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onClose} 
              className="h-7 w-7 p-0 bg-white/90 hover:bg-[#00d2a0] hover:text-white shadow-sm"
              title="Close Form"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto h-full flex flex-col p-6">
              
              {/* Profile Fields Section */}
              {showProfileFields && copilot?.profileFields && copilot.profileFields.length > 0 && (
                <div className="mb-6 mt-8 p-4 rounded-lg border border-gray-200" style={{ backgroundColor: '#f8fafb' }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">Tell us about yourself</h3>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (isEditingProfile) {
                            const hasChanges = Object.keys(profileData).some(key => profileData[key]?.trim());
                            if (hasChanges) {
                              setIsEditingProfile(false);
                              setShowProfileFields(false);
                            }
                          } else {
                            setIsEditingProfile(true);
                          }
                        }}
                        className="flex items-center gap-1"
                      >
                        {isEditingProfile ? (
                          <>
                            <Check className="h-3 w-3" />
                            Save Profile
                          </>
                        ) : (
                          <>
                            <Edit3 className="h-3 w-3" />
                            Edit Profile
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  <form className="space-y-4">
                    {copilot.profileFields.map((field) => (
                      <div key={field.id} className="space-y-1">
                        <label className="text-sm font-medium text-foreground">
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        {renderProfileField(field)}
                        {field.description && (
                          <p className="text-xs text-muted-foreground">{field.description}</p>
                        )}
                      </div>
                    ))}
                  </form>
                </div>
              )}

              {/* Main Content - Sidebar Layout */}
              <div className="flex-1 flex gap-0">
                {/* Left Sidebar - Input Form */}
                <div className="w-96 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
                  {/* Sidebar Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold">{copilot.name}</h2>
                        <p className="text-sm text-muted-foreground">{copilot.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar Content */}
                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-6">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Your Prompt <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                          placeholder="Please enter your prompt"
                          value={formData.prompt || ''}
                          onChange={(e) => handleFormChange('prompt', e.target.value)}
                          className="min-h-[100px] resize-none"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Job Description
                        </label>
                        <Textarea
                          placeholder="Paste the job description here to optimize your resume for this specific role"
                          value={formData.job_description || ''}
                          onChange={(e) => handleFormChange('job_description', e.target.value)}
                          className="min-h-[120px] resize-none"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Current Resume
                        </label>
                        <Textarea
                          placeholder="Paste your current resume content here"
                          value={formData.current_resume || ''}
                          onChange={(e) => handleFormChange('current_resume', e.target.value)}
                          className="min-h-[200px] resize-none"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Sidebar Footer */}
                  <div className="p-6 border-t border-gray-200">
                    <Button 
                      onClick={handleGenerate}
                      disabled={!formData.prompt?.trim() || isGenerating}
                      className="w-full"
                      size="lg"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-4 h-4 mr-2" />
                          Generate
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Main Content Area - Results */}
                <div className="flex-1 flex flex-col bg-white">
                  {/* Results Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold">Your AI-Generated Results</h2>
                        <p className="text-sm text-muted-foreground">
                          {showResult ? 'Fine-tune your content or generate a new version.' : 'Your generated response will appear here.'}
                        </p>
                      </div>
                      {showResult && (
                        <Button variant="outline" size="sm" onClick={handleDownload}>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Results Content */}
                  <div className="flex-1 p-6">
                    {showResult ? (
                      <div className="h-full">
                        <div className="prose prose-sm max-w-none h-full overflow-y-auto p-6 bg-gray-50 rounded-lg border">
                          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                            {generatedContent}
                          </pre>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center justify-center text-center">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}