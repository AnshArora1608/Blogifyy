const express=require("express")
const router=express.Router()
const{signup,signin,postsignin,postsignup}=require("../controllers/signinup")

router.get("/signup",signup)
router.get("/signin",signin)
router.post("/signup",postsignup)
router.post("/signin",postsignin)


module.exports=router;
