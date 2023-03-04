const router = require("express").Router();
const asyncHandler = require("../middlewares/asyncRouteHandler.middleware");
const chapterService = require("../services/chapter.service.js");
const apiResponse = require("../helpers/responseSender.helper");

router.get("/", asyncHandler(async (req, res) => {
    const chapters = await chapterService.getAllChapters();
    return apiResponse.sendSuccessResponse(res, chapters, "Chapters found successfully");
}));

router.get("/:chapterName", asyncHandler(async (req, res) => {
  const { chapterName } = req.params;
    const chapter = await chapterService.getChapterByName(chapterName);
    return apiResponse.sendSuccessResponse(
      res,
      chapter,
      "Chapter found successfully"
    );
}));

module.exports = router;
