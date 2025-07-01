import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, FileText, Link, Trash2, Eye, Edit3, Check, X, Bot } from "lucide-react";
import { useState } from "react";

export function KnowledgeBaseScreen() {
  const [suggestDocsOpen, setSuggestDocsOpen] = useState(false);
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);
  const [editingDocument, setEditingDocument] = useState<string | null>(null);
  const [tempTitle, setTempTitle] = useState("");
  const [tempDescription, setTempDescription] = useState("");
  const [activeTab, setActiveTab] = useState("workspace");

  // Sample AI-suggested documents
  const suggestedDocs = [
    {
      id: "workspace-onboarding",
      title: "Workspace Onboarding Guide",
      description: "Complete guide for new team members joining the workspace",
      category: "User Experience"
    },
    {
      id: "company-policies",
      title: "Company Policies & Guidelines",
      description: "Essential policies and guidelines for all team members",
      category: "Guidelines"
    },
    {
      id: "tech-standards",
      title: "Technical Standards Documentation",
      description: "Development standards and best practices for the team",
      category: "Technical"
    },
    {
      id: "project-templates",
      title: "Project Management Templates",
      description: "Standardized templates for project planning and execution",
      category: "Templates"
    }
  ];

  const handleSuggestionToggle = (suggestionId: string) => {
    setSelectedSuggestions(prev => 
      prev.includes(suggestionId) 
        ? prev.filter(id => id !== suggestionId)
        : [...prev, suggestionId]
    );
  };

  const handleGenerateSelectedDocs = () => {
    console.log('Generating documents:', selectedSuggestions);
    setSuggestDocsOpen(false);
    setSelectedSuggestions([]);
  };

  const startEditing = (docId: string, currentTitle: string, currentDescription: string) => {
    setEditingDocument(docId);
    setTempTitle(currentTitle);
    setTempDescription(currentDescription);
  };

  const saveEditing = () => {
    console.log('Saving document:', { title: tempTitle, description: tempDescription });
    setEditingDocument(null);
    setTempTitle("");
    setTempDescription("");
  };

  const cancelEditing = () => {
    setEditingDocument(null);
    setTempTitle("");
    setTempDescription("");
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="workspace">Workspace</TabsTrigger>
            <TabsTrigger value="content-writer">Content Writer</TabsTrigger>
            <TabsTrigger value="data-analyst">Data Analyst</TabsTrigger>
            <TabsTrigger value="sales-assistant">Sales Assistant</TabsTrigger>
            <TabsTrigger value="customer-support">Customer Support</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Add Document
            </Button>
            <Button variant="outline" size="sm">
              <Link className="w-4 h-4 mr-1" />
              Add URL
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-1" />
              Create MD
            </Button>
            <Button variant="outline" size="sm" onClick={() => setSuggestDocsOpen(true)}>
              <Bot className="w-4 h-4 mr-1" />
              AI Suggestions
            </Button>
          </div>
        </div>

        {/* Workspace Tab */}
        <TabsContent value="workspace" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-brand-primary">18</p>
                  <p className="text-sm text-muted-foreground">Total Documents</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">15</p>
                  <p className="text-sm text-muted-foreground">Published</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">3,489</p>
                  <p className="text-sm text-muted-foreground">Total Views</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-600">127</p>
                  <p className="text-sm text-muted-foreground">Contributors</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-white">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <FileText className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    {editingDocument === 'workspace1' ? (
                      <div className="space-y-2">
                        <Input
                          value={tempTitle}
                          onChange={(e) => setTempTitle(e.target.value)}
                          className="font-medium"
                          placeholder="Document title"
                        />
                        <Input
                          value={tempDescription}
                          onChange={(e) => setTempDescription(e.target.value)}
                          className="text-sm"
                          placeholder="Document description"
                        />
                      </div>
                    ) : (
                      <div>
                        <div className="font-medium">Company Handbook</div>
                        <div className="text-sm text-muted-foreground">Complete guide to company policies and procedures</div>
                      </div>
                    )}
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>Created by Jennifer Walsh</span>
                      <span>•</span>
                      <span>5 days ago</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Badge variant="secondary" className="text-xs">PDF</Badge>
                  {editingDocument === 'workspace1' ? (
                    <>
                      <Button variant="ghost" size="sm" onClick={saveEditing}>
                        <Check className="w-4 h-4 text-green-600" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={cancelEditing}>
                        <X className="w-4 h-4 text-gray-600" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="ghost" size="sm" title="View/Edit">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => startEditing('workspace1', 'Company Handbook', 'Complete guide to company policies and procedures')}
                        title="Rename"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg bg-white">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <FileText className="w-5 h-5 text-green-500 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">Development Guidelines</div>
                    <div className="text-sm text-muted-foreground">Coding standards and development best practices</div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>Created by David Park</span>
                      <span>•</span>
                      <span>1 week ago</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Badge variant="secondary" className="text-xs">MD</Badge>
                  <Button variant="ghost" size="sm" title="View/Edit">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" title="Rename">
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Content Writer Tab */}
        <TabsContent value="content-writer" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-brand-primary">12</p>
                  <p className="text-sm text-muted-foreground">Documents</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">8</p>
                  <p className="text-sm text-muted-foreground">Writing Guides</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">1,234</p>
                  <p className="text-sm text-muted-foreground">Views</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-600">4</p>
                  <p className="text-sm text-muted-foreground">Templates</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-white">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <FileText className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">Content Style Guide</div>
                    <div className="text-sm text-muted-foreground">Brand voice and writing standards for content creation</div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>Created by Content Team</span>
                      <span>•</span>
                      <span>2 weeks ago</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Badge variant="secondary" className="text-xs">PDF</Badge>
                  <Button variant="ghost" size="sm" title="View/Edit">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" title="Rename">
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Data Analyst Tab */}
        <TabsContent value="data-analyst" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-brand-primary">8</p>
                  <p className="text-sm text-muted-foreground">Documents</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">15</p>
                  <p className="text-sm text-muted-foreground">Data Sources</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">892</p>
                  <p className="text-sm text-muted-foreground">Views</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-600">23</p>
                  <p className="text-sm text-muted-foreground">Reports</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-white">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <FileText className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">Data Analysis Methodology</div>
                    <div className="text-sm text-muted-foreground">Standard procedures for data collection and analysis</div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>Created by Analytics Team</span>
                      <span>•</span>
                      <span>3 weeks ago</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Badge variant="secondary" className="text-xs">PDF</Badge>
                  <Button variant="ghost" size="sm" title="View/Edit">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" title="Rename">
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Sales Assistant Tab */}
        <TabsContent value="sales-assistant" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-brand-primary">16</p>
                  <p className="text-sm text-muted-foreground">Documents</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">9</p>
                  <p className="text-sm text-muted-foreground">Scripts</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">2,156</p>
                  <p className="text-sm text-muted-foreground">Views</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-600">12</p>
                  <p className="text-sm text-muted-foreground">Playbooks</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-white">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <FileText className="w-5 h-5 text-green-500 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">Sales Playbook</div>
                    <div className="text-sm text-muted-foreground">Complete sales process and objection handling guide</div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>Created by Sales Team</span>
                      <span>•</span>
                      <span>1 week ago</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Badge variant="secondary" className="text-xs">PDF</Badge>
                  <Button variant="ghost" size="sm" title="View/Edit">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" title="Rename">
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Customer Support Tab */}
        <TabsContent value="customer-support" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-brand-primary">22</p>
                  <p className="text-sm text-muted-foreground">Documents</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">35</p>
                  <p className="text-sm text-muted-foreground">FAQs</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">3,827</p>
                  <p className="text-sm text-muted-foreground">Views</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-600">18</p>
                  <p className="text-sm text-muted-foreground">Workflows</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-white">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <FileText className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">Customer Support Guidelines</div>
                    <div className="text-sm text-muted-foreground">Standard procedures for handling customer inquiries</div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>Created by Support Team</span>
                      <span>•</span>
                      <span>4 days ago</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Badge variant="secondary" className="text-xs">PDF</Badge>
                  <Button variant="ghost" size="sm" title="View/Edit">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" title="Rename">
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* AI Document Suggestions Modal */}
      <Dialog open={suggestDocsOpen} onOpenChange={setSuggestDocsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              AI Document Suggestions
            </DialogTitle>
            <DialogDescription>
              Select the documents you'd like our AI to generate for the selected knowledge base. These will be customized for the specific copilot or workspace.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            {suggestedDocs.map((doc) => (
              <div key={doc.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <Checkbox
                  id={doc.id}
                  checked={selectedSuggestions.includes(doc.id)}
                  onCheckedChange={() => handleSuggestionToggle(doc.id)}
                  className="mt-1"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <label htmlFor={doc.id} className="text-sm font-medium cursor-pointer">
                      {doc.title}
                    </label>
                    <Badge variant="outline" className="text-xs">
                      {doc.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {doc.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              {selectedSuggestions.length} document{selectedSuggestions.length !== 1 ? 's' : ''} selected
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setSuggestDocsOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleGenerateSelectedDocs}
                disabled={selectedSuggestions.length === 0}
                className="gap-2"
              >
                <Bot className="w-4 h-4" />
                Generate Selected ({selectedSuggestions.length})
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}