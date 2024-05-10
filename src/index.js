import express from "express";
import { db } from '../src/db/db.js';
import { createRoles } from "./libs/initialSetUp.js";
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import pkg from '../package.json' assert { type: 'json' }
import postsRoutes from '../src/routes/postRoutes.js'
import skillRoutes from '../src/routes/skillRoutes.js'
import statisticsRoutes from '../src/routes/statisticsRoutes.js'
import detailRoutes from "../src/routes/detailRoutes.js"
import shareRouter from '../src/routes/shareRoutes.js'
import cors from 'cors'

const app = express()
createRoles()
app.use(cors())
app.use(express.json())
app.set('pkg', pkg)
app.use('/user', userRoutes)
app.use('/auth', authRoutes)
app.use('/posts', postsRoutes)
app.use('/skill', skillRoutes)
app.use('/statistics', statisticsRoutes)
app.use('/details', detailRoutes)
app.use('/share', shareRouter);


app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
})

const port = process.env.PORT || 3000
app.listen(port)
console.log('Server Listening on Port', port)
db()