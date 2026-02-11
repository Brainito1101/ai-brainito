import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, MessageCircle, Mail, FileText, Zap, Users, CreditCard } from "lucide-react";

const Help = () => {
  const categories = [
    {
      icon: Zap,
      title: "Getting Started",
      description: "Learn the basics of using Brainito",
      questions: [
        {
          question: "How do I get started with Brainito?",
          answer: "Simply enter your website URL on our homepage or DIY Marketing Plan page, and our AI will analyze your website to create a personalized marketing strategy."
        },
        {
          question: "What information do I need to provide?",
          answer: "You only need to provide your website URL to get started. Our AI will analyze your site and create a customized marketing plan based on your business, industry, and target audience."
        },
        {
          question: "How long does the analysis take?",
          answer: "The initial analysis typically takes 2-3 minutes. You'll receive a comprehensive marketing audit report immediately after the analysis is complete."
        },
        {
          question: "Is there a free trial available?",
          answer: "Yes! We offer a free AI-powered marketing audit that gives you a preview of our capabilities. You can upgrade to a full plan anytime to access the complete strategy."
        }
      ]
    },
    {
      icon: FileText,
      title: "DIY Marketing Plan",
      description: "Help with your marketing plan",
      questions: [
        {
          question: "What's included in the DIY Marketing Plan?",
          answer: "The DIY Marketing Plan includes a comprehensive 9-module strategy covering website analysis, competitor research, content calendar, SEO recommendations, social media strategy, and more."
        },
        {
          question: "Can I customize my marketing plan?",
          answer: "Yes, the DIY plan provides recommendations tailored to your business. You can prioritize different modules and adapt strategies based on your specific goals and resources."
        },
        {
          question: "How often is the plan updated?",
          answer: "Your marketing plan is continuously updated with fresh insights. You can also request a re-analysis anytime to reflect changes in your business or market conditions."
        },
        {
          question: "Do I get access to templates and tools?",
          answer: "Absolutely! The DIY plan comes with ready-to-use templates for content calendars, social media posts, email campaigns, and more to help you execute your strategy efficiently."
        }
      ]
    },
    {
      icon: Users,
      title: "Hire a Marketer",
      description: "Working with your dedicated marketer",
      questions: [
        {
          question: "How does the Hire a Marketer service work?",
          answer: "When you hire a marketer through Brainito, we match you with a dedicated marketing professional who executes your strategy with daily check-ins and full transparency."
        },
        {
          question: "How do I contact my assigned marketer?",
          answer: "Once matched with a marketer, you'll have direct communication channels including chat, email, and scheduled video calls for strategy reviews."
        },
        {
          question: "What tasks can my marketer help with?",
          answer: "Your dedicated marketer handles everything from content creation and social media management to SEO optimization, paid advertising, email marketing, and performance reporting."
        },
        {
          question: "Can I change my marketer if needed?",
          answer: "Yes, if you feel the fit isn't right, you can request a new marketer. Our priority is ensuring you have the best possible partnership for your business goals."
        },
        {
          question: "How do I track my marketer's work?",
          answer: "You'll receive daily updates, weekly reports, and access to a real-time dashboard showing all activities, deliverables, and performance metrics."
        }
      ]
    },
    {
      icon: CreditCard,
      title: "Billing & Plans",
      description: "Payments, subscriptions, and refunds",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, debit cards, and UPI payments. Enterprise clients can also pay via bank transfer."
        },
        {
          question: "Can I cancel my subscription anytime?",
          answer: "Yes, you can cancel your subscription at any time. Please refer to our Refund Policy for details on refunds and cancellation terms."
        },
        {
          question: "Do you offer refunds?",
          answer: "We offer refunds based on our Refund Policy. Generally, refunds are available within the first 7 days if you're not satisfied with our service. See our Refund Policy page for complete details."
        },
        {
          question: "Can I upgrade or downgrade my plan?",
          answer: "Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades apply at the start of your next billing cycle."
        },
        {
          question: "How do I update my billing information?",
          answer: "You can update your payment method and billing details through your account settings or by contacting our support team."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-white via-purple-light/50 to-purple-medium">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
              Help & Support
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-8">
              Find answers to your questions or get in touch with our support team.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search for help..." 
                className="h-14 pl-12 pr-4 rounded-xl text-foreground bg-white"
              />
            </div>
          </div>
        </section>

        {/* Help Categories with Questions */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-12">
              {categories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="scroll-mt-8" id={category.title.toLowerCase().replace(/\s+/g, '-')}>
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <category.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">{category.title}</h2>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </div>

                  {/* Questions Accordion */}
                  <Accordion type="single" collapsible className="space-y-3">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem 
                        key={faqIndex} 
                        value={`${categoryIndex}-${faqIndex}`}
                        className="bg-purple-light/30 rounded-xl border border-border/20 px-6"
                      >
                        <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-4">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-4">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-16 bg-purple-light/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Still Need Help?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Our support team is here to help you with any questions or issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:support@brainito.com">
                <Button variant="gradient" size="lg">
                  <Mail className="mr-2 w-5 h-5" /> Email Support
                </Button>
              </a>
              <a href="/contact">
                <Button variant="outline" size="lg">
                  <MessageCircle className="mr-2 w-5 h-5" /> Contact Us
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Help;
