const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const connectDB = require("./config/db");
const typeDefs = require("./gqschema");
const resolvers = require("./resolvers");
const context = require("./context");
const path = require("path");
const bodyParser = require("body-parser");

const {
  graphqlUploadExpress,
} = require('graphql-upload');


//connect db
connectDB();

var port = process.env.PORT || 8000;

//middleware
const app = express();
app.use(cors());
app.use(bodyParser.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  uploads:false
});

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context,
//   uploads: {
//     // https://github.com/jaydenseric/graphql-upload#type-uploadoptions
//     maxFileSize: 5000000, // 5 MB
//     maxFiles: 20,
//   },

// });

app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 }));
server.applyMiddleware({ app, path: "/graphql" });

// Init Middleware
app.use(express.json({ extended: false }));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/files", require("./routes/api/files"));
app.use("/api/misc", require("./routes/api/misc"));

app.use("/api/customer", require("./routes/api/customer"));

//app.use(express.static("public"));

app.use("/assets", express.static(__dirname + "/assets"));


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "build")));
  app.use(express.static(path.join(__dirname, "client", "build")));
  
  app.get('/admin', (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
  
  app.get('/admin/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => res.send(`Ravendel is running on port: ${port}`));
}

app.listen(port, () => console.log(`server started on port ${port}, ${process.env.NODE_ENV}`));

/*
const { errorConverter, errorHandler } = require("./middleware/error");
const vhost = require("vhost");
//models
// const Tax = require("./models/Tax");
// Tax.createTax();

// const Shipping = require("./models/Shipping");
// Shipping.createShipping();

// const Settings = require("./models/Setting");
// Settings.createSettings(); 


const fs = require("fs");
const http = require("http");
const https = require("https");
var credentials = {};
// Certificate
if (process.env.NODE_ENV === "production") {
  const privateKey = fs.readFileSync(
    "/etc/letsencrypt/live/ravendel-frontend.hbwebsol.com/privkey.pem",
    "utf8"
  );
  const certificate = fs.readFileSync(
    "/etc/letsencrypt/live/ravendel-frontend.hbwebsol.com/cert.pem",
    "utf8"
  );
  const ca = fs.readFileSync(
    "/etc/letsencrypt/live/ravendel-frontend.hbwebsol.com/chain.pem",
    "utf8"
  );

  credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
  };
}

const appFront = express();

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  appFront.use(express.static("frontend/build"));
  appFront.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

const appAdmin = express();

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  appAdmin.use(express.static("client/build"));
  appAdmin.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => res.send("api is running"));
}

if (process.env.NODE_ENV === "production") {
  app.use(vhost("ravendel-frontend.hbwebsol.com", appFront));
  app.use(vhost("ravendel-backend.hbwebsol.com", appAdmin));
  // const PORT = process.env.PORT || 80;
  // app.listen(PORT, () => console.log(`server started on port ${PORT}`));

  // Starting both http & https servers
  const httpServer = http.createServer(app);
  const httpsServer = https.createServer(credentials, app);

  httpServer.listen(80, () => {
    console.log("HTTP Server running on port 80");
  });

  httpsServer.listen(443, () => {
    console.log("HTTPS Server running on port 443");
  });
} else {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`server started on port ${PORT}`));
}
*/