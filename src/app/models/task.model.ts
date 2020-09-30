import { Model } from 'objection';

export class Task extends Model {

  id!: string;
  customerId!: string;
  task!: string;
  createdAt!: Date;

  static get tableName() {
    return 'tasks';
  }

  static get idColumn() {
    return 'id';
  }


}