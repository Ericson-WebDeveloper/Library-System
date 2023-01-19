

export interface Book {
    _id: string;
    title: string;
    isbn: string;
    author: string;
    status: 'available' | 'unavailable';
    categories: string[];
    copies: Number;
    image: String;
    created_at: Date;
    updated_at?: Date;
}