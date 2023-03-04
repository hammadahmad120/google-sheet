const router = require("express").Router();
const asyncHandler = require("../middlewares/asyncRouteHandler.middleware");
const chapterService = require("../services/chapter.service.js");
const apiResponse = require("../helpers/responseSender.helper");

router.get("/", asyncHandler(async (req, res) => {
    const chapters = await chapterService.getAllChapters();
    return apiResponse.sendSuccessResponse(res, questions, "Chapters found successfully");
}));

router.get("/:chapterId", asyncHandler(async (req, res) => {
  const { chapterId } = req.params;
    const chapter = await chapterService.getChapterById(chapterId);
    return apiResponse.sendSuccessResponse(
      res,
      chapter,
      "Chapter found successfully"
    );
}));

module.exports = router;
