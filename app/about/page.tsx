import AboutHero from "@/components/About/AboutHero";
import AboutInfo from "@/components/About/AboutInfo";
import InfrastructureGrowth from "@/components/About/InfrastructureGrowth";
import CoreValues from "@/components/About/CoreValues";
import CompanyImpact from "@/components/About/CompanyImpact";
import CallToAction from "@/components/common/CallToAction";
import Testimonials from "@/components/About/Testimonials";

export const metadata = {
    title: "About Us | Navi Mumbai Property Deals",
    description: "Learn about Navi Mumbai Property Deals, our vision, mission, and how we're reshaping the real estate landscape in Navi Mumbai through expertise and trust.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            <AboutHero />
            <AboutInfo />
            <InfrastructureGrowth />
            <CoreValues />
            <CompanyImpact />
            <Testimonials />
            <CallToAction />
        </div>
    );
}
