import postsModel from "../models/posts_model";
import { Error, ObjectId } from "mongoose";
import { Request, Response } from "express";
import BaseController from "./base_controller";

const postController = new BaseController(postsModel);


export default postController;