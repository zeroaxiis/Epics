import { Router } from 'express';
import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    refreshAccessToken, 
    changeCurrentPassword, 
    updateAvatar, 
    updateCoverImage 
} from '../controllers/user.controllers.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const userRouter = Router();

// User registration with avatar and cover image upload
userRouter.post("/register", 
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 }
    ]), 
    registerUser
);

// User login and logout
userRouter.post("/login", loginUser);
userRouter.post("/logout", verifyJWT, logoutUser);

// Token refresh
userRouter.post("/refresh-token", refreshAccessToken);

// Change password
userRouter.patch("/change-password", verifyJWT, changeCurrentPassword);

// Update profile images
userRouter.patch("/avatar", verifyJWT, upload.single("avatar"), updateAvatar);
userRouter.patch("/cover-image", verifyJWT, upload.single("coverImage"), updateCoverImage);

export default userRouter;
