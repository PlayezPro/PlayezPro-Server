import express from "express";
import { db } from '../src/db/db.js';

const app = express()
app.use(express.json())
db()

app.listen(3000, console.log('DataBase Connected'))