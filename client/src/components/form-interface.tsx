import { useState, useEffect, useRef } from "react";
import { X, UserCog, FileText, Wand2, Download, RefreshCw, Check, Edit3, Upload, File, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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

  // Initialize form data with default values or loaded conversation data
  useEffect(() => {
    if (copilot?.name === 'Resume Assistant') {
      // Check if we have loaded conversation data
      if (copilot.formInputs) {
        setFormData({
          prompt: copilot.formInputs.prompt || '',
          job_description: copilot.formInputs.job_description || '',
          current_resume: copilot.formInputs.uploaded_file || ''
        });
        // If we have form output, show the result
        if (copilot.formOutput) {
          setGeneratedContent(copilot.formOutput);
          setShowResult(true);
        }
      } else {
        // Default empty form
        setFormData({
          prompt: '',
          job_description: '',
          current_resume: ''
        });
      }
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
      setGeneratedContent(`**JOHN SMITH**
**${profileData.career_level || 'Senior'} ${profileData.target_industry || 'Technology'} Professional**

john.smith@email.com | (555) 123-4567 | LinkedIn: /in/johnsmith | San Francisco, CA

---

**PROFESSIONAL SUMMARY**

Results-driven ${profileData.career_level || 'Senior'} professional with 7+ years of experience in ${profileData.target_industry || 'technology'} industry. Proven track record of leading cross-functional teams, delivering complex projects on time and under budget, and driving organizational growth through strategic innovation. Seeking ${profileData.job_type || 'full-time'} opportunities to leverage expertise in project management and team leadership.

---

**CORE COMPETENCIES**

• **Leadership & Management:** Team leadership, project management, strategic planning
• **Technical Skills:** Data analysis, process optimization, system implementation
• **Communication:** Cross-functional collaboration, client relations, presentation skills
• **Industry Expertise:** ${profileData.target_industry || 'Technology'} sector knowledge, market analysis
• **Tools & Software:** CRM platforms, analytics tools, project management software

---

**PROFESSIONAL EXPERIENCE**

**Senior Project Manager** | TechCorp Solutions | January 2020 - Present
• Led cross-functional teams of 12+ members to deliver $5M+ in revenue-generating projects
• Improved operational efficiency by 40% through implementation of streamlined workflows
• Managed client portfolios worth $8M+ with 99% retention rate and 25% growth year-over-year
• Mentored 6 junior team members, resulting in 4 internal promotions within 18 months
• Reduced project delivery time by 30% while maintaining 99.5% quality standards

**Project Coordinator** | InnovateTech Inc. | June 2018 - December 2019
• Coordinated 15+ concurrent projects with budgets ranging from $100K to $2M
• Established project tracking systems that improved visibility and reduced delays by 25%
• Collaborated with stakeholders across 5 departments to ensure alignment and delivery
• Implemented agile methodologies resulting in 35% improvement in team productivity
• Delivered 95% of projects ahead of schedule with budget variance under 5%

**Business Analyst** | StartupXYZ | August 2017 - May 2018
• Analyzed business processes and identified opportunities for improvement
• Created detailed project documentation and requirements specifications
• Supported senior management in strategic decision-making through data-driven insights
• Facilitated workshops with 20+ stakeholders to gather requirements and align objectives
• Contributed to 20% increase in overall business efficiency through process optimization

---

**EDUCATION**

**Master of Business Administration (MBA)**
University of California, Berkeley - Haas School of Business | 2017
*Concentration: Technology Management*

**Bachelor of Science in ${profileData.target_industry || 'Computer Science'}**
Stanford University | 2015
*Magna Cum Laude, GPA: 3.8/4.0*

---

**CERTIFICATIONS & TRAINING**

• Project Management Professional (PMP) - PMI (2020)
• Certified ScrumMaster (CSM) - Scrum Alliance (2019)
• Lean Six Sigma Green Belt (2018)
• ${profileData.target_industry || 'Technology'} Industry Certification (2021)

---

**KEY ACHIEVEMENTS**

• **Innovation Award Winner** - TechCorp Solutions (2022): Led digital transformation initiative saving $2M annually
• **Employee of the Year** - InnovateTech Inc. (2019): Recognized for exceptional project delivery and leadership
• **Published Author**: "Effective Project Management in Tech" - Industry Journal (2021)
• **Conference Speaker**: Presented at ${profileData.target_industry || 'Technology'} Leadership Summit 2022

---

**ADDITIONAL INFORMATION**

• **Languages:** English (Native), Spanish (Conversational)
• **Volunteer Work:** Project management mentor for local startup accelerator
• **Professional Memberships:** PMI, Scrum Alliance, ${profileData.target_industry || 'Technology'} Professional Association`);
      setIsGenerating(false);
      setShowResult(true);
    }, 3000);
  };

  const handleDownload = (format: string) => {
    let content = generatedContent;
    let mimeType = 'text/plain';
    let fileName = 'resume';
    
    // Remove markdown formatting for clean downloads
    content = content.replace(/\*\*(.*?)\*\*/g, '$1'); // Remove bold formatting
    content = content.replace(/\*(.*?)\*/g, '$1'); // Remove italic formatting
    
    switch (format) {
      case 'txt':
        mimeType = 'text/plain';
        fileName += '.txt';
        break;
      case 'docx':
        // For demo purposes, we'll create a simple text file
        // In a real app, you'd use a library like docx.js
        mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        fileName += '.docx';
        break;
      case 'pdf':
        // For demo purposes, we'll create a simple text file
        // In a real app, you'd use a library like jsPDF
        mimeType = 'application/pdf';
        fileName += '.pdf';
        break;
    }
    
    const element = document.createElement('a');
    const file = new Blob([content], { type: mimeType });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    
    // Simulate modifying the content based on the chat input
    setIsGenerating(true);
    setTimeout(() => {
      // Modify the content based on the request without adding modification notes
      let updatedContent = generatedContent;
      
      // Simple content modifications based on common requests
      if (chatInput.toLowerCase().includes('more professional')) {
        updatedContent = updatedContent.replace(/\bprofessional\b/g, 'seasoned professional');
        updatedContent = updatedContent.replace(/\bexperience\b/g, 'extensive experience');
      }
      
      if (chatInput.toLowerCase().includes('add skills') || chatInput.toLowerCase().includes('skills section')) {
        updatedContent = updatedContent.replace(
          '• **Tools & Software:** CRM platforms, analytics tools, project management software',
          '• **Tools & Software:** CRM platforms, analytics tools, project management software\n• **Additional Skills:** Advanced Excel, SQL, Python, Tableau, Salesforce'
        );
      }
      
      if (chatInput.toLowerCase().includes('shorter') || chatInput.toLowerCase().includes('concise')) {
        // Remove one experience section to make it shorter
        // Remove Business Analyst section to make it shorter
        const businessAnalystStart = updatedContent.indexOf('**Business Analyst**');
        const educationStart = updatedContent.indexOf('**EDUCATION**');
        if (businessAnalystStart > -1 && educationStart > -1) {
          updatedContent = updatedContent.substring(0, businessAnalystStart) + updatedContent.substring(educationStart);
        }
      }
      
      setGeneratedContent(updatedContent);
      setChatInput('');
      setIsGenerating(false);
    }, 2000);
  };

  // Convert markdown to formatted HTML for display
  const formatContent = (content: string) => {
    return content
      // Convert **bold** to <strong>
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Convert *italic* to <em>
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Convert `code` to <code>
      .replace(/`(.*?)`/g, '<code style="background-color: #f3f4f6; padding: 2px 4px; border-radius: 3px; font-family: monospace;">$1</code>')
      // Convert bullet points
      .replace(/^- (.*$)/gim, '• $1')
      // Convert numbered lists
      .replace(/^(\d+)\. (.*$)/gim, '$1. $2')
      // Convert headers
      .replace(/^### (.*$)/gim, '<h3 style="font-size: 1.125rem; font-weight: 600; margin: 1rem 0 0.5rem 0;">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 style="font-size: 1.25rem; font-weight: 600; margin: 1.25rem 0 0.75rem 0;">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 style="font-size: 1.5rem; font-weight: 700; margin: 1.5rem 0 1rem 0;">$1</h1>')
      // Convert line breaks
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');
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
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
              <FileText className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">{copilot.name}</h3>
              <p className="text-xs text-muted-foreground">{copilot.description}</p>
            </div>
          </div>
        </div>



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
          <div className="flex items-center gap-2">
            {showResult && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleDownload('txt')}>
                    <FileText className="w-4 h-4 mr-2" />
                    Download as TXT
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDownload('docx')}>
                    <File className="w-4 h-4 mr-2" />
                    Download as DOCX
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDownload('pdf')}>
                    <FileText className="w-4 h-4 mr-2" />
                    Download as PDF
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
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

        {/* Results Content */}
        <div className="flex-1 overflow-y-auto p-6 w-full">
          {showResult ? (
            <div className="h-full w-full">
              <div 
                className="h-full w-full overflow-y-auto text-foreground leading-relaxed font-sans text-base"
                dangerouslySetInnerHTML={{ __html: formatContent(generatedContent) }}
              />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center w-full">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto flex-shrink-0">
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