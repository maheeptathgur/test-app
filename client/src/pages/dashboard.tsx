import { useState, useEffect } from "react";
import { Monitor, Users, Settings, BarChart3, BookOpen, UserCog, CreditCard, MessageSquare, TrendingUp, Shield, Grid, List, Search, Filter, ArrowUpDown, PanelLeftClose, PanelLeftOpen, Upload, FileText, Music, Video, Image, File, X, ChevronDown, LogOut, User, Trash2, Check, LayoutDashboard, Bot, Headphones } from "lucide-react";
import { SiGoogledrive } from "react-icons/si";
import knolliLogo from "@assets/image_1751267938774.png";
import knolliIcon from "@assets/favicon-256_1751332849559.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { WorkspaceSelector } from "@/components/workspace-selector";
import { CopilotCard } from "@/components/copilot-card";
import { ChatInterface } from "@/components/chat-interface";
import { CreateCopilotModal } from "@/components/create-copilot-modal";
import { EditCopilotModal } from "@/components/edit-copilot-modal";
import { CopilotConfiguration } from "@/components/copilot-configuration";
import { SampleScreen } from "@/components/sample-screens";
import { PricingScreen } from "@/components/pricing-screen";
import { WorkspaceSettings } from "@/components/workspace-settings";
import { UserView } from "@/components/user-view";
import { DeleteConfirmationModal } from "@/components/delete-confirmation-modal";
import { ProfileSettings } from "@/components/profile-settings";
import { AccountSettings } from "@/components/account-settings";
import { Workspace, CopilotData, NavigationSection } from "@/lib/types";

const workspaces: Workspace[] = [
  { id: '1', name: 'My Workspace', type: 'Personal', avatar: 'M', color: 'bg-blue-500' },
  { id: '2', name: 'Team Alpha', type: 'Shared', avatar: 'T', color: 'bg-green-500' },
  { id: '3', name: 'Enterprise', type: 'Organization', avatar: 'E', color: 'bg-purple-500' },
];

const recentConversations = [
  {
    id: '1',
    title: 'Blog Post SEO Optimization',
    copilot: 'Content Assistant',
    lastMessage: 'Perfect! I\'ve analyzed your content with Grammarly and SEMrush...',
    timestamp: '2 hours ago',
    isActive: false,
    messages: [
      {
        id: 'm1',
        content: 'I need help optimizing a blog post about sustainable living. Can you check the SEO and writing quality?',
        sender: 'user' as const,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'm2', 
        content: 'I\'ll help you optimize that blog post! Let me analyze it using @Grammarly for writing quality and @SEMrush for SEO optimization.\n\n**Writing Analysis Complete:**\n- Overall score: **92/100** (Excellent)\n- 8 suggestions for improvement\n- Strong clarity and engagement\n- Minor grammar adjustments needed\n\n**SEO Analysis Results:**\n- Target keyword: "sustainable living tips"\n- Current SEO score: **78/100** (Good)\n- Search volume: **1,200 monthly searches**\n- Keyword difficulty: **Medium (45)**\n\nWould you like me to show you the specific improvements and keyword opportunities?',
        sender: 'bot' as const,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 30000).toISOString(),
      },
      {
        id: 'm3',
        content: 'Yes, please show me the specific improvements and top keyword opportunities.',
        sender: 'user' as const,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 60000).toISOString(),
      },
      {
        id: 'm4',
        content: 'Perfect! I\'ve analyzed your content with @Grammarly and @SEMrush. Here are the actionable improvements:\n\n**@Grammarly Writing Suggestions:**\n✅ **Clarity:** Break long sentences in paragraph 3\n✅ **Engagement:** Add more conversational transitions\n✅ **Correctness:** Fix comma usage in bullet points\n\n**@SEMrush Keyword Opportunities:**\n🔍 **"sustainable living guide"** - 2,400 searches, Low difficulty\n🔍 **"eco-friendly lifestyle tips"** - 1,800 searches, Medium difficulty\n🔍 **"green living for beginners"** - 980 searches, Low difficulty\n\n**Recommended Actions:**\n1. Add secondary keywords naturally throughout\n2. Include internal links to related content\n3. Optimize meta description with primary keyword\n4. Add alt text to images with relevant keywords\n\nImplementing these changes should boost your SEO score to 85+ and improve readability significantly!',
        sender: 'bot' as const,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 120000).toISOString(),
      }
    ]
  },
  {
    id: '2',
    title: 'Social Media Performance Analysis',
    copilot: 'Social Analyst',
    lastMessage: 'Based on Google Analytics and Hootsuite data...',
    timestamp: 'Yesterday',
    isActive: false,
    messages: [
      {
        id: 'm5',
        content: 'Our social media engagement seems low this month. Can you analyze what\'s happening and suggest improvements?',
        sender: 'user' as const,
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'm6',
        content: 'Let me analyze your social performance using @Google Analytics and @Hootsuite data to identify the issues and opportunities.\n\n**@Google Analytics Social Traffic Analysis:**\n📊 **Social Traffic:** 24.5K users (↓18% vs last month)\n📊 **Top Referrer:** LinkedIn (45% of social traffic)\n📊 **Engagement Rate:** 3.2% average time on site\n📊 **Conversion Rate:** 2.1% from social visitors\n\n**@Hootsuite Content Performance:**\n📅 **Posts Published:** 67 this month\n👀 **Total Reach:** 156K (↓22% vs last month)\n💬 **Engagement:** 4,200 interactions (↓15%)\n⏰ **Best Times:** 2-4 PM weekdays show highest engagement\n\n**Key Issues Identified:**\n1. Posting frequency decreased by 30%\n2. Video content down 40% (highest engagement format)\n3. LinkedIn performance strong, but Instagram/Twitter lagging\n\nWould you like me to create a recovery strategy with optimized content scheduling?',
        sender: 'bot' as const,
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000 + 30000).toISOString(),
      },
      {
        id: 'm7',
        content: 'Yes, please create a recovery strategy. Focus on what will have the biggest impact quickly.',
        sender: 'user' as const,
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000 + 60000).toISOString(),
      },
      {
        id: 'm8',
        content: 'Based on @Google Analytics and @Hootsuite data, here\'s your **30-day recovery strategy**:\n\n**🚀 Quick Wins (Week 1-2):**\n\n**@Hootsuite Content Calendar:**\n✅ **Double video content** - Schedule 3 videos/week (your best performing format)\n✅ **Optimize posting times** - 2-4 PM weekdays, 10 AM Saturdays\n✅ **LinkedIn focus** - 60% of effort (your top converter)\n✅ **Cross-promote blog content** - Drive traffic back to high-performing pages\n\n**📈 Expected Results:**\n- **Week 1:** 25% engagement increase\n- **Week 2:** 15% traffic boost to top pages\n- **Month End:** 35% overall performance recovery\n\n**🎯 Content Mix (Daily Schedule):**\n- **Monday:** Industry insights + LinkedIn article\n- **Tuesday:** Behind-scenes video + Twitter thread\n- **Wednesday:** Customer spotlight + Instagram story\n- **Thursday:** Tutorial/tip video + blog post promo\n- **Friday:** Weekly roundup + community question\n\n**📊 Tracking Metrics:**\nI\'ll monitor through @Google Analytics: social referral traffic, bounce rate, and conversions. @Hootsuite will track: reach, engagement rate, and optimal posting time performance.\n\nReady to implement? I can set up the content queue in Hootsuite right now!',
        sender: 'bot' as const,
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000 + 120000).toISOString(),
      }
    ]
  },
  {
    id: '3',
    title: 'Support Ticket Management',
    copilot: 'Customer Support',
    lastMessage: 'I\'ve coordinated between Zendesk and Intercom to handle...',
    timestamp: '2 days ago',
    isActive: false,
    messages: [
      {
        id: 'm7',
        content: 'We have several urgent tickets piling up and some live chat requests. Can you help me prioritize and manage the workload?',
        sender: 'user' as const,
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'm8',
        content: 'I\'ll help you manage the support workload efficiently! Let me analyze the situation using @Zendesk for ticket management and @Intercom for live chat coordination.\n\n**@Zendesk Ticket Overview:**\n🚨 **7 Urgent tickets** - Require immediate attention\n📋 **23 Open tickets** - Within SLA timeframes\n⏱️ **12-minute average response time** - Good performance\n\n**@Intercom Live Chat Status:**\n💬 **5 Active conversations** - Currently in progress\n👥 **3 customers waiting** - Need immediate assistance\n📞 **Live agents:** 2 available, 1 busy\n\n**Immediate Action Plan:**\n1. **Escalate 3 critical Zendesk tickets** to senior agents\n2. **Auto-route Intercom chats** by issue type\n3. **Deploy quick resolution templates** for common issues\n\nWould you like me to implement this triage system and show you the priority queue?',
        sender: 'bot' as const,
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 30000).toISOString(),
      },
      {
        id: 'm9',
        content: 'Yes, please implement the system and show me how the tickets will be prioritized.',
        sender: 'user' as const,
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 60000).toISOString(),
      },
      {
        id: 'm10',
        content: 'Perfect! I\'ve coordinated between @Zendesk and @Intercom to handle the workload efficiently:\n\n**🎯 Priority Ticket Queue (Zendesk):**\n\n**🔴 High Priority** - Immediate action:\n- #4521: Sarah M. - Login issues (5 min ago)\n- #4520: Mike L. - Payment failure (12 min ago)\n- #4517: Tech Corp - Service outage (45 min ago)\n\n**🟡 Medium Priority** - Next 2 hours:\n- #4519: Feature request + upgrade inquiry\n- #4516: Billing question + account review\n\n**@Intercom Live Chat Management:**\n✅ **Auto-routing active:** Technical → Senior agent\n✅ **Quick responses enabled:** FAQ bot handles 60% of queries\n✅ **Escalation triggers set:** Complex issues → Zendesk tickets\n\n**📊 Efficiency Improvements:**\n- **Response time target:** Under 5 minutes for urgent\n- **Resolution rate:** 85% first-contact for standard issues\n- **Workload distribution:** Balanced across available agents\n\n**Next Steps:**\n1. High-priority tickets assigned to your best agents\n2. Intercom chats being handled with smart routing\n3. All new tickets auto-categorized by urgency\n\nThe system is now optimized for maximum efficiency! Your team can focus on complex issues while automation handles routine queries.',
        sender: 'bot' as const,
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 120000).toISOString(),
      }
    ]
  },
  {
    id: '4',
    title: 'Q4 Performance Review',
    copilot: 'Social Analyst',
    lastMessage: 'The quarterly metrics show significant growth in...',
    timestamp: '1 week ago',
    isActive: false,
    messages: [
      {
        id: 'm9',
        content: 'I need to prepare the Q4 performance review. Can you analyze our key metrics?',
        sender: 'user' as const,
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'm10',
        content: 'The quarterly metrics show significant growth in multiple areas:\n\n**Revenue Growth:** +34% QoQ, exceeding target by 12%\n**Customer Acquisition:** 2,847 new customers (vs 2,200 target)\n**Customer Retention:** 94.2% (industry average: 89%)\n**Product Usage:** +28% active daily users\n\n**Key Wins:**\n- Enterprise segment grew 45%\n- Customer satisfaction score: 4.7/5\n- Support ticket resolution improved by 22%\n\n**Areas for Improvement:**\n- Mobile app engagement still below target\n- Churn rate in month 2-3 needs attention\n\nShall I prepare detailed charts and a presentation deck?',
        sender: 'bot' as const,
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 30000).toISOString(),
      }
    ]
  },
  {
    id: '5',
    title: 'Blog Content Calendar',
    copilot: 'Content Assistant',
    lastMessage: 'I\'ve created a 30-day content schedule focusing on...',
    timestamp: '1 week ago',
    isActive: false,
    messages: [
      {
        id: 'm11',
        content: 'We need a comprehensive blog content calendar for the next month. Can you help plan this out?',
        sender: 'user' as const,
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'm12',
        content: 'I\'ve created a 30-day content schedule focusing on audience engagement and SEO:\n\n**Week 1: Foundation Topics**\n- Mon: "Getting Started Guide" (How-to)\n- Wed: "Industry Trends 2024" (Analysis)\n- Fri: "Customer Success Story: TechCorp" (Case Study)\n\n**Week 2: Deep Dives**\n- Mon: "Advanced Features Walkthrough" (Tutorial)\n- Wed: "ROI Calculator Guide" (Tool)\n- Fri: "Expert Interview: Sarah Chen" (Interview)\n\n**Week 3: Community Focus**\n- Mon: "User-Generated Content Showcase" (Community)\n- Wed: "Common Mistakes to Avoid" (Tips)\n- Fri: "Behind the Scenes: Development" (Culture)\n\n**Week 4: Forward-Looking**\n- Mon: "Future of the Industry" (Prediction)\n- Wed: "Product Roadmap Preview" (Update)\n- Fri: "Month in Review" (Roundup)\n\nEach post includes target keywords, social media hooks, and email newsletter integration.',
        sender: 'bot' as const,
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 30000).toISOString(),
      }
    ]
  },
  {
    id: '6',
    title: 'Product Launch Campaign Planning',
    copilot: 'Campaign Manager',
    lastMessage: 'Perfect! I\'ve created the complete campaign in HubSpot...',
    timestamp: '1 hour ago',
    isActive: false,
    messages: [
      {
        id: 'm13a',
        content: 'We need to plan a comprehensive marketing campaign for our new SaaS product launching next month. Budget is $150K and we want to target B2B professionals.',
        sender: 'user' as const,
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'm14a',
        content: 'I\'ll help you create a comprehensive launch campaign! Let me start by using the @Campaign Planner to develop the strategy.\n\n**Campaign Foundation:**\n- **Target:** B2B professionals (decision makers)\n- **Budget:** $150K over 8 weeks\n- **Goal:** Generate 500 qualified leads, 50 demos\n\n**Recommended Campaign Structure:**\n1. **Pre-launch Buzz** (2 weeks) - $30K\n2. **Launch Week Push** (1 week) - $50K  \n3. **Sustained Growth** (5 weeks) - $70K\n\nWould you like me to use the @Media Planner to break down channel allocation and then set everything up in @HubSpot?',
        sender: 'bot' as const,
        timestamp: new Date(Date.now() - 58 * 60 * 1000).toISOString(),
      },
      {
        id: 'm15a',
        content: 'Yes, please break down the media allocation and then set up the campaigns.',
        sender: 'user' as const,
        timestamp: new Date(Date.now() - 55 * 60 * 1000).toISOString(),
      },
      {
        id: 'm16a',
        content: 'Excellent! I\'ve used the @Media Planner to optimize your channel mix:\n\n**Media Allocation Breakdown:**\n\n**Phase 1 - Pre-launch ($30K):**\n- LinkedIn Ads: $18K (60%) - Targeting decision makers\n- Google Ads: $7K (23%) - Brand + competitor keywords\n- Content Marketing: $5K (17%) - Blog posts, whitepapers\n\n**Phase 2 - Launch Week ($50K):**\n- LinkedIn Ads: $25K (50%) - Boosted reach\n- Google Ads: $15K (30%) - Product launch keywords\n- PR & Outreach: $10K (20%) - Media outreach\n\n**Phase 3 - Sustained Growth ($70K):**\n- LinkedIn Ads: $35K (50%) - Lead nurturing\n- Google Ads: $21K (30%) - Conversion optimization\n- Email Marketing: $14K (20%) - Automated sequences\n\nShall I now create these campaigns in @HubSpot with automated workflows?',
        sender: 'bot' as const,
        timestamp: new Date(Date.now() - 50 * 60 * 1000).toISOString(),
      },
      {
        id: 'm17a',
        content: 'Perfect allocation! Yes, please set up the HubSpot campaigns and workflows.',
        sender: 'user' as const,
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      },
      {
        id: 'm18a',
        content: 'Perfect! I\'ve created the complete campaign in @HubSpot with automated workflows:\n\n**✅ Created in HubSpot:**\n\n**1. Lead Capture Forms:**\n- Product demo request form\n- Whitepaper download forms\n- Newsletter signup (with UTM tracking)\n\n**2. Automated Workflows:**\n- **Demo Request Flow:** Instant email + sales notification\n- **Lead Nurturing Sequence:** 7-email drip campaign\n- **Retargeting Lists:** For LinkedIn/Google remarketing\n\n**3. Campaign Tracking:**\n- UTM parameters for all channels\n- Conversion tracking setup\n- ROI dashboard configured\n\n**4. Lead Scoring:**\n- +20 points: Demo request\n- +15 points: Whitepaper download\n- +10 points: Email engagement\n- +25 points: Pricing page visit\n\n**Next Steps:**\n- Campaigns are ready to activate\n- All tracking pixels installed\n- Sales team has been notified\n\nWould you like me to walk through the reporting dashboard or make any adjustments to the automation rules?',
        sender: 'bot' as const,
        timestamp: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
      },
      {
        id: 'm19a',
        content: 'This looks comprehensive! Can you show me what the lead scoring breakdown will look like and how leads will be prioritized?',
        sender: 'user' as const,
        timestamp: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
      },
      {
        id: 'm20a',
        content: 'Great question! Here\'s how the @HubSpot lead scoring and prioritization works:\n\n**Lead Scoring Breakdown:**\n\n**High Priority (80+ points):**\n- Demo request + pricing page visit + email engagement\n- Auto-assigned to senior sales rep within 5 minutes\n- Immediate follow-up email triggered\n\n**Medium Priority (40-79 points):**\n- Whitepaper download + multiple page visits\n- Added to "warm prospects" workflow\n- Follow-up within 24 hours\n\n**Low Priority (10-39 points):**\n- Newsletter signup or single page visit\n- Enters nurturing sequence\n- Weekly check-in emails\n\n**Negative Scoring:**\n- -10 points: Unsubscribe from emails\n- -5 points: No activity for 30 days\n\n**Smart Prioritization Features:**\n- Company size bonus (+15 for 100+ employees)\n- Industry match bonus (+10 for target sectors)\n- Geographic targeting (+5 for primary markets)\n\nThe system automatically routes high-scoring leads to your best closers and provides context cards showing their engagement history. Sales gets a notification like: "Hot lead! 95 points - Requested demo + visited pricing 3x + downloaded ROI calculator"',
        sender: 'bot' as const,
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      }
    ]
  },
  {
    id: '7',
    title: 'Email Campaign Setup',
    copilot: 'Campaign Manager',
    lastMessage: 'I\'ve designed a 5-part email sequence for the product launch...',
    timestamp: '3 hours ago',
    isActive: false,
    messages: [
      {
        id: 'm13b',
        content: 'I need to set up an email campaign for our new product launch. Can you help me design the sequence?',
        sender: 'user' as const,
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'm14b',
        content: 'I\'ve designed a 5-part email sequence for the product launch:\n\n**Email 1: "Coming Soon" Teaser (Week -2)**\n- Build anticipation with sneak peek\n- Call-to-action: Join waitlist\n- Expected open rate: 28-35%\n\n**Email 2: "Launch Day" Announcement (Week 0)**\n- Official product reveal\n- Early bird discount (24-hour limited)\n- Expected conversion: 8-12%\n\n**Email 3: "Feature Spotlight" (Week +1)**\n- Deep dive into key features\n- Customer testimonials\n- Social proof integration\n\n**Email 4: "Success Stories" (Week +2)**\n- Case studies from beta users\n- ROI calculations\n- Urgency messaging\n\n**Email 5: "Last Chance" (Week +3)**\n- Final discount offer\n- FOMO-driven copy\n- Clear next steps\n\nEach email includes A/B testing for subject lines and personalization tokens. Would you like me to write the copy for any specific email?',
        sender: 'bot' as const,
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000 + 30000).toISOString(),
      },
      {
        id: 'm15b',
        content: 'This looks great! Can you use @HubSpot and @Mailchimp to set this up? I want to track everything through @Campaign Planning workflow.',
        sender: 'user' as const,
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000 + 60000).toISOString(),
      },
      {
        id: 'm16b',
        content: 'Perfect! I\'ll set this up using @HubSpot for email automation and @Mailchimp for list management. The @Campaign Planning workflow will handle the scheduling and tracking.\n\nHere\'s the launch day email copy with integrated tracking:\n\n**Subject Line A:** "🚀 It\'s here! [Product Name] is officially live"\n**Subject Line B:** "[FirstName], your wait is over - introducing [Product Name]"\n\n**Email Body:**\n\nHi [FirstName],\n\nThe day we\'ve all been waiting for is finally here! **[Product Name] is now officially available.**\n\nAs someone who joined our waitlist, you get **24-hour early access** plus an exclusive **20% launch discount**.\n\n**What makes [Product Name] special:**\n✅ [Key Feature 1] - Save 3 hours per week\n✅ [Key Feature 2] - Increase productivity by 40%\n✅ [Key Feature 3] - Seamless team collaboration\n\n**Your exclusive launch offer:**\n- 20% off first 3 months\n- Free premium onboarding\n- Direct access to our founder\n\n**[CTA BUTTON: Claim Your Launch Discount]**\n\n*This offer expires tomorrow at midnight.*\n\nThe @Media Planner agent will handle the social media promotion alongside this email campaign. Everything will be tracked through our unified dashboard.',
        sender: 'bot' as const,
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000 + 120000).toISOString(),
      }
    ]
  },
  {
    id: '7',
    title: 'Social Media Campaign Strategy',
    copilot: 'Campaign Manager',
    lastMessage: 'For maximum reach, I recommend a multi-platform approach...',
    timestamp: '1 day ago',
    isActive: false,
    messages: [
      {
        id: 'm17',
        content: 'We need a comprehensive social media strategy for our Q1 campaign. What platforms should we focus on?',
        sender: 'user' as const,
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'm18',
        content: 'For maximum reach, I recommend a multi-platform approach tailored to your audience:\n\n**Primary Platforms (80% of budget):**\n\n**LinkedIn** - 40% allocation\n- Target: B2B decision makers\n- Content: Thought leadership, case studies\n- Best times: Tue-Thu, 8-10am\n- Expected reach: 25K professionals\n\n**Instagram** - 25% allocation\n- Target: 25-40 age group\n- Content: Visual storytelling, behind-scenes\n- Best times: Wed-Fri, 11am-1pm\n- Expected engagement: 4.2% rate\n\n**Twitter/X** - 15% allocation\n- Target: Industry influencers\n- Content: Real-time updates, conversations\n- Best times: Daily, 9am-10am\n- Expected impressions: 50K\n\n**Secondary Platforms (20% of budget):**\n- **YouTube:** Product demos (10%)\n- **TikTok:** Creative content (10%)\n\n**Campaign Timeline:** 8-week execution\n**Total Budget Recommendation:** $15K-25K\n**Expected ROI:** 300-450%\n\nShall I create detailed content calendars for each platform?',
        sender: 'bot' as const,
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000 + 30000).toISOString(),
      }
    ]
  },
  {
    id: '8',
    title: 'Campaign Performance Analytics',
    copilot: 'Campaign Manager',
    lastMessage: 'The mid-campaign metrics show we\'re exceeding targets...',
    timestamp: '5 days ago',
    isActive: false,
    messages: [
      {
        id: 'm19',
        content: 'Can you analyze the performance of our current campaign and suggest optimizations?',
        sender: 'user' as const,
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'm20',
        content: 'The mid-campaign metrics show we\'re exceeding targets in most areas:\n\n**Performance Summary (Weeks 1-4):**\n\n📈 **Overperforming Metrics:**\n- Click-through rate: 3.8% (vs 2.5% target) - **+52%**\n- Email open rate: 31.2% (vs 25% target) - **+25%**\n- Social engagement: 4.7% (vs 3.5% target) - **+34%**\n- Lead quality score: 8.2/10 (vs 7.0 target)\n\n⚠️ **Underperforming Areas:**\n- Conversion rate: 2.1% (vs 3.0% target) - **-30%**\n- Cost per acquisition: $87 (vs $65 target) - **+34%**\n\n**Recommended Optimizations:**\n\n1. **Landing Page A/B Test:** Current page has 40-second load time\n2. **Retargeting Campaign:** Target high-engagement, low-conversion users\n3. **Budget Reallocation:** Move 20% from LinkedIn to Instagram (better ROI)\n4. **Creative Refresh:** Top performing ad creative shows fatigue\n\n**Projected Impact:** These changes could improve conversion by 25-40% and reduce CPA to $58-65.\n\nShall I implement these optimizations and set up automated monitoring?',
        sender: 'bot' as const,
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 30000).toISOString(),
      }
    ]
  },
];

const mockCopilots: CopilotData[] = [
  {
    id: '1',
    name: 'Content Assistant',
    description: 'Helps with blog posts, social media content, and marketing copy. Optimized for brand voice and SEO.',
    status: 'active',
    avatar: 'CA',
    avatarColor: 'bg-blue-100 text-blue-600',
    type: 'content',
    favorite: true,
    components: [
      { name: 'Content Writer', type: 'agent', description: 'AI assistant that creates engaging articles, blogs, and marketing copy' },
      { name: 'SEO Optimizer', type: 'agent', description: 'Specialist in keyword research and content optimization for search engines' },
      { name: 'Grammarly', type: 'tool', description: 'Grammar and writing enhancement tool for professional communications' },
      { name: 'SEMrush', type: 'tool', description: 'Comprehensive SEO and competitive analysis platform' },
    ],
    profileFields: [
      { id: 'role', name: 'role', label: 'Your Role', type: 'text', required: true, description: 'What\'s your job title or role?' },
      { id: 'content_type', name: 'content_type', label: 'Content Types', type: 'select', required: true, description: 'What type of content do you create most?', options: ['Blog posts', 'Social media', 'Email newsletters', 'Website copy', 'Marketing materials', 'Other'] },
      { id: 'brand_voice', name: 'brand_voice', label: 'Brand Voice', type: 'select', required: false, description: 'What\'s your brand voice style?', options: ['Professional', 'Friendly', 'Authoritative', 'Conversational', 'Creative', 'Technical'] },
      { id: 'target_audience', name: 'target_audience', label: 'Target Audience', type: 'textarea', required: true, description: 'Who is your primary audience?' },
      { id: 'content_goals', name: 'content_goals', label: 'Content Goals', type: 'textarea', required: false, description: 'What do you want to achieve with your content?' },
    ],
  },
  {
    id: '2',
    name: 'Campaign Manager',
    description: 'Plans and executes marketing campaigns across multiple channels with automated workflows.',
    status: 'active',
    avatar: 'CM',
    avatarColor: 'bg-green-100 text-green-600',
    type: 'general',
    favorite: true,
    components: [
      { name: 'Campaign Planning', type: 'workflow', description: 'Automated workflow for campaign strategy, timeline, and budget planning' },
      { name: 'Media Planner', type: 'agent', description: 'Strategic assistant for media buying, channel selection, and budget allocation' },
      { name: 'HubSpot', type: 'tool', description: 'CRM and marketing automation platform for lead management and nurturing' },
      { name: 'Mailchimp', type: 'tool', description: 'Email marketing platform for creating, sending, and tracking campaigns' },
    ],
    profileFields: [
      {
        id: 'title',
        name: 'title',
        label: 'Job Title',
        type: 'text',
        required: true,
        description: 'Your current position or role'
      },
      {
        id: 'company',
        name: 'company',
        label: 'Company',
        type: 'text',
        required: true,
        description: 'Name of your organization'
      },
      {
        id: 'industry',
        name: 'industry',
        label: 'Industry',
        type: 'select',
        required: true,
        description: 'Primary business sector',
        options: ['Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail', 'Education', 'Other']
      },
      {
        id: 'budget',
        name: 'budget',
        label: 'Marketing Budget',
        type: 'select',
        required: false,
        description: 'Monthly marketing budget range',
        options: ['Under $10K', '$10K-$50K', '$50K-$100K', '$100K-$500K', '$500K+']
      },
      {
        id: 'goals',
        name: 'goals',
        label: 'Campaign Goals',
        type: 'textarea',
        required: true,
        description: 'What do you want to achieve with your campaigns?'
      },
      {
        id: 'target_audience',
        name: 'target_audience',
        label: 'Target Audience',
        type: 'textarea',
        required: false,
        description: 'Describe your ideal customers'
      }
    ]
  },
  {
    id: '3',
    name: 'Social Analyst',
    description: 'Analyzes social media performance, tracks trends, and provides insights for optimization.',
    status: 'active',
    avatar: 'SA',
    avatarColor: 'bg-orange-100 text-orange-600',
    type: 'analyst',
    favorite: true,
    components: [
      { name: 'Data Analyst', type: 'agent', description: 'Advanced analytics specialist for social media performance and ROI tracking' },
      { name: 'Trend Spotter', type: 'agent', description: 'AI assistant that identifies emerging social trends and viral content patterns' },
      { name: 'Google Analytics', type: 'tool', description: 'Web analytics platform for tracking website traffic and user behavior' },
      { name: 'Hootsuite', type: 'tool', description: 'Social media management platform for scheduling and monitoring posts' },
    ],
    profileFields: [
      { id: 'business_type', name: 'business_type', label: 'Business Type', type: 'select', required: true, description: 'What type of business are you in?', options: ['E-commerce', 'SaaS', 'Agency', 'Retail', 'B2B Services', 'Content Creator', 'Other'] },
      { id: 'platforms', name: 'platforms', label: 'Social Platforms', type: 'select', required: true, description: 'Which platforms do you focus on?', options: ['Instagram', 'Facebook', 'Twitter/X', 'LinkedIn', 'TikTok', 'YouTube', 'Pinterest', 'Multiple platforms'] },
      { id: 'analytics_goals', name: 'analytics_goals', label: 'Analytics Goals', type: 'textarea', required: true, description: 'What specific insights are you looking for?' },
      { id: 'current_metrics', name: 'current_metrics', label: 'Key Metrics', type: 'textarea', required: false, description: 'What metrics do you currently track?' },
    ],
  },
  {
    id: '4',
    name: 'Customer Support',
    description: 'Provides 24/7 customer support with intelligent ticket routing and automated responses.',
    status: 'active',
    avatar: 'CS',
    avatarColor: 'bg-purple-100 text-purple-600',
    type: 'support',
    favorite: false,
    components: [
      { name: 'Support Agent', type: 'agent', description: 'AI customer service representative that handles common inquiries and issues' },
      { name: 'Ticket Router', type: 'agent', description: 'Smart routing system that assigns tickets to the right team based on complexity' },
      { name: 'Zendesk', type: 'tool', description: 'Customer service platform for ticket management and support workflows' },
      { name: 'Intercom', type: 'tool', description: 'Live chat and customer messaging platform for real-time support' },
      { name: 'Escalation Flow', type: 'workflow', description: 'Automated workflow for escalating complex issues to human agents' },
    ],
    profileFields: [
      { id: 'support_role', name: 'support_role', label: 'Support Role', type: 'select', required: true, description: 'What\'s your role in customer support?', options: ['Support Manager', 'Support Agent', 'Team Lead', 'Customer Success', 'Product Manager', 'Other'] },
      { id: 'product_type', name: 'product_type', label: 'Product Type', type: 'select', required: true, description: 'What type of product/service do you support?', options: ['Software/SaaS', 'E-commerce', 'Mobile App', 'Physical Products', 'Services', 'Other'] },
      { id: 'support_channels', name: 'support_channels', label: 'Support Channels', type: 'select', required: true, description: 'Which channels do you use for support?', options: ['Email', 'Live Chat', 'Phone', 'Social Media', 'In-app', 'Multiple channels'] },
      { id: 'common_issues', name: 'common_issues', label: 'Common Issues', type: 'textarea', required: false, description: 'What are the most common issues your customers face?' },
      { id: 'support_goals', name: 'support_goals', label: 'Support Goals', type: 'textarea', required: false, description: 'What are your main support objectives?' },
    ],
  },
];

const navigationItems = [
  { id: 'copilots', label: 'Copilots', icon: Monitor },
  { id: 'agents', label: 'Agents', icon: Users },
  { id: 'tools', label: 'Tools', icon: Settings },
  { id: 'workflows', label: 'Workflows', icon: BarChart3 },
  { id: 'knowledge-base', label: 'Knowledge Base', icon: BookOpen },
  { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
  { id: 'conversations', label: 'Conversations', icon: MessageSquare },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  { id: 'users', label: 'Users', icon: Shield },
  { id: 'workspace-settings', label: 'Workspace Settings', icon: Settings },
  { id: 'user-view', label: 'User View', icon: User },
] as const;

// Helper functions for copilot avatars (copied from CopilotCard)
const getImageUrl = (type: string) => {
  switch (type.toLowerCase()) {
    case 'general':
      return 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop&auto=format';
    case 'content':
      return 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop&auto=format';
    case 'analyst':
      return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop&auto=format';
    case 'support':
      return 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=200&fit=crop&auto=format';
    default:
      return 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop&auto=format';
  }
};

const getTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'general':
      return <Bot className="w-4 h-4 text-white drop-shadow-md" />;
    case 'content':
      return <MessageSquare className="w-4 h-4 text-white drop-shadow-md" />;
    case 'analyst':
      return <BarChart3 className="w-4 h-4 text-white drop-shadow-md" />;
    case 'support':
      return <Headphones className="w-4 h-4 text-white drop-shadow-md" />;
    default:
      return <Bot className="w-4 h-4 text-white drop-shadow-md" />;
  }
};

// Table Avatar Component with solid colors and icons
const TableAvatar = ({ copilot }: { copilot: CopilotData }) => {
  const getAvatarStyle = (type: string) => {
    switch (type.toLowerCase()) {
      case 'general':
        return 'bg-blue-500';
      case 'content':
        return 'bg-green-500';
      case 'analyst':
        return 'bg-purple-500';
      case 'support':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className={`w-10 h-10 aspect-square rounded-full flex items-center justify-center flex-shrink-0 ${getAvatarStyle(copilot.type)}`}>
      {getTypeIcon(copilot.type)}
    </div>
  );
};

export default function Dashboard() {
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace>(workspaces[0]);
  const [activeSection, setActiveSection] = useState<NavigationSection>('copilots');
  const [copilots, setCopilots] = useState<CopilotData[]>(mockCopilots);
  const [chatCopilot, setChatCopilot] = useState<CopilotData | null>(null);
  const [editingCopilot, setEditingCopilot] = useState<CopilotData | null>(null);
  const [configuringCopilot, setConfiguringCopilot] = useState<CopilotData | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'archived'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'type' | 'status'>('name');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAttachmentSidebar, setShowAttachmentSidebar] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [copilotToDelete, setCopilotToDelete] = useState<CopilotData | null>(null);
  
  // State for tracking which specific agent/tool/workflow to configure
  const [configureAgent, setConfigureAgent] = useState<{id: string, name: string} | null>(null);
  const [configureTool, setConfigureTool] = useState<{id: string, name: string} | null>(null);
  const [configureWorkflow, setConfigureWorkflow] = useState<{id: string, name: string} | null>(null);

  const [conversations, setConversations] = useState(recentConversations);
  const { toast } = useToast();

  // Handle navigation events from copilot configuration
  useEffect(() => {
    const handleAgentConfigure = (event: CustomEvent) => {
      setConfigureAgent(event.detail);
      setActiveSection('agents');
      setConfiguringCopilot(null); // Close copilot config
    };

    const handleToolConfigure = (event: CustomEvent) => {
      setConfigureTool(event.detail);
      setActiveSection('tools');
      setConfiguringCopilot(null); // Close copilot config
    };

    const handleWorkflowConfigure = (event: CustomEvent) => {
      setConfigureWorkflow(event.detail);
      setActiveSection('workflows');
      setConfiguringCopilot(null); // Close copilot config
    };

    // Handle clearing selected files from document preview pane
    const handleClearSelectedFiles = () => {
      setSelectedFiles([]);
    };

    window.addEventListener('navigate-to-agent-configure', handleAgentConfigure as EventListener);
    window.addEventListener('navigate-to-tool-configure', handleToolConfigure as EventListener);
    window.addEventListener('navigate-to-workflow-edit', handleWorkflowConfigure as EventListener);
    window.addEventListener('clearSelectedFiles', handleClearSelectedFiles);

    return () => {
      window.removeEventListener('navigate-to-agent-configure', handleAgentConfigure as EventListener);
      window.removeEventListener('navigate-to-tool-configure', handleToolConfigure as EventListener);
      window.removeEventListener('navigate-to-workflow-edit', handleWorkflowConfigure as EventListener);
      window.removeEventListener('clearSelectedFiles', handleClearSelectedFiles);
    };
  }, []);

  const showNotification = (message: string) => {
    toast({
      description: message,
      duration: 3000,
    });
  };





  const handleWorkspaceChange = (workspace: Workspace) => {
    setCurrentWorkspace(workspace);
    showNotification(`Switched to ${workspace.name}`);
  };

  const handleSectionChange = (section: NavigationSection) => {
    setActiveSection(section);
    // Close chat when navigating to other sections
    if (chatCopilot) {
      setChatCopilot(null);
    }
    // Clear any active configuration states
    if (configuringCopilot) {
      setConfiguringCopilot(null);
    }
    if (configureAgent) {
      setConfigureAgent(null);
    }
    if (configureTool) {
      setConfigureTool(null);
    }
    if (configureWorkflow) {
      setConfigureWorkflow(null);
    }
    showNotification(`Switched to ${section.charAt(0).toUpperCase() + section.slice(1)}`);
  };

  const handleStartChat = (copilot: CopilotData) => {
    setChatCopilot(copilot);
  };

  const handleEditCopilot = (copilot: CopilotData) => {
    setConfiguringCopilot(copilot);
  };

  const handleDuplicateCopilot = (copilot: CopilotData) => {
    const newCopilot: CopilotData = {
      ...copilot,
      id: Date.now().toString(),
      name: `${copilot.name} (Copy)`,
    };
    setCopilots(prev => [...prev, newCopilot]);
    showNotification(`Duplicated ${copilot.name}`);
  };

  const handleArchiveCopilot = (copilot: CopilotData) => {
    setCopilots(prev => prev.map(c => 
      c.id === copilot.id 
        ? { ...c, status: c.status === 'active' ? 'archived' : 'active' }
        : c
    ));
    const newStatus = copilot.status === 'active' ? 'archived' : 'active';
    showNotification(`${newStatus === 'archived' ? 'Archived' : 'Restored'} copilot: ${copilot.name}`);
  };

  const handleDeleteCopilot = (copilot: CopilotData) => {
    setCopilotToDelete(copilot);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (copilotToDelete) {
      setCopilots(prev => prev.filter(c => c.id !== copilotToDelete.id));
      showNotification(`Deleted ${copilotToDelete.name}`);
      setCopilotToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setCopilotToDelete(null);
    setDeleteConfirmOpen(false);
  };

  const handleCreateCopilot = (data: { name: string; description: string; type: string }) => {
    const avatarInitials = data.name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
    const colors = ['bg-blue-100 text-blue-600', 'bg-green-100 text-green-600', 'bg-purple-100 text-purple-600', 'bg-orange-100 text-orange-600'];
    
    const newCopilot: CopilotData = {
      id: Date.now().toString(),
      name: data.name,
      description: data.description,
      status: 'active',
      avatar: avatarInitials,
      avatarColor: colors[Math.floor(Math.random() * colors.length)],
      type: data.type,
      favorite: false,
      components: [],
    };
    
    setCopilots(prev => [...prev, newCopilot]);
    showNotification(`Created new copilot: ${data.name}`);
  };

  const handleUpdateCopilot = (data: { name: string; description: string; type: string }) => {
    if (!editingCopilot) return;
    
    setCopilots(prev => prev.map(copilot => 
      copilot.id === editingCopilot.id 
        ? { ...copilot, name: data.name, description: data.description, type: data.type }
        : copilot
    ));
    showNotification(`Updated copilot: ${data.name}`);
    setEditingCopilot(null);
  };

  const handleSaveCopilotConfiguration = (updatedCopilot: CopilotData) => {
    setCopilots(prev => prev.map(copilot => 
      copilot.id === updatedCopilot.id ? updatedCopilot : copilot
    ));
    showNotification(`Updated configuration for: ${updatedCopilot.name}`);
    setConfiguringCopilot(null);
  };

  const handleDeleteConversation = (conversationId: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== conversationId));
    showNotification('Conversation deleted');
  };

  const handleLoadConversation = (conversation: any) => {
    // Find the copilot associated with this conversation
    const copilot = copilots.find(c => c.name === conversation.copilot);
    if (copilot) {
      // Start chat with the copilot and pass conversation messages
      const copilotWithMessages = { ...copilot, conversationMessages: conversation.messages || [] };
      setChatCopilot(copilotWithMessages);
      
      // Mark this conversation as active and others as inactive
      setConversations(prev => prev.map(conv => ({
        ...conv,
        isActive: conv.id === conversation.id
      })));
      
      showNotification(`Opened conversation: ${conversation.title}`);
    }
  };

  const handleToggleFavorite = (copilotId: string) => {
    setCopilots(prev => prev.map(copilot =>
      copilot.id === copilotId
        ? { ...copilot, favorite: !copilot.favorite }
        : copilot
    ));
  };

  const handleToggleAttachment = (show: boolean) => {
    setShowAttachmentSidebar(show);
    // Collapse the main sidebar when attachment sidebar is shown
    if (show) {
      setSidebarCollapsed(true);
    }
  };

  const handleFileSelect = (fileName: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileName) 
        ? prev.filter(f => f !== fileName)
        : [...prev, fileName]
    );
  };

  // Filter and sort copilots
  const getFilteredAndSortedCopilots = () => {
    let filtered = copilots.filter(copilot => {
      const matchesSearch = copilot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           copilot.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || copilot.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'type':
          return a.type.localeCompare(b.type);
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredCopilots = getFilteredAndSortedCopilots();

  const getSectionContent = (): { title: string; subtitle: string; content: React.ReactNode } => {
    // If chat is open, show chat interface instead of section content
    if (chatCopilot) {
      return {
        title: `Chat with ${chatCopilot.name}`,
        subtitle: chatCopilot.description,
        content: (
          <ChatInterface
            isOpen={true}
            copilot={chatCopilot}
            onClose={() => setChatCopilot(null)}
            onToggleAttachment={handleToggleAttachment}
            selectedFiles={selectedFiles}
          />
        ),
      };
    }

    // If configuring a copilot, show configuration interface
    if (configuringCopilot) {
      return {
        title: `Configure ${configuringCopilot.name}`,
        subtitle: 'Edit copilot settings, components, and profile fields',
        content: (
          <CopilotConfiguration
            copilot={configuringCopilot}
            onClose={() => setConfiguringCopilot(null)}
            onSave={handleSaveCopilotConfiguration}
          />
        ),
      };
    }

    switch (activeSection) {
      case 'copilots':
        return {
          title: 'Copilots',
          subtitle: 'AI assistants configured for specific tasks and conversations',
          content: (
            <div className="space-y-6">
              {/* Controls Bar */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  {/* Search */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search copilots..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  {/* Filters */}
                  <div className="flex gap-2">
                    <Select value={statusFilter} onValueChange={(value: 'all' | 'active' | 'archived') => setStatusFilter(value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <ArrowUpDown className="w-4 h-4 mr-2" />
                          Sort
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setSortBy('name')}>
                          Sort by Name
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortBy('type')}>
                          Sort by Type
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortBy('status')}>
                          Sort by Status
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                {/* View Toggle */}
                <div className="flex gap-1 border rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="px-3"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'table' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('table')}
                    className="px-3"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredCopilots.map((copilot) => (
                    <CopilotCard
                      key={copilot.id}
                      copilot={copilot}
                      onStartChat={handleStartChat}
                      onEdit={handleEditCopilot}
                      onDuplicate={handleDuplicateCopilot}
                      onArchive={handleArchiveCopilot}
                      onDelete={handleDeleteCopilot}
                    />
                  ))}
                </div>
              ) : (
                <div className="border rounded-lg bg-white">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCopilots.map((copilot) => (
                        <TableRow key={copilot.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <TableAvatar copilot={copilot} />
                              {copilot.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="capitalize">
                              {copilot.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${copilot.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                              <span className="capitalize">{copilot.status}</span>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">
                            {copilot.description}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Button variant="outline" size="sm" onClick={() => handleStartChat(copilot)}>
                                Chat
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleEditCopilot(copilot)}>
                                Edit
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    More
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem onClick={() => handleDuplicateCopilot(copilot)}>
                                    Duplicate
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDeleteCopilot(copilot)} className="text-destructive">
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              {/* Empty State */}
              {filteredCopilots.length === 0 && (
                <div className="text-center py-12">
                  <Monitor className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-sm font-medium text-foreground">No copilots found</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {searchTerm || statusFilter !== 'all' 
                      ? 'Try adjusting your search or filters' 
                      : 'Get started by creating your first copilot'
                    }
                  </p>
                </div>
              )}
            </div>
          ),
        };
      case 'agents':
        return {
          title: 'Agents',
          subtitle: 'Individual AI agents that can be combined into copilots',
          content: <SampleScreen 
            section="agents" 
            configureAgent={configureAgent}
            onClearConfigureAgent={() => setConfigureAgent(null)}
          />,
        };
      case 'tools':
        return {
          title: 'Tools',
          subtitle: 'External tools and integrations available to your copilots',
          content: <SampleScreen 
            section="tools" 
            configureTool={configureTool}
            onClearConfigureTool={() => setConfigureTool(null)}
          />,
        };
      case 'workflows':
        return {
          title: 'Workflows',
          subtitle: 'Automated workflows and processes for your copilots',
          content: <SampleScreen 
            section="workflows" 
            configureWorkflow={configureWorkflow}
            onClearConfigureWorkflow={() => setConfigureWorkflow(null)}
          />,
        };
      case 'knowledge-base':
        return {
          title: 'Knowledge Base',
          subtitle: 'Manage knowledge articles and documentation for your copilots',
          content: <SampleScreen section="knowledge-base" />,
        };

      case 'subscriptions':
        return {
          title: 'Subscriptions',
          subtitle: 'Manage user subscriptions and billing information',
          content: <SampleScreen section="subscriptions" />,
        };
      case 'conversations':
        return {
          title: 'Conversations',
          subtitle: 'View and manage all user conversations with copilots',
          content: <SampleScreen section="conversations" />,
        };
      case 'analytics':
        return {
          title: 'Analytics',
          subtitle: 'Performance metrics and insights for your copilots',
          content: <SampleScreen section="analytics" />,
        };
      case 'users':
        return {
          title: 'Users',
          subtitle: 'Manage user accounts and permissions',
          content: <SampleScreen section="users" />,
        };
      case 'pricing':
        return {
          title: 'Pricing Plans',
          subtitle: 'Choose the plan that fits your needs',
          content: <PricingScreen />,
        };
      case 'workspace-settings':
        return {
          title: 'Workspace Settings',
          subtitle: 'Configure your workspace preferences and integrations',
          content: <WorkspaceSettings />,
        };
      case 'user-view':
        return {
          title: 'User View Preview',
          subtitle: 'See what your workspace looks like to end users',
          content: <UserView 
            copilots={copilots}
            onToggleFavorite={handleToggleFavorite}
            onStartChat={handleStartChat}
          />,
        };
      case 'profile-settings':
        return {
          title: 'Profile Settings',
          subtitle: 'Manage your personal information and preferences',
          content: <ProfileSettings />,
        };
      case 'account-settings':
        return {
          title: 'Account Settings',
          subtitle: 'Manage your account security, privacy, and connected services',
          content: <AccountSettings />,
        };
      default:
        return {
          title: 'Copilots',
          subtitle: 'AI assistants configured for specific tasks and conversations',
          content: (
            <div className="space-y-6">
              {/* Controls Bar */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  {/* Search */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search copilots..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  {/* Filters */}
                  <div className="flex gap-2">
                    <Select value={statusFilter} onValueChange={(value: 'all' | 'active' | 'archived') => setStatusFilter(value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <ArrowUpDown className="w-4 h-4 mr-2" />
                          Sort
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setSortBy('name')}>
                          Sort by Name
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortBy('type')}>
                          Sort by Type
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortBy('status')}>
                          Sort by Status
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                {/* View Toggle */}
                <div className="flex gap-1 border rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="px-3"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'table' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('table')}
                    className="px-3"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredCopilots.map((copilot) => (
                    <CopilotCard
                      key={copilot.id}
                      copilot={copilot}
                      onStartChat={handleStartChat}
                      onEdit={handleEditCopilot}
                      onDuplicate={handleDuplicateCopilot}
                      onArchive={handleArchiveCopilot}
                      onDelete={handleDeleteCopilot}
                    />
                  ))}
                </div>
              ) : (
                <div className="border rounded-lg bg-white">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCopilots.map((copilot) => (
                        <TableRow key={copilot.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <TableAvatar copilot={copilot} />
                              {copilot.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="capitalize">
                              {copilot.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${copilot.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                              <span className="capitalize">{copilot.status}</span>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">
                            {copilot.description}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Button variant="outline" size="sm" onClick={() => handleStartChat(copilot)}>
                                Chat
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleEditCopilot(copilot)}>
                                Edit
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    More
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem onClick={() => handleDuplicateCopilot(copilot)}>
                                    Duplicate
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDeleteCopilot(copilot)} className="text-destructive">
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              {/* Empty State */}
              {filteredCopilots.length === 0 && (
                <div className="text-center py-12">
                  <Monitor className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-sm font-medium text-foreground">No copilots found</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {searchTerm || statusFilter !== 'all' 
                      ? 'Try adjusting your search or filters' 
                      : 'Get started by creating your first copilot'
                    }
                  </p>
                </div>
              )}
            </div>
          ),
        };
    }
  };

  const sectionContent = getSectionContent();

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} border-r border-sidebar-border flex flex-col bg-[#e6eeef] transition-all duration-300`}>
        {/* Logo and Toggle */}
        <div className={`${sidebarCollapsed ? 'p-4' : 'p-6'}`}>
          <div className={`flex items-center ${sidebarCollapsed ? 'flex-col gap-3' : 'justify-between'} mb-4`}>
            <img 
              src={sidebarCollapsed ? knolliIcon : knolliLogo}
              alt="Knolli Logo" 
              className={sidebarCollapsed ? "h-8 w-8 rounded-full" : "h-8 w-auto"}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-sidebar-foreground hover:text-sidebar-primary"
            >
              {sidebarCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
            </Button>
          </div>
          {!sidebarCollapsed && (activeSection !== 'user-view' || (activeSection === 'user-view' && chatCopilot)) && (
            <WorkspaceSelector
              currentWorkspace={currentWorkspace}
              workspaces={workspaces}
              onWorkspaceChange={handleWorkspaceChange}
              copilots={copilots}
              isInChatMode={!!chatCopilot}
              onCopilotSelect={handleStartChat}
            />
          )}

        </div>

        {/* Navigation */}
        <nav className={`flex-1 ${sidebarCollapsed ? 'px-2' : 'px-6'} py-6 overflow-y-auto`}>
          {activeSection === 'user-view' && !chatCopilot ? (
            // User View: Simplified navigation for end users
            (<div className="space-y-6">
              {!sidebarCollapsed && (
                <>
                  {/* Quick Access Assistants */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-sidebar-foreground">Your Assistants</h3>
                    <div className="space-y-2">
                      {copilots.filter(c => c.status === 'active' && c.favorite).slice(0, 4).map((copilot) => (
                        <Button
                          key={copilot.id}
                          variant="ghost"
                          onClick={() => handleStartChat(copilot)}
                          className="w-full justify-start gap-3 text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent p-3"
                        >
                          <div className={`w-8 h-8 ${copilot.avatarColor} rounded-lg flex items-center justify-center text-xs font-semibold`}>
                            {copilot.avatar}
                          </div>
                          <div className="flex-1 min-w-0 text-left">
                            <div className="text-sm font-medium truncate">{copilot.name}</div>
                            <div className="text-xs text-muted-foreground truncate">{copilot.type}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>


                </>
              )}
              {sidebarCollapsed && (
                <div className="space-y-4">
                  {/* Assistant Icons */}
                  {copilots.filter(c => c.status === 'active' && c.favorite).slice(0, 4).map((copilot) => (
                    <Button
                      key={copilot.id}
                      variant="ghost"
                      size="sm"
                      onClick={() => handleStartChat(copilot)}
                      className="w-full p-2 text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent"
                      title={copilot.name}
                    >
                      <div className={`w-6 h-6 ${copilot.avatarColor} rounded text-xs font-semibold flex items-center justify-center`}>
                        {copilot.avatar}
                      </div>
                    </Button>
                  ))}
                </div>
              )}
            </div>)
          ) : chatCopilot ? (
            // Recent Conversations List (Clean, without workspace selector)
            (<div className="space-y-3">
              
              {sidebarCollapsed && (
                <div className="space-y-3">
                  {/* Copilot Icons when collapsed in conversation mode */}
                  <div className="space-y-2">
                    <div className="text-center text-xs text-muted-foreground mb-2">Assistants</div>
                    {copilots.filter(c => c.status === 'active').slice(0, 6).map((copilot) => (
                      <Button
                        key={copilot.id}
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStartChat(copilot)}
                        className={`w-full p-2 ${
                          chatCopilot?.id === copilot.id 
                            ? 'text-sidebar-primary bg-sidebar-accent' 
                            : 'text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent'
                        }`}
                        title={copilot.name}
                      >
                        <div className={`w-6 h-6 ${copilot.avatarColor} rounded-full text-xs font-semibold flex items-center justify-center`}>
                          {copilot.avatar}
                        </div>
                      </Button>
                    ))}
                  </div>
                  
                  {/* Close chat button */}
                  <div className="flex justify-center border-t border-sidebar-border pt-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setChatCopilot(null);
                        setShowAttachmentSidebar(false);
                      }}
                      className="text-sidebar-foreground hover:text-sidebar-primary"
                      title="Close chat"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
              {!sidebarCollapsed && (
                <div className="space-y-1">
                  {conversations.filter(conversation => conversation.copilot === chatCopilot?.name).map((conversation) => (
                    <div
                      key={conversation.id}
                      className="p-2 rounded-lg transition-all group cursor-pointer bg-white/50 hover:bg-sidebar-accent hover:text-sidebar-primary"
                      onClick={() => handleLoadConversation(conversation)}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0 cursor-pointer">
                            <h4 className="text-sm font-medium truncate leading-tight">{conversation.title}</h4>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteConversation(conversation.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 h-5 w-5 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 flex-shrink-0"
                            title="Delete conversation"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                        <span className="text-xs text-muted-foreground cursor-pointer leading-tight">{conversation.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>)
          ) : (
            // Regular Admin Navigation Menu
            (<ul className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <Button
                      variant="ghost"
                      onClick={() => handleSectionChange(item.id as NavigationSection)}
                      className={`w-full ${sidebarCollapsed ? 'justify-center px-0 py-3' : 'justify-start gap-3'} ${
                        isActive 
                          ? 'text-sidebar-primary bg-sidebar-accent' 
                          : 'text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent'
                      }`}
                      title={sidebarCollapsed ? item.label : undefined}
                    >
                      <Icon className="w-5 h-5" />
                      {!sidebarCollapsed && item.label}
                    </Button>
                  </li>
                );
              })}
            </ul>)
          )}
        </nav>

        {/* Pricing Plans Button and User Profile */}
        <div className={`${sidebarCollapsed ? 'p-4' : 'p-6'} space-y-3`}>
          {/* Pricing Plans Button - Hidden in user view */}
          {activeSection !== 'user-view' && (
            <>
              {!sidebarCollapsed && (
                <Button 
                  variant="outline"
                  className="w-full bg-white border-2 border-[#008062] text-[#008062] hover:bg-[#008062] hover:text-white transition-colors"
                  onClick={() => handleSectionChange('pricing')}
                >
                  Pricing Plans
                </Button>
              )}
              {sidebarCollapsed && (
                <Button 
                  variant="outline"
                  size="sm"
                  className="w-full bg-white border-2 border-[#008062] text-[#008062] hover:bg-[#008062] hover:text-white transition-colors"
                  title="Pricing Plans"
                  onClick={() => handleSectionChange('pricing')}
                >
                  $
                </Button>
              )}
            </>
          )}

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {sidebarCollapsed ? (
                <div className="w-8 h-8 rounded-full overflow-hidden mx-auto border-2 border-[#008062] cursor-pointer hover:border-[#00d2a0] transition-colors" title="John Doe">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&auto=format&face=center" 
                    alt="John Doe"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <Button 
                  variant="ghost" 
                  className="w-full p-3 h-auto bg-[#008062] hover:bg-[#00d2a0] text-white justify-start"
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&auto=format&face=center" 
                        alt="John Doe"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="text-sm font-medium text-white truncate">John Doe</div>
                      <div className="text-xs text-white/80 truncate">john.doe@company.com</div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-white/80" />
                  </div>
                </Button>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {activeSection === 'user-view' ? (
                // Simplified user profile options
                (<>
                  <DropdownMenuItem onClick={() => handleSectionChange('profile-settings')}>
                    <User className="w-4 h-4 mr-2" />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSectionChange('account-settings')}>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => handleSectionChange('copilots')}
                    className="text-[#008062] hover:text-[#00d2a0]"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Back to Admin Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600 hover:text-red-700">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </>)
              ) : (
                // Admin profile options
                (<>
                  <DropdownMenuItem onClick={() => handleSectionChange('profile-settings')}>
                    <User className="w-4 h-4 mr-2" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSectionChange('account-settings')}>
                    <Settings className="w-4 h-4 mr-2" />
                    Account Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600 hover:text-red-700">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </>)
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Attachment Sidebar */}
      {showAttachmentSidebar && (
        <div className="w-64 border-r border-sidebar-border flex flex-col h-full" style={{ backgroundColor: '#f3f4f7' }}>
          <div className="p-4 flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Files</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowAttachmentSidebar(false);
                setSidebarCollapsed(false);
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex-1 flex flex-col min-h-0">
            {/* Documents - Takes up most of the space */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto min-h-0">
              <div className="space-y-2">
                <div 
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedFiles.includes('Project_Brief.pdf') 
                      ? 'bg-white hover:bg-muted/30' 
                      : 'bg-white hover:bg-muted/30'
                  }`}
                  style={{
                    borderColor: selectedFiles.includes('Project_Brief.pdf') ? '#008062' : '#dadde2'
                  }}
                  onClick={() => handleFileSelect('Project_Brief.pdf')}
                >
                  <FileText className="w-4 h-4 text-blue-500" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">Project_Brief.pdf</div>
                    <div className="text-xs text-muted-foreground">2 hours ago • 1.2 MB</div>
                  </div>
                </div>
                <div 
                  className="flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all bg-white hover:bg-muted/30"
                  style={{
                    borderColor: selectedFiles.includes('logo_design.png') ? '#008062' : '#dadde2'
                  }}
                  onClick={() => handleFileSelect('logo_design.png')}
                >
                  <Image className="w-4 h-4 text-green-500" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">logo_design.png</div>
                    <div className="text-xs text-muted-foreground">Yesterday • 856 KB</div>
                  </div>
                </div>
                <div 
                  className="flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all bg-white hover:bg-muted/30"
                  style={{
                    borderColor: selectedFiles.includes('background_music.mp3') ? '#008062' : '#dadde2'
                  }}
                  onClick={() => handleFileSelect('background_music.mp3')}
                >
                  <Music className="w-4 h-4 text-purple-500" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">background_music.mp3</div>
                    <div className="text-xs text-muted-foreground">3 days ago • 4.8 MB</div>
                  </div>
                </div>
                <div 
                  className="flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all bg-white hover:bg-muted/30"
                  style={{
                    borderColor: selectedFiles.includes('demo_video.mp4') ? '#008062' : '#dadde2'
                  }}
                  onClick={() => handleFileSelect('demo_video.mp4')}
                >
                  <Video className="w-4 h-4 text-red-500" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">demo_video.mp4</div>
                    <div className="text-xs text-muted-foreground">1 week ago • 24.5 MB</div>
                  </div>
                </div>
                <div 
                  className="flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all bg-white hover:bg-muted/30"
                  style={{
                    borderColor: selectedFiles.includes('presentation.pptx') ? '#008062' : '#dadde2'
                  }}
                  onClick={() => handleFileSelect('presentation.pptx')}
                >
                  <FileText className="w-4 h-4 text-orange-500" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">presentation.pptx</div>
                    <div className="text-xs text-muted-foreground">1 week ago • 3.2 MB</div>
                  </div>
                </div>
                <div 
                  className="flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all bg-white hover:bg-muted/30"
                  style={{
                    borderColor: selectedFiles.includes('data_export.csv') ? '#008062' : '#dadde2'
                  }}
                  onClick={() => handleFileSelect('data_export.csv')}
                >
                  <File className="w-4 h-4 text-gray-500" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">data_export.csv</div>
                    <div className="text-xs text-muted-foreground">2 weeks ago • 540 KB</div>
                  </div>
                </div>
                <div 
                  className="flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all bg-white hover:bg-muted/30"
                  style={{
                    borderColor: selectedFiles.includes('screenshot_2024.jpg') ? '#008062' : '#dadde2'
                  }}
                  onClick={() => handleFileSelect('screenshot_2024.jpg')}
                >
                  <Image className="w-4 h-4 text-green-500" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">screenshot_2024.jpg</div>
                    <div className="text-xs text-muted-foreground">2 weeks ago • 1.8 MB</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Import Options - Fixed at bottom */}
            <div className="p-4 space-y-2 flex-shrink-0">
              <Button className="w-full justify-start gap-2">
                <Upload className="w-4 h-4" />
                Upload Files
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 google-drive-btn">
                <SiGoogledrive className="w-4 h-4 google-drive-icon transition-colors" />
                Import from Google Drive
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Main Content */}
      <div className="flex-1 overflow-hidden" style={{ backgroundColor: '#f2f2f2' }}>
        {/* Combined scrollable content */}
        <div className={`${chatCopilot || configuringCopilot ? 'h-full' : 'h-full p-8 overflow-y-auto'}`}>
          {/* Top Bar - Hidden when in chat, configuration, user-view, or settings modes */}
          {!chatCopilot && !configuringCopilot && activeSection !== 'user-view' && activeSection !== 'profile-settings' && activeSection !== 'account-settings' && (
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-foreground">{sectionContent.title}</h1>
                    {activeSection === 'copilots' && (
                      <Badge variant="secondary" className="text-sm" style={{ color: '#008062' }}>
                        {copilots.length} Copilots
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground mt-1">{sectionContent.subtitle}</p>
                </div>
                {activeSection === 'copilots' && (
                  <CreateCopilotModal onCreateCopilot={handleCreateCopilot} />
                )}
              </div>
            </div>
          )}

          {/* Content Body */}
          <div className={chatCopilot || configuringCopilot ? 'h-full' : ''}>
            {sectionContent.content}
          </div>
        </div>
      </div>
      {/* Edit Modal */}
      <EditCopilotModal
        isOpen={!!editingCopilot}
        copilot={editingCopilot}
        onClose={() => setEditingCopilot(null)}
        onUpdateCopilot={handleUpdateCopilot}
      />
      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteConfirmOpen}
        copilotName={copilotToDelete?.name || ''}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
