import { Model } from 'objection';

export class Quote extends Model {
    id!: string;
    customerName!: string;
    companyName!: string;
    customerEmail!: string;
    quotePrice!: number;
    description!: string;
    uploadedPath!: string;

    static get tableName() {
        return 'quotes';
    }

    static get idColumn() {
        return 'id';
    }
}