
export interface User<R> {
    _id: string;
    firstname: string;
    lastname: string;
    middlename: string;
    email: string;
    password?: string;
    details?: {
        avatar?: String;
        phone?: String;
    };
    role: R[] | string[];
    token?: {
        value?: String;
        expires?: Date;
    };
    warning?: number;
    created_at: Date;
    updated_at: Date;
}