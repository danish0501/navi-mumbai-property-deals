export interface BlogPost {
    id: string | number;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    authorRole: string;
    category: string;
    image: string;
    readTime: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: "Navi Mumbai Real Estate Trends 2026: What to Expect",
        excerpt: "Discover the emerging hotspots and price trends in Navi Mumbai's rapidly evolving property market.",
        date: "March 15, 2026",
        author: "Rahul S.",
        authorRole: "Market Analyst",
        category: "Market Insights",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        readTime: "5 min read"
    },
    {
        id: 2,
        title: "The Ultimate Guide to Buying Your First Home in Kharghar",
        excerpt: "Everything you need to know about the buying process, legalities, and the best sectors in Kharghar.",
        date: "March 10, 2026",
        author: "Priya M.",
        authorRole: "Senior Consultant",
        category: "Buying Guide",
        image: "https://images.unsplash.com/photo-1582408921715-18e7806365c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        readTime: "8 min read"
    },
    {
        id: 3,
        title: "Sustainability in Navi Mumbai: Green Building Projects",
        excerpt: "Exploring the rise of eco-friendly residential projects and their impact on future living.",
        date: "March 5, 2026",
        author: "Amit K.",
        authorRole: "Eco Consultant",
        category: "Lifestyle",
        image: "https://images.unsplash.com/photo-1448630360428-6e238892bf24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        readTime: "6 min read"
    },
    {
        id: 4,
        title: "Investment Hotspots: Why Ulwe is the Next Big Thing",
        excerpt: "Analyzing the infrastructure developments and high ROI potential for investors in Ulwe.",
        date: "Feb 28, 2026",
        author: "Sanjay D.",
        authorRole: "Investment Expert",
        category: "Investment",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        readTime: "7 min read"
    }
];
