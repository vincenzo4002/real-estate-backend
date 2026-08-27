import {
    getUserNotifications,
    getUnreadNotificationCount,
    getNotificationById,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    deleteReadNotifications
} from "./notification.service.js";


/*
|--------------------------------------------------------------------------
| Get User Notifications
|--------------------------------------------------------------------------
*/

export const list = async (req, res) => {

    try {

        const notifications =
            await getUserNotifications(
                req.user._id,
                req.query
            );

        res.status(200).json({

            success: true,

            data: notifications

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


/*
|--------------------------------------------------------------------------
| Get Unread Notification Count
|--------------------------------------------------------------------------
*/

export const unreadCount = async (req, res) => {

    try {

        const count =
            await getUnreadNotificationCount(
                req.user._id
            );

        res.status(200).json({

            success: true,

            data: {
                unreadCount: count
            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


/*
|--------------------------------------------------------------------------
| Get Notification Details
|--------------------------------------------------------------------------
*/

export const details = async (req, res) => {

    try {

        const notification =
            await getNotificationById(
                req.params.id,
                req.user._id
            );

        res.status(200).json({

            success: true,

            data: notification

        });

    } catch (error) {

        res.status(404).json({

            success: false,

            message: error.message

        });

    }

};


/*
|--------------------------------------------------------------------------
| Mark Notification As Read
|--------------------------------------------------------------------------
*/

export const markAsRead = async (req, res) => {

    try {

        const notification =
            await markNotificationAsRead(
                req.params.id,
                req.user._id
            );

        res.status(200).json({

            success: true,

            message:
                "Notification marked as read.",

            data: notification

        });

    } catch (error) {

        res.status(404).json({

            success: false,

            message: error.message

        });

    }

};


/*
|--------------------------------------------------------------------------
| Mark All Notifications As Read
|--------------------------------------------------------------------------
*/

export const markAllAsRead = async (req, res) => {

    try {

        const result =
            await markAllNotificationsAsRead(
                req.user._id
            );

        res.status(200).json({

            success: true,

            message:
                "All notifications marked as read.",

            data: result

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


/*
|--------------------------------------------------------------------------
| Delete Notification
|--------------------------------------------------------------------------
*/

export const remove = async (req, res) => {

    try {

        await deleteNotification(
            req.params.id,
            req.user._id
        );

        res.status(200).json({

            success: true,

            message:
                "Notification deleted successfully."

        });

    } catch (error) {

        res.status(404).json({

            success: false,

            message: error.message

        });

    }

};


/*
|--------------------------------------------------------------------------
| Delete All Read Notifications
|--------------------------------------------------------------------------
*/

export const removeRead = async (req, res) => {

    try {

        const result =
            await deleteReadNotifications(
                req.user._id
            );

        res.status(200).json({

            success: true,

            message:
                "Read notifications deleted successfully.",

            data: result

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};