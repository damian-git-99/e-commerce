const { Router } = require("express");
const { check } = require("express-validator");
const validateFields = require("../../../middlewares/expressValidator");
const { findAll, findById } = require("../controller/productControllers");
const router = Router();

//@route /api/products

router.get("/", findAll);
router.get("/:id", [
    check('id', 'El id no es valido').notEmpty(),
    validateFields
] , findById);

module.exports = {
    productRouter: router
};