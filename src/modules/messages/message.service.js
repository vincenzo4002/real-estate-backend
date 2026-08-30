import { Conversation } from "./conversation.model.js";
import { Message } from "./message.model.js";
import { Property } from "../properties/property.model.js";


/*
|--------------------------------------------------------------------------
| Get Or Create Conversation
|--------------------------------------------------------------------------
*/

export const getOrCreateConversation = async (
    customerId,
    propertyId
) => {

    const property = await Property.findOne({
        _id: propertyId,
        isDeleted: false,
        status: "APPROVED"
    });

    if (!property) {
        throw new Error(
            "Property not found or not available."
        );
    }

    if (
        property.owner.toString() ===
        customerId.toString()
    ) {
        throw new Error(
            "Property owner cannot contact themselves."
        );
    }

    let conversation = await Conversation.findOne({
        property: propertyId,
        participants: {
            $all: [
                customerId,
                property.owner
            ]
        }
    });

    if (!conversation) {

        conversation = await Conversation.create({

            participants: [
                customerId,
                property.owner
            ],

            property: propertyId

        });

    }

    return await Conversation.findById(
        conversation._id
    )
        .populate(
            "participants",
            "name email phone"
        )
        .populate(
            "property",
            "title price images location"
        )
        .populate(
            "lastMessage",
            "sender receiver message createdAt"
        );
};


/*
|--------------------------------------------------------------------------
| Send Message
|--------------------------------------------------------------------------
*/

export const sendMessage = async (
    userId,
    conversationId,
    messageText
) => {

    if (
        !messageText ||
        !messageText.trim()
    ) {
        throw new Error(
            "Message cannot be empty."
        );
    }

    const conversation =
        await Conversation.findById(
            conversationId
        );

    if (!conversation) {
        throw new Error(
            "Conversation not found."
        );
    }

    const isParticipant =
        conversation.participants.some(
            participant =>
                participant.toString() ===
                userId.toString()
        );

    if (!isParticipant) {
        throw new Error(
            "You are not a participant in this conversation."
        );
    }

    const receiver =
        conversation.participants.find(
            participant =>
                participant.toString() !==
                userId.toString()
        );

    if (!receiver) {
        throw new Error(
            "Message receiver not found."
        );
    }

    const newMessage = await Message.create({

        conversation: conversationId,

        sender: userId,

        receiver,

        property: conversation.property,

        message: messageText.trim()

    });

    conversation.lastMessage =
        newMessage._id;

    await conversation.save();

    return await Message.findById(
        newMessage._id
    )
        .populate(
            "sender",
            "name email"
        )
        .populate(
            "receiver",
            "name email"
        )
        .populate(
            "property",
            "title price"
        );
};


/*
|--------------------------------------------------------------------------
| Get User Conversations
|--------------------------------------------------------------------------
*/

export const getMyConversations = async (
    userId
) => {

    return await Conversation.find({
        participants: userId,
        isActive: true
    })
        .populate(
            "participants",
            "name email phone"
        )
        .populate(
            "property",
            "title price images location"
        )
        .populate(
            "lastMessage",
            "sender receiver message createdAt isRead"
        )
        .sort({
            updatedAt: -1
        });
};


/*
|--------------------------------------------------------------------------
| Get Conversation Messages
|--------------------------------------------------------------------------
*/

export const getConversationMessages = async (
    userId,
    conversationId
) => {

    const conversation =
        await Conversation.findById(
            conversationId
        );

    if (!conversation) {
        throw new Error(
            "Conversation not found."
        );
    }

    const isParticipant =
        conversation.participants.some(
            participant =>
                participant.toString() ===
                userId.toString()
        );

    if (!isParticipant) {
        throw new Error(
            "You are not authorized to view this conversation."
        );
    }

    return await Message.find({
        conversation: conversationId
    })
        .populate(
            "sender",
            "name email"
        )
        .populate(
            "receiver",
            "name email"
        )
        .sort({
            createdAt: 1
        });
};


/*
|--------------------------------------------------------------------------
| Mark Message As Read
|--------------------------------------------------------------------------
*/

export const markMessageAsRead = async (
    userId,
    messageId
) => {

    const message =
        await Message.findById(
            messageId
        );

    if (!message) {
        throw new Error(
            "Message not found."
        );
    }

    if (
        message.receiver.toString() !==
        userId.toString()
    ) {
        throw new Error(
            "You are not authorized to update this message."
        );
    }

    message.isRead = true;

    message.readAt = new Date();

    await message.save();

    return message;
};


/*
|--------------------------------------------------------------------------
| Mark Conversation Messages As Read
|--------------------------------------------------------------------------
*/

export const markConversationAsRead = async (
    userId,
    conversationId
) => {

    const conversation =
        await Conversation.findById(
            conversationId
        );

    if (!conversation) {
        throw new Error(
            "Conversation not found."
        );
    }

    const isParticipant =
        conversation.participants.some(
            participant =>
                participant.toString() ===
                userId.toString()
        );

    if (!isParticipant) {
        throw new Error(
            "You are not authorized to update this conversation."
        );
    }

    const result =
        await Message.updateMany(
            {
                conversation: conversationId,

                receiver: userId,

                isRead: false
            },
            {
                $set: {
                    isRead: true,
                    readAt: new Date()
                }
            }
        );

    return {
        modifiedCount:
            result.modifiedCount
    };
};


/*
|--------------------------------------------------------------------------
| Delete Conversation
|--------------------------------------------------------------------------
*/

export const deactivateConversation = async (
    userId,
    conversationId
) => {

    const conversation =
        await Conversation.findById(
            conversationId
        );

    if (!conversation) {
        throw new Error(
            "Conversation not found."
        );
    }

    const isParticipant =
        conversation.participants.some(
            participant =>
                participant.toString() ===
                userId.toString()
        );

    if (!isParticipant) {
        throw new Error(
            "You are not authorized to delete this conversation."
        );
    }

    conversation.isActive = false;

    await conversation.save();

    return conversation;
};