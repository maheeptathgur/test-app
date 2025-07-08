import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function PricingScreen() {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "per month",
      description: "Perfect for small teams getting started",
      features: [
        "Up to 5 copilots",
        "1,000 interactions/month",
        "Basic analytics",
        "Email support",
        "Standard integrations"
      ],
      recommended: false
    },
    {
      name: "Professional",
      price: "$99",
      period: "per month",
      description: "Best for growing businesses",
      features: [
        "Up to 25 copilots",
        "10,000 interactions/month",
        "Advanced analytics",
        "Priority support",
        "All integrations",
        "Custom branding",
        "API access"
      ],
      recommended: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large organizations with specific needs",
      features: [
        "Unlimited copilots",
        "Unlimited interactions",
        "Advanced security",
        "Dedicated support",
        "Custom integrations",
        "White-label solution",
        "SLA guarantee",
        "On-premise deployment"
      ],
      recommended: false
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Scale your AI copilot operations with plans designed for teams of all sizes
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <Card key={index} className={`relative ${plan.recommended ? 'border-[var(--theme-primary)] border-2' : ''}`}>
            {plan.recommended && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="theme-primary text-white px-3 py-1">Recommended</Badge>
              </div>
            )}
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-600 ml-1">/{plan.period}</span>
              </div>
              <CardDescription className="mt-2">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2">
                    <div className="w-2 h-2 theme-primary rounded-full"></div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className={`w-full ${plan.recommended ? 'theme-primary theme-primary-hover:hover' : 'bg-gray-900 hover:bg-gray-800'}`}
              >
                {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Can I change plans anytime?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What happens if I exceed my limits?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">We'll notify you when you're approaching your limits. You can upgrade or purchase additional usage.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Is there a free trial?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Yes, all plans come with a 14-day free trial. No credit card required to start.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Do you offer discounts for annual billing?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Yes, save 20% when you choose annual billing on any plan.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}