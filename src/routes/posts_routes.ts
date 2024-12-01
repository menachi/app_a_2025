import express, { Request, Response } from "express";
import postsController from "../controllers/posts_controller";

const router = express.Router();


router.get("/", (req: Request, res: Response) => {
    postsController.getAllPosts(req, res);
});

router.get("/:id", (req: Request, res: Response) => {
    postsController.getPostById(req, res);
});

router.post("/", (req: Request, res: Response) => {
    postsController.createPost(req, res);
});

router.delete("/:id", (req: Request, res: Response) => {
    postsController.deletePost(req, res);
});

export default router;
