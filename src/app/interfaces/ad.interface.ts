export interface AdInterface {
    id: number;
    // image: string;
    title: string;
    description: string;
    category: string;
    city: string;
    user: any;
}

export interface AdCreateInterface {
    // image: string;
    user: string;
    title: string;
    description: string;
    category: number;
    city: number;
}
