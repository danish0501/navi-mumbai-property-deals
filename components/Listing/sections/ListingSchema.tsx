
const BASE_URL = 'https://navimumbaipropertydeals.com';


export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': 'Navi Mumbai Property Deals',
        'url': BASE_URL,
        'logo': `${BASE_URL}/logo.png`,
        'sameAs': [
            'https://facebook.com/navimumbaipropertydeals',
            'https://twitter.com/navimumbaiproperty',
            'https://instagram.com/navimumbaipropertydeals'
        ],
        'contactPoint': {
            '@type': 'ContactPoint',
            'telephone': '+91-XXXXXXXXXX', // Replace with real number
            'contactType': 'Customer Service',
            'areaServed': 'IN',
            'availableLanguage': ['en', 'hi', 'marathi']
        }
    };
}

/** Enhanced RealEstateListing Schema (EEAT & Rich Snippets) **/
export function generateRealEstateSchema(property: any) {
    const propertyTitle = `${property.bhk} ${property.propertyType} for ${property.mode === 'rent' ? 'Rent' : 'Sale'} in ${property.location}`;

    return {
        '@context': 'https://schema.org',
        '@type': 'RealEstateListing',
        'name': propertyTitle,
        'description': `${property.title} - ${property.description || `Discover this premium ${property.propertyType} in ${property.location}. Features: ${property.amenities?.join(', ') || 'Modern Amenities'}. RERA Verified Listing.`}`,
        'url': `${BASE_URL}/property/${property.id}`,
        'image': property.image,
        'datePosted': '2024-03-19T00:00:00Z', // Use a stable date to prevent hydration mismatch
        'identifier': property.id,
        'address': {
            '@type': 'PostalAddress',
            'addressLocality': property.location.split(',')[0].trim(),
            'addressRegion': 'Maharashtra',
            'addressCountry': 'IN',
            'streetAddress': property.location
        },
        'housingUnit': {
            '@type': 'ResidentialProperty',
            'name': property.title,
            'numberOfRooms': parseInt(property.bhk) || 1,
            'amenityFeature': property.amenities?.map((a: string) => ({
                '@type': 'LocationFeatureSpecification',
                'name': a,
                'value': true
            })) || []
        },
        'offers': {
            '@type': 'Offer',
            'price': property.priceValue || 0, // Ensure priceValue is a number
            'priceCurrency': 'INR',
            'availability': 'https://schema.org/InStock',
            'seller': {
                '@type': 'Organization',
                'name': 'Navi Mumbai Property Deals'
            }
        }
    };
}

/** Breadcrumb Schema for structured search results **/
export function generateBreadcrumbSchema(items: { name: string; item: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': items.map((item, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'name': item.name,
            'item': `${BASE_URL}${item.item}`,
        })),
    };
}

/** FAQ Schema for capturing long-tail search & showing Expertise **/
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqs.map(faq => ({
            '@type': 'Question',
            'name': faq.question,
            'acceptedAnswer': {
                '@type': 'Answer',
                'text': faq.answer
            }
        }))
    };
}

/** Place/Locality Schema for Area-specific pages **/
export function generatePlaceSchema(location: string, description: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Place',
        'name': location,
        'description': description,
        'address': {
            '@type': 'PostalAddress',
            'addressLocality': location,
            'addressRegion': 'Maharashtra',
            'addressCountry': 'IN'
        },
        'geo': {
            '@type': 'GeoCoordinates',
            // Default coords for Navi Mumbai center if not specific
            'latitude': '19.0330',
            'longitude': '73.0297'
        }
    };
}

/** ItemList Schema for Property Listings (Rich Snippets) **/
export function generatePropertyListSchema(properties: any[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        'itemListElement': properties.slice(0, 10).map((property, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'url': `${BASE_URL}/property/${property.id}`,
            'name': property.title,
            'item': generateRealEstateSchema(property)
        }))
    };
}
