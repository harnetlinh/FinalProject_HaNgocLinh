const router = require('express').Router();
const Controller = require("../controllers/TTScontroller.js");
const ControllerFB = require("../controllers/FBcontroller.js");
// router.get("/getMp3WihtTimestam",Controller.getMp3WihtTimestam);
// router.get("/getOnlyMp3",Controller.getOnlyMP3);
// router.post("/callbackurl",Controller.CallBackUrl);
router.get("/test",Controller.getAudio)
router.get("/feedback",ControllerFB.createTest)
module.exports = router;