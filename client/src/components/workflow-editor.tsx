import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Play, 
  Save, 
  Plus, 
  Trash2, 
  Settings, 
  Zap, 
  Clock, 
  CheckCircle, 
  XCircle,
  MoreVertical,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Copy,
  Eye,
  AlertTriangle,
  X
} from 'lucide-react';

interface WorkflowEditorProps {
  workflowId?: string;
  onBack: () => void;
}

export function WorkflowEditor({ workflowId = 'email-campaign', onBack }: WorkflowEditorProps) {
  const [activeTab, setActiveTab] = useState('steps');
  const [workflowName, setWorkflowName] = useState('Email Campaign Automation');
  const [workflowDescription, setWorkflowDescription] = useState('Automated email campaign workflow with personalization and analytics tracking');
  const [isEnabled, setIsEnabled] = useState(true);
  const [expandedStep, setExpandedStep] = useState<string | null>('step1');

  // Sample workflow data
  const workflowData = {
    id: workflowId,
    name: workflowName,
    description: workflowDescription,
    source: 'n8n',
    status: 'Active',
    trigger: 'Form Submission',
    steps: [
      {
        id: 'step1',
        name: 'Validate Form Data',
        type: 'validation',
        description: 'Validate email format and required fields',
        status: 'success',
        executionTime: '0.2s',
        config: {
          rules: ['email_format', 'required_fields'],
          errorHandling: 'stop_workflow'
        }
      },
      {
        id: 'step2',
        name: 'Check Email Preferences',
        type: 'database',
        description: 'Query user preferences from database',
        status: 'success',
        executionTime: '0.5s',
        config: {
          query: 'SELECT * FROM user_preferences WHERE email = ?',
          timeout: 30
        }
      },
      {
        id: 'step3',
        name: 'Personalize Content',
        type: 'transformation',
        description: 'Customize email content based on user data',
        status: 'success',
        executionTime: '1.2s',
        config: {
          template: 'email_template_v2',
          variables: ['first_name', 'company', 'industry']
        }
      },
      {
        id: 'step4',
        name: 'Send Email',
        type: 'email',
        description: 'Send personalized email via Gmail API',
        status: 'pending',
        executionTime: '2.1s',
        config: {
          provider: 'gmail',
          from: 'noreply@company.com',
          replyTo: 'support@company.com'
        }
      },
      {
        id: 'step5',
        name: 'Track Analytics',
        type: 'analytics',
        description: 'Log email sent event to analytics platform',
        status: 'pending',
        executionTime: '0.8s',
        config: {
          events: ['email_sent', 'campaign_interaction'],
          platform: 'google_analytics'
        }
      }
    ],
    schedule: {
      type: 'trigger',
      enabled: true
    },
    variables: [
      { name: 'sender_email', value: 'noreply@company.com', type: 'string' },
      { name: 'max_retries', value: '3', type: 'number' },
      { name: 'timeout_seconds', value: '30', type: 'number' }
    ]
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStepTypeColor = (type: string) => {
    const colors = {
      validation: 'bg-blue-100 text-blue-700',
      database: 'bg-green-100 text-green-700',
      transformation: 'bg-purple-100 text-purple-700',
      email: 'bg-red-100 text-red-700',
      analytics: 'bg-orange-100 text-orange-700'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const tabs = [
    { id: 'steps', label: 'Workflow Steps', icon: Zap },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'variables', label: 'Variables', icon: Settings },
    { id: 'testing', label: 'Testing', icon: Play }
  ];

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: '#f2f2f2' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-3 pt-2 pb-2 bg-[#ffffff00]">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{workflowName}</h1>
            <p className="text-sm text-gray-600">{workflowDescription}</p>
          </div>
        </div>
        <Button variant="outline" onClick={onBack} className="gap-2">
          <X className="w-4 h-4" />
          Close
        </Button>
      </div>
      {/* Tab Navigation */}
      <div className="flex border-b px-8 bg-[#ffffff00]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-[#008062] text-[#008062]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'steps' && (
          <div className="px-3 pb-2 pt-2 space-y-4" style={{ backgroundColor: '#f2f2f2' }}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Workflow Steps</h2>
                <p className="text-sm text-gray-600">Configure the sequence of actions in your workflow</p>
              </div>
              <Button variant="outline" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Step
              </Button>
            </div>

            <div className="space-y-4">
              {workflowData.steps.map((step, index) => (
                <Card key={step.id} className="border-l-4 border-l-[#008062]">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 bg-[#008062] text-white rounded-full flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </span>
                          {getStatusIcon(step.status)}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{step.name}</h3>
                          <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className={`text-xs ${getStepTypeColor(step.type)}`}>
                          {step.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {step.executionTime}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                        >
                          {expandedStep === step.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  {expandedStep === step.id && (
                    <CardContent className="pt-0">
                      <Separator className="mb-4" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div>
                            <Label className="text-xs font-medium text-gray-700">Step Name</Label>
                            <Input defaultValue={step.name} className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-gray-700">Description</Label>
                            <Textarea defaultValue={step.description} className="mt-1" rows={2} />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <Label className="text-xs font-medium text-gray-700">Configuration</Label>
                            <div className="mt-1 p-3 bg-gray-50 rounded-md">
                              <code className="text-xs text-gray-700">
                                {JSON.stringify(step.config, null, 2)}
                              </code>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Copy className="w-3 h-3" />
                          Duplicate
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Play className="w-3 h-3" />
                          Test Step
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1 text-red-600 hover:text-red-700">
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>

            {/* Add connection arrows between steps */}
            <div className="flex justify-center">
              <Button variant="outline" className="gap-2 bg-gray-50">
                <ArrowRight className="w-4 h-4" />
                Add Conditional Branch
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="px-3 pb-2 pt-2 space-y-4" style={{ backgroundColor: '#f2f2f2' }}>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Workflow Settings</h2>
              <p className="text-sm text-gray-600">Configure general workflow properties and behavior</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Workflow Name</Label>
                    <Input 
                      value={workflowName} 
                      onChange={(e) => setWorkflowName(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea 
                      value={workflowDescription} 
                      onChange={(e) => setWorkflowDescription(e.target.value)}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Enable Workflow</Label>
                    <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Trigger Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Trigger Type</Label>
                    <Select defaultValue="form_submission">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="form_submission">Form Submission</SelectItem>
                        <SelectItem value="webhook">Webhook</SelectItem>
                        <SelectItem value="schedule">Schedule</SelectItem>
                        <SelectItem value="manual">Manual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Trigger Conditions</Label>
                    <Textarea 
                      placeholder="Define when this workflow should trigger..."
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Error Handling</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>On Error</Label>
                    <Select defaultValue="stop">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stop">Stop Workflow</SelectItem>
                        <SelectItem value="continue">Continue to Next Step</SelectItem>
                        <SelectItem value="retry">Retry Step</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Max Retries</Label>
                    <Input type="number" defaultValue="3" className="mt-1" />
                  </div>
                  <div>
                    <Label>Timeout (seconds)</Label>
                    <Input type="number" defaultValue="300" className="mt-1" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Email on Success</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Email on Failure</Label>
                    <Switch defaultChecked />
                  </div>
                  <div>
                    <Label>Notification Email</Label>
                    <Input 
                      type="email" 
                      placeholder="admin@company.com" 
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'variables' && (
          <div className="px-3 pb-2 pt-2 space-y-4" style={{ backgroundColor: '#f2f2f2' }}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Workflow Variables</h2>
                <p className="text-sm text-gray-600">Define reusable variables for your workflow</p>
              </div>
              <Button variant="outline" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Variable
              </Button>
            </div>

            <div className="space-y-4">
              {workflowData.variables.map((variable, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                      <div>
                        <Label>Variable Name</Label>
                        <Input defaultValue={variable.name} className="mt-1" />
                      </div>
                      <div>
                        <Label>Type</Label>
                        <Select defaultValue={variable.type}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="string">String</SelectItem>
                            <SelectItem value="number">Number</SelectItem>
                            <SelectItem value="boolean">Boolean</SelectItem>
                            <SelectItem value="object">Object</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Default Value</Label>
                        <Input defaultValue={variable.value} className="mt-1" />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1 text-red-600 hover:text-red-700">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'testing' && (
          <div className="px-3 pb-2 pt-2 space-y-4" style={{ backgroundColor: '#f2f2f2' }}>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Workflow Testing</h2>
              <p className="text-sm text-gray-600">Test your workflow with sample data</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Test Input</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Sample Data (JSON)</Label>
                    <Textarea 
                      className="mt-1 font-mono text-sm"
                      rows={8}
                      defaultValue={JSON.stringify({
                        email: "test@example.com",
                        first_name: "John",
                        last_name: "Doe",
                        company: "Acme Corp",
                        industry: "Technology"
                      }, null, 2)}
                    />
                  </div>
                  <Button className="w-full gap-2 bg-[#008062] hover:bg-[#00d2a0] text-white">
                    <Play className="w-4 h-4" />
                    Run Test
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Test Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <div>
                        <div className="font-medium text-green-900">Test Completed Successfully</div>
                        <div className="text-sm text-green-600">Executed in 4.8 seconds</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Step Results:</div>
                      {workflowData.steps.map((step, index) => (
                        <div key={step.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <span className="w-5 h-5 bg-[#008062] text-white rounded-full flex items-center justify-center text-xs">
                            {index + 1}
                          </span>
                          <span className="text-sm">{step.name}</span>
                          <div className="ml-auto">
                            {getStatusIcon('success')}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-2">Output:</div>
                      <div className="p-3 bg-gray-50 rounded-md">
                        <code className="text-xs text-gray-700">
                          {JSON.stringify({
                            email_sent: true,
                            message_id: "msg_123456",
                            recipient: "test@example.com",
                            timestamp: new Date().toISOString()
                          }, null, 2)}
                        </code>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Test History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <div>
                        <div className="font-medium">Test run completed</div>
                        <div className="text-sm text-gray-600">2 minutes ago • 4.8s duration</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <XCircle className="w-5 h-5 text-red-500" />
                      <div>
                        <div className="font-medium">Test run failed</div>
                        <div className="text-sm text-gray-600">1 hour ago • Failed at step 3</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}