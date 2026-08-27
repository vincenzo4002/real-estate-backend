import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        type: {
            type: String,
            enum: [
                "VISIT_SCHEDULED",
                "VISIT_CONFIRMED",
                "VISIT_CANCELLED",
                "PROPERTY_UPDATED",
                "LOGIN_ALERT",
                "ANNOUNCEMENT"
            ],
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        message: {
            type: String,
            required: true,
            trim: true
        },

        property: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property",
            default: null
        },

        visit: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Visit",
            default: null
        },

        isRead: {
            type: Boolean,
            default: false
        },

        metadata: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        }
    },
    {
        timestamps: true
    }
);

notificationSchema.index({
    recipient: 1,
    isRead: 1,
    createdAt: -1
});

export const Notification = mongoose.model(
    "Notification",
    notificationSchema
);