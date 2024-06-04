import { initServer } from '../db/app.js';
import { connect } from '../db/mongo.js';

initServer();
connect();
