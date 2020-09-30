import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';
import { Model } from 'objection';
import knex from './config/knex';

// Routes
import customerRouter from './routes/customers';
import viewRouter from './routes/views';
import quoteRouter from './routes/quote';

class App {

  private app: express.Application;

  constructor(app: express.Application) {
    this.app = app;
  }

  callBack() {
    return this.app;
  }

}

export function createServer() {

  const app: express.Application = express();
  const server: App = new App(app);

  // Objection
  Model.knex(knex);

  // Middlewares
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.json());

  // Static Files
  app.use(express.static(path.resolve('./public')));

  // View Engine
  app.set('view engine', 'ejs');
  app.set('views', path.resolve('./views'));

  // Routes
  app.use('/api/quote', quoteRouter);
  app.use('/api/customers', customerRouter);
  app.use('/', viewRouter);


  return server;


}