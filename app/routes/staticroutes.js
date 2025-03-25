const express=require("express")
const router=express.Router()
const {homepage,addblogs,viewblog,about}=require("../controllers/staticroutes.js")
const {post_addblog,commentpost}=require("../controllers/blogs.js")



const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix +".jpg")
    }
  })
  
  const upload = multer({ storage: storage })


router.get("/about",about)
router.get("/home",homepage)
router.get("/addblog",addblogs)
router.get("/view/blog/:id",viewblog)


router.post("/addblog",upload.single("profile"),post_addblog)
router.post("/commentpost/:id",commentpost)




module.exports=router