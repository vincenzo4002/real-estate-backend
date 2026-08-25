import mongoose from "mongoose";

const visitSchema = new mongoose.Schema(
    {
        property: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property",
            required: true
        },

        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        visitDate: {
            type: Date,
            required: true
        },

        visitTime: {
            type: String,
            required: true
        },

        message: {
            type: String,
            default: ""
        },

        status: {
            type: String,
            enum: [
                "PENDING",
                "CONFIRMED",
                "CANCELLED",
                "COMPLETED"
            ],
            default: "PENDING"
        },

        cancellationReason: {
            type: String,
            default: ""
        }

    },
    {
        timestamps: true
    }
);

export const Visit = mongoose.model(
    "Visit",
    visitSchema
);