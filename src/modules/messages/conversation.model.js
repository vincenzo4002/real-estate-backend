import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
    {
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            }
        ],

        property: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property",
            required: true
        },

        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: null
        },

        isActive: {
            type: Boolean,
            default: true
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

conversationSchema.index({
    participants: 1
});

conversationSchema.index({
    property: 1
});


/*
|--------------------------------------------------------------------------
| Conversation Model
|--------------------------------------------------------------------------
*/

export const Conversation = mongoose.model(
    "Conversation",
    conversationSchema
);