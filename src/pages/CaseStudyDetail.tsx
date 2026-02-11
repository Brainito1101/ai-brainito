import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, TrendingUp, Target, Users, DollarSign, Quote } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [caseStudy, setCaseStudy] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [relatedStudies, setRelatedStudies] = useState<any[]>([]);
  const { user } = useAuth();


  useEffect(() => {
    if (slug) {
      // Fetch current case study
      api.getCaseStudy(slug)
        .then(setCaseStudy)
        .catch((err) => {
          console.error("Error fetching case study:", err);
          setError("Failed to load case study. Please try again later.");
        })
        .finally(() => setLoading(false));

      // Fetch all case studies for "More Success Stories" section
      api.getCaseStudies()
        .then((allStudies) => {
          // Filter out the current case study and limit to 3
          const filtered = allStudies
            .filter((study: any) => study.slug !== slug)
            .slice(0, 3);
          setRelatedStudies(filtered);
        })
        .catch((err) => {
          console.error("Error fetching related case studies:", err);
          // Don't show error for related studies, just keep empty array
        });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-32">
          <div className="container mx-auto px-4 text-center">
            <p className="text-lg text-muted-foreground">Loading case study...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !caseStudy) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-32">
          <div className="container mx-auto px-4 text-center">
            <p className="text-lg text-red-600">{error || "Case study not found"}</p>
            <Link to="/case-studies" className="inline-block mt-4">
              <Button>Back to Case Studies</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Convert metrics from API to component format
  const metrics = caseStudy.metrics ? caseStudy.metrics.map((metric: any, index: number) => ({
    icon: index === 0 ? TrendingUp : index === 1 ? Target : DollarSign,
    label: metric.label,
    value: metric.value,
    description: metric.description,
  })) : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-white via-purple-light/50 to-purple-medium">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <Link to="/case-studies" className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Case Studies
            </Link>

            <div className="max-w-4xl">
              {/* Industry Badge */}
              <span className="inline-block bg-accent/20 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                {caseStudy.industry}
              </span>

              {/* Project Name */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
                {caseStudy.project_name}
              </h1>

              {/* Impact Statement */}
              <p className="text-xl text-foreground/70 mb-8 max-w-2xl">
                {caseStudy.impact}
              </p>

              {/* Key Results */}
              <div className="flex flex-wrap gap-3">
                {caseStudy.key_results.map((result: string, idx: number) => (
                  <span
                    key={idx}
                    className="inline-block bg-white/90 text-primary text-sm font-bold px-4 py-2 rounded-full shadow-sm"
                  >
                    {result}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="pt-8 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-purple-100/80 to-orange-50/60 shadow-lg overflow-hidden">
                {caseStudy.featured_image_url ? (
                  <img
                    src={caseStudy.featured_image_url}
                    alt={caseStudy.project_name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary/40">Case Study Image</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Project Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">
                  {/* About the Business */}
                  {caseStudy.business_overview && (
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                          <Users className="w-5 h-5 text-purple-600" />
                        </span>
                        About the Business
                      </h2>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {caseStudy.business_overview}
                      </p>
                    </div>
                  )}

                  {/* The Challenge */}
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                        <Target className="w-5 h-5 text-red-600" />
                      </span>
                      {caseStudy.challenge_title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {caseStudy.challenge_content}
                    </p>
                  </div>

                  {/* Our Approach */}
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                      </span>
                      {caseStudy.approach_title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4 whitespace-pre-line">
                      {caseStudy.approach_content}
                    </p>
                    {caseStudy.approach_points && caseStudy.approach_points.length > 0 && (
                      <ul className="space-y-3 mb-4">
                        {caseStudy.approach_points.map((point: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="w-2 h-2 rounded-full bg-primary" />
                            </span>
                            <span className="text-muted-foreground">{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* The Solution */}
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                        <Users className="w-5 h-5 text-green-600" />
                      </span>
                      {caseStudy.solution_title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {caseStudy.solution_content}
                    </p>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-32 space-y-6">
                    {/* Project Details Card */}
                    <div className="bg-purple-light/30 rounded-2xl p-6">
                      <h3 className="font-bold text-foreground mb-4">Project Details</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Duration</p>
                          <p className="font-semibold text-foreground">{caseStudy.duration}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Industry</p>
                          <p className="font-semibold text-foreground">{caseStudy.industry}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Services</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {caseStudy.services && caseStudy.services.map((service: string, idx: number) => (
                              <span key={idx} className="text-xs bg-white px-2 py-1 rounded-full text-foreground">
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CTA Card */}
                    <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-white">
                      <h3 className="font-bold mb-2">Want Similar Results?</h3>
                      <p className="text-white/80 text-sm mb-4">
                        Let us create a custom marketing strategy for your business.
                      </p>
                      <Button
                        variant="gradient"
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          if (user) {
                            // User is logged in, redirect to dashboard
                            const dashboardUrl = import.meta.env.VITE_DASHBOARD_URL || "https://app.brainito.com";
                            window.location.href = `${dashboardUrl}/dashboard`;
                          } else {
                            // User is logged out, open AuthModal
                            setIsAuthModalOpen(true);
                          }
                        }}
                      >
                        Get Started
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-16 bg-purple-light/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-12">
                The Results
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {metrics.map((metric, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 text-center shadow-sm border border-border/20"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <metric.icon className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-3xl font-bold text-accent mb-1">{metric.value}</p>
                    <p className="font-semibold text-foreground text-sm mb-1">{metric.label}</p>
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        {caseStudy.testimonial && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-purple-light/50 to-purple-medium/30 rounded-3xl p-8 sm:p-12 relative">
                  <Quote className="w-12 h-12 text-accent/30 absolute top-8 left-8" />
                  <div className="relative z-10 text-center">
                    <p className="text-xl sm:text-2xl text-foreground leading-relaxed mb-8 italic">
                      "{caseStudy.testimonial.quote}"
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <span className="text-lg font-bold text-white">{caseStudy.testimonial.initials}</span>
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-foreground">{caseStudy.testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{caseStudy.testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Related Case Studies */}
        {relatedStudies.length > 0 && (
          <section className="py-16 bg-white border-t border-border/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">More Success Stories</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedStudies.map((study, index) => (
                    <Link
                      key={study.id || index}
                      to={`/case-studies/${study.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-border/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                      {/* Case Study Image/Banner */}
                      <div className="h-40 bg-gradient-to-br from-purple-100/80 to-orange-50/60 flex items-center justify-center overflow-hidden">
                        {study.thumbnail_url ? (
                          <img
                            src={study.thumbnail_url}
                            alt={study.project_name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        ) : (
                          <span className="text-lg font-bold text-primary/40 group-hover:text-primary/60 transition-colors">
                            {study.project_name}
                          </span>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {study.project_name}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {study.impact}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {study.key_results && study.key_results.map((result: string, idx: number) => (
                            <span
                              key={idx}
                              className="inline-block bg-accent/10 text-accent text-xs font-semibold px-2 py-1 rounded-full"
                            >
                              {result}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-purple-medium via-purple-dark to-primary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Be Our Next Success Story?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Join hundreds of businesses that have transformed their marketing with Brainito.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="gradient"
                size="lg"
                onClick={() => {
                  if (user) {
                    // User is logged in, redirect to dashboard
                    const dashboardUrl = import.meta.env.VITE_DASHBOARD_URL || "https://app.brainito.com";
                    window.location.href = `${dashboardUrl}/dashboard`;
                  } else {
                    // User is logged out, open AuthModal
                    setIsAuthModalOpen(true);
                  }
                }}
              >
                Get Your Marketing Plan <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Link to="/hire-marketer">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  Hire a Marketer
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* AuthModal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={() => {
          setIsAuthModalOpen(false);
          // Redirect to dashboard after successful auth
          const dashboardUrl = import.meta.env.VITE_DASHBOARD_URL || "https://app.brainito.com";
          window.location.href = `${dashboardUrl}/dashboard`;
        }}
      />
    </div>
  );
};

export default CaseStudyDetail;
