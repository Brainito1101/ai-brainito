import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    api.getCaseStudies()
      .then(setCaseStudies)
      .catch((err) => {
        console.error("Error fetching case studies:", err);
        setError("Failed to load case studies. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-white via-purple-light/50 to-purple-medium">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
              Brainito's Case Studies
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Real results from real businesses. See how Brainito has helped companies like yours achieve remarkable growth.
            </p>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">All Case Studies</h2>

            {loading && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">Loading case studies...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <p className="text-lg text-red-600">{error}</p>
              </div>
            )}

            {!loading && !error && caseStudies.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No case studies available at the moment.</p>
              </div>
            )}

            {!loading && !error && caseStudies.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {caseStudies.map((study) => (
                  <Link
                    key={study.id}
                    to={`/case-studies/${study.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-border/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Case Study Image/Banner */}
                    <div className="h-48 bg-gradient-to-br from-purple-100/80 to-orange-50/60 flex items-center justify-center overflow-hidden">
                      {study.thumbnail_url ? (
                        <img
                          src={study.thumbnail_url}
                          alt={study.project_name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-2xl font-bold text-primary/60 group-hover:text-primary transition-colors">
                          {study.project_name}
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      {/* Project Name */}
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {study.project_name}
                      </h3>

                      {/* Impact - 1 line */}
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {study.impact}
                      </p>

                      {/* Key Results - 3 */}
                      <div className="flex flex-wrap gap-2">
                        {study.key_results.map((result: string, idx: number) => (
                          <span
                            key={idx}
                            className="inline-block bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full"
                          >
                            {result}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-purple-medium via-purple-dark to-primary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Be Our Next Success Story?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Join hundreds of businesses that have transformed their marketing with Brainito.
            </p>
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

export default CaseStudies;