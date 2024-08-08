const express = require("express");
const router = express.Router();
const crudController = require("../Controllers/Product");

router.get("/", crudController.crud_index);
router.post("/", crudController.crud_create);
router.get("/:id", crudController.crud_details);
router.patch("/:id", crudController.crud_update);
router.delete("/:id", crudController.crud_delete);
router.post("/:id/review", crudController.add_review);

module.exports = router;
