const router = require('express').Router();
const Controller = require("../controllers/TTScontroller.js");
const ControllerFB = require("../controllers/FBcontroller.js");
const SheetController = require("../controllers/SheetController.js");
// router.get("/getMp3WihtTimestam",Controller.getMp3WihtTimestam);
// router.get("/getOnlyMp3",Controller.getOnlyMP3);
// router.post("/callbackurl",Controller.CallBackUrl);
router.post("/test",Controller.getAudio)
router.get("/feedback",ControllerFB.createTest)
router.post("/testnewfeedback",SheetController.NewRow)
router.get("/download/:id",Controller.Download)
module.exports = router;