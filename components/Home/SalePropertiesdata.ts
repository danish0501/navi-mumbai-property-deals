export interface Property {
    id: string | number;
    title: string;
    location: string;
    price: string;
    beds: number;
    baths: number;
    sqft: string;
    tag: string;
    image: string;
    type?: string;
}

export const saleProperties: Property[] = [
    {
        id: "sale1",
        title: "Empire Estate Luxury Villa",
        location: "Palm Beach Road, Navi Mumbai",
        price: "₹ 8.5 Cr",
        beds: 5,
        baths: 6,
        sqft: "4,500",
        tag: "Luxury",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "sale2",
        title: "Regency Heights Apartment",
        location: "Kharghar, Navi Mumbai",
        price: "₹ 1.85 Cr",
        beds: 3,
        baths: 3,
        sqft: "1,850",
        tag: "Premium",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "sale3",
        title: "Green View Residency",
        location: "Ulwe, Navi Mumbai",
        price: "₹ 75 Lac",
        beds: 2,
        baths: 2,
        sqft: "1,050",
        tag: "New Launch",
        image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "sale4",
        title: "Skyline Tower Penthouse",
        location: "Vashi, Navi Mumbai",
        price: "₹ 4.2 Cr",
        beds: 4,
        baths: 4,
        sqft: "3,200",
        tag: "Ready to Move",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "sale5",
        title: "Riverfront Bungalow",
        location: "Panvel, Navi Mumbai",
        price: "₹ 2.1 Cr",
        beds: 3,
        baths: 3,
        sqft: "2,400",
        tag: "Exclusive",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "sale6",
        title: "Grand Central Residency",
        location: "Nerul, Navi Mumbai",
        price: "₹ 1.45 Cr",
        beds: 2,
        baths: 2,
        sqft: "1,200",
        tag: "Recently Listed",
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
];
