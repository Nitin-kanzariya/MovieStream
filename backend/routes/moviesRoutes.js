import express from "express";
import multer from 'multer';
const router = express.Router();

// Configure multer to store files in memory as buffers
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Controllers
import {
  createMovie,
  getAllMovies,
  getSpecificMovie,
  updateMovie,
  movieReview,
  deleteMovie,
  deleteComment,
  getNewMovies,
  getTopMovies,
  getRandomMovies,
} from "../controllers/movieController.js";

// Middlewares
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

// Public Routes
router.get("/all-movies", authenticate, getAllMovies);
router.get("/specific-movie/:id", getSpecificMovie);
router.get("/new-movies", authenticate,getNewMovies);
router.get("/top-movies", authenticate, getTopMovies);
router.get("/random-movies", authenticate, getRandomMovies);


// Restricted Routes
router.post("/:id/reviews", authenticate, checkId, movieReview); 

// Admin
router.post("/create-movie", authenticate, authorizeAdmin, upload.fields([{ name: 'image' }, { name: 'video' }]), createMovie);
router.put("/update-movie/:id", authenticate, authorizeAdmin, upload.fields([{ name: 'image' }, { name: 'video' }]), updateMovie);
router.delete("/delete-movie/:id", authenticate, authorizeAdmin, deleteMovie);
router.delete("/delete-comment", authenticate, authorizeAdmin, deleteComment);
export default router;
