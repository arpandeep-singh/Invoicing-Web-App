import { Model } from 'objection';

export class Transaction extends Model {
  id!: string;
  customerId!: string;
  amountRecived!: number;
  createdAt!: Date;

  static get tableName() {
    return 'transcations';
  }

  static get idColumn() {
    return 'id';
  }
}