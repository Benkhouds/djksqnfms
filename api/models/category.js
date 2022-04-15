const mongoose = require("mongoose");
const { Category } = require("../helpers/constants");

const CategoriesEnum = new mongoose.Schema({
	value: {
		type: String,
		enum: Object.values(Category),
	},
});

module.exports = CategoriesEnum;
