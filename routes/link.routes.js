const { Router } = require("express");
const Link = require("../models/Link");
const config = require("config");
const auth = require("../middleware/auth.middleware");
const shortid = require("shortid");
const router = Router();

router.get("/", auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    console.log(links);
    res.json(links);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.post("/generate", auth, async (req, res) => {
  try {
    const baseUrl = config.get("baseUrl");

    const { from } = req.body;

    const code = shortid.generate();

    const existing = await Link.findOne({ from });

    if (existing) {
      return res.json({ link: existing });
    }

    const to = baseUrl + "/t/" + code;
    const link = new Link({
      from,
      to,
      code,
      owner: req.user.userId,
    });
    console.log(link);
    await link.save();

    res.json({ link }).status(201);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

module.exports = router;
