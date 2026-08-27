import { Notification } from "./notification.model.js";

/*
|--------------------------------------------------------------------------
| Create Notification
|--------------------------------------------------------------------------
*/

export const createNotification = async ({
    recipient,
    type,
    title,
    message,
    property = null,
    visit = null,
    metadata = {}
}) => {

    if (!recipient) {
        throw new Error("Notification recipient is required.");
    }

    const notification = await Notification.create({
        recipient,
        type,
        title,
        message,
        property,
        visit,
        metadata
    });

    return notification;
};


/*
|--------------------------------------------------------------------------
| Get User Notifications
|--------------------------------------------------------------------------
*/

export const getUserNotifications = async (
    userId,
    query = {}
) => {

    const page = Number(query.page) || 1;

    const limit = Number(query.limit) || 20;

    const skip = (page - 1) * limit;

    const filter = {
        recipient: userId
    };

    /*
    |--------------------------------------------------------------------------
    | Filter By Read Status
    |--------------------------------------------------------------------------
    */

    if (query.isRead !== undefined) {

        filter.isRead =
            query.isRead === "true";

    }

    const notifications =
        await Notification.find(filter)
            .populate(
                "property",
                "title price images"
            )
            .populate(
                "visit",
                "visitDate visitTime status"
            )
            .sort({
                createdAt: -1
            })
            .skip(skip)
            .limit(limit);

    const total =
        await Notification.countDocuments(filter);

    return {

        notifications,

        pagination: {

            total,

            page,

            limit,

            totalPages:
                Math.ceil(total / limit)

        }

    };
};


/*
|--------------------------------------------------------------------------
| Get Unread Notification Count
|--------------------------------------------------------------------------
*/

export const getUnreadNotificationCount = async (
    userId
) => {

    return await Notification.countDocuments({
        recipient: userId,
        isRead: false
    });

};


/*
|--------------------------------------------------------------------------
| Get Single Notification
|--------------------------------------------------------------------------
*/

export const getNotificationById = async (
    notificationId,
    userId
) => {

    const notification =
        await Notification.findOne({

            _id: notificationId,

            recipient: userId

        })
        .populate(
            "property",
            "title price images"
        )
        .populate(
            "visit",
            "visitDate visitTime status"
        );

    if (!notification) {

        throw new Error(
            "Notification not found."
        );

    }

    return notification;
};


/*
|--------------------------------------------------------------------------
| Mark Notification As Read
|--------------------------------------------------------------------------
*/

export const markNotificationAsRead = async (
    notificationId,
    userId
) => {

    const notification =
        await Notification.findOne({

            _id: notificationId,

            recipient: userId

        });

    if (!notification) {

        throw new Error(
            "Notification not found."
        );

    }

    notification.isRead = true;

    await notification.save();

    return notification;
};


/*
|--------------------------------------------------------------------------
| Mark All Notifications As Read
|--------------------------------------------------------------------------
*/

export const markAllNotificationsAsRead = async (
    userId
) => {

    const result =
        await Notification.updateMany(

            {
                recipient: userId,
                isRead: false
            },

            {
                $set: {
                    isRead: true
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
| Delete Notification
|--------------------------------------------------------------------------
*/

export const deleteNotification = async (
    notificationId,
    userId
) => {

    const notification =
        await Notification.findOneAndDelete({

            _id: notificationId,

            recipient: userId

        });

    if (!notification) {

        throw new Error(
            "Notification not found."
        );

    }

    return notification;
};


/*
|--------------------------------------------------------------------------
| Delete All Read Notifications
|--------------------------------------------------------------------------
*/

export const deleteReadNotifications = async (
    userId
) => {

    const result =
        await Notification.deleteMany({

            recipient: userId,

            isRead: true

        });

    return {

        deletedCount:
            result.deletedCount

    };
};