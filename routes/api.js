import express from "express"
import { addFavoriteMovie, deleteController, getFavoriteMovie, loginController, registerController, updateController } from '../controllers/UserController.js';
import { addMovieController, deleteMovie, getAllMovie, getMovieById, getMovieByUser, updateMovie } from "../controllers/MovieController.js";
import { isUserId } from '../middleware/User.js';
import { isMovieID } from '../middleware/Movie.js';
import { addReview, getReviewById, getReviewByMovie, getReviewByUser, removeReview, updateReview } from './../controllers/ReviewController.js';
import { isReviewId } from './../middleware/Review.js';
import { searchByDirector, searchByGenre, searchByRating, searchByTitle, searchByYear, searchMovies } from "../controllers/SearchController.js";

const router = express.Router();

router.post("/register",registerController);
router.post("/login",loginController)
router.post("/addFavoriteMovie/:userId/:movieId",isUserId,isMovieID,addFavoriteMovie)
router.get("/getFavoriteMovie/:userId",isUserId,getFavoriteMovie)
router.put("/updateUser/:userId",isUserId,updateController)
router.delete("/deleteUser/:userId",isUserId,deleteController)
router.post("/addMovie/:userId",isUserId,addMovieController)
router.get("/getAllMovie",getAllMovie)
router.get("/getMovieById/:movieId",isMovieID,getMovieById)
router.get("/getMovieByUser/:userId",isUserId,getMovieByUser)
router.put("/updateMovie/:movieId",isMovieID,updateMovie)
router.delete("/deleteMovie/:movieId",isMovieID,deleteMovie)

router.post("/addReview/:userId/:movieId",isUserId,isMovieID,addReview)
router.get("/getReviewId/:reviewId",isReviewId,getReviewById)
router.get("/getReviewByUser/:userId",isUserId,getReviewByUser)
router.get("/getReviewByMovie/:movieId",isMovieID,getReviewByMovie)
router.delete("/removeReview/:reviewId",isReviewId,removeReview)
router.put("/updateReview/:reviewId",isReviewId,updateReview)


router.get("/searchMovieByDirector" , searchByDirector)
router.get("/searchMovieByTitle",searchByTitle)
router.get("/searchMovieByGenre",searchByGenre)
router.get("/searchMovieByRating",searchByRating)
router.get("/searchMovieByYear",searchByYear)
router.get("/searchMovies",searchMovies)
export default router;