const express = require('express');
const router = express.Router();
const UserControoler = require("../Controllers/User");

router.post("/",UserControoler.ceateUser);
router.get("/",UserControoler.findAll);
router.put("/:id",UserControoler.updateUser);
router.delete("/:id",UserControoler.deleteUser);
router.post("/login",UserControoler.Login);
router.post("/register",UserControoler.Register);

module.exports=router