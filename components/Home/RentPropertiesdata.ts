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

export const rentProperties: Property[] = [
    {
        id: "rent1",
        title: "Modern 3 BHK Apartment",
        location: "Kharghar, Navi Mumbai",
        price: "₹ 45,000/mo",
        beds: 3,
        baths: 3,
        sqft: "1,650",
        tag: "Verified",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "rent2",
        title: "Luxury Studio Apartment",
        location: "Vashi, Navi Mumbai",
        price: "₹ 25,000/mo",
        beds: 1,
        baths: 1,
        sqft: "650",
        tag: "Premium",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "rent3",
        title: "Spacious 2 BHK Home",
        location: "Seawoods, Navi Mumbai",
        price: "₹ 35,000/mo",
        beds: 2,
        baths: 2,
        sqft: "1,100",
        tag: "Pet Friendly",
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "rent4",
        title: "Cozy 1 BHK Flat",
        location: "Nerul, Navi Mumbai",
        price: "₹ 18,000/mo",
        beds: 1,
        baths: 1,
        sqft: "550",
        tag: "Recently Listed",
        image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "rent5",
        title: "Sea Facing 3 BHK",
        location: "Belapur, Navi Mumbai",
        price: "₹ 55,000/mo",
        beds: 3,
        baths: 3,
        sqft: "1,800",
        tag: "Elite",
        image: "https://images.unsplash.com/photo-1505691938895-1758d7eaa511?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "rent6",
        title: "Gated Community 2 BHK",
        location: "Panvel, Navi Mumbai",
        price: "₹ 22,000/mo",
        beds: 2,
        baths: 2,
        sqft: "1,050",
        tag: "Family Choice",
        image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
];
