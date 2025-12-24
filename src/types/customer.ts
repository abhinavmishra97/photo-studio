// TypeScript types for Customers table

export interface Customer {
    id: string;
    name: string;
    phone: string;
    birthday?: string | null;  // Optional: ISO date string (YYYY-MM-DD)
    anniversary?: string | null;  // Optional: ISO date string (YYYY-MM-DD)
    notes?: string | null;  // Optional: brief notes
    created_at: string;
}

export interface CustomerInsert {
    name: string;
    phone: string;
    birthday?: string | null;
    anniversary?: string | null;
    notes?: string | null;
}

export interface CustomerUpdate {
    name?: string;
    phone?: string;
    birthday?: string | null;
    anniversary?: string | null;
    notes?: string | null;
}
