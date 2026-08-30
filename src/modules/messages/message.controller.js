import {
    getOrCreateConversation,
    sendMessage,
    getMyConversations,
    getConversationMessages,
    markMessageAsRead,
    markConversationAsRead,
    deactivateConversation
} from "./message.service.js";


/*
|--------------------------------------------------------------------------
| Start / Get Conversation
|--------------------------------------------------------------------------
*/

export const startConversation = async (
    req,
    res
) => {

    try {

        const conversation =
            await getOrCreateConversation(
                req.user._id,
                req.body.propertyId
            );

        return res.status(200).json({

            success: true,

            data: conversation

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }
};


/*
|--------------------------------------------------------------------------
| Send Message
|--------------------------------------------------------------------------
*/

export const send = async (
    req,
    res
) => {

    try {

        const message =
            await sendMessage(
                req.user._id,
                req.params.conversationId,
                req.body.message
            );

        return res.status(201).json({

            success: true,

            message:
                "Message sent successfully.",

            data: message

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }
};


/*
|--------------------------------------------------------------------------
| Get My Conversations
|--------------------------------------------------------------------------
*/

export const listConversations = async (
    req,
    res
) => {

    try {

        const conversations =
            await getMyConversations(
                req.user._id
            );

        return res.status(200).json({

            success: true,

            data: conversations

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }
};


/*
|--------------------------------------------------------------------------
| Get Conversation Messages
|--------------------------------------------------------------------------
*/

export const messages = async (
    req,
    res
) => {

    try {

        const conversationMessages =
            await getConversationMessages(
                req.user._id,
                req.params.conversationId
            );

        return res.status(200).json({

            success: true,

            data: conversationMessages

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }
};


/*
|--------------------------------------------------------------------------
| Mark Message As Read
|--------------------------------------------------------------------------
*/

export const markRead = async (
    req,
    res
) => {

    try {

        const message =
            await markMessageAsRead(
                req.user._id,
                req.params.messageId
            );

        return res.status(200).json({

            success: true,

            message:
                "Message marked as read.",

            data: message

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }
};


/*
|--------------------------------------------------------------------------
| Mark Conversation As Read
|--------------------------------------------------------------------------
*/

export const markConversationRead = async (
    req,
    res
) => {

    try {

        const result =
            await markConversationAsRead(
                req.user._id,
                req.params.conversationId
            );

        return res.status(200).json({

            success: true,

            message:
                "Conversation marked as read.",

            data: result

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }
};


/*
|--------------------------------------------------------------------------
| Deactivate Conversation
|--------------------------------------------------------------------------
*/

export const removeConversation = async (
    req,
    res
) => {

    try {

        await deactivateConversation(
            req.user._id,
            req.params.conversationId
        );

        return res.status(200).json({

            success: true,

            message:
                "Conversation removed successfully."

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }
};