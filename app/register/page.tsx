import RegisterWrapper from "@/components/Register/RegisterWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Register | Navi Mumbai Property Deals",
    description: "Join the premier property portal for Navi Mumbai. Create an account to access exclusive real estate listings and market insights.",
};

export default function RegisterPage() {
    return (
        <main className="bg-neutral-bg min-h-screen">
            <RegisterWrapper />
        </main>
    );
}
