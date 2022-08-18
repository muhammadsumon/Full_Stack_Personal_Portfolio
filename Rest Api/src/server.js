import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import exp, { json, urlencoded } from 'express';
import fs from 'fs';
import https from 'https';
import generateToken from './Controllers/generateToken.controller.js';
import logIn from './Controllers/login.controller.js';
import logout from './Controllers/logout.controller.js';
import query from './Controllers/query.controller.js';
import connectDb from './Db/connectDb.js';
import checkAuth from './Middleware/check.auth.js';
import isAdmin from './Middleware/isAdmin.js';
import projectCategory from './Routes/projectCategories.route.js';
import projects from './Routes/projects.route.js';
import projectType from './Routes/projectTypes.route.js';
import technologies from './Routes/technologies.route.js';
import user from './Routes/users.route.js';

const appMode = process.env.App_Mode;
const privateKey = appMode === "Development" ? fs.readFileSync('C:/Users/Mehrab/localhost-key.pem', 'utf8') : "";
const certificate = appMode === "Development" ? fs.readFileSync('C:/Users/Mehrab/localhost.pem', 'utf8') : "";

const credentials = { key: privateKey, cert: certificate };

// Dotenv Config
dotenv.config()
const Port = process.env.App_Port;

// MongoDb Connect
connectDb();

// Express Init
const app = exp();

// Cross Origin Resource Request Handle
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const corsOptions = {
    origin: ["https://localhost:3001", "https://localhost:3000"],
    credentials: true,
    optionSuccessStatus: 200,
    exposedHeaders: '*'
}
app.use(cors(corsOptions));

// Get Expected Data from Client
app.use(json());
app.use(urlencoded({ extended: false }))
app.use(exp.static('./src/Media'))

// Set secret key
app.use(cookieParser(process.env.App_Cookie_Secret));

// Auth Route
app.use("/auth/login", logIn);
app.use("/auth/logout", logout);

// Main Routes
app.use("/projects", checkAuth, projects);
app.use("/users", checkAuth, isAdmin, user);
app.use("/projecttypes", checkAuth, projectType);
app.use("/technologies", checkAuth, technologies);
app.use("/categories", checkAuth, projectCategory);

app.use("/filter/projects", checkAuth, query);
app.use("/generatetoken", checkAuth, isAdmin, generateToken);


// Express listen Port
var httpsServer = https.createServer(credentials, app);

appMode === "Development" ? httpsServer.listen(Port, () => {
    console.log(`Server is running on Port ${Port}`)
}) : app.listen(process.env.PORT || Port, () => {
    console.log(`Server is running successfully :)`)
})
