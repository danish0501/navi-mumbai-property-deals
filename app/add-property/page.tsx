import React from "react";
import AddProperty from "@/components/AddProperty/AddProperty";

export const metadata = {
  title: "Add New Property | Navi Mumbai Property Deals",
  description: "List your property in Navi Mumbai for Sale or Rent. Reach verified buyers and tenants with our premium listing service.",
};

export default function AddPropertyPage() {
  return (
    <div className="min-h-screen">
      <AddProperty />
    </div>
  );
}
