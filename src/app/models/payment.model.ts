import { Model } from 'objection';

export class Payment extends Model {
  id!: string;
  customerId!: string;
  totalAmount!: number;
  recivedAmount!: number;
  dueDate!: Date;
  createdAt!: Date;

  static get tableName() {
    return 'payments';
  }

  static get idColumn() {
    return 'id';
  }

}