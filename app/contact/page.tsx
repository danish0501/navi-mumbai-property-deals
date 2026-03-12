import ContactHero from "@/components/Contact/ContactHero";
import ContactForm from "@/components/Contact/ContactForm";
import ContactInfo from "@/components/Contact/ContactInfo";
import ContactMap from "@/components/Contact/ContactMap";
import ContactFAQ from "@/components/Contact/ContactFAQ";

export const metadata = {
    title: "Contact Us | Navi Mumbai Property Deals",
    description: "Get in touch with Navi Mumbai's premier real estate consultancy. Whether you're buying, selling, or renting, our experts are here to help.",
};

export default function Contact() {
    return (
        <main className="min-h-screen bg-brand-white">
            <ContactHero />

            <div className="relative z-10 bg-brand-white">
                <section className="py-16 px-4">
                    <div className="container mx-auto">
                        <div className="grid lg:grid-cols-2 gap-20 items-start">
                            <ContactInfo />
                            <ContactForm />
                        </div>
                    </div>
                </section>

                <ContactMap />

                <div className="bg-brand-cream/10">
                    <ContactFAQ />
                </div>
            </div>
        </main>
    );
}
