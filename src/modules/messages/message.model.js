import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        conversation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation",
            required: true,
            index: true
        },

        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        property: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property",
            required: true
        },

        message: {
            type: String,
            required: true,
            trim: true,
            maxlength: 2000
        },

        isRead: {
            type: Boolean,
            default: false
        },

        readAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);


/*
|--------------------------------------------------------------------------
| Indexes
|--------------------------------------------------------------------------
*/

messageSchema.index({
    conversation: 1,
    createdAt: 1
});

messageSchema.index({
    receiver: 1,
    isRead: 1
});


/*
|--------------------------------------------------------------------------
| Message Model
|--------------------------------------------------------------------------
*/

export const Message = mongoose.model(
    "Message",
    messageSchema
);