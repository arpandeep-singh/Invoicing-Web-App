import { Model } from 'objection';
import { v4 as uuidv4 } from 'uuid';
import { Task } from './task.model';
import { Payment } from './payment.model';
import { Invoice } from './invoice';

class Customer extends Model {

  id!: string;
  firstName!: string;
  lastName?: string;
  email!: string;
  hstNumber!: string;
  createdAt!: Date;
  phoneNumber!: string;
  payments!: Payment;
  tasks!: Task[];

  static get tableName() {
    return 'customers';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      tasks: {
        relation: Model.HasManyRelation,
        modelClass: Task,
        join: {
          from: 'customers.id',
          to: 'tasks.customer_id',
        }
    },

    payments: {
      relation: Model.HasOneRelation,
      modelClass: Payment,
      join: {
        from: 'customers.id',
        to: 'payments.customer_id'
      }
    },

    invoices: {
      relation: Model.HasManyRelation,
      modelClass: Invoice,
      join: {
        from: 'customers.id',
        to: 'invoices.customer_id'
      }
    }
  }
}


}

export default Customer;