import AboutHero from "@/components/About/AboutHero";
import AboutInfo from "@/components/About/AboutInfo";
import CoreValues from "@/components/About/CoreValues";
import CompanyImpact from "@/components/About/CompanyImpact";

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            <AboutHero />
            <AboutInfo />
            <CompanyImpact />
            <CoreValues />
        </div>
    );
}
