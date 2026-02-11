import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How Brainito help businesses?",
    answer: "Brainito help businesses build clear, data-driven marketing strategies and execute them with dedicated marketing managers.",
  },
  {
    question: "Who is this for?",
    answer: "Ideal for founders, CEOs, and business owners who want structured, measurable digital growth.",
  },
  {
    question: "Can I start with strategy only?",
    answer: "Yes. You can begin with a DIY Marketing Plan and upgrade to execution anytime.",
  },
  {
    question: "Do you provide ongoing execution support?",
    answer: "Yes. You can hire a full-time marketing manager to execute and manage growth.",
  },
  {
    question: "How quickly can I get started?",
    answer: "Strategy can start immediately, and dedicated manager onboarding takes 2–4 weeks.",
  },
];

const FAQSection = () => {
  return (
    <section id="faqs" className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Frequently Asked{" "}
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about Brainito
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl border border-border px-6 data-[state=open]:border-primary/50 data-[state=open]:shadow-soft transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* View All FAQs Button */}
          <div className="mt-8 text-center">
            <a
              href="https://help.brainito.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              View all FAQs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
