import AboutHero from "@/components/About/AboutHero";
import AboutInfo from "@/components/About/AboutInfo";
import InfrastructureGrowth from "@/components/About/InfrastructureGrowth";
import CoreValues from "@/components/About/CoreValues";
import CompanyImpact from "@/components/About/CompanyImpact";
import CallToAction from "@/components/common/CallToAction";
import Testimonials from "@/components/About/Testimonials";

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
