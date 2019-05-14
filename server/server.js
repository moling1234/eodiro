import express from 'express';
import cors from 'cors';
import vhost from 'vhost';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import services_promise from './bootstrap';
import { server_private } from 'Configs/private';

const BASE_URI = "eodiro.com";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(expressSession({
  secret: 'my key',
  resave: true,
  saveUninitialized:true
}));

services_promise.then((services) => {
  app.use(vhost("api." + BASE_URI, services['api_app'].getApp()));
  app.use("/lander", land_app.getApp());
  app.use(services['web_app'].getApp());

  app.listen(server_private['node_port']);
});
