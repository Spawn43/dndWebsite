const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000

const session = require("express-session")


const path = require("path");

const sequelize = require("./config/connection")
const SequelizeStore = require("connect-session-sequelize")(session.Store)

const routes = require("./controllers")



const sess = {
    secret: "Test",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
        checkExpirationInterval: 1000 * 60 * 10, // will check every 10 minutes
        expiration: 1000 * 60 * 30 // will expire after 30 minutes
    })
};

app.use(session(sess))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(routes)

sequelize.sync({force:false});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`)
})