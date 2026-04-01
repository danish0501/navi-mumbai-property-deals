type Props = {
  property: any;
  slug: string;
};

export default function PropertySchema({ property, slug }: Props) {
  const baseUrl = 'https://navimumbaipropertydeals.com';
  const url = `${baseUrl}/${slug}`;
  const ratingValue = property.listerDetails?.rating || 4.8;
  const reviewCount = property.listerDetails?.totalProperties || 52;

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateListing",
        "@id": `${url}#listing`,
        "name": property.title,
        "description": `${property.bhk} ${property.propertyType} in ${property.location} by ${property.builder}. ${property.description || ''}`,
        "url": url,
        "image": {
          "@type": "ImageObject",
          "url": property.image,
          "width": "1200",
          "height": "630"
        },
        "datePosted": new Date().toISOString(),
        "validThrough": new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString(),
        "occupancy": {
          "@type": "Occupancy",
          "numberOfRooms": property.bhk.split(' ')[0]
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": property.address,
          "addressLocality": property.location.split(',')[0].trim(),
          "addressRegion": "Maharashtra",
          "addressCountry": "IN"
        },
        "offers": {
          "@type": "Offer",
          "price": property.price.replace(/[^\d.]/g, ''),
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "url": url,
          "validFrom": new Date().toISOString()
        },
        "seller": {
          "@type": "RealEstateAgent",
          "name": property.listerName,
          "image": property.listerDetails?.image || property.image
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": baseUrl
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": property.rentPrice ? "Rent Property" : "Buy Property",
            "item": property.rentPrice ? `${baseUrl}/rent` : `${baseUrl}/buy`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": property.title,
            "item": url
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `What is the price of ${property.title}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `${property.price}`
            }
          },
          {
            "@type": "Question",
            "name": `Where is ${property.title} located?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `${property.address}, ${property.location}`
            }
          },
          {
            "@type": "Question",
            "name": `Who is the developer of ${property.title}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `${property.title} is developed by ${property.builder}, a trusted name in Navi Mumbai real estate.`
            }
          }
        ]
      },
      {
        "@type": "Review",
        "itemReviewed": {
          "@type": "RealEstateAgent",
          "name": property.listerName,
          "image": property.listerDetails?.image || property.image
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": ratingValue,
          "bestRating": "5"
        },
        "author": { "@type": "Person", "name": "Verified Buyer" },
        "reviewBody": `${property.listerName} provides excellent service and transparent dealing. Highly recommended for property in ${property.location}.`
      }
    ]
  };

  return (
    <script 
      type="application/ld+json" 
      dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }} 
      suppressHydrationWarning
    />
  );
}