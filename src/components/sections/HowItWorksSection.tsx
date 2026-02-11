import featureDiyPlan from "@/assets/feature-diy-plan.png";
import featureActionBoard from "@/assets/feature-action-board.png";
import featureHireManager from "@/assets/feature-hire-manager.png";
import featureReporting from "@/assets/feature-reporting.png";

const features = [
  {
    number: "001",
    image: featureDiyPlan,
    title: "Build DIY Marketing Plan",
    description: "Create your comprehensive marketing strategy with our guided templates and execution roadmap.",
  },
  {
    number: "002",
    image: featureActionBoard,
    title: "Action Board to Manage Activities",
    description: "Track all your marketing activities in one view. Spot trends and manage campaigns instantly.",
  },
  {
    number: "003",
    image: featureHireManager,
    title: "Hire Marketing Manager",
    description: "Dedicated marketing manager at our office works like a team member for execution.",
  },
  {
    number: "004",
    image: featureReporting,
    title: "Monthly Reporting & Analysis",
    description: "Visualize your performance with interactive charts. Get insights on what drives retention.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 sm:py-28 px-4 bg-gradient-to-b from-purple-light via-purple-medium/40 to-purple-dark/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Core Features
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
            Marketing Platform Made for Growth Driven Execution
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl border border-border/40 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 overflow-hidden"
            >
              {/* Header with number and title */}
              <div className="p-6 sm:p-8 pb-4">
                <span className="text-sm font-mono text-muted-foreground mb-3 block">
                  {feature.number}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  {feature.description}
                </p>
              </div>

              {/* Product Screenshot */}
              <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                <div className="rounded-xl overflow-hidden border border-border/20 shadow-sm group-hover:shadow-md transition-shadow">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
