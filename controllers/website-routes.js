const router = require("express").Router();

router.get("/",(req,res)=>{
    res.render("index.ejs")
})

router.get("/login",(req,res)=>{
    if(req.session.loggedIn){
        res.redirect("/");
        return;
    }
    res.render("login.ejs")
})

router.get("/register",(req,res)=>{
    if(req.session.loggedIn){
        res.redirect("/");
        return;
    }
    res.render("register.ejs")
})


module.exports = router