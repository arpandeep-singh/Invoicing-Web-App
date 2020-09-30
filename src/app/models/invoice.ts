import { Model } from 'objection';

export class Invoice extends Model {

  id!: number;
  customerId!: string;
  file!: string;
  createdAt!: Date;

  static get tableName() {
    return 'invoices';
  }

  static get idColumn() {
    return 'id';
  }
}