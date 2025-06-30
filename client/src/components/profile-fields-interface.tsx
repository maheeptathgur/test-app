import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { X, Save, User } from "lucide-react";

interface ProfileFieldsInterfaceProps {
  onClose: () => void;
}

interface ProfileData {
  title: string;
  company: string;
  industry: string;
  department: string;
  experience: string;
  location: string;
  timezone: string;
  communicationStyle: string;
  expertise: string;
  goals: string;
  preferences: string;
}

export function ProfileFieldsInterface({ onClose }: ProfileFieldsInterfaceProps) {
  const [profileData, setProfileData] = useState<ProfileData>({
    title: "Senior Product Manager",
    company: "TechCorp Inc.",
    industry: "Technology",
    department: "Product",
    experience: "8 years",
    location: "San Francisco, CA",
    timezone: "PST (UTC-8)",
    communicationStyle: "Direct and concise",
    expertise: "Product strategy, user experience, data analysis",
    goals: "Launch innovative products that solve real user problems",
    preferences: "Prefer data-driven decisions and collaborative approaches"
  });

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Saving profile data:', profileData);
    onClose();
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b bg-muted/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Profile Fields</h1>
            <p className="text-sm text-muted-foreground">Set your context to help copilots understand you better</p>
          </div>
        </div>
        <Button variant="outline" onClick={onClose} className="gap-2">
          <X className="h-4 w-4" />
          Close
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Professional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Professional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    value={profileData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Senior Product Manager"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={profileData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    placeholder="e.g., TechCorp Inc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={profileData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Retail">Retail</SelectItem>
                      <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="Consulting">Consulting</SelectItem>
                      <SelectItem value="Media">Media</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select value={profileData.department} onValueChange={(value) => handleInputChange('department', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Product">Product</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="HR">Human Resources</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Select value={profileData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-2 years">0-2 years</SelectItem>
                      <SelectItem value="3-5 years">3-5 years</SelectItem>
                      <SelectItem value="6-10 years">6-10 years</SelectItem>
                      <SelectItem value="11-15 years">11-15 years</SelectItem>
                      <SelectItem value="15+ years">15+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="e.g., San Francisco, CA"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Communication Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Communication Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={profileData.timezone} onValueChange={(value) => handleInputChange('timezone', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PST (UTC-8)">PST (UTC-8)</SelectItem>
                      <SelectItem value="EST (UTC-5)">EST (UTC-5)</SelectItem>
                      <SelectItem value="GMT (UTC+0)">GMT (UTC+0)</SelectItem>
                      <SelectItem value="CET (UTC+1)">CET (UTC+1)</SelectItem>
                      <SelectItem value="JST (UTC+9)">JST (UTC+9)</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="communicationStyle">Communication Style</Label>
                  <Select value={profileData.communicationStyle} onValueChange={(value) => handleInputChange('communicationStyle', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Direct and concise">Direct and concise</SelectItem>
                      <SelectItem value="Detailed and thorough">Detailed and thorough</SelectItem>
                      <SelectItem value="Casual and conversational">Casual and conversational</SelectItem>
                      <SelectItem value="Formal and structured">Formal and structured</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Context */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Professional Context</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="expertise">Areas of Expertise</Label>
                <Textarea
                  id="expertise"
                  value={profileData.expertise}
                  onChange={(e) => handleInputChange('expertise', e.target.value)}
                  placeholder="e.g., Product strategy, user experience, data analysis"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goals">Current Goals & Objectives</Label>
                <Textarea
                  id="goals"
                  value={profileData.goals}
                  onChange={(e) => handleInputChange('goals', e.target.value)}
                  placeholder="e.g., Launch innovative products that solve real user problems"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferences">Work Preferences & Approach</Label>
                <Textarea
                  id="preferences"
                  value={profileData.preferences}
                  onChange={(e) => handleInputChange('preferences', e.target.value)}
                  placeholder="e.g., Prefer data-driven decisions and collaborative approaches"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t bg-muted/50 p-6">
        <div className="max-w-4xl mx-auto flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Save Profile
          </Button>
        </div>
      </div>
    </div>
  );
}