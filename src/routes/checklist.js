const express = require("express");

const router = express.Router();

const Checklist = require("../models/checklists");
const { restart } = require("nodemon");

//requisição do tipo GET
router.get("/", async (req, res) => {
  try {
    let checklists = await Checklist.find({});
    res.status(200).render("checklists/index", { checklists: checklists });
  } catch (error) {
    res
      .status(200)
      .render("pages/error", { error: "erro ao exibir as listas" });
  }
});

router.get("/new", async (req, res) => {
  try {
    let checklist = new Checklist();
    res.status(200).render("checklists/new", { checklist: checklist });
  } catch (error) {
    res
      .status(500)
      .render("pages/error", { errors: "erro ao carregar o formulario" });
  }
});

//maneira de fazer uma requisição do tipo POST
router.post("/", async (req, res) => {
  let { name } = req.body.checkList;
  let checkList = new Checklist({ name });
  try {
    await Checklist.save();
    res.redirect("/checklists");
  } catch (error) {
    res
      .status(422)
      .render("checklists/new", { checklists: { ...checkList, error } });
  }
});

//requisição do tipo GET por ID
router.get("/:id", async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id);
    res.status(200).render("checklists/show", { checklist: checklist });
  } catch (error) {
    res.status(500).render("pages/error", {
      error: "erro ao exibir as listas de tarefas",
    });
  }
});

//requisição do tipo PUT
router.put("/:id", async (req, res) => {
  let { name } = req.body;
  try {
    let checkList = await Checklist.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    res.status(200).json(checkList);
  } catch (error) {
    res.status(422).json(error);
  }
});

//requisição do tipo DELETE
router.delete("/:id", async (req, res) => {
  try {
    let checklist = await Checklist.findByIdAndRemove(req.params.id);
    res.redirect("/checklists");
  } catch (error) {
    res
      .status(500)
      .render("pages/error", { error: "erro ao deletas a lista de  tarefas" });
  }
});

module.exports = router;
