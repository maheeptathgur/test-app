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
  const [editingSteps, setEditingSteps] = useState<Record<string, any>>({});
  const [stepValues, setStepValues] = useState<Record<string, any>>({});
  const [selectedTriggerType, setSelectedTriggerType] = useState<string>('On Message');

  // Helper functions for step editing
  const startEditingStep = (stepId: string, step: any) => {
    // Auto-expand the step when entering edit mode
    setExpandedStep(stepId);
    setEditingSteps(prev => ({ ...prev, [stepId]: true }));
    setStepValues(prev => ({ 
      ...prev, 
      [stepId]: {
        name: step.name,
        description: step.description,
        config: JSON.stringify(step.config, null, 2)
      }
    }));
  };

  const saveStepEdit = (stepId: string) => {
    console.log('Saving step:', stepId, stepValues[stepId]);
    setEditingSteps(prev => ({ ...prev, [stepId]: false }));
  };

  const cancelStepEdit = (stepId: string) => {
    setEditingSteps(prev => ({ ...prev, [stepId]: false }));
    setStepValues(prev => {
      const newValues = { ...prev };
      delete newValues[stepId];
      return newValues;
    });
  };

  const updateStepValue = (stepId: string, field: string, value: string) => {
    setStepValues(prev => ({
      ...prev,
      [stepId]: {
        ...prev[stepId],
        [field]: value
      }
    }));
  };

  const deleteStep = (stepId: string) => {
    console.log('Deleting step:', stepId);
    setWorkflowSteps(prev => prev.filter(step => step.id !== stepId));
    // Close the step if it was expanded
    if (expandedStep === stepId) {
      setExpandedStep(null);
    }
    // Clear editing state for this step
    setEditingSteps(prev => {
      const newState = { ...prev };
      delete newState[stepId];
      return newState;
    });
    setStepValues(prev => {
      const newState = { ...prev };
      delete newState[stepId];
      return newState;
    });
  };

  const duplicateStep = (stepId: string) => {
    console.log('Duplicating step:', stepId);
    // In a real implementation, this would create a copy of the step
  };

  const testStep = (stepId: string) => {
    console.log('Testing step:', stepId);
    // In a real implementation, this would run a test for the specific step
  };

  // Sample workflow data
  const initialWorkflowData = {
    id: workflowId,
    name: workflowName,
    description: workflowDescription,
    source: 'n8n',
    status: 'Active',
    trigger: 'Form Submission',
    steps: [
      {
        id: 'trigger',
        name: 'Form Submission Trigger',
        type: 'trigger',
        description: 'Triggers when a new lead form is submitted',
        status: 'success',
        executionTime: '0.1s',
        config: {
          triggerType: 'On Message',
          triggerConditions: 'If message contains "pricing" or "demo"',
          runFrequency: 'Immediate',
          webhook: 'https://knolli.app/webhook/form-submit'
        },
        isTrigger: true
      },
      {
        id: 'step1',
        name: 'Data Analyst Agent',
        type: 'agent',
        description: 'Analyzes form data and enriches lead information',
        status: 'success',
        executionTime: '1.2s',
        config: {
          agentId: 'data-analyst',
          prompt: 'Analyze the submitted form data and enrich with additional lead scoring information'
        },
        input: {
          type: 'object',
          schema: {
            email: 'string',
            first_name: 'string',
            last_name: 'string',
            company: 'string',
            industry: 'string'
          },
          source: 'trigger'
        },
        output: {
          type: 'object',
          schema: {
            lead_score: 'number',
            industry_category: 'string',
            company_size: 'string',
            enriched_data: 'object'
          }
        }
      },
      {
        id: 'step2',
        name: 'Gmail Tool',
        type: 'tool',
        description: 'Sends personalized email using Gmail integration',
        status: 'success',
        executionTime: '0.8s',
        config: {
          toolId: 'gmail',
          action: 'send_email',
          template: 'lead_welcome_email'
        },
        input: {
          type: 'object',
          schema: {
            recipient_email: 'string',
            personalization_data: 'object',
            lead_score: 'number'
          },
          source: 'step1'
        },
        output: {
          type: 'object',
          schema: {
            message_id: 'string',
            sent_timestamp: 'string',
            delivery_status: 'string'
          }
        }
      },
      {
        id: 'step3',
        name: 'Content Creator Agent',
        type: 'agent',
        description: 'Creates follow-up content based on lead interaction',
        status: 'pending',
        executionTime: '2.1s',
        config: {
          agentId: 'content-creator',
          prompt: 'Generate personalized follow-up content sequence based on lead profile and email engagement'
        },
        input: {
          type: 'object',
          schema: {
            lead_data: 'object',
            email_engagement: 'object',
            industry_category: 'string'
          },
          source: 'step2'
        },
        output: {
          type: 'object',
          schema: {
            follow_up_sequence: 'array',
            content_recommendations: 'array',
            next_touchpoint: 'string'
          }
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

  // State for managing workflow steps
  const [workflowSteps, setWorkflowSteps] = useState(initialWorkflowData.steps);
  const workflowData = { ...initialWorkflowData, steps: workflowSteps };

  // Function to add a new step
  const addNewStep = () => {
    const newStepId = `step${workflowSteps.length}`;
    const newStep = {
      id: newStepId,
      name: 'New Step',
      type: 'agent',
      description: 'Configure this step',
      status: 'pending',
      executionTime: '0s',
      config: {
        agentId: 'content-creator',
        instructions: 'Enter instructions for this step'
      },
      input: {
        type: 'object',
        schema: {},
        source: workflowSteps.length > 1 ? workflowSteps[workflowSteps.length - 1].id : 'trigger'
      },
      output: {
        type: 'object',
        schema: {}
      }
    };
    
    setWorkflowSteps([...workflowSteps, newStep]);
    setExpandedStep(newStepId);
    setEditingSteps(prev => ({ ...prev, [newStepId]: true }));
    setStepValues(prev => ({ 
      ...prev, 
      [newStepId]: {
        name: newStep.name,
        description: newStep.description,
        config: JSON.stringify(newStep.config, null, 2)
      }
    }));
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
      trigger: 'bg-yellow-100 text-yellow-700',
      agent: 'bg-purple-100 text-purple-700',
      tool: 'bg-blue-100 text-blue-700',
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
    <div className="workflow-editor h-full flex flex-col" style={{ backgroundColor: 'var(--theme-background-light)' }}>
      {/* Header */}
      <div className="workflow-header flex items-center justify-between px-8 pt-8 pb-6 bg-[#ffffff00]">
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
      <div className="workflow-tab-nav flex border-b px-8 bg-[#ffffff00]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-[var(--theme-primary)] text-[var(--theme-primary)]'
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
          <div className="workflow-tab-content px-8 pb-24 pt-6 space-y-6" style={{ backgroundColor: 'var(--theme-background-light)' }}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Workflow Steps</h2>
                <p className="text-sm text-gray-600">Configure the sequence of actions in your workflow</p>
              </div>
              <Button variant="outline" className="gap-2" onClick={addNewStep}>
                <Plus className="w-4 h-4" />
                Add Step
              </Button>
            </div>

            <div className="space-y-4">
              {workflowData.steps.map((step, index) => (
                <Card key={step.id} className={`border-l-4 ${step.isTrigger ? 'border-l-yellow-500 bg-yellow-50/50' : 'border-l-[var(--theme-primary)]'}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 theme-primary text-white rounded-full flex items-center justify-center text-xs font-medium">
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
                        
                        {!editingSteps[step.id] && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => startEditingStep(step.id, step)}
                            title="Edit Step"
                          >
                            <Settings className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                        >
                          {expandedStep === step.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  {expandedStep === step.id && (
                    <CardContent className="pt-0">
                      <Separator className="mb-4" />
                      
                      {editingSteps[step.id] && (
                        <div className="flex items-center justify-between mb-4 p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Settings className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-900">Editing Step</span>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => saveStepEdit(step.id)}
                              className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Save
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => cancelStepEdit(step.id)}
                              className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                            >
                              <X className="w-3 h-3 mr-1" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div>
                            <Label className="text-xs font-medium text-gray-700">Step Name</Label>
                            <Input 
                              value={editingSteps[step.id] ? (stepValues[step.id]?.name || step.name) : step.name}
                              onChange={(e) => updateStepValue(step.id, 'name', e.target.value)}
                              className="mt-1" 
                              disabled={!editingSteps[step.id]}
                            />
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-gray-700">Description</Label>
                            <Textarea 
                              value={editingSteps[step.id] ? (stepValues[step.id]?.description || step.description) : step.description}
                              onChange={(e) => updateStepValue(step.id, 'description', e.target.value)}
                              className="mt-1" 
                              rows={2}
                              disabled={!editingSteps[step.id]}
                            />
                          </div>
                          
                          {/* Input Parameters (for agents and tools) */}
                          {step.input && (
                            <div>
                              <Label className="text-xs font-medium text-gray-700">Input Parameters</Label>
                              <div className="mt-1 p-3 bg-blue-50 rounded-md">
                                <div className="text-xs text-blue-600 font-medium mb-2">Source: {step.input.source}</div>
                                <code className="text-xs text-blue-700">
                                  {JSON.stringify(step.input.schema, null, 2)}
                                </code>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="space-y-3">
                          {/* Special trigger settings form */}
                          {step.isTrigger && editingSteps[step.id] ? (
                            <>
                              <div>
                                <Label className="text-xs font-medium text-gray-700">Trigger Type</Label>
                                <Select 
                                  defaultValue={step.config.triggerType}
                                  onValueChange={setSelectedTriggerType}
                                >
                                  <SelectTrigger className="mt-1">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Manual">Manual</SelectItem>
                                    <SelectItem value="On Message">On Message</SelectItem>
                                    <SelectItem value="On Event">On Event</SelectItem>
                                    <SelectItem value="On Schedule">On Schedule</SelectItem>
                                    <SelectItem value="On External Call">On External Call</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              {/* Manual Trigger - No additional config */}
                              {selectedTriggerType === 'Manual' && (
                                <div className="p-3 bg-blue-50 rounded-md">
                                  <p className="text-xs text-blue-700">Manual triggers are initiated by users through chat or UI buttons. No additional configuration needed.</p>
                                </div>
                              )}

                              {/* On Message Trigger */}
                              {selectedTriggerType === 'On Message' && (
                                <>
                                  <div>
                                    <Label className="text-xs font-medium text-gray-700">Message Condition</Label>
                                    <Select defaultValue="text_contains">
                                      <SelectTrigger className="mt-1">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="text_contains">Text contains/matches</SelectItem>
                                        <SelectItem value="regex_match">Regex match (advanced)</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label className="text-xs font-medium text-gray-700">Search Text/Pattern</Label>
                                    <Input 
                                      defaultValue="pricing"
                                      className="mt-1"
                                      placeholder="e.g. pricing, schedule demo, help"
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-xs font-medium text-gray-700">Message Sender</Label>
                                    <Select defaultValue="user">
                                      <SelectTrigger className="mt-1">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="user">User</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="system">System</SelectItem>
                                        <SelectItem value="any">Any</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label className="text-xs font-medium text-gray-700">Specific Copilot (Optional)</Label>
                                    <Select defaultValue="any">
                                      <SelectTrigger className="mt-1">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="any">Any Copilot</SelectItem>
                                        <SelectItem value="campaign-manager">Campaign Manager</SelectItem>
                                        <SelectItem value="content-assistant">Content Assistant</SelectItem>
                                        <SelectItem value="social-analyst">Social Analyst</SelectItem>
                                        <SelectItem value="customer-support">Customer Support</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </>
                              )}

                              {/* On Event Trigger */}
                              {selectedTriggerType === 'On Event' && (
                                <>
                                  <div>
                                    <Label className="text-xs font-medium text-gray-700">Event Source</Label>
                                    <Select defaultValue="tool_event">
                                      <SelectTrigger className="mt-1">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="tool_event">Tool Event</SelectItem>
                                        <SelectItem value="user_action">User Action</SelectItem>
                                        <SelectItem value="system_event">System Event</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label className="text-xs font-medium text-gray-700">Event Type</Label>
                                    <Select defaultValue="new_row_airtable">
                                      <SelectTrigger className="mt-1">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="new_row_airtable">New row in Airtable</SelectItem>
                                        <SelectItem value="new_ticket_intercom">New ticket in Intercom</SelectItem>
                                        <SelectItem value="new_comment_notion">New comment in Notion</SelectItem>
                                        <SelectItem value="user_uploads_resume">User uploads resume</SelectItem>
                                        <SelectItem value="user_completes_form">User completes form step</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label className="text-xs font-medium text-gray-700">Filter Conditions (Optional)</Label>
                                    <Input 
                                      className="mt-1"
                                      placeholder="e.g. field contains X, status = active"
                                    />
                                  </div>
                                </>
                              )}

                              {/* On Schedule Trigger */}
                              {selectedTriggerType === 'On Schedule' && (
                                <>
                                  <div>
                                    <Label className="text-xs font-medium text-gray-700">Frequency</Label>
                                    <Select defaultValue="daily">
                                      <SelectTrigger className="mt-1">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="every_x_minutes">Every X minutes</SelectItem>
                                        <SelectItem value="every_x_hours">Every X hours</SelectItem>
                                        <SelectItem value="daily">Daily at specific time</SelectItem>
                                        <SelectItem value="weekly">Weekly (choose day + time)</SelectItem>
                                        <SelectItem value="monthly">Monthly (Nth day)</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label className="text-xs font-medium text-gray-700">Schedule Details</Label>
                                    <Input 
                                      defaultValue="09:00"
                                      className="mt-1"
                                      placeholder="e.g. 09:00, Monday 14:30, 1st day"
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-xs font-medium text-gray-700">Timezone</Label>
                                    <Select defaultValue="local">
                                      <SelectTrigger className="mt-1">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="local">Local timezone</SelectItem>
                                        <SelectItem value="utc">UTC</SelectItem>
                                        <SelectItem value="est">EST</SelectItem>
                                        <SelectItem value="pst">PST</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </>
                              )}

                              {/* On External Call Trigger */}
                              {selectedTriggerType === 'On External Call' && (
                                <>
                                  <div>
                                    <Label className="text-xs font-medium text-gray-700">Webhook Endpoint</Label>
                                    <div className="mt-1 p-2 bg-gray-50 rounded border text-xs font-mono">
                                      https://knolli.app/webhook/wf-email-campaign-abc123
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Auto-generated unique URL for this workflow</p>
                                  </div>
                                  <div>
                                    <Label className="text-xs font-medium text-gray-700">Expected Payload Format</Label>
                                    <Select defaultValue="json">
                                      <SelectTrigger className="mt-1">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="json">JSON schema</SelectItem>
                                        <SelectItem value="raw_text">Raw text</SelectItem>
                                        <SelectItem value="form_data">Form data</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label className="text-xs font-medium text-gray-700">Authorization</Label>
                                    <Select defaultValue="api_key">
                                      <SelectTrigger className="mt-1">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="none">None</SelectItem>
                                        <SelectItem value="api_key">API Key</SelectItem>
                                        <SelectItem value="header">Custom Header</SelectItem>
                                        <SelectItem value="jwt">JWT Token</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label className="text-xs font-medium text-gray-700">Response Behavior</Label>
                                    <Select defaultValue="return_json">
                                      <SelectTrigger className="mt-1">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="return_json">Return JSON success</SelectItem>
                                        <SelectItem value="return_with_delay">Return with delay (async)</SelectItem>
                                        <SelectItem value="no_response">No response</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              {/* Regular step configuration form */}
                              {editingSteps[step.id] ? (
                                <>
                                  <div>
                                    <Label className="text-xs font-medium text-gray-700">Step Type</Label>
                                    <Select defaultValue={step.type}>
                                      <SelectTrigger className="mt-1">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="agent">Agent</SelectItem>
                                        <SelectItem value="tool">Tool</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  {/* Agent Selection */}
                                  {step.type === 'agent' && (
                                    <div>
                                      <Label className="text-xs font-medium text-gray-700">Select Agent</Label>
                                      <Select defaultValue={step.config.agentId || 'content-creator'}>
                                        <SelectTrigger className="mt-1">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="content-creator">Content Creator</SelectItem>
                                          <SelectItem value="data-analyst">Data Analyst</SelectItem>
                                          <SelectItem value="research-assistant">Research Assistant</SelectItem>
                                          <SelectItem value="social-media-manager">Social Media Manager</SelectItem>
                                          <SelectItem value="email-specialist">Email Specialist</SelectItem>
                                          <SelectItem value="seo-optimizer">SEO Optimizer</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  )}

                                  {/* Tool Selection */}
                                  {step.type === 'tool' && (
                                    <div>
                                      <Label className="text-xs font-medium text-gray-700">Select Tool</Label>
                                      <Select defaultValue={step.config.toolId || 'gmail'}>
                                        <SelectTrigger className="mt-1">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="gmail">Gmail</SelectItem>
                                          <SelectItem value="slack">Slack</SelectItem>
                                          <SelectItem value="airtable">Airtable</SelectItem>
                                          <SelectItem value="notion">Notion</SelectItem>
                                          <SelectItem value="google-drive">Google Drive</SelectItem>
                                          <SelectItem value="hubspot">HubSpot</SelectItem>
                                          <SelectItem value="mailchimp">Mailchimp</SelectItem>
                                          <SelectItem value="calendly">Calendly</SelectItem>
                                          <SelectItem value="openai">OpenAI</SelectItem>
                                          <SelectItem value="unsplash">Unsplash</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  )}

                                  <div>
                                    <Label className="text-xs font-medium text-gray-700">Name</Label>
                                    <Input 
                                      value={stepValues[step.id]?.name || step.name}
                                      onChange={(e) => updateStepValue(step.id, 'name', e.target.value)}
                                      className="mt-1"
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-xs font-medium text-gray-700">Description</Label>
                                    <Textarea 
                                      value={stepValues[step.id]?.description || step.description}
                                      onChange={(e) => updateStepValue(step.id, 'description', e.target.value)}
                                      className="mt-1"
                                      rows={2}
                                    />
                                  </div>

                                  {/* Agent-specific configuration */}
                                  {step.type === 'agent' && (
                                    <>
                                      <div>
                                        <Label className="text-xs font-medium text-gray-700">Agent Instructions</Label>
                                        <Textarea 
                                          defaultValue={step.config.instructions || "Process the input data and generate appropriate content"}
                                          className="mt-1"
                                          rows={3}
                                          placeholder="Specific instructions for this agent..."
                                        />
                                      </div>
                                      <div>
                                        <Label className="text-xs font-medium text-gray-700">Output Format</Label>
                                        <Select defaultValue={step.config.outputFormat || 'text'}>
                                          <SelectTrigger className="mt-1">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="text">Plain Text</SelectItem>
                                            <SelectItem value="markdown">Markdown</SelectItem>
                                            <SelectItem value="html">HTML</SelectItem>
                                            <SelectItem value="json">JSON</SelectItem>
                                            <SelectItem value="csv">CSV</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </>
                                  )}

                                  {/* Tool-specific configuration */}
                                  {step.type === 'tool' && (
                                    <>
                                      <div>
                                        <Label className="text-xs font-medium text-gray-700">Action</Label>
                                        <Select defaultValue={step.config.action || 'send_email'}>
                                          <SelectTrigger className="mt-1">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {step.config.toolId === 'gmail' && (
                                              <>
                                                <SelectItem value="send_email">Send Email</SelectItem>
                                                <SelectItem value="read_emails">Read Emails</SelectItem>
                                                <SelectItem value="create_draft">Create Draft</SelectItem>
                                              </>
                                            )}
                                            {step.config.toolId === 'slack' && (
                                              <>
                                                <SelectItem value="send_message">Send Message</SelectItem>
                                                <SelectItem value="create_channel">Create Channel</SelectItem>
                                                <SelectItem value="invite_user">Invite User</SelectItem>
                                              </>
                                            )}
                                            {step.config.toolId === 'airtable' && (
                                              <>
                                                <SelectItem value="create_record">Create Record</SelectItem>
                                                <SelectItem value="update_record">Update Record</SelectItem>
                                                <SelectItem value="read_records">Read Records</SelectItem>
                                              </>
                                            )}
                                            {step.config.toolId === 'notion' && (
                                              <>
                                                <SelectItem value="create_page">Create Page</SelectItem>
                                                <SelectItem value="update_page">Update Page</SelectItem>
                                                <SelectItem value="read_database">Read Database</SelectItem>
                                              </>
                                            )}
                                            {!['gmail', 'slack', 'airtable', 'notion'].includes(step.config.toolId) && (
                                              <>
                                                <SelectItem value="execute">Execute</SelectItem>
                                                <SelectItem value="process">Process</SelectItem>
                                                <SelectItem value="analyze">Analyze</SelectItem>
                                              </>
                                            )}
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div>
                                        <Label className="text-xs font-medium text-gray-700">Parameters</Label>
                                        <Textarea 
                                          defaultValue={JSON.stringify(step.config.parameters || {}, null, 2)}
                                          className="mt-1 font-mono text-xs"
                                          rows={3}
                                          placeholder="Tool-specific parameters in JSON format..."
                                        />
                                      </div>
                                    </>
                                  )}
                                </>
                              ) : (
                                <div>
                                  <Label className="text-xs font-medium text-gray-700">Configuration</Label>
                                  <div className="mt-1 p-3 bg-gray-50 rounded-md">
                                    <code className="text-xs text-gray-700">
                                      {JSON.stringify(step.config, null, 2)}
                                    </code>
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                          
                          {/* Output Parameters (for agents and tools) */}
                          {step.output && (
                            <div>
                              <Label className="text-xs font-medium text-gray-700">Output Parameters</Label>
                              <div className="mt-1 p-3 bg-green-50 rounded-md">
                                <code className="text-xs text-green-700">
                                  {JSON.stringify(step.output.schema, null, 2)}
                                </code>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {!editingSteps[step.id] && (
                        <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-1"
                            onClick={() => duplicateStep(step.id)}
                          >
                            <Copy className="w-3 h-3" />
                            Duplicate
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-1"
                            onClick={() => testStep(step.id)}
                          >
                            <Play className="w-3 h-3" />
                            Test Step
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-1 text-red-600 hover:text-red-700"
                            onClick={() => deleteStep(step.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                            Delete
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>

            
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="workflow-tab-content px-8 pb-24 pt-6 space-y-6" style={{ backgroundColor: 'var(--theme-background-light)' }}>
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
          <div className="workflow-tab-content px-8 pb-24 pt-6 space-y-6" style={{ backgroundColor: 'var(--theme-background-light)' }}>
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
          <div className="workflow-tab-content px-8 pb-24 pt-6 space-y-6" style={{ backgroundColor: 'var(--theme-background-light)' }}>
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
                  <Button className="w-full gap-2 theme-primary theme-primary-hover:hover text-white">
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
                          <span className="w-5 h-5 theme-primary text-white rounded-full flex items-center justify-center text-xs">
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