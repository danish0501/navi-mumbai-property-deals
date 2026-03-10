
const Schema = () => {
    const siteUrl = "https://navimumbaipropertydeals.com";

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "@id": `${siteUrl}/#organization`,
        "name": "Navi Mumbai Property Deals",
        "url": siteUrl,
        "logo": `${siteUrl}/images/nm-property-logo.png`,
        "description": "Leading Real Estate Portal in Navi Mumbai specializing in residential and commercial properties since 2026.",
        "telephone": "+91-9876543210",
        "priceRange": "₹2,500,000 - ₹500,000,000",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Sector 17, Vashi",
            "addressLocality": "Navi Mumbai",
            "addressRegion": "Maharashtra",
            "postalCode": "400703",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "19.0760",
            "longitude": "72.9977"
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                "opens": "09:00",
                "closes": "20:00"
            }
        ],
        "areaServed": {
            "@type": "AdministrativeArea",
            "name": "Navi Mumbai"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
        </>
    );
};

export default Schema;
