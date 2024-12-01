import Posts from "../models/posts_model";
import { ObjectId } from "mongoose";
import { Request, Response } from "express";

const getAllPosts = async (req: Request, res: Response) => {
  const filter = req.query;
  console.log(filter);
  try {
    if (filter.owner) {
      const posts = await Posts.find({ owner: filter.owner });
      return res.send(posts);
    } else {
      const posts = await Posts.find();
      return res.send(posts);
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const getPostById = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (id) {
    try {
      const post = await Posts.findById(id);
      if (post) {
        return res.send(post);
      } else {
        return res.status(404).send("Post not found");
      }
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
  return res.status(400).send("invalid id");
};

const createPost = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const post = await Posts.create(req.body);
    res.status(201).send(post);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const deletePost = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await Posts.findByIdAndDelete(id);
    return res.send("Post deleted");
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

export default {
  getAllPosts,
  createPost,
  deletePost,
  getPostById,
};
