const mongoose = require('mongoose');
const { handleMongooseError } = require('../utils/handleMongooseError');

const foodDBSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            default: Date.now(),
        },
        owner: {
            type: String,
        },
        breakfast: [
            {
                name: String,
                calories: Number,
                carbohydrates: Number,
                protein: Number,
                fat: Number,
            },
        ],
        lunch: [
            {
                name: String,
                calories: Number,
                carbohydrates: Number,
                protein: Number,
                fat: Number,
            },
        ],
        dinner: [
            {
                name: String,
                calories: Number,
                carbohydrates: Number,
                protein: Number,
                fat: Number,
            },
        ],
        snack: [
            {
                name: String,
                calories: Number,
                carbohydrates: Number,
                protein: Number,
                fat: Number,
            },
        ],
    },
    { versionKey: false, timestamps: true }
);

foodDBSchema.post('save', handleMongooseError);

const Food = mongoose.model('foods', foodDBSchema);

module.exports = { Food };
