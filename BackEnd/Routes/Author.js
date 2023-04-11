const express = require('express');
const router = express.Router();
const AuthorControoler = require("../Controllers/Author");

router.get("/",AuthorControoler.findAll);
router.get("/:id",AuthorControoler.findId);
router.post("/",AuthorControoler.ceateAuthor);
router.put("/:id",AuthorControoler.updateAuthor);
router.delete("/:id",AuthorControoler.deleteAuthor);


module.exports=router