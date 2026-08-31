import { User } from "../auth/user.model.js";
import { Property } from "../properties/property.model.js";
import { Visit } from "../visits/visit.model.js";
import { Message } from "../messages/message.model.js";


/*
|--------------------------------------------------------------------------
| Get Admin Dashboard Statistics
|--------------------------------------------------------------------------
*/

export const getDashboardStats = async () => {

    const [
        totalUsers,
        totalProperties,
        pendingProperties,
        approvedProperties,
        rejectedProperties,
        totalVisits,
        pendingVisits,
        completedVisits,
        totalMessages
    ] = await Promise.all([

        User.countDocuments({
            isDeleted: {
                $ne: true
            }
        }),

        Property.countDocuments({
            isDeleted: {
                $ne: true
            }
        }),

        Property.countDocuments({
            isDeleted: {
                $ne: true
            },
            status: "PENDING"
        }),

        Property.countDocuments({
            isDeleted: {
                $ne: true
            },
            status: "APPROVED"
        }),

        Property.countDocuments({
            isDeleted: {
                $ne: true
            },
            status: "REJECTED"
        }),

        Visit.countDocuments(),

        Visit.countDocuments({
            status: "PENDING"
        }),

        Visit.countDocuments({
            status: "COMPLETED"
        }),

        Message.countDocuments()

    ]);


    return {

        users: {
            total: totalUsers
        },

        properties: {
            total: totalProperties,
            pending: pendingProperties,
            approved: approvedProperties,
            rejected: rejectedProperties
        },

        visits: {
            total: totalVisits,
            pending: pendingVisits,
            completed: completedVisits
        },

        messages: {
            total: totalMessages
        }

    };
};


/*
|--------------------------------------------------------------------------
| Get Recent Properties
|--------------------------------------------------------------------------
*/

export const getRecentProperties = async (
    limit = 10
) => {

    return await Property.find({
        isDeleted: {
            $ne: true
        }
    })
        .populate(
            "owner",
            "name email phone"
        )
        .sort({
            createdAt: -1
        })
        .limit(Number(limit));

};


/*
|--------------------------------------------------------------------------
| Get Recent Users
|--------------------------------------------------------------------------
*/

export const getRecentUsers = async (
    limit = 10
) => {

    return await User.find({
        isDeleted: {
            $ne: true
        }
    })
        .select(
            "-password"
        )
        .sort({
            createdAt: -1
        })
        .limit(Number(limit));

};


/*
|--------------------------------------------------------------------------
| Get Recent Visits
|--------------------------------------------------------------------------
*/

export const getRecentVisits = async (
    limit = 10
) => {

    return await Visit.find()
        .populate(
            "customer",
            "name email phone"
        )
        .populate(
            "owner",
            "name email phone"
        )
        .populate(
            "property",
            "title price"
        )
        .sort({
            createdAt: -1
        })
        .limit(Number(limit));

};


/*
|--------------------------------------------------------------------------
| Get Complete Dashboard
|--------------------------------------------------------------------------
*/

export const getDashboard = async () => {

    const [
        statistics,
        recentProperties,
        recentUsers,
        recentVisits
    ] = await Promise.all([

        getDashboardStats(),

        getRecentProperties(),

        getRecentUsers(),

        getRecentVisits()

    ]);


    return {

        statistics,

        recentProperties,

        recentUsers,

        recentVisits

    };
};