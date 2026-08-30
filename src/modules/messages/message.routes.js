import express from "express";

import {
    startConversation,
    send,
    listConversations,
    messages,
    markRead,
    markConversationRead,
    removeConversation
} from "./message.controller.js";

import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();


/*
|--------------------------------------------------------------------------
| Message Routes
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| Get My Conversations
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    protect,
    listConversations
);


/*
|--------------------------------------------------------------------------
| Start / Get Conversation
|--------------------------------------------------------------------------
*/

router.post(
    "/conversation",
    protect,
    startConversation
);


/*
|--------------------------------------------------------------------------
| Send Message
|--------------------------------------------------------------------------
*/

router.post(
    "/conversation/:conversationId",
    protect,
    send
);


/*
|--------------------------------------------------------------------------
| Get Conversation Messages
|--------------------------------------------------------------------------
*/

router.get(
    "/conversation/:conversationId",
    protect,
    messages
);


/*
|--------------------------------------------------------------------------
| Mark Conversation Messages As Read
|--------------------------------------------------------------------------
*/

router.patch(
    "/conversation/:conversationId/read",
    protect,
    markConversationRead
);


/*
|--------------------------------------------------------------------------
| Mark Single Message As Read
|--------------------------------------------------------------------------
*/

router.patch(
    "/:messageId/read",
    protect,
    markRead
);


/*
|--------------------------------------------------------------------------
| Remove Conversation
|--------------------------------------------------------------------------
*/

router.delete(
    "/conversation/:conversationId",
    protect,
    removeConversation
);


export default router;