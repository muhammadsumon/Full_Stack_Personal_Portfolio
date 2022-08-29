const cors = require('cors');
const dotenv = require('dotenv');
const exp = require('express');
const fs = require('fs');
const https = require('https');
const generateToken = require('./Controllers/generateToken.controller.js');
const logIn = require('./Controllers/login.controller.js');
const logout = require('./Controllers/logout.controller.js');
const query = require('./Controllers/query.controller.js');
const connectDb = require('./Db/connectDb.js');
const checkAuth = require('./Middleware/check.auth.js');
const isAdmin = require('./Middleware/isAdmin.js');
const projectCategory = require('./Routes/projectCategories.route.js');
const projects = require('./Routes/projects.route.js');
const projectType = require('./Routes/projectTypes.route.js');
const technologies = require('./Routes/technologies.route.js');
const user = require('./Routes/users.route.js');
const cookieParser = require('cookie-parser');

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
    origin: true,
    credentials: true,
    optionSuccessStatus: 200,
    exposedHeaders: '*'
}
app.use(cors(corsOptions));

// Get Expected Data from Client
app.use(exp.json());
app.use(exp.urlencoded({ extended: false }))
app.use(exp.static('./Media'))

// Set secret key
app.use(cookieParser(process.env.App_Cookie_Secret));

// Auth Route
app.use("/auth/login", logIn);
app.use("/auth/logout", logout);

console.log(process.env.NODE_ENV)

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
}) : app.listen(Port, () => {
    console.log(`Server is running successfully :)`)
})
