import Post from "../models/post.js";
import User from "../models/User.js"; // Import the User model


export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find(req.query.cat ? { category: req.query.cat } : {});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addPost = async (req, res) => {
  try {
    const { photos, title, description, category, userId } = req.body;

    // Check if the photos array is empty
    if (!photos || photos.length === 0) {
      return res.status(400).json({ error: "At least one image is required." });
    }

    // Check if the user ID is provided
    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // If user exists and photos are provided, proceed to create and save the new post
    const newPost = new Post({
      title,
      description,
      category,
      user: userId,
      image: photos, // Changed 'img' to 'image' to match your schema
    });

    await newPost.save();

    res.status(201).json({ message: "Post has been created.", post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
  
    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }
  
    // Delete the post
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post has been deleted." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const updateData = req.body;
  
    // Check if the post exists
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }
  
    // Update the post
    await Post.findByIdAndUpdate(postId, updateData);
    res.status(200).json({ message: "Post has been updated." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
