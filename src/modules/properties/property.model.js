import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        category: {
            type: String,
            enum: [
                "Apartment",
                "Villa",
                "House",
                "Plot",
                "Commercial"
            ],
            required: true
        },

        listingType: {
            type: String,
            enum: ["SALE", "RENT"],
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        location: {
            city: {
                type: String,
                required: true
            },

            state: {
                type: String,
                required: true
            },

            address: {
                type: String,
                required: true
            },

            coordinates: {
                lat: Number,
                lng: Number
            }
        },

        area: {
            type: Number,
            required: true
        },

        bedrooms: {
            type: Number,
            default: 0
        },

        bathrooms: {
            type: Number,
            default: 0
        },

        amenities: [
            {
                type: String
            }
        ],

        images: [
            {
                type: String
            }
        ],

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        status: {
            type: String,
            enum: [
                "PENDING",
                "APPROVED",
                "REJECTED"
            ],
            default: "PENDING"
        },

        featured: {
            type: Boolean,
            default: false
        },

        views: {
            type: Number,
            default: 0
        },

        isDeleted: {
            type: Boolean,
            default: false
        }

    },
    {
        timestamps: true
    }
);

export const Property = mongoose.model(
    "Property",
    propertySchema
);