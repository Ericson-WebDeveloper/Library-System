

export interface Loan<U,B> {
    _id: string;
    user: U | string;
    book: B | string;
    status: 'return' | 'not return';
    issue_date: Date;
    due_date?: string | null;
    return_date?: string | null;
}