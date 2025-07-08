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
  Settings, 
  X,
  ExternalLink,
  Download,
  Upload,
  Zap,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';

interface N8nWorkflowEditorProps {
  workflowId?: string;
  onBack: () => void;
}

export function N8nWorkflowEditor({ workflowId = 'n8n-lead-enrichment', onBack }: N8nWorkflowEditorProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [workflowName, setWorkflowName] = useState('Lead Enrichment & Scoring');
  const [workflowDescription, setWorkflowDescription] = useState('Automatically enriches lead data from form submissions and calculates lead scores');
  const [isEnabled, setIsEnabled] = useState(true);
  const [n8nUrl, setN8nUrl] = useState('https://n8n.company.com/workflow/12345');

  // Sample n8n workflow data
  const n8nWorkflowData = {
    id: workflowId,
    name: workflowName,
    description: workflowDescription,
    source: 'n8n',
    status: 'Active',
    n8nId: 'wf_12345',
    lastSync: '2025-01-07T10:30:00Z',
    version: '2.1',
    nodes: [
      {
        id: 'webhook_trigger',
        name: 'Form Webhook',
        type: 'n8n-nodes-base.webhook',
        position: [250, 300],
        parameters: {
          path: 'lead-form',
          httpMethod: 'POST'
        }
      },
      {
        id: 'clearbit_enrichment',
        name: 'Clearbit Enrichment',
        type: 'n8n-nodes-base.clearbit',
        position: [450, 300],
        parameters: {
          operation: 'enrichPerson',
          email: '={{$json["email"]}}'
        }
      },
      {
        id: 'scoring_function',
        name: 'Calculate Lead Score',
        type: 'n8n-nodes-base.function',
        position: [650, 300],
        parameters: {
          functionCode: 'return calculateLeadScore(items[0].json);'
        }
      },
      {
        id: 'airtable_insert',
        name: 'Save to Airtable',
        type: 'n8n-nodes-base.airtable',
        position: [850, 300],
        parameters: {
          operation: 'create',
          base: 'appXXXXXXXXXXXXXX',
          table: 'Leads'
        }
      }
    ],
    credentials: [
      { name: 'Clearbit API', type: 'clearbit', status: 'connected' },
      { name: 'Airtable', type: 'airtable', status: 'connected' }
    ],
    executions: {
      total: 1247,
      successful: 1189,
      failed: 58,
      successRate: 95.3
    },
    variables: [
      { name: 'LEAD_SCORE_THRESHOLD', value: '75', type: 'number' },
      { name: 'NOTIFY_SALES_TEAM', value: 'true', type: 'boolean' }
    ]
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'Paused':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Zap },
    { id: 'nodes', label: 'Nodes', icon: Settings },
    { id: 'executions', label: 'Executions', icon: Play },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="n8n-workflow-editor h-full flex flex-col" style={{ backgroundColor: 'var(--theme-background-light)' }}>
      {/* Header */}
      <div className="n8n-header flex items-center justify-between px-8 pt-8 pb-6">
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900">{workflowName}</h1>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                n8n
              </Badge>
              {getStatusIcon(n8nWorkflowData.status)}
            </div>
            <p className="text-sm text-gray-600">{workflowDescription}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <ExternalLink className="w-4 h-4" />
            Open in n8n
          </Button>
          <Button variant="outline" onClick={onBack} className="gap-2">
            <X className="w-4 h-4" />
            Close
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="n8n-tab-nav flex border-b px-8">
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
      <div className="n8n-tab-content flex-1 overflow-auto px-8 pb-24 pt-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Executions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total</span>
                      <span className="font-medium">{n8nWorkflowData.executions.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Success Rate</span>
                      <span className="font-medium text-green-600">{n8nWorkflowData.executions.successRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Failed</span>
                      <span className="font-medium text-red-600">{n8nWorkflowData.executions.failed}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Workflow Info
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Version</span>
                      <span className="font-medium">{n8nWorkflowData.version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Nodes</span>
                      <span className="font-medium">{n8nWorkflowData.nodes.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Last Sync</span>
                      <span className="font-medium text-xs">Just now</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                      <Play className="w-3 h-3" />
                      Test Run
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                      <Download className="w-3 h-3" />
                      Sync from n8n
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Workflow Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Workflow Name</Label>
                    <Input 
                      value={workflowName} 
                      onChange={(e) => setWorkflowName(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>n8n Workflow URL</Label>
                    <Input 
                      value={n8nUrl} 
                      onChange={(e) => setN8nUrl(e.target.value)}
                      className="mt-1"
                      placeholder="https://n8n.company.com/workflow/12345"
                    />
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea 
                    value={workflowDescription} 
                    onChange={(e) => setWorkflowDescription(e.target.value)}
                    className="mt-1"
                    rows={2}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Workflow</Label>
                    <p className="text-xs text-gray-600">Allow this workflow to run automatically</p>
                  </div>
                  <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Connected Credentials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {n8nWorkflowData.credentials.map((cred, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{cred.name}</div>
                        <div className="text-xs text-gray-600">{cred.type}</div>
                      </div>
                      <Badge variant={cred.status === 'connected' ? 'default' : 'secondary'} className="bg-green-100 text-green-700">
                        {cred.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'nodes' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Workflow Nodes</h2>
                <p className="text-sm text-gray-600">These nodes are imported from your n8n workflow</p>
              </div>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Sync from n8n
              </Button>
            </div>

            <div className="space-y-4">
              {n8nWorkflowData.nodes.map((node, index) => (
                <Card key={node.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="font-medium text-gray-900">{node.name}</h3>
                          <p className="text-sm text-gray-600">{node.type}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        n8n node
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">Parameters:</span>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-md">
                        <code className="text-xs text-gray-700">
                          {JSON.stringify(node.parameters, null, 2)}
                        </code>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'executions' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Execution History</h2>
              <p className="text-sm text-gray-600">Recent workflow executions from n8n</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">{n8nWorkflowData.executions.total}</div>
                  <p className="text-xs text-gray-600">Total Executions</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-green-600">{n8nWorkflowData.executions.successful}</div>
                  <p className="text-xs text-gray-600">Successful</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-red-600">{n8nWorkflowData.executions.failed}</div>
                  <p className="text-xs text-gray-600">Failed</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-blue-600">{n8nWorkflowData.executions.successRate}%</div>
                  <p className="text-xs text-gray-600">Success Rate</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recent Executions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <div>
                          <div className="font-medium">Execution #{1248 - i}</div>
                          <div className="text-xs text-gray-600">{i} minutes ago</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">Success</div>
                        <div className="text-xs text-gray-600">1.2s</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Workflow Settings</h2>
              <p className="text-sm text-gray-600">Configure how this n8n workflow integrates with Knolli</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">n8n Integration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>n8n Instance URL</Label>
                  <Input 
                    defaultValue="https://n8n.company.com"
                    className="mt-1"
                    placeholder="https://your-n8n-instance.com"
                  />
                </div>
                <div>
                  <Label>Workflow ID</Label>
                  <Input 
                    defaultValue={n8nWorkflowData.n8nId}
                    className="mt-1"
                    placeholder="wf_12345"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-sync from n8n</Label>
                    <p className="text-xs text-gray-600">Automatically pull updates from n8n</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable webhook triggers</Label>
                    <p className="text-xs text-gray-600">Allow Knolli to trigger this workflow</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Workflow Variables</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {n8nWorkflowData.variables.map((variable, index) => (
                    <div key={index} className="grid grid-cols-3 gap-3 items-end">
                      <div>
                        <Label>Variable Name</Label>
                        <Input value={variable.name} className="mt-1" />
                      </div>
                      <div>
                        <Label>Value</Label>
                        <Input value={variable.value} className="mt-1" />
                      </div>
                      <div>
                        <Label>Type</Label>
                        <Select defaultValue={variable.type}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="string">String</SelectItem>
                            <SelectItem value="number">Number</SelectItem>
                            <SelectItem value="boolean">Boolean</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Save Bar */}
      <div className="n8n-save-bar fixed bottom-0 right-0 border-t bg-white px-8 py-4 flex items-center justify-end gap-3 z-50">
        <Button variant="outline" onClick={onBack}>
          Cancel
        </Button>
        <Button className="theme-primary hover:bg-[var(--theme-primary-hover)]">
          Save Changes
        </Button>
      </div>
    </div>
  );
}