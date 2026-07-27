const express=require("express")
const router=express.Router()
const {homepage,addblogs,viewblog,about}=require("../controllers/staticroutes.js")
const {post_addblog,commentpost}=require("../controllers/blogs.js")


const multer = require("multer");
const { storage } = require("../config/cloudinary"); // adjust path if needed

const upload = multer({ storage });

module.exports = upload;


router.get("/about",about)
router.get("/home",homepage)
router.get("/addblog",addblogs)
router.get("/view/blog/:id",viewblog)


router.post("/addblog",upload.single("profile"),post_addblog)


router.post("/commentpost/:id",commentpost)




module.exports=router