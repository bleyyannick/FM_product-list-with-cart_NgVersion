export type Product = {
    image: {
        thumbnail: string;
        mobile: string;
        tablet: string;
        desktop: string;
    };
    name: string;
    price: number;
    category: string;
}

export type selectableProduct = {
    item: Product;
    isSelected: boolean;
    quantity: number;
}

