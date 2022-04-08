const mongoose = require("mongoose");
const { Category } = require("../helpers/constants");
const CategorySchema = new mongoose.Schema({
	label: {
		type: String,
		enum: Object.values(Category),
		default: Category.DENTIST,
	},
});

module.exports = mongoose.model("category", CategorySchema);
