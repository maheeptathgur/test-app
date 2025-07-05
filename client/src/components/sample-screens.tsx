import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import n8nLogo from "@assets/n8n-color_1751393955985.png";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { NavigationSection } from "@/lib/types";
import { Users, Bot, Wrench, GitBranch, BookOpen, UserCog, CreditCard, MessageSquare, BarChart3, Shield, Plus, FileText, Link, Trash2, Eye, Edit3, Check, X, Search, Filter, SortAsc, ArrowUpDown, Mail, MessageCircle, TrendingUp, Database, Camera, Cloud, FileImage, Globe, PenTool, SearchIcon, BarChart, Binoculars, Tags, HelpCircle, ArrowLeft, Copy, Download, Loader2, Play, RotateCcw, Upload, Activity, ChevronDown, Hash, Video, Trello, Calendar, FigmaIcon, MonitorPlay, FileQuestion, Github, Zap, Palette, Tablet, Building2, Send, Settings } from "lucide-react";
import { 
  SiGmail,
  SiSlack,
  SiGoogleanalytics,
  SiAirtable,
  SiOpenai,
  SiUnsplash,
  SiGoogledrive,
  SiNotion
} from 'react-icons/si';
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PricingScreen } from "./pricing-screen";
import { AgentConfigureScreen, AgentTestScreen } from "./agent-screens";
import { WorkflowEditor } from "./workflow-editor";
import { ToolConfigureScreen } from "./tool-configure-screen";

type WorkspaceSection = 'subscriptions' | 'conversations' | 'analytics' | 'users';

// Declare BrowseIntegrationsScreen before it's used
function GmailConfigScreen({ onBack }: { onBack: () => void }) {

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded flex items-center justify-center">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.887.703-1.603 1.582-1.636L12 10.545l10.418-6.724A1.636 1.636 0 0 1 24 5.457z" fill="#EA4335"/>
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Gmail Configuration</h1>
            <p className="text-gray-600">Manage your Gmail integration settings and automation</p>
          </div>
        </div>
        <Button variant="outline" onClick={onBack} className="gap-2">
          <X className="h-4 w-4" />
          Close
        </Button>
      </div>

      {/* Connection Settings */}
      <div className="space-y-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Connection Status</CardTitle>
                <CardDescription>Your Gmail account connection and authentication details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Connected to Gmail</p>
                      <p className="text-sm text-gray-600">john.doe@company.com</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Reconnect
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Account Email</label>
                    <Input value="john.doe@company.com" disabled />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Authentication Level</label>
                    <Select defaultValue="user">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sync Frequency</label>
                    <Select defaultValue="real-time">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="real-time">Real-time</SelectItem>
                        <SelectItem value="5min">Every 5 minutes</SelectItem>
                        <SelectItem value="15min">Every 15 minutes</SelectItem>
                        <SelectItem value="1hour">Every hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-between items-center pt-6 border-t">
        <Button variant="outline" onClick={onBack}>
          Cancel
        </Button>
        <div className="flex gap-3">
          <Button variant="outline">
            Test Connection
          </Button>
          <Button className="bg-[#008062] hover:bg-[#00d2a0] text-white">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

function BrowseIntegrationsScreen({ onBack, onGmailConfig }: { onBack: () => void; onGmailConfig: () => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Function to get tool logo
  const getToolLogo = (toolName: string) => {
    switch (toolName.toLowerCase()) {
      case 'slack': 
        return (
          <div className="w-8 h-8 rounded flex items-center justify-center">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/>
              <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/>
              <path d="M18.956 8.834a2.528 2.528 0 0 1 2.521-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.523 2.521h-2.521V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D"/>
              <path d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.521A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.523v-2.521h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#ECB22E"/>
            </svg>
          </div>
        );
      case 'gmail':
        return (
          <div className="w-8 h-8 rounded flex items-center justify-center">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.887.703-1.603 1.582-1.636L12 10.545l10.418-6.724A1.636 1.636 0 0 1 24 5.457z" fill="#EA4335"/>
            </svg>
          </div>
        );
      case 'google workspace':
        return (
          <div className="w-8 h-8 rounded flex items-center justify-center">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </div>
        );
      case 'microsoft 365':
        return (
          <div className="w-8 h-8 rounded flex items-center justify-center">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path d="M2 2h9v9H2V2z" fill="#F25022"/>
              <path d="M13 2h9v9h-9V2z" fill="#7FBA00"/>
              <path d="M2 13h9v9H2v-9z" fill="#00A4EF"/>
              <path d="M13 13h9v9h-9v-9z" fill="#FFB900"/>
            </svg>
          </div>
        );
      case 'zoom':
        return (
          <div className="w-8 h-8 rounded flex items-center justify-center">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#2D8CFF"/>
              <path d="M16 10.5v3L12 12l4-1.5z" fill="#2D8CFF"/>
              <rect x="8" y="9" width="4" height="6" rx="1" fill="#2D8CFF"/>
            </svg>
          </div>
        );
      case 'trello':
        return (
          <div className="w-8 h-8 rounded flex items-center justify-center">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="3" fill="#0079BF"/>
              <rect x="5" y="5" width="5" height="10" rx="1" fill="white"/>
              <rect x="14" y="5" width="5" height="6" rx="1" fill="white"/>
            </svg>
          </div>
        );
      case 'asana':
        return (
          <div className="w-8 h-8 rounded flex items-center justify-center">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <circle cx="7" cy="12" r="5" fill="#F06A6A"/>
              <circle cx="17" cy="12" r="5" fill="#F06A6A"/>
              <circle cx="12" cy="7" r="5" fill="#F06A6A"/>
            </svg>
          </div>
        );
      case 'linear':
        return (
          <div className="w-8 h-8 rounded flex items-center justify-center bg-black">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 12l10 10 10-10L12 2z" fill="white"/>
            </svg>
          </div>
        );
      case 'figma':
        return (
          <div className="w-8 h-8 rounded flex items-center justify-center">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z" fill="#0ACF83"/>
              <path d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" fill="#A259FF"/>
              <path d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z" fill="#F24E1E"/>
              <path d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z" fill="#FF7262"/>
              <path d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z" fill="#1ABCFE"/>
            </svg>
          </div>
        );
      case 'loom':
        return (
          <div className="w-8 h-8 rounded flex items-center justify-center">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#625DF5"/>
              <polygon points="10,8 16,12 10,16" fill="white"/>
            </svg>
          </div>
        );
      case 'notion':
        return (
          <div className="w-8 h-8 rounded flex items-center justify-center">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466l1.823 1.447zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.28c.093.466 0 .933-.466.98l-.747.14v10.264c-.66.373-1.26.373-1.68.047l-3.993-6.173V18.7c0 0 .373.213 0 .42l-4.366.233c-.093-.187 0-.653.327-.746l.934-.28V9.854L7.822 9.76c-.094-.467.14-1.12.793-1.167l4.646-.326 4.553 6.98V8.92c0-.046-.327-.233.047-.374l.747-.187zm-11.423.374l4.179.04-4.179 2.24v-2.28z" fill="black"/>
            </svg>
          </div>
        );
      case 'discord':
        return (
          <div className="w-8 h-8 rounded flex items-center justify-center">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" fill="#5865F2"/>
            </svg>
          </div>
        );
      case 'google analytics':
        return (
          <div className="w-8 h-8 rounded flex items-center justify-center">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path d="M12.5 6.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" fill="#F9AB00"/>
              <path d="M7 15c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" fill="#E37400"/>
              <path d="M17 20c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" fill="#4285F4"/>
            </svg>
          </div>
        );
      case 'mixpanel':
        return (
          <div className="w-8 h-8 rounded flex items-center justify-center bg-purple-600">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        );
      case 'amplitude':
        return (
          <div className="w-8 h-8 rounded flex items-center justify-center bg-blue-600">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="white">
              <path d="M12 2l3.09 6.26L22 9l-5 4.87L18.18 20 12 16.77 5.82 20 7 13.87 2 9l6.91-.74L12 2z"/>
            </svg>
          </div>
        );
      case 'tableau':
        return (
          <div className="w-8 h-8 rounded flex items-center justify-center">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="8" width="8" height="8" fill="#E97627"/>
              <rect x="14" y="8" width="8" height="8" fill="#E97627"/>
              <rect x="8" y="2" width="8" height="8" fill="#E97627"/>
              <rect x="8" y="14" width="8" height="8" fill="#E97627"/>
            </svg>
          </div>
        );
      case 'hubspot':
        return (
          <div className="w-8 h-8 rounded flex items-center justify-center">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path d="M18.164 7.931V4.5a1.5 1.5 0 1 0-3 0v1.636A6.5 6.5 0 0 0 6.5 12v1.636a1.5 1.5 0 1 0 3 0V12a3.5 3.5 0 0 1 6.164-2.231V12a6.5 6.5 0 0 0 2.5 5.164v1.336a1.5 1.5 0 1 0 3 0V16.164A9.5 9.5 0 0 0 18.164 7.931z" fill="#FF7A59"/>
            </svg>
          </div>
        );
      case 'mailchimp':
        return (
          <div className="w-8 h-8 rounded flex items-center justify-center">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.41 0 8-3.59 8-8s-3.59-8-8-8-8 3.59-8 8 3.59 8 8 8z" fill="#FFE01B"/>
              <circle cx="9" cy="10" r="1.5" fill="black"/>
              <circle cx="15" cy="10" r="1.5" fill="black"/>
              <path d="M8 14c2.5 2 5.5 2 8 0" stroke="black" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
        );
      case 'salesforce':
        return (
          <div className="w-8 h-8 rounded flex items-center justify-center">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path d="M8.5 4C6.567 4 5 5.567 5 7.5S6.567 11 8.5 11H11c1.105 0 2-.895 2-2V7.5C13 5.567 11.433 4 9.5 4h-1zm7 0c1.933 0 3.5 1.567 3.5 3.5S17.433 11 15.5 11H13c-1.105 0-2-.895-2-2V7.5C11 5.567 12.567 4 14.5 4h1zm-7 9C6.567 13 5 14.567 5 16.5S6.567 20 8.5 20H11c1.105 0 2-.895 2-2v-1.5c0-1.933-1.567-3.5-3.5-3.5h-1zm7 0c1.933 0 3.5 1.567 3.5 3.5S17.433 20 15.5 20H13c-1.105 0-2-.895-2-2v-1.5c0-1.933 1.567-3.5 3.5-3.5h1z" fill="#00A1E0"/>
            </svg>
          </div>
        );
      case 'intercom':
        return (
          <div className="w-8 h-8 rounded flex items-center justify-center">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path d="M4 12a8 8 0 1 1 16 0v4.5c0 1.933-1.567 3.5-3.5 3.5S13 18.433 13 16.5V12a1 1 0 0 0-2 0v4.5c0 1.933-1.567 3.5-3.5 3.5S4 18.433 4 16.5V12z" fill="#338DF1"/>
              <rect x="6" y="7" width="2" height="8" rx="1" fill="#338DF1"/>
              <rect x="10" y="5" width="2" height="12" rx="1" fill="#338DF1"/>
              <rect x="14" y="7" width="2" height="8" rx="1" fill="#338DF1"/>
              <rect x="18" y="9" width="2" height="4" rx="1" fill="#338DF1"/>
            </svg>
          </div>
        );
      default: return <div className="w-8 h-8 bg-gray-500 rounded flex items-center justify-center text-white font-bold">{toolName.charAt(0)}</div>;
    }
  };

  const integrationsByCategory = {
    "Popular Integrations": [
      { name: 'Gmail', description: 'Send emails, read messages, organize inbox, and manage labels', users: '1.8B+', category: 'communication', connected: true },
      { name: 'Slack', description: 'Send messages, create channels, and manage team notifications', users: '10M+', category: 'communication', connected: true },
      { name: 'Google Workspace', description: 'Access Gmail, create documents, schedule meetings, and manage files', users: '3B+', category: 'productivity', connected: true },
      { name: 'Microsoft 365', description: 'Create Word docs, Excel sheets, PowerPoint slides, and send Outlook emails', users: '1.3B+', category: 'productivity', connected: false },
      { name: 'Zoom', description: 'Schedule meetings, start video calls, and manage webinars', users: '300M+', category: 'communication', connected: true },
      { name: 'Trello', description: 'Create boards, manage cards, assign tasks, and track project progress', users: '50M+', category: 'productivity', connected: false },
    ],
    "Recently Added": [
      { name: 'Linear', description: 'Create issues, track bugs, manage sprints, and plan roadmaps', users: 'New', category: 'productivity', connected: false },
      { name: 'Figma', description: 'Access designs, create prototypes, leave comments, and export assets', users: 'New', category: 'productivity', connected: true },
      { name: 'Loom', description: 'Record screens, create video messages, and share visual feedback', users: 'New', category: 'communication', connected: false },
      { name: 'Notion', description: 'Access databases, create pages, manage wikis, and organize knowledge', users: 'New', category: 'productivity', connected: true },
      { name: 'Discord', description: 'Send messages, join voice channels, and manage server notifications', users: 'New', category: 'communication', connected: false },
    ],
    "Analytics & Data": [
      { name: 'Google Analytics', description: 'Pull website traffic data, user behavior metrics, and conversion reports', users: 'Free', category: 'analytics', connected: true },
      { name: 'Mixpanel', description: 'Track user events, analyze funnels, and create custom reports', users: 'Popular', category: 'analytics', connected: false },
      { name: 'Amplitude', description: 'Monitor user journeys, segment audiences, and measure retention', users: 'Popular', category: 'analytics', connected: false },
      { name: 'Tableau', description: 'Create dashboards, visualize data, and generate business reports', users: 'Enterprise', category: 'analytics', connected: false },
    ],
    "Marketing & Sales": [
      { name: 'HubSpot', description: 'Manage contacts, track deals, send emails, and create marketing campaigns', users: 'Popular', category: 'marketing', connected: true },
      { name: 'Mailchimp', description: 'Send newsletters, create automations, manage subscribers, and track opens', users: 'Popular', category: 'marketing', connected: false },
      { name: 'Salesforce', description: 'Access customer data, update opportunities, create reports, and manage leads', users: 'Enterprise', category: 'marketing', connected: false },
      { name: 'Intercom', description: 'Send customer messages, create help articles, and manage support tickets', users: 'Popular', category: 'marketing', connected: false },
    ]
  };

  const filteredIntegrations = Object.entries(integrationsByCategory).reduce((acc, [categoryName, integrations]) => {
    const filtered = integrations.filter(integration => {
      const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           integration.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    
    // Sort the filtered integrations
    const sorted = filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'users':
          // Sort by popularity (numerical values first, then text)
          const aUsers = a.users.includes('+') ? parseInt(a.users.replace(/[^\d]/g, '')) : 0;
          const bUsers = b.users.includes('+') ? parseInt(b.users.replace(/[^\d]/g, '')) : 0;
          return bUsers - aUsers;
        default:
          return 0;
      }
    });
    
    if (sorted.length > 0) {
      acc[categoryName] = sorted;
    }
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Browse Integrations</h1>
          <p className="text-sm text-muted-foreground">Explore available integrations and tools from our marketplace</p>
        </div>
        <Button variant="outline" onClick={onBack} className="gap-2">
          <X className="h-4 w-4" />
          Close
        </Button>
      </div>
      {/* Search, Filter and Sort */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input 
            placeholder="Search integrations..." 
            className="w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="communication">Communication</SelectItem>
            <SelectItem value="productivity">Productivity</SelectItem>
            <SelectItem value="analytics">Analytics</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-40">
            <SortAsc className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="category">Category</SelectItem>
            <SelectItem value="users">Popularity</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Integrations by Category */}
      <div className="space-y-8">
        {Object.entries(filteredIntegrations).map(([categoryName, integrations]) => (
          <div key={categoryName}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">{categoryName}</h2>
              <Badge variant="secondary">{integrations.length} integrations</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {integrations.map((integration) => (
                <Card key={integration.name} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 mb-3">
                    {getToolLogo(integration.name)}
                    <div className="flex-1">
                      <h4 className="font-medium">{integration.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{integration.description}</p>
                      {integration.connected ? (
                        <div className="flex items-center gap-3 mt-3">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-gray-600 hover:text-gray-800"
                            onClick={() => {
                              console.log('Configure clicked for:', integration.name);
                              if (integration.name === 'Gmail') {
                                console.log('Calling onGmailConfig');
                                onGmailConfig();
                              }
                            }}
                          >
                            Configure
                          </Button>
                          <div className="flex items-center gap-2 text-green-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm font-medium">Connected</span>
                          </div>
                        </div>
                      ) : (
                        <Button size="sm" className="bg-[#008062] hover:bg-[#00d2a0] text-white mt-3">
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
      {Object.keys(filteredIntegrations).length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
            <Search className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-lg font-medium mb-2">No integrations found</p>
          <p className="text-sm">Try adjusting your search terms or category filter.</p>
        </div>
      )}
    </div>
  );
}

interface SampleScreenProps {
  section: NavigationSection | WorkspaceSection;
  configureAgent?: {id: string, name: string} | null;
  onClearConfigureAgent?: () => void;
  onConfigureAgent?: (agent: any) => void;
  configureTool?: {id: string, name: string} | null;
  onClearConfigureTool?: () => void;
  configureWorkflow?: {id: string, name: string} | null;
  onClearConfigureWorkflow?: () => void;
  onBrowseIntegrationsChange?: (isActive: boolean) => void;
  onGmailConfigChange?: (isActive: boolean) => void;
}

export function SampleScreen({ 
  section, 
  configureAgent: externalConfigureAgent, 
  onClearConfigureAgent,
  onConfigureAgent,
  configureTool: externalConfigureTool,
  onClearConfigureTool,
  configureWorkflow: externalConfigureWorkflow,
  onClearConfigureWorkflow,
  onBrowseIntegrationsChange,
  onGmailConfigChange
}: SampleScreenProps) {
  const [localConfigureAgent, setLocalConfigureAgent] = useState<any>(null);
  const [editWorkflow, setEditWorkflow] = useState<string | undefined>(undefined);
  const [localConfigureTool, setLocalConfigureTool] = useState<any>(null);
  const [showConnectNewTool, setShowConnectNewTool] = useState(false);
  const [showBrowseIntegrations, setShowBrowseIntegrations] = useState(false);
  const [showAddWorkspace, setShowAddWorkspace] = useState(false);
  const [showGmailConfig, setShowGmailConfig] = useState(false);

  // Clear local state when section changes or when external clear functions are triggered
  useEffect(() => {
    // Clear all local configuration states when section changes
    setLocalConfigureAgent(null);
    setEditWorkflow(undefined);
    setLocalConfigureTool(null);
    setShowConnectNewTool(false);
    setShowBrowseIntegrations(false);
    setShowAddWorkspace(false);
    setShowGmailConfig(false);
  }, [section]);

  // Clear local state when external clear functions are called
  useEffect(() => {
    if (onClearConfigureAgent) {
      setLocalConfigureAgent(null);
    }
  }, [onClearConfigureAgent]);

  // Notify dashboard when browse integrations state changes
  useEffect(() => {
    onBrowseIntegrationsChange?.(showBrowseIntegrations);
  }, [showBrowseIntegrations, onBrowseIntegrationsChange]);

  // Notify dashboard when Gmail config state changes
  useEffect(() => {
    onGmailConfigChange?.(showGmailConfig);
  }, [showGmailConfig, onGmailConfigChange]);

  useEffect(() => {
    if (onClearConfigureTool) {
      setLocalConfigureTool(null);
    }
  }, [onClearConfigureTool]);

  useEffect(() => {
    if (onClearConfigureWorkflow) {
      setEditWorkflow(undefined);
    }
  }, [onClearConfigureWorkflow]);

  const handleAgentConfigure = (agent: any) => {
    if (onConfigureAgent) {
      onConfigureAgent(agent);
    } else {
      setLocalConfigureAgent(agent);
    }
  };

  const handleBackToAgents = () => {
    setLocalConfigureAgent(null);
    onClearConfigureAgent?.();
  };

  const handleWorkflowEdit = (workflowId: string) => {
    setEditWorkflow(workflowId);
  };

  const handleBackToWorkflows = () => {
    setEditWorkflow(undefined);
    onClearConfigureWorkflow?.();
  };

  const handleToolConfigure = (tool: any) => {
    setLocalConfigureTool(tool);
  };

  const handleBackToTools = () => {
    setLocalConfigureTool(null);
    onClearConfigureTool?.();
  };

  // Show Configure screen if an agent is being configured
  // All conditional rendering moved to the JSX return to ensure modals are always included
  
  // Add modals after the main render but before the function ends
  // This is a wrapper div to contain the modals alongside the main content
  return (
    <>
      {(() => {
        // Determine which agent/tool/workflow to configure (external from copilot config or local from screen)
        const agentToConfig = externalConfigureAgent || localConfigureAgent;
        const toolToConfig = externalConfigureTool || localConfigureTool;
        const workflowToConfig = externalConfigureWorkflow || (editWorkflow ? { id: editWorkflow, name: editWorkflow } : null);

        if (agentToConfig) {
          return <AgentConfigureScreen agent={agentToConfig} onBack={handleBackToAgents} />;
        }



        if (workflowToConfig) {
          return <WorkflowEditor workflowId={workflowToConfig.id} onBack={handleBackToWorkflows} />;
        }

        if (toolToConfig) {
          return <ToolConfigureScreen tool={toolToConfig} onBack={handleBackToTools} />;
        }

        if (showBrowseIntegrations) {
          return <BrowseIntegrationsScreen onBack={() => setShowBrowseIntegrations(false)} onGmailConfig={() => {
            setShowBrowseIntegrations(false);
            setShowGmailConfig(true);
          }} />;
        }

        if (showGmailConfig) {
          return <GmailConfigScreen onBack={() => setShowGmailConfig(false)} />;
        }

        switch (section) {
          case 'agents':
            return <AgentsScreen onAgentConfigure={handleAgentConfigure} />;
          case 'tools':
            return <ToolsScreen 
              onToolConfigure={handleToolConfigure} 
              onConnectNewTool={() => {
                console.log('Connect New Tool clicked - setting state to true');
                setShowConnectNewTool(true);
                console.log('showConnectNewTool state:', true);
              }}
              onBrowseIntegrations={() => {
                console.log('Browse Integrations clicked - setting state to true');
                setShowBrowseIntegrations(true);
                console.log('showBrowseIntegrations state:', true);
              }}
            />;
          case 'workflows':
            return <WorkflowsScreen onWorkflowEdit={handleWorkflowEdit} />;
          case 'knowledge-base':
            return <KnowledgeBaseScreen />;
          case 'subscriptions' as any:
            return <SubscriptionsScreen />;
          case 'conversations' as any:
            return <ConversationsScreen />;
          case 'analytics' as any:
            return <AnalyticsScreen />;
          case 'users' as any:
            return <UsersScreen />;
          case 'pricing':
            return <PricingScreen />;
          default:
            return <div>Unknown section</div>;
        }
      })()}

      {/* Connect New Tool Modal */}
      {console.log('Rendering Connect New Tool Modal, open:', showConnectNewTool)}
      <Dialog open={showConnectNewTool} onOpenChange={(open) => {
        console.log('Dialog onOpenChange called with:', open);
        setShowConnectNewTool(open);
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Connect New Tool</DialogTitle>
            <DialogDescription>
              Connect a new third-party service or API to extend your copilots' capabilities
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: 'Zapier', icon: '⚡', category: 'Automation' },
                { name: 'Microsoft Teams', icon: '💬', category: 'Communication' },
                { name: 'Salesforce', icon: '☁️', category: 'CRM' },
                { name: 'HubSpot', icon: '🎯', category: 'Marketing' },
                { name: 'Jira', icon: '🔧', category: 'Project Management' },
                { name: 'GitHub', icon: '🐙', category: 'Development' },
              ].map((tool) => (
                <Card key={tool.name} className="p-4 hover:shadow-md cursor-pointer transition-shadow">
                  <div className="text-center">
                    <div className="text-2xl mb-2">{tool.icon}</div>
                    <div className="font-medium text-sm">{tool.name}</div>
                    <div className="text-xs text-gray-500">{tool.category}</div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Custom Integration</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Service Name</label>
                  <Input placeholder="Enter service name..." className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">API Endpoint</label>
                  <Input placeholder="https://api.example.com" className="mt-1" />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowConnectNewTool(false)}>
                Cancel
              </Button>
              <Button className="bg-[#008062] hover:bg-[#00d2a0] text-white">
                Connect Tool
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>


    </>
  );
}

function AgentsScreen({ onAgentConfigure }: { onAgentConfigure?: (agent: any) => void; } = {}) {
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [expandedAgents, setExpandedAgents] = useState<Set<number>>(new Set());
  const [collapsedStats, setCollapsedStats] = useState<Set<number>>(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
  const [agents, setAgents] = useState([
    { 
      id: 1, 
      name: "SEO Writer", 
      copilot: "Content Manager", 
      description: "Creates optimized blog posts and articles",
      tools: ["Content Research", "Keyword Analysis"],
      workflows: ["Blog Post Generation", "Meta Description"],
      status: "Active", 
      requests: 156,
      knowledgeBase: "SEO Guidelines",
      lastActive: "2 min ago",
      usedByCopilots: ["Content Manager", "Campaign Manager"],
      usedByWorkflows: ["Blog Post Generation", "Meta Description"],
      lastChanged: "3 days ago",
      usageCount90Days: 342
    },
    { 
      id: 2, 
      name: "SEO Optimizer", 
      copilot: "Content Manager", 
      description: "Optimizes existing content for search engines",
      tools: ["SEO Analyzer", "Keyword Density"],
      workflows: ["Content Optimization", "SERP Analysis"],
      status: "Active", 
      requests: 89,
      knowledgeBase: "SEO Best Practices",
      lastActive: "5 min ago",
      usedByCopilots: ["Content Manager"],
      usedByWorkflows: ["Content Optimization", "SERP Analysis", "SEO Audit"],
      lastChanged: "1 week ago",
      usageCount90Days: 156
    },
    { 
      id: 3, 
      name: "Performance Analyst", 
      copilot: "Business Intelligence", 
      description: "Analyzes website and content performance metrics",
      tools: ["Analytics API", "Report Builder"],
      workflows: ["Performance Report", "Traffic Analysis"],
      status: "Active", 
      requests: 234,
      knowledgeBase: "Analytics Guidelines",
      lastActive: "1 min ago",
      usedByCopilots: ["Social Analyst", "Campaign Manager"],
      usedByWorkflows: ["Performance Report", "Traffic Analysis"],
      lastChanged: "5 days ago",
      usageCount90Days: 478
    },
    { 
      id: 4, 
      name: "Competitor Researcher", 
      copilot: "Business Intelligence", 
      description: "Researches competitor strategies and market trends",
      tools: ["Web Scraper", "Market Data API"],
      workflows: ["Competitor Analysis", "Market Research"],
      status: "Active", 
      requests: 67,
      knowledgeBase: "Market Research Data",
      lastActive: "8 min ago",
      usedByCopilots: ["Social Analyst"],
      usedByWorkflows: ["Competitor Analysis", "Market Research", "Trend Monitoring"],
      lastChanged: "2 weeks ago",
      usageCount90Days: 89
    },
    { 
      id: 5, 
      name: "Ticket Classifier", 
      copilot: "Customer Support", 
      description: "Categorizes and prioritizes support tickets",
      tools: ["NLP Classifier", "Priority Scorer"],
      workflows: ["Ticket Routing", "Escalation Rules"],
      status: "Active", 
      requests: 445,
      knowledgeBase: "Support Categories",
      lastActive: "30 sec ago",
      usedByCopilots: ["Customer Support"],
      usedByWorkflows: ["Ticket Routing", "Escalation Rules"],
      lastChanged: "1 day ago",
      usageCount90Days: 1247
    },
    { 
      id: 6, 
      name: "FAQ Generator", 
      copilot: "Customer Support", 
      description: "Creates and updates FAQ content from tickets",
      tools: ["Content Extractor", "FAQ Builder"],
      workflows: ["FAQ Creation", "Content Updates"],
      status: "Inactive", 
      requests: 23,
      knowledgeBase: "Support Documentation",
      lastActive: "2 hours ago",
      usedByCopilots: ["Customer Support"],
      usedByWorkflows: ["FAQ Creation", "Content Updates"],
      lastChanged: "3 weeks ago",
      usageCount90Days: 12
    }
  ]);

  // Filter and sort agents
  const filteredAndSortedAgents = agents
    .filter(agent => filterStatus === "All" || agent.status === filterStatus)
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "status":
          return a.status.localeCompare(b.status);
        case "requests":
          return b.requests - a.requests;
        case "lastActive":
          return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
        default:
          return 0;
      }
    });

  const totalAgents = agents.length;
  const activeAgents = agents.filter(agent => agent.status === 'Active').length;
  const totalRequests = agents.reduce((sum, agent) => sum + agent.requests, 0);

  const toggleAgentStatus = (agentId: number) => {
    setAgents(prevAgents => 
      prevAgents.map(agent => 
        agent.id === agentId 
          ? { ...agent, status: agent.status === 'Active' ? 'Inactive' : 'Active' }
          : agent
      )
    );
  };

  const toggleExpanded = (agentId: number) => {
    setExpandedAgents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(agentId)) {
        newSet.delete(agentId);
      } else {
        newSet.add(agentId);
      }
      return newSet;
    });
  };

  const toggleStatsCollapsed = (agentId: number) => {
    setCollapsedStats(prev => {
      const newSet = new Set(prev);
      if (newSet.has(agentId)) {
        newSet.delete(agentId);
      } else {
        newSet.add(agentId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <Button className="bg-white border border-gray-300 text-gray-700 hover:bg-[#00d1a0] hover:text-white hover:border-[#00d1a0]">
            <Plus className="w-4 h-4 mr-2" />
            Create New Agent
          </Button>
          <Button variant="outline">
            Go to Marketplace
          </Button>
        </div>
        <div className="flex gap-2">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <ArrowUpDown className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="status">Sort by Status</SelectItem>
              <SelectItem value="requests">Sort by Requests</SelectItem>
              <SelectItem value="lastActive">Sort by Last Active</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* All Agents */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">
          {filterStatus === "All" ? "All Agents" : `${filterStatus} Agents`}
        </h2>
        <Badge variant="secondary">{filteredAndSortedAgents.length} agents</Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAndSortedAgents.map((agent) => {
          // Get appropriate icon for each agent based on their function
          const getAgentIcon = (agentName: string) => {
            switch (agentName) {
              case 'Content Writer':
                return <PenTool className="w-8 h-8 text-purple-600" />;
              case 'SEO Optimizer':
                return <TrendingUp className="w-8 h-8 text-green-600" />;
              case 'Performance Analyst':
                return <BarChart className="w-8 h-8 text-blue-600" />;
              case 'Competitor Researcher':
                return <Binoculars className="w-8 h-8 text-orange-600" />;
              case 'Ticket Classifier':
                return <Tags className="w-8 h-8 text-red-600" />;
              case 'FAQ Generator':
                return <HelpCircle className="w-8 h-8 text-indigo-600" />;
              default:
                return <Bot className="w-8 h-8 text-gray-600" />;
            }
          };

          return (
          <Card key={agent.id} className="hover:shadow-md transition-shadow h-full flex flex-col">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-3">
                {getAgentIcon(agent.name)}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-base mb-1 truncate">{agent.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <button
                      onClick={() => toggleAgentStatus(agent.id)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        agent.status === 'Active' 
                          ? 'bg-[#008062]' 
                          : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                          agent.status === 'Active' ? 'translate-x-5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                    <span className="text-xs text-gray-600">{agent.status}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 flex-1 flex flex-col">
              <p className="text-sm text-gray-600 mb-4 flex-grow">{agent.description}</p>
              
              <div className="space-y-4 mt-auto">
                {/* Usage Statistics */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => toggleStatsCollapsed(agent.id)}
                      className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      <span>Usage Statistics</span>
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform ${
                          collapsedStats.has(agent.id) ? '-rotate-90' : ''
                        }`} 
                      />
                    </button>
                  </div>

                  {!collapsedStats.has(agent.id) && (
                    <>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Used by:</p>
                        <div className="flex flex-wrap gap-1">
                          {(() => {
                            const allItems = [
                              ...(agent.usedByCopilots?.map(name => ({ name, type: 'copilot' })) || []),
                              ...(agent.usedByWorkflows?.map(name => ({ name, type: 'workflow' })) || [])
                            ];
                            const isExpanded = expandedAgents.has(agent.id);
                            const visibleItems = isExpanded ? allItems : allItems.slice(0, 3);
                            const remainingCount = allItems.length - 3;

                            return (
                              <>
                                {visibleItems.map((item, idx) => (
                                  <Badge 
                                    key={`${item.type}-${idx}`} 
                                    className={`text-xs ${
                                      item.type === 'copilot' 
                                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                        : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                                    }`}
                                  >
                                    {item.name}
                                  </Badge>
                                ))}
                                {!isExpanded && remainingCount > 0 && (
                                  <button
                                    onClick={() => toggleExpanded(agent.id)}
                                    className="text-xs px-2 py-1 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors"
                                  >
                                    +{remainingCount}
                                  </button>
                                )}
                              </>
                            );
                          })()}
                        </div>
                      </div>

                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Last changed: {agent.lastChanged}</p>
                        <p>Used {agent.usageCount90Days} times in the last 90 days</p>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="pt-2">
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => onAgentConfigure?.(agent)}
                    >
                      Configure
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
        })}
      </div>
    </div>
  );
}

function ToolsScreen({ 
  onToolConfigure, 
  onConnectNewTool, 
  onBrowseIntegrations 
}: { 
  onToolConfigure?: (tool: any) => void;
  onConnectNewTool?: () => void;
  onBrowseIntegrations?: () => void;
} = {}) {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  
  const allTools = [
    {
      id: 1,
      name: "Gmail",
      description: "Send emails, read inbox, create drafts",
      provider: "Google",
      type: "API Integration",
      category: "Communication",
      status: "Connected",
      usedBy: ["Content Manager", "Customer Support"],
      lastUsed: "5 min ago",
      totalCalls: 1204,
      authType: "OAuth 2.0",
      endpoints: ["Send Email", "Read Inbox", "Create Draft"]
    },
    {
      id: 2,
      name: "Slack",
      description: "Send messages, create channels, manage notifications",
      provider: "Slack Technologies",
      type: "Webhook",
      category: "Communication",
      status: "Connected",
      usedBy: ["Customer Support"],
      lastUsed: "12 min ago",
      totalCalls: 567,
      authType: "Bot Token",
      endpoints: ["Send Message", "Create Channel", "Upload File"]
    },
    {
      id: 3,
      name: "Google Analytics",
      description: "Retrieve website traffic and performance data",
      provider: "Google",
      type: "API Integration",
      category: "Data & Analytics",
      status: "Connected",
      usedBy: ["Business Intelligence"],
      lastUsed: "2 min ago",
      totalCalls: 892,
      authType: "Service Account",
      endpoints: ["Get Reports", "Get Real-time Data", "Get Dimensions"]
    },
    {
      id: 4,
      name: "Airtable",
      description: "Create records, update databases, manage tables",
      provider: "Airtable",
      type: "API Integration",
      category: "Data & Analytics",
      status: "Disconnected",
      usedBy: [],
      lastUsed: "2 days ago",
      totalCalls: 156,
      authType: "API Key",
      endpoints: ["Create Record", "Update Record", "List Records"]
    },
    {
      id: 5,
      name: "OpenAI API",
      description: "Generate text, images, and embeddings",
      provider: "OpenAI",
      type: "API Integration",
      category: "Content & Media",
      status: "Connected",
      usedBy: ["Content Manager", "Customer Support", "Business Intelligence"],
      lastUsed: "30 sec ago",
      totalCalls: 5647,
      authType: "API Key",
      endpoints: ["Chat Completion", "Image Generation", "Embeddings"]
    },
    {
      id: 6,
      name: "Unsplash",
      description: "Search and download high-quality stock photos",
      provider: "Unsplash",
      type: "API Integration",
      category: "Content & Media",
      status: "Connected",
      usedBy: ["Content Manager"],
      lastUsed: "1 hour ago",
      totalCalls: 234,
      authType: "API Key",
      endpoints: ["Search Photos", "Download Photo", "Get Collections"]
    },
    {
      id: 7,
      name: "Google Drive",
      description: "Upload, download, and manage files and folders",
      provider: "Google",
      type: "API Integration",
      category: "Productivity",
      status: "Connected",
      usedBy: ["Content Manager", "Customer Support"],
      lastUsed: "15 min ago",
      totalCalls: 445,
      authType: "OAuth 2.0",
      endpoints: ["Upload File", "Download File", "Create Folder"]
    },
    {
      id: 8,
      name: "Notion",
      description: "Create pages, update databases, manage content",
      provider: "Notion",
      type: "API Integration",
      category: "Productivity",
      status: "Connected",
      usedBy: ["Content Manager"],
      lastUsed: "45 min ago",
      totalCalls: 678,
      authType: "OAuth 2.0",
      endpoints: ["Create Page", "Update Database", "Query Database"]
    },
    {
      id: 9,
      name: "n8n",
      description: "Create and manage automated workflows between services",
      provider: "n8n",
      type: "Webhook",
      category: "Productivity",
      status: "Connected",
      usedBy: ["Marketing Copilot", "Customer Support"],
      lastUsed: "8 min ago",
      totalCalls: 1456,
      authType: "API Key",
      endpoints: ["Trigger Workflow", "Get Executions", "Manage Workflows"]
    }
  ];

  const categories = ["All Categories", "Communication", "Data & Analytics", "Content & Media", "Productivity"];
  
  const filteredTools = selectedCategory === "All Categories" 
    ? allTools 
    : allTools.filter(tool => tool.category === selectedCategory);

  const totalTools = allTools.length;
  const connectedTools = allTools.filter(tool => tool.status === 'Connected').length;
  const totalCalls = allTools.reduce((sum, tool) => sum + tool.totalCalls, 0);

  return (
    <div className="space-y-6">
      

      {/* Action Bar */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <Button 
            className="bg-[#008062] hover:bg-[#00d2a0] text-white"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Button clicked - Connect New Tool', onConnectNewTool);
              onConnectNewTool?.();
            }}
          >
            Connect New Tool
          </Button>
          <Button 
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Button clicked - Browse Integrations', onBrowseIntegrations);
              onBrowseIntegrations?.();
            }}
          >
            Browse Integrations
          </Button>
        </div>
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            Sort
          </Button>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">
          {selectedCategory === "All Categories" ? "All Tools" : `${selectedCategory} Tools`}
        </h2>
        <Badge variant="secondary">{filteredTools.length} integrations</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool) => {
                // Define real platform logos for each tool
                const getToolLogo = (toolName: string) => {
                  switch (toolName.toLowerCase()) {
                    case 'gmail':
                      return <SiGmail className="w-8 h-8 text-red-500" />;
                    case 'slack':
                      return <SiSlack className="w-8 h-8 text-purple-500" />;
                    case 'google analytics':
                      return <SiGoogleanalytics className="w-8 h-8 text-orange-500" />;
                    case 'airtable':
                      return <SiAirtable className="w-8 h-8 text-yellow-600" />;
                    case 'openai api':
                      return <SiOpenai className="w-8 h-8 text-green-600" />;
                    case 'unsplash':
                      return <SiUnsplash className="w-8 h-8 text-black" />;
                    case 'google drive':
                      return <SiGoogledrive className="w-8 h-8 text-blue-500" />;
                    case 'notion':
                      return <SiNotion className="w-8 h-8 text-black" />;
                    case 'n8n':
                      return <img src={n8nLogo} alt="n8n" className="w-8 h-8" />;
                    default:
                      return <Globe className="w-8 h-8 text-gray-500" />;
                  }
                };

                return (
                  <Card key={tool.id} className="hover:shadow-md transition-shadow h-full flex flex-col">
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-3">
                        {getToolLogo(tool.name)}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-base mb-1 truncate">{tool.name}</h3>
                          <p className="text-sm text-gray-500 mb-2">by {tool.provider}</p>
                          <Badge variant={tool.status === 'Connected' ? 'default' : 'secondary'} className="text-xs">
                            {tool.status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 flex-1 flex flex-col">
                      <p className="text-sm text-gray-600 mb-4 flex-grow">{tool.description}</p>
                      
                      <div className="space-y-4 mt-auto">
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Used by Copilots</p>
                          <div className="flex flex-wrap gap-1">
                            {tool.usedBy.length > 0 ? tool.usedBy.slice(0, 2).map((copilot, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {copilot}
                              </Badge>
                            )) : (
                              <span className="text-sm text-gray-400">Not in use</span>
                            )}
                            {tool.usedBy.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{tool.usedBy.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium text-gray-700">{tool.totalCalls.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">API calls</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">{tool.authType}</p>
                            <p className="text-xs text-gray-500">Authentication</p>
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-500 border-t pt-3">
                          Last used: {tool.lastUsed}
                        </div>
                        
                        <div className="pt-2">
                          {tool.status === 'Connected' ? (
                            <Button variant="outline" size="sm" className="w-full" onClick={() => onToolConfigure?.(tool)}>Configure</Button>
                          ) : (
                            <Button size="sm" className="w-full bg-[#008062] hover:bg-[#00d2a0] text-white">
                              Connect
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
    </div>
  );
}

function WorkflowsScreen({ onWorkflowEdit }: { onWorkflowEdit?: (workflowId: string) => void } = {}) {
  const workflowsByType = {
    "Imported Workflows": [
      {
        id: 1,
        name: "Lead Qualification Pipeline",
        description: "Automatically qualifies and routes incoming leads through multiple channels",
        source: "n8n",
        trigger: "New form submission",
        steps: ["Validate Data", "Score Lead", "Enrich Contact", "Route to Sales", "Send Welcome Email"],
        tools: ["HubSpot", "Clearbit", "Gmail"],
        agents: ["Lead Scorer"],
        status: "Active",
        executions: 1456,
        successRate: 94,
        lastRun: "2 min ago",
        avgDuration: "45s",
        usedBy: ["Marketing Copilot"],
        schedule: "Real-time trigger"
      },
      {
        id: 2,
        name: "Content Publishing Automation",
        description: "Schedules and publishes content across multiple social media platforms",
        source: "Make.com",
        trigger: "Content approval",
        steps: ["Format Content", "Schedule Posts", "Cross-post", "Track Engagement", "Generate Report"],
        tools: ["Buffer", "Twitter API", "LinkedIn API", "Google Analytics"],
        agents: ["Content Formatter", "Engagement Tracker"],
        status: "Active",
        executions: 892,
        successRate: 98,
        lastRun: "15 min ago",
        avgDuration: "2m 30s",
        usedBy: ["Content Manager"],
        schedule: "Daily at 9 AM"
      },
      {
        id: 3,
        name: "Customer Support Escalation",
        description: "Automatically escalates high-priority tickets to appropriate team members",
        source: "n8n",
        trigger: "Ticket priority change",
        steps: ["Analyze Ticket", "Determine Priority", "Assign Specialist", "Notify Team", "Update Customer"],
        tools: ["Zendesk", "Slack", "Gmail"],
        agents: ["Ticket Classifier", "Priority Scorer"],
        status: "Paused",
        executions: 567,
        successRate: 87,
        lastRun: "3 hours ago",
        avgDuration: "1m 15s",
        usedBy: ["Customer Support"],
        schedule: "Real-time trigger"
      }
    ],
    "Custom Workflows": [
      {
        id: 4,
        name: "SEO Content Optimization",
        description: "Automated SEO analysis and optimization of blog posts",
        source: "Custom Chain",
        trigger: "New draft published",
        steps: ["Extract Content", "Keyword Analysis", "SEO Score", "Generate Suggestions", "Apply Optimizations"],
        tools: ["OpenAI API", "SEMrush API"],
        agents: ["SEO Writer", "SEO Optimizer", "Content Reviewer"],
        status: "Active",
        executions: 234,
        successRate: 91,
        lastRun: "8 min ago",
        avgDuration: "3m 45s",
        usedBy: ["Content Manager"],
        schedule: "On-demand"
      },
      {
        id: 5,
        name: "Performance Data Collection",
        description: "Gathers and consolidates performance metrics from multiple sources",
        source: "Custom Chain",
        trigger: "Daily schedule",
        steps: ["Collect Analytics", "Process Data", "Generate Insights", "Create Dashboard", "Send Report"],
        tools: ["Google Analytics", "Google Search Console", "Airtable"],
        agents: ["Performance Analyst", "Report Generator"],
        status: "Active",
        executions: 67,
        successRate: 96,
        lastRun: "1 hour ago",
        avgDuration: "5m 20s",
        usedBy: ["Business Intelligence"],
        schedule: "Daily at 6 AM"
      },
      {
        id: 6,
        name: "Knowledge Base Auto-Update",
        description: "Automatically updates FAQ and knowledge base from support conversations",
        source: "Custom Chain",
        trigger: "Support conversation end",
        steps: ["Analyze Conversation", "Extract Key Info", "Check Existing Docs", "Generate Updates", "Review & Publish"],
        tools: ["Notion", "OpenAI API"],
        agents: ["FAQ Generator", "Content Reviewer"],
        status: "Draft",
        executions: 0,
        successRate: 0,
        lastRun: "Never",
        avgDuration: "N/A",
        usedBy: [],
        schedule: "Real-time trigger"
      }
    ]
  };

  const totalWorkflows = Object.values(workflowsByType).flat().length;
  const activeWorkflows = Object.values(workflowsByType).flat().filter(wf => wf.status === 'Active').length;
  const totalExecutions = Object.values(workflowsByType).flat().reduce((sum, wf) => sum + wf.executions, 0);
  const avgSuccessRate = Math.round(
    Object.values(workflowsByType).flat()
      .filter(wf => wf.executions > 0)
      .reduce((sum, wf) => sum + wf.successRate, 0) / 
    Object.values(workflowsByType).flat().filter(wf => wf.executions > 0).length
  );

  return (
    <div className="space-y-6">
      

      {/* Action Bar */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <Button className="bg-[#008062] hover:bg-[#00d2a0] text-white">
            Create Custom Workflow
          </Button>
          <Button variant="outline">
            Import from n8n
          </Button>
          <Button variant="outline">
            Import from Make.com
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            Sort
          </Button>
        </div>
      </div>

      {/* Workflows by Type */}
      {Object.entries(workflowsByType).map(([type, workflows]) => (
        <div key={type} className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{type}</h2>
            <Badge variant="secondary">{workflows.length} workflows</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {workflows.map((workflow) => (
              <Card key={workflow.id} className="hover:shadow-md transition-shadow h-full flex flex-col">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-3">
                    <GitBranch className="w-8 h-8 text-purple-600" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-base mb-1 truncate">{workflow.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">Source: <span className="font-medium">{workflow.source}</span></p>
                      <Badge variant={workflow.status === 'Active' ? 'default' : workflow.status === 'Paused' ? 'secondary' : 'outline'} className="text-xs">
                        {workflow.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 flex-1 flex flex-col">
                  <p className="text-sm text-gray-600 mb-4 flex-grow">{workflow.description}</p>
                  
                  <div className="space-y-4 mt-auto">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Tools & Agents</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {workflow.tools.slice(0, 2).map((tool, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tool}
                          </Badge>
                        ))}
                        {workflow.tools.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{workflow.tools.length - 2} tools
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {workflow.agents.slice(0, 1).map((agent, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {agent}
                          </Badge>
                        ))}
                        {workflow.agents.length > 1 && (
                          <Badge variant="outline" className="text-xs">
                            +{workflow.agents.length - 1} agents
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-700">{workflow.executions.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Executions</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">{workflow.successRate}%</p>
                        <p className="text-xs text-gray-500">Success rate</p>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <p className="font-medium text-gray-700">{workflow.steps.length} steps</p>
                      <p className="text-xs text-gray-500">{workflow.trigger}</p>
                    </div>
                    
                    <div className="text-sm text-gray-500 border-t pt-3">
                      Last run: {workflow.lastRun} • Avg: {workflow.avgDuration}
                    </div>
                    
                    <div className="pt-2">
                      {workflow.status === 'Active' ? (
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => onWorkflowEdit?.(workflow.id.toString())}>Edit</Button>
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => console.log('Pausing workflow:', workflow.name)}>Pause</Button>
                        </div>
                      ) : workflow.status === 'Paused' ? (
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => onWorkflowEdit?.(workflow.id.toString())}>Edit</Button>
                          <Button size="sm" className="flex-1 bg-[#008062] hover:bg-[#00d2a0] text-white" onClick={() => console.log('Resuming workflow:', workflow.name)}>Resume</Button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => onWorkflowEdit?.(workflow.id.toString())}>Edit</Button>
                          <Button size="sm" className="flex-1 bg-[#008062] hover:bg-[#00d2a0] text-white" onClick={() => console.log('Deploying workflow:', workflow.name)}>Deploy</Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function KnowledgeBaseScreen() {
  const [suggestDocsOpen, setSuggestDocsOpen] = useState(false);
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);
  const [editingDocument, setEditingDocument] = useState<string | null>(null);
  const [tempTitle, setTempTitle] = useState("");
  const [tempDescription, setTempDescription] = useState("");
  
  // Search and filtering state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('updated');

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
    console.log('Generating workspace documents:', selectedSuggestions);
    setSuggestDocsOpen(false);
    setSelectedSuggestions([]);
  };

  const startEditing = (docId: string, currentTitle: string, currentDescription: string) => {
    setEditingDocument(docId);
    setTempTitle(currentTitle);
    setTempDescription(currentDescription);
  };

  const saveEditing = () => {
    console.log('Saving workspace document:', { title: tempTitle, description: tempDescription });
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
      <div className="flex items-center justify-end">
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
          <Button variant="outline" size="sm">
            Go to Marketplace
          </Button>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search knowledge base..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-40">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="document">Documents</SelectItem>
            <SelectItem value="url">URLs</SelectItem>
            <SelectItem value="markdown">Markdown</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-40">
            <SortAsc className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="updated">Last Updated</SelectItem>
            <SelectItem value="created">Date Created</SelectItem>
            <SelectItem value="name">Name A-Z</SelectItem>
            <SelectItem value="creator">Creator</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {/* Knowledge base documents */}
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
                {editingDocument === 'workspace2' ? (
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
                    <div className="font-medium">Development Guidelines</div>
                    <div className="text-sm text-muted-foreground">Coding standards and development best practices</div>
                  </div>
                )}
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span>Created by David Park</span>
                  <span>•</span>
                  <span>1 week ago</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Badge variant="secondary" className="text-xs">MD</Badge>
              {editingDocument === 'workspace2' ? (
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
                    onClick={() => startEditing('workspace2', 'Development Guidelines', 'Coding standards and development best practices')}
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
              <FileText className="w-5 h-5 text-purple-500 mt-0.5" />
              <div className="flex-1 min-w-0">
                {editingDocument === 'workspace3' ? (
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
                    <div className="font-medium">Security Protocols</div>
                    <div className="text-sm text-muted-foreground">Security guidelines and access management procedures</div>
                  </div>
                )}
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span>Created by Lisa Chen</span>
                  <span>•</span>
                  <span>3 days ago</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Badge variant="secondary" className="text-xs">DOCX</Badge>
              {editingDocument === 'workspace3' ? (
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
                    onClick={() => startEditing('workspace3', 'Security Protocols', 'Security guidelines and access management procedures')}
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
              <FileText className="w-5 h-5 text-orange-500 mt-0.5" />
              <div className="flex-1 min-w-0">
                {editingDocument === 'workspace4' ? (
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
                    <div className="font-medium">Team Onboarding Checklist</div>
                    <div className="text-sm text-muted-foreground">Step-by-step checklist for new team member onboarding</div>
                  </div>
                )}
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span>Created by Rachel Green</span>
                  <span>•</span>
                  <span>6 days ago</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Badge variant="secondary" className="text-xs">PDF</Badge>
              {editingDocument === 'workspace4' ? (
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
                    onClick={() => startEditing('workspace4', 'Team Onboarding Checklist', 'Step-by-step checklist for new team member onboarding')}
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
      </div>

      {/* AI Document Suggestions Modal */}
      <Dialog open={suggestDocsOpen} onOpenChange={setSuggestDocsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              AI Workspace Document Suggestions
            </DialogTitle>
            <DialogDescription>
              Select the documents you'd like our AI to generate for your workspace knowledge base. These will be customized for your team's needs.
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



function SubscriptionsScreen() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <Button className="bg-brand-primary hover:bg-brand-primary/90">
          <CreditCard className="w-4 h-4 mr-2" />
          Upgrade Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Professional</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Monthly Cost</span>
                <span className="font-semibold">$49/month</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Next Billing</span>
                <span className="font-semibold">Jan 15, 2025</span>
              </div>
              <Badge className="w-full justify-center">Active</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>API Calls</span>
                  <span>15,234 / 25,000</span>
                </div>
                <Progress value={61} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Storage</span>
                  <span>3.2 GB / 10 GB</span>
                </div>
                <Progress value={32} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">VISA</span>
                </div>
                <span className="text-sm">•••• 4242</span>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Update Payment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ConversationsScreen() {
  const conversations = [
    { id: 1, user: "John Doe", copilot: "Support Bot", messages: 12, lastActive: "2 min ago", status: "Active" },
    { id: 2, user: "Jane Smith", copilot: "Sales Assistant", messages: 8, lastActive: "15 min ago", status: "Resolved" },
    { id: 3, user: "Mike Johnson", copilot: "Tech Helper", messages: 24, lastActive: "1 hour ago", status: "Active" },
    { id: 4, user: "Sarah Wilson", copilot: "Content Bot", messages: 6, lastActive: "3 hours ago", status: "Pending" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <Button className="bg-brand-primary hover:bg-brand-primary/90">
          <MessageSquare className="w-4 h-4 mr-2" />
          New Conversation
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-brand-primary">247</p>
              <p className="text-sm text-gray-600">Total Conversations</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">23</p>
              <p className="text-sm text-gray-600">Active Now</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">189</p>
              <p className="text-sm text-gray-600">Resolved Today</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">4.2</p>
              <p className="text-sm text-gray-600">Avg Response Time</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Conversations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Copilot</TableHead>
                <TableHead>Messages</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {conversations.map((conversation) => (
                <TableRow key={conversation.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>{conversation.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {conversation.user}
                    </div>
                  </TableCell>
                  <TableCell>{conversation.copilot}</TableCell>
                  <TableCell>{conversation.messages}</TableCell>
                  <TableCell>{conversation.lastActive}</TableCell>
                  <TableCell>
                    <Badge variant={conversation.status === 'Active' ? 'default' : conversation.status === 'Resolved' ? 'secondary' : 'outline'}>
                      {conversation.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="outline" size="sm">Join</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function AnalyticsScreen() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <Button className="bg-brand-primary hover:bg-brand-primary/90">
          <BarChart3 className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Interactions</p>
                <p className="text-2xl font-bold text-gray-900">12,467</p>
                <p className="text-xs text-green-600">+12% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
                <p className="text-xs text-green-600">+8% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Session Time</p>
                <p className="text-2xl font-bold text-gray-900">8.5m</p>
                <p className="text-xs text-red-600">-2% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">94.2%</p>
                <p className="text-xs text-green-600">+1.5% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Usage Trends</CardTitle>
            <CardDescription>Daily interactions over the past 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border border-dashed border-gray-200 rounded-lg">
              <p className="text-gray-500">Chart placeholder - Usage trends visualization</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Copilots</CardTitle>
            <CardDescription>Ranked by user satisfaction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Customer Support Bot</span>
                <div className="flex items-center gap-2">
                  <Progress value={95} className="w-16 h-2" />
                  <span className="text-sm text-gray-600">95%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Sales Assistant</span>
                <div className="flex items-center gap-2">
                  <Progress value={87} className="w-16 h-2" />
                  <span className="text-sm text-gray-600">87%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Technical Helper</span>
                <div className="flex items-center gap-2">
                  <Progress value={82} className="w-16 h-2" />
                  <span className="text-sm text-gray-600">82%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Content Reviewer</span>
                <div className="flex items-center gap-2">
                  <Progress value={78} className="w-16 h-2" />
                  <span className="text-sm text-gray-600">78%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function UsersScreen() {
  const users = [
    { id: 1, name: "Alice Johnson", email: "alice@company.com", role: "Admin", status: "Active", lastLogin: "2 hours ago" },
    { id: 2, name: "Bob Smith", email: "bob@company.com", role: "User", status: "Active", lastLogin: "1 day ago" },
    { id: 3, name: "Carol Davis", email: "carol@company.com", role: "Manager", status: "Inactive", lastLogin: "5 days ago" },
    { id: 4, name: "David Wilson", email: "david@company.com", role: "User", status: "Active", lastLogin: "3 hours ago" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <Button className="bg-brand-primary hover:bg-brand-primary/90">
          <Users className="w-4 h-4 mr-2" />
          Invite User
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-brand-primary">47</p>
              <p className="text-sm text-gray-600">Total Users</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">42</p>
              <p className="text-sm text-gray-600">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">8</p>
              <p className="text-sm text-gray-600">Admins</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">5</p>
              <p className="text-sm text-gray-600">Pending Invites</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {user.name}
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Permissions</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}