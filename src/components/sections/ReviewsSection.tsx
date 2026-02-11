import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Béatrice Dunski",
    role: "Founder, Paintawaytours",
    rating: 5,
    review: "The product showed strong strategic clarity and professionalism. It helped us align our digital marketing approach with our budget and business goals. Highly recommended.",
    initials: "BD",
    color: "from-primary to-purple-medium",
  },
  {
    name: "Marc Bazy",
    role: "Founder, Upscale Digital",
    rating: 5,
    review: "A reliable and well-structured product experience. Communication, execution, and delivery were consistently smooth. We would recommend it without hesitation.",
    initials: "MB",
    color: "from-accent to-orange-400",
  },
  {
    name: "Ytagesu Habte",
    role: "Founder, Ciride.co",
    rating: 5,
    review: "Delivered a clear and actionable marketing strategy aligned with our growth objectives. We plan to continue using this product going forward.",
    initials: "YH",
    color: "from-purple-medium to-primary",
  },
  {
    name: "Gerard Gildharry",
    role: "Founder, Skinny Food Co",
    rating: 5,
    review: "Provided insightful, data-backed outputs that were both practical and useful for informed decision-making.",
    initials: "GG",
    color: "from-orange-400 to-accent",
  },
];

const ReviewsSection = () => {
  return (
    <section className="py-20 sm:py-28 px-4 bg-white border-t border-border/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            What People Say
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="group relative p-6 bg-white rounded-2xl border border-border/30 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-10 h-10 text-primary" />
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < review.rating
                      ? "text-accent fill-accent"
                      : "text-border"
                      }`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-foreground/80 leading-relaxed mb-6 text-sm sm:text-base relative z-10">
                "{review.review}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${review.color} flex items-center justify-center text-white font-semibold text-sm shadow-md`}>
                  {review.initials}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ReviewsSection;
