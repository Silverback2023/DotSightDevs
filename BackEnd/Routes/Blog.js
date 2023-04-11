const express = require('express');
const router = express.Router();
const BlogControoler = require("../Controllers/Blog");
const multer  = require('multer');
const storage = multer.memoryStorage()
const uploadPhoto = multer({ storage: storage }).single('image')
router.get("/",BlogControoler.findAll);
router.get("/:id",BlogControoler.findId);
router.get("/search/:title",BlogControoler.findTitle);
router.post("/",uploadPhoto,BlogControoler.ceateBlog);
router.put("/:id",uploadPhoto,BlogControoler.updateBlog);
router.delete("/:id",BlogControoler.deleteBlog);

module.exports=router