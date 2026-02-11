import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User, Share2, Linkedin, Twitter, Facebook, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const BlogPost = () => {
  const { slug } = useParams();

  // Placeholder data - would be fetched based on slug in real implementation
  const post = {
    title: "The Future of AI-Powered Marketing: Trends for 2025",
    excerpt: "Discover how artificial intelligence is revolutionizing marketing strategies and what it means for your business growth.",
    author: "Brainito Team",
    authorRole: "Marketing Experts",
    date: "January 5, 2025",
    readTime: "8 min read",
    category: "AI & Marketing",
  };

  const relatedPosts = [
    {
      slug: "growth-marketing-strategies",
      title: "10 Growth Marketing Strategies That Actually Work",
      excerpt: "Learn the proven tactics that successful startups use to scale their marketing efforts efficiently.",
      category: "Growth",
      readTime: "6 min read",
    },
    {
      slug: "marketing-plan-30-days",
      title: "How to Create a Marketing Plan in 30 Days",
      excerpt: "A step-by-step guide to building a comprehensive marketing strategy for your business.",
      category: "Strategy",
      readTime: "10 min read",
    },
    {
      slug: "content-marketing-2025",
      title: "Content Marketing Best Practices for 2025",
      excerpt: "Stay ahead of the curve with these content marketing tips and techniques.",
      category: "Content",
      readTime: "7 min read",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-white via-purple-light/50 to-purple-medium">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <Link to="/blog" className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            <div className="max-w-4xl">
              {/* Category Badge */}
              <span className="inline-block bg-accent/20 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                {post.category}
              </span>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-foreground/70">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{post.author}</p>
                    <p className="text-sm">{post.authorRole}</p>
                  </div>
                </div>
                <span className="hidden sm:block w-1 h-1 rounded-full bg-foreground/30" />
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" /> {post.date}
                </span>
                <span className="hidden sm:block w-1 h-1 rounded-full bg-foreground/30" />
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="pt-8 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-purple-100/80 to-orange-50/60 shadow-lg overflow-hidden">
                {/* Placeholder for featured image */}
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary/40">Featured Image</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Share Sidebar */}
                <aside className="lg:col-span-1 order-2 lg:order-1">
                  <div className="lg:sticky lg:top-32 flex lg:flex-col gap-3 justify-center">
                    <p className="hidden lg:block text-sm text-muted-foreground mb-2">Share</p>
                    <button className="w-10 h-10 rounded-full bg-purple-light/50 hover:bg-primary/20 flex items-center justify-center transition-colors">
                      <Twitter className="w-4 h-4 text-foreground" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-purple-light/50 hover:bg-primary/20 flex items-center justify-center transition-colors">
                      <Linkedin className="w-4 h-4 text-foreground" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-purple-light/50 hover:bg-primary/20 flex items-center justify-center transition-colors">
                      <Facebook className="w-4 h-4 text-foreground" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-purple-light/50 hover:bg-primary/20 flex items-center justify-center transition-colors">
                      <Share2 className="w-4 h-4 text-foreground" />
                    </button>
                  </div>
                </aside>

                {/* Main Content */}
                <article className="lg:col-span-11 order-1 lg:order-2 prose prose-lg max-w-none">
                  <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                    {post.excerpt}
                  </p>

                  <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Introduction</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>

                  <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Key Insights</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                  </p>

                  {/* Blockquote */}
                  <blockquote className="border-l-4 border-accent pl-6 py-2 my-8 bg-purple-light/20 rounded-r-xl">
                    <p className="text-lg text-foreground italic">
                      "The future of marketing lies in the seamless integration of AI technology with human creativity and strategic thinking."
                    </p>
                  </blockquote>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                  </p>

                  <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Practical Applications</h2>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-3 mb-6">
                    <li>Automated content generation and optimization</li>
                    <li>Predictive analytics for customer behavior</li>
                    <li>Personalized marketing at scale</li>
                    <li>Real-time campaign optimization</li>
                    <li>Enhanced customer segmentation</li>
                  </ul>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                  </p>

                  <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Conclusion</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* Author Bio */}
        <section className="py-12 bg-purple-light/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-white">BT</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{post.author}</h3>
                  <p className="text-accent font-medium mb-3">{post.authorRole}</p>
                  <p className="text-muted-foreground">
                    The Brainito team brings together marketing experts, data scientists, and AI specialists to deliver insights that help businesses grow. With over 10 years of combined experience, we are passionate about democratizing world-class marketing strategies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <Link 
                    key={index} 
                    to={`/blog/${relatedPost.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-border/20 hover:shadow-lg transition-all"
                  >
                    <div className="h-40 bg-gradient-to-br from-purple-100/80 to-orange-50/60" />
                    <div className="p-6">
                      <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full mb-3">
                        {relatedPost.category}
                      </span>
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                        {relatedPost.excerpt}
                      </p>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {relatedPost.readTime}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-purple-medium via-purple-dark to-primary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Marketing?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Get your personalized AI-powered marketing strategy today and start growing your business.
            </p>
            <Link to="/diy-marketing-plan">
              <Button variant="gradient" size="lg">
                Get Your Marketing Plan <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
