const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    basicInfo: {
        reference: {
            type: String,
            unique: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        mapsLink: {
            type: String
        },
        availability: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ['T0', 'T1', 'T2', 'T3', 'T4+'],
            required: true
        }
    },
    contractualInfo: {
        warrantor: {
          type: Boolean,
        },
        price: {
          type: Number,
          required: true
        },
        guarantee: {
          type: Number,
        },
        observations: {
          type: String,
        }
      },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
}, { collection: 'listings' });

module.exports = mongoose.model('listing', listingSchema);