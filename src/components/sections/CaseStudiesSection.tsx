import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Target, Users } from "lucide-react";

const caseStudies = [
  {
    icon: TrendingUp,
    stat: "4×",
    label: "Revenue Growth",
    title: "How a local D2C brand grew 4× in 90 days",
    description: "A home decor brand transformed their digital presence and scaled revenue using our AI-powered marketing strategy.",
    color: "primary",
  },
  {
    icon: Target,
    stat: "32%",
    label: "CAC Reduction",
    title: "How a SaaS startup cut CAC by 32%",
    description: "Optimized ad spend and refined targeting helped a B2B SaaS reduce customer acquisition costs dramatically.",
    color: "accent",
  },
  {
    icon: Users,
    stat: "500",
    label: "Leads/Month",
    title: "How a coaching brand scaled to 500 leads/month",
    description: "From struggling with lead generation to a consistent pipeline of qualified prospects in just 60 days.",
    color: "primary",
  },
];

const CaseStudiesSection = () => {
  return (
    <section id="case-studies" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Real Transformations{" "}
            <span className="gradient-text">Case Studies</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how businesses like yours achieved real results.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {caseStudies.map((study) => (
            <div
              key={study.title}
              className="group bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-large hover:-translate-y-2"
            >
              {/* Stat highlight */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                  study.color === "primary" 
                    ? "bg-primary/10" 
                    : "bg-accent/10"
                }`}>
                  <study.icon size={28} className={
                    study.color === "primary" ? "text-primary" : "text-accent"
                  } />
                </div>
                <div>
                  <div className={`text-3xl font-extrabold ${
                    study.color === "primary" ? "text-primary" : "text-accent"
                  }`}>
                    {study.stat}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {study.label}
                  </div>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {study.title}
              </h3>
              <p className="text-muted-foreground mb-6">
                {study.description}
              </p>

              {/* CTA */}
              <Button variant="ghost" size="sm" className="text-primary p-0 h-auto">
                Read Full Case Study
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Explore Case Studies
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
