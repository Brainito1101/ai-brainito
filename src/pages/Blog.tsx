import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  const posts = [
    {
      slug: "ai-powered-marketing-trends-2025",
      title: "The Future of AI-Powered Marketing: Trends for 2025",
      excerpt: "Discover how artificial intelligence is revolutionizing marketing strategies and what it means for your business growth.",
      author: "Brainito Team",
      date: "January 5, 2025",
      readTime: "8 min read",
      category: "AI & Marketing"
    },
    {
      slug: "growth-marketing-strategies",
      title: "10 Growth Marketing Strategies That Actually Work",
      excerpt: "Learn the proven tactics that successful startups use to scale their marketing efforts efficiently.",
      author: "Marketing Team",
      date: "January 3, 2025",
      readTime: "6 min read",
      category: "Growth"
    },
    {
      slug: "marketing-plan-30-days",
      title: "How to Create a Marketing Plan in 30 Days",
      excerpt: "A step-by-step guide to building a comprehensive marketing strategy for your business.",
      author: "Strategy Team",
      date: "December 28, 2024",
      readTime: "10 min read",
      category: "Strategy"
    },
    {
      slug: "content-marketing-2025",
      title: "Content Marketing Best Practices for 2025",
      excerpt: "Stay ahead of the curve with these content marketing tips and techniques.",
      author: "Content Team",
      date: "December 22, 2024",
      readTime: "7 min read",
      category: "Content"
    },
    {
      slug: "social-media-marketing-guide",
      title: "Social Media Marketing: A Complete Guide",
      excerpt: "Master social media marketing with our comprehensive guide covering all major platforms.",
      author: "Social Team",
      date: "December 18, 2024",
      readTime: "12 min read",
      category: "Social Media"
    },
    {
      slug: "seo-fundamentals",
      title: "SEO Fundamentals Every Marketer Should Know",
      excerpt: "Boost your organic traffic with these essential SEO strategies and best practices.",
      author: "SEO Team",
      date: "December 15, 2024",
      readTime: "9 min read",
      category: "SEO"
    },
    {
      slug: "email-marketing-automation",
      title: "Email Marketing Automation: Getting Started",
      excerpt: "Learn how to set up effective email automation workflows that convert.",
      author: "Email Team",
      date: "December 10, 2024",
      readTime: "5 min read",
      category: "Email"
    },
    {
      slug: "brand-awareness-budget",
      title: "Building Brand Awareness on a Budget",
      excerpt: "Effective strategies to increase your brand visibility without breaking the bank.",
      author: "Brand Team",
      date: "December 5, 2024",
      readTime: "6 min read",
      category: "Branding"
    },
    {
      slug: "consumer-behavior-psychology",
      title: "The Psychology of Consumer Behavior",
      excerpt: "Understanding what drives your customers to make purchasing decisions.",
      author: "Research Team",
      date: "December 1, 2024",
      readTime: "8 min read",
      category: "Psychology"
    }
  ];

  // Light shade gradients that match the logo colors
  const cardGradients = [
    "from-purple-100/80 to-orange-50/60",
    "from-orange-50/60 to-purple-100/80",
    "from-purple-50/80 to-pink-50/60",
    "from-amber-50/60 to-purple-100/80",
    "from-purple-100/60 to-rose-50/60",
    "from-orange-100/60 to-purple-50/80",
    "from-purple-50/60 to-amber-50/60",
    "from-rose-50/60 to-purple-100/60",
    "from-purple-100/80 to-orange-100/60",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-white via-purple-light/50 to-purple-medium">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
              Brainito Blog
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Insights, strategies, and tips to help you grow your business with smarter marketing.
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <Link 
                  key={index} 
                  to={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-border/20 hover:shadow-lg transition-all"
                >
                  <div className={`h-48 bg-gradient-to-br ${cardGradients[index % cardGradients.length]}`} />
                  <div className="p-6">
                    <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full mb-3">
                      {post.category}
                    </span>
                    <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-purple-light/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Get the latest marketing insights and tips delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 h-12 px-4 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button variant="gradient" size="lg">Subscribe</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
