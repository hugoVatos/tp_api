const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FootballeurSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        height: {
            type: String,
            required: true
        },
        poste: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        creator: {
            type: Object,
            required: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Footballeur', FootballeurSchema);
