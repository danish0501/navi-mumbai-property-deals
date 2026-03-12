import { Suspense } from "react";
import BlogsContent from "@/components/Blog/BlogsContent";

export const metadata = {
    title: "Blogs | Navi Mumbai Property Deals",
    description: "Explore the latest real estate trends, neighborhood guides, and expert property investment advice in Navi Mumbai from our property specialists.",
};

export default function BlogsPage() {
    return (
        <main className="min-h-screen bg-white">
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Hub...</div>}>
                <BlogsContent />
            </Suspense>
        </main>
    );
}
