export interface CaseStudy {
    id: string;
    slug: string;
    projectName: string;
    industry: string;
    impact: string;
    keyResults: Array<{
        value: string;
        label?: string;
    }>;
    duration: string;
    services: string[];
    aboutBusiness: string;
    challenge: string;
    approachIntro: string;
    approachKeyFocus: string[];
    solution: string;
    testimonial: {
        quote: string;
        attribution: string;
    };
    metrics: Array<{
        value: string;
        label: string;
        description: string;
    }>;
    longTermImpact?: {
        description: string;
        achievements: string[];
    };
}

export const caseStudiesData: CaseStudy[] = [
    {
        id: "1",
        slug: "d2c-brand",
        projectName: "D2C Brand",
        industry: "E-commerce / D2C",
        impact: "Scaled from Local Seller to Nationwide D2C Brand in 90 Days",
        keyResults: [
            { value: "+340% Revenue Growth" },
            { value: "4.2× ROAS" },
            { value: "−45% CAC", label: "Customer Acquisition Cost" }
        ],
        duration: "90 Days",
        services: ["Full Marketing Strategy", "Paid Advertising", "Content Marketing", "SEO"],
        aboutBusiness: "Confidential D2C Brand is a Europe-based direct-to-consumer hobby and lifestyle brand, offering products designed for creativity, personal interests, and everyday enjoyment. The brand had strong product-market fit but limited digital scale beyond its local market.",
        challenge: "Confidential D2C Brand had quality products and early traction but struggled to grow beyond a limited regional audience. Marketing efforts were fragmented, ad spend lacked efficiency, and there was no clear, scalable growth strategy to support nationwide expansion.",
        approachIntro: "We started with a deep audit of existing marketing performance and built a focused, execution-first growth strategy.",
        approachKeyFocus: [
            "Audience segmentation and demand mapping",
            "Structured Meta and Google Ads campaigns",
            "Funnel-aligned content strategy",
            "Landing page and conversion rate optimization",
            "Daily monitoring with weekly performance reviews"
        ],
        solution: "Brainito implemented a scalable marketing system with clear ownership. A dedicated marketing manager handled day-to-day execution, optimization, and reporting. Campaigns were continuously refined using real-time data, enabling efficient scale across European markets.",
        testimonial: {
            quote: "Working with Brainito completely transformed our business. Their data-driven approach and dedicated execution helped us achieve results we didn't think were possible. We scaled from a local seller to a nationwide brand in just 90 days.",
            attribution: "— Founder, Confidential D2C Brand"
        },
        metrics: [
            {
                value: "+340% Revenue Growth",
                label: "+340% Revenue Growth",
                description: "Achieved strong nationwide scale within 90 days"
            },
            {
                value: "4.2× ROAS",
                label: "4.2× ROAS",
                description: "Highly efficient paid acquisition"
            },
            {
                value: "−45% CAC",
                label: "−45% CAC",
                description: "Significant reduction in customer acquisition costs"
            }
        ]
    },
    {
        id: "2",
        slug: "dating-coach",
        projectName: "Mr. Silk - Building Authority in Online Coaching",
        industry: "Education / Online Coaching",
        impact: "From Invisible to Influential: Building Authority in Online Coaching",
        keyResults: [
            { value: "37K+ YouTube Subscribers" },
            { value: "2.5K+ Organic Instagram Followers" },
            { value: "Millions of Video Views" },
            { value: "Improved Sales & Engagement" }
        ],
        duration: "7 Months",
        services: ["Content Strategy", "YouTube Channel Optimization", "Instagram Growth Strategy", "Website Optimization & SEO", "Ongoing Execution & Performance Tracking"],
        aboutBusiness: "Confidential Dating Coach is a Europe-based dating coach for men and the founder of a private coaching methodology. He helps men improve confidence, communication, and dating outcomes through educational content and online coaching programs.",
        challenge: "Confidential Dating Coach was consistently creating high-quality content, but it lacked visibility and impact. Despite strong expertise, his content struggled to reach the right audience across YouTube, Instagram, and his website. There was no clear strategy to turn content into authority, engagement, or business growth.",
        approachIntro: "Brainito focused on transforming content into a structured growth engine rather than isolated efforts.",
        approachKeyFocus: [
            "Platform-specific content strategy aligned with audience intent",
            "SEO-optimized YouTube titles, descriptions, and content planning",
            "Instagram optimization for reach, consistency, and engagement",
            "Website UX improvements with clear calls-to-action and SEO structure",
            "Consistent execution with performance-based iteration"
        ],
        solution: "Brainito implemented a targeted digital strategy designed to increase visibility, authority, and engagement. Content distribution was optimized, platforms were aligned under one growth narrative, and execution was handled consistently over time. This shifted the coach’s presence from scattered content to a strong, recognizable brand.",
        testimonial: {
            quote: "Nidhi has truly changed my online coaching business for the better. Her digital marketing skills are top-notch, and her strategies delivered real results. Thanks to this work, my sales increased, brand awareness grew, and customer engagement improved significantly. The approach was thoughtful and tailored to my business needs, turning my coaching product into a well-recognized brand.",
            attribution: "— Founder, Confidential Dating Coach Brand"
        },
        metrics: [
            { value: "37K+ YouTube Subscribers", label: "37K+ YouTube Subscribers", description: "Built a large, engaged audience through consistent, optimized content" },
            { value: "2.5K+ Organic Instagram Followers", label: "2.5K+ Organic Instagram Followers", description: "Increased reach and meaningful community interaction" },
            { value: "Millions of Video Views", label: "Millions of Video Views", description: "Significant boost in content visibility and relevance" }
        ]
    },
    {
        id: "3",
        slug: "network-maping-software-company",
        projectName: "Dellyman - Network Mapping Software Company",
        industry: "IT Infrastructure / SaaS",
        impact: "From High Costs to High Conversions: Fixing Lead Generation at Scale",
        keyResults: [
            { value: "900+ Qualified Leads" },
            { value: "Significant Improvement in Conversion Rates" },
            { value: "Higher ROI with Optimized Ad Spend" },
            { value: "Reduced Cost per Lead" }
        ],
        duration: "2 Years",
        services: ["Paid Advertising Strategy", "Google Ads", "Facebook Ads", "Landing Page Optimization", "Conversion Tracking & Optimization"],
        aboutBusiness: "The client is a Network Mapping Software company offering advanced network mapping and IT infrastructure visibility software. The product is designed for businesses that need clear, real-time insights into complex network environments.",
        challenge: "The Network Mapping Software company relied heavily on HubSpot campaigns and ads to drive leads. Despite substantial marketing spend, results were underwhelming. Lead volume was low, lead quality was inconsistent, and conversion rates did not justify the cost. The team needed a more efficient, intent-driven acquisition strategy.",
        approachIntro: "Brainito shifted the strategy from broad, high-cost campaigns to focused, intent-based acquisition.",
        approachKeyFocus: [
            "Deep keyword research to capture high-intent search traffic",
            "Structured Google Ads campaigns targeting active buyers",
            "Facebook Ads to support awareness and demand generation",
            "Conversion-optimized landing pages aligned with ad intent",
            "Continuous monitoring, testing, and optimization"
        ],
        solution: "Brainito replaced inefficient HubSpot-led acquisition with a performance-driven advertising system. Campaigns were optimized around buyer intent, landing pages were redesigned for clarity and conversion, and performance was reviewed continuously to improve efficiency over time.",
        testimonial: {
            quote: "Working with Brainito helped us completely rethink our lead generation approach. Their strategy reduced wasted spend, improved lead quality, and delivered consistent results over time. The difference in conversion efficiency was clear.",
            attribution: "— Marketing Lead, Network Mapping Software Company"
        },
        metrics: [
            { value: "900+ Qualified Leads", label: "900+ Qualified Leads", description: "Built a strong and consistent sales pipeline" },
            { value: "Improved Conversion Rates", label: "Improved Conversion Rates", description: "Higher lead quality and better alignment with sales needs" },
            { value: "Better ROI", label: "Better ROI", description: "Marketing spend was utilized more efficiently with measurable returns" },
            { value: "Lower Cost per Lead", label: "Lower Cost per Lead", description: "Significant reduction compared to previous campaigns" },
        ]
    },
    {
        id: "4",
        slug: "shiv-jyoti-eye-hospital",
        projectName: "Shiv Jyoti Eye Hospital - Dominating Local Search",
        industry: "Healthcare / Eye Care",
        impact: "Revitalizing Healthcare Marketing: Driving OPD Growth and Surgical Demand",
        keyResults: [
            { value: "20+ Daily OPD Patients" },
            { value: "4–5 Daily Contoura LASIK Surgeries" },
            { value: "Improved Lead-to-Patient Conversion" },
            { value: "Significant Revenue Growth" }
        ],
        duration: "18 Months",
        services: ["SEO & Website Optimization", "Google Ads (High-Intent Keywords)", "Facebook Ads Optimization", "Lead Follow-Up System", "Social Media Strategy"],
        aboutBusiness: "Eye Care Hospital is a leading eye care provider in Ahmedabad, offering advanced treatments including Contoura LASIK surgery. With the launch of a new branch, the hospital aimed to expand patient reach and increase utilization of its OPD and surgical services.",
        challenge: "Despite investing heavily in Facebook advertising, Eye Care Hospital struggled with low patient conversion rates. While leads were generated, OPD footfall remained inconsistent, follow-ups were fragmented, and the new branch was operating below capacity. The hospital needed a structured, healthcare-specific digital strategy focused on real patient acquisition, not just leads.",
        approachIntro: "Brainito focused on improving visibility, intent targeting, and conversion discipline.",
        approachKeyFocus: [
            "SEO optimization to capture organic demand for eye care and LASIK treatments",
            "Google Ads targeting high-intent searches related to Contoura LASIK and eye procedures",
            "Facebook Ads refinement with clearer messaging and stronger calls-to-action",
            "Structured lead follow-up system to reduce drop-offs",
            "Social media optimization to build trust, awareness, and patient confidence"
        ],
        solution: "Brainito implemented a comprehensive digital strategy designed specifically for healthcare decision cycles. By aligning search intent, ad messaging, and follow-up processes, the hospital moved from lead generation to consistent patient conversion, improving OPD utilization and surgical bookings.",
        testimonial: {
            quote: "I can’t thank Nidhi enough for the exceptional marketing strategies that significantly increased foot traffic to our hospital. From the beginning, there was a deep understanding of our challenges and patient journey. The tailored digital campaigns improved visibility, engagement, and conversions, positively impacting both our services and patient experience.",
            attribution: "— Medical Director, Eye Care Hospital"
        },
        metrics: [
            { value: "20+ Daily OPD Patients", label: "20+ Daily OPD Patients", description: "Consistent outpatient footfall across the new branch" },
            { value: "4–5 Daily Contoura LASIK Surgeries", label: "4–5 Daily Contoura LASIK Surgeries", description: "Strong increase in high-value surgical procedures" },
            { value: "Improved Revenue", label: "Improved Revenue", description: "Higher patient volume and better service utilization" }
        ]
    },
    {
        id: "5",
        slug: "yoga-teacher",
        projectName: "Yoga Teacher",
        industry: "Wellness / Yoga Education",
        impact: "Building a Global Yoga Brand from Early-Stage Awareness",
        keyResults: [
            { value: "Instagram growth from 147 to 2K+" },
            { value: "3–5 daily Udemy course conversions" },
            { value: "YouTube growth from 0 to 600 subscribers organically" },
            { value: "Strong foundation for a brand with 140K+ students globally" }
        ],
        duration: "December 2018 – October 2019 (11 Months)",
        services: ["Social Media Management", "Audience Growth Strategy", "YouTube Channel Growth", "Udemy Course Promotion", "Brand Foundation & Positioning"],
        aboutBusiness: "Yoga Teacher is a global yoga education brand founded by a leading international yoga instructor. At the start of the engagement, the teacher had high-quality yoga courses on Udemy but very limited brand visibility, with only a basic presence on Instagram and YouTube.",
        challenge: "In 2018, Yoga Teacher lacked awareness despite strong content and teaching expertise. Social channels were underdeveloped, audience growth was slow, and there was no structured approach to convert attention into consistent course enrollments.",
        approachIntro: "Brainito focused on building visibility first, then converting engagement into measurable outcomes.",
        approachKeyFocus: [
            "Consistent social media publishing and audience engagement",
            "Clear content positioning around yoga education and practice",
            "Organic YouTube growth through structured content planning",
            "Strategic promotion of Udemy courses to drive steady conversions",
            "Establishing a strong digital foundation for long-term growth"
        ],
        solution: "We implemented a disciplined, content-led growth strategy designed to increase awareness, trust, and consistency. Social media and YouTube were used to educate and inspire, while Udemy promotions were integrated naturally to convert engaged users into paying students.",
        testimonial: {
            quote: "Great work with strong communication and professional execution. The services were very effective, and results were visible early. I was extremely happy with the outcomes and would highly recommend the work.\n\nThe delivery was consistent, communication was clear, and the quality exceeded expectations. An absolute five-star experience.",
            attribution: "— Founder, Yoga Teacher"
        },
        metrics: [
            { value: "Instagram Growth", label: "Instagram Growth", description: "Increased followers from 147 to 2,000+ during the collaboration period" },
            { value: "Udemy Course Sales", label: "Udemy Course Sales", description: "Achieved 3–5 daily course conversions consistently" },
            { value: "YouTube Growth", label: "YouTube Growth", description: "Grew from 0 to 600 subscribers organically" },
            { value: "Brand Foundation", label: "Brand Foundation", description: "Created a scalable base that enabled long-term brand expansion" }
        ],
        longTermImpact: {
            description: "Following the collaboration, Yoga Teacher continued to grow into a globally recognized yoga brand with:",
            achievements: [
                "140K+ happy students worldwide",
                "51K+ Instagram followers",
                "83K+ YouTube subscribers",
                "The early focus on consistency, positioning, and audience trust played a key role in enabling this sustained growth."
            ]
        }
    },
    {
        id: "6",
        slug: "wellness-studio",
        projectName: "Wellness Studio",
        industry: "Wellness / Studio Services",
        impact: "Launching a New Brand and Driving Appointments Through Digital Marketing",
        keyResults: [
            { value: "2–5 Online Appointments Daily" },
            { value: "Increased Footfall to Physical Studio" },
            { value: "Established Digital Presence from Zero" },
            { value: "Expanded Reach Beyond Physical Location" }
        ],
        duration: "18 Months",
        services: ["Social Media Setup & Management", "Website SEO", "Google Ads", "Meta (Facebook & Instagram) Ads", "Online Appointment Generation"],
        aboutBusiness: "Wellness Studio is a wellness and studio-based business offering both in-person and virtual services. At launch, the brand had no digital presence and no structured way to attract customers beyond its physical location.",
        challenge: "Wellness Studio was a new brand with zero online presence. There were no social media channels, limited search visibility, and no digital system to generate bookings. The goal was to build awareness quickly and convert visibility into real appointments and foot traffic.",
        approachIntro: "Brainito focused on building visibility first, then driving measurable actions.",
        approachKeyFocus: [
            "Launching and managing social media channels to build awareness",
            "SEO optimization to improve local and service-based discoverability",
            "Google Ads targeting high-intent searches for studio services",
            "Meta Ads to expand reach and drive appointment bookings",
            "Aligning campaigns with both virtual and in-studio offerings"
        ],
        solution: "We implemented a complete digital launch and growth strategy that enabled Wellness Studio to move beyond its physical location. Organic and paid channels worked together to consistently generate online bookings and increase in-studio footfall.",
        testimonial: {
            quote: "Brainito was a huge help when we launched virtual services in 2020. They helped us go beyond our physical location and reach new audiences. We’ve worked with them multiple times since, and the experience has been consistently positive.",
            attribution: "— Wellness Studio Founder"
        },
        metrics: [
            { value: "2–5 Online Appointments Daily", label: "2–5 Online Appointments Daily", description: "Steady appointment flow driven by digital channels" },
            { value: "Increased Footfall", label: "Increased Footfall", description: "More in-person visits linked to digital campaigns" },
            { value: "Expanded Reach", label: "Expanded Reach", description: "Successfully reached audiences beyond the local area" },
            { value: "Strong Digital Foundation", label: "Strong Digital Foundation", description: "Built scalable systems for long-term growth" }
        ]
    },
    {
        id: "7",
        slug: "local-delivery-marketplace",
        projectName: "Local Delivery Marketplace",
        industry: "Logistics / Marketplace",
        impact: "Smart Marketing for Smart Delivery: Building Demand During a Crisis",
        keyResults: [
            { value: "100+ Daily Leads" },
            { value: "Strong User Awareness During Launch Phase" },
            { value: "Improved Engagement Across Channels" },
            { value: "Cost-Effective Growth on a Limited Budget" }
        ],
        duration: "1 Year",
        services: ["Digital Marketing Strategy", "Lead Generation", "Social Media Marketing", "Email Marketing Automation", "Execution Support & Guidance"],
        aboutBusiness: "The client is a Nigeria-based, tech-enabled local delivery marketplace designed to improve last-mile delivery efficiency for merchants and individuals. The platform was launched around March 2020, during the early phase of the pandemic, to solve growing frustrations with unreliable local delivery services.",
        challenge: "The Local Delivery Marketplace launched at a critical time with limited resources and no clear marketing roadmap. While the product solved a real problem, the team lacked clarity on where to start marketing, how to reach the right users, and how to generate demand efficiently without overspending.",
        approachIntro: "Brainito focused on clarity, prioritization, and efficient execution rather than experimentation.",
        approachKeyFocus: [
            "Defining target users and demand pockets",
            "Cost-effective lead generation campaigns",
            "Social media strategy for awareness and trust-building",
            "Automated email campaigns to nurture leads",
            "Hands-on execution support across channels"
        ],
        solution: "Brainito implemented a tailored marketing strategy designed for a startup operating under tight constraints. The focus was on maximizing impact from limited resources, building early awareness, and creating consistent lead flow through simple, scalable systems.",
        testimonial: {
            quote: "At the beginning of the pandemic, we launched the platform to solve real delivery challenges. Brainito’s professional approach and deep understanding of our requirements helped us gain traction quickly. Their guidance made a real difference, and we would gladly work with them again.",
            attribution: "— Founder & CEO, Local Delivery Marketplace"
        },
        metrics: [
            { value: "100+ Daily Leads", label: "100+ Daily Leads", description: "Strong and consistent lead generation during the launch phase" },
            { value: "Improved Customer Engagement", label: "Improved Customer Engagement", description: "Better interaction and response from targeted user segments" },
            { value: "Operational Efficiency", label: "Operational Efficiency", description: "Automated marketing workflows that supported sustainable growth" },
        ]
    },
    {
        id: "8",
        slug: "art-retreat-company",
        projectName: "Art Retreat Company",
        industry: "Travel / Art Retreats / Experience-Based Brand",
        impact: "Scaling a Niche Travel Experience Through Story-Led Marketing",
        keyResults: [
            { value: "Increase in high-intent retreat enquiries" },
            { value: "Improved enquiry-to-booking conversion rates" },
            { value: "Strong organic engagement and community growth" },
            { value: "Reduced cost per qualified lead" }
        ],
        duration: "6 Months+ and Ongoing",
        services: ["Social media setup and ongoing management", "Website SEO optimization", "Meta (Facebook & Instagram) advertising", "Email campaigns and lead nurturing", "Community growth and engagement"],
        aboutBusiness: "Art Retreat Company is an experience-led travel brand offering immersive painting retreats in inspiring destinations. The retreats focus on creativity, connection, and transformation, delivering deep value to participants. However, despite strong on-ground experiences, growth was constrained by limited reach and an absence of scalable marketing systems.",
        challenge: "Demand was inconsistent, brand visibility remained limited to existing audiences, and there was no structured approach to scaling awareness, enquiries, or bookings. Growth depended heavily on word of mouth, making revenue unpredictable and difficult to plan.",
        approachIntro: "Brainito focused on building a predictable demand engine without compromising the brand’s creative essence.",
        approachKeyFocus: [
            "Defining clear positioning around transformational, experience-driven travel",
            "Building story-led content aligned with the full retreat journey—from discovery to post-experience reflection",
            "Optimizing the enquiry-to-booking funnel for clarity and intent",
            "Implementing continuous performance tracking, testing, and refinement"
        ],
        solution: "We implemented a complete digital launch and growth strategy that enabled Wellness Studio to move beyond its physical location. Organic and paid channels worked together to consistently generate online bookings and increase in-studio footfall.",
        testimonial: {
            quote: "Brainito was a huge help when we launched virtual services in 2020. They helped us go beyond our physical location and reach new audiences. We’ve worked with them multiple times since, and the experience has been consistently positive.",
            attribution: "— Wellness Studio Founder"
        },
        metrics: [
            { value: "2–5 Online Appointments Daily", label: "2–5 Online Appointments Daily", description: "Steady appointment flow driven by digital channels" },
            { value: "Increased Footfall", label: "Increased Footfall", description: "More in-person visits linked to digital campaigns" },
            { value: "Expanded Reach", label: "Expanded Reach", description: "Successfully reached audiences beyond the local area" },
            { value: "Strong Digital Foundation", label: "Strong Digital Foundation", description: "Built scalable systems for long-term growth" }
        ]
    }
];

// Helper function to get case study by slug
export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined => {
    return caseStudiesData.find(study => study.slug === slug);
};

// Helper function to get all case studies
export const getAllCaseStudies = (): CaseStudy[] => {
    return caseStudiesData;
};

// Helper function to get related case studies (excluding current)
export const getRelatedCaseStudies = (currentSlug: string, limit: number = 3): CaseStudy[] => {
    return caseStudiesData
        .filter(study => study.slug !== currentSlug)
        .slice(0, limit);
};
