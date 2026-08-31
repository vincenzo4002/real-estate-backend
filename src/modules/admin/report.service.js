import { User } from "../auth/user.model.js";
import { Property } from "../properties/property.model.js";
import { Visit } from "../visits/visit.model.js";
import { Message } from "../messages/message.model.js";


/*
|--------------------------------------------------------------------------
| Property Analytics
|--------------------------------------------------------------------------
*/

export const getPropertyAnalytics = async () => {

    const [
        total,
        pending,
        approved,
        rejected,
        deleted
    ] = await Promise.all([

        Property.countDocuments(),

        Property.countDocuments({
            status: "PENDING",
            isDeleted: {
                $ne: true
            }
        }),

        Property.countDocuments({
            status: "APPROVED",
            isDeleted: {
                $ne: true
            }
        }),

        Property.countDocuments({
            status: "REJECTED",
            isDeleted: {
                $ne: true
            }
        }),

        Property.countDocuments({
            isDeleted: true
        })

    ]);


    return {

        total,

        pending,

        approved,

        rejected,

        deleted

    };
};


/*
|--------------------------------------------------------------------------
| User Analytics
|--------------------------------------------------------------------------
*/

export const getUserAnalytics = async () => {

    const [
        totalUsers,
        activeUsers,
        blockedUsers,
        deletedUsers
    ] = await Promise.all([

        User.countDocuments({
            role: "CUSTOMER"
        }),

        User.countDocuments({
            role: "CUSTOMER",

            isBlocked: {
                $ne: true
            },

            isDeleted: {
                $ne: true
            }

        }),

        User.countDocuments({

            role: "CUSTOMER",

            isBlocked: true

        }),

        User.countDocuments({

            role: "CUSTOMER",

            isDeleted: true

        })

    ]);


    return {

        total:
            totalUsers,

        active:
            activeUsers,

        blocked:
            blockedUsers,

        deleted:
            deletedUsers

    };
};


/*
|--------------------------------------------------------------------------
| Visit Analytics
|--------------------------------------------------------------------------
*/

export const getVisitAnalytics = async () => {

    const [
        total,
        pending,
        confirmed,
        completed,
        cancelled
    ] = await Promise.all([

        Visit.countDocuments(),

        Visit.countDocuments({
            status: "PENDING"
        }),

        Visit.countDocuments({
            status: "CONFIRMED"
        }),

        Visit.countDocuments({
            status: "COMPLETED"
        }),

        Visit.countDocuments({
            status: "CANCELLED"
        })

    ]);


    return {

        total,

        pending,

        confirmed,

        completed,

        cancelled

    };
};


/*
|--------------------------------------------------------------------------
| Message Analytics
|--------------------------------------------------------------------------
*/

export const getMessageAnalytics = async () => {

    const total =
        await Message.countDocuments();


    const unread =
        await Message.countDocuments({

            isRead: false

        });


    const read =
        await Message.countDocuments({

            isRead: true

        });


    return {

        total,

        read,

        unread

    };
};


/*
|--------------------------------------------------------------------------
| Monthly Property Analytics
|--------------------------------------------------------------------------
*/

export const getMonthlyPropertyAnalytics = async (
    year
) => {

    const selectedYear =
        Number(year) ||
        new Date().getFullYear();


    const startDate =
        new Date(
            `${selectedYear}-01-01T00:00:00.000Z`
        );


    const endDate =
        new Date(
            `${selectedYear + 1}-01-01T00:00:00.000Z`
        );


    const data =
        await Property.aggregate([

            {
                $match: {

                    createdAt: {

                        $gte:
                            startDate,

                        $lt:
                            endDate

                    }

                }

            },

            {

                $group: {

                    _id: {

                        $month:
                            "$createdAt"

                    },

                    count: {

                        $sum: 1

                    }

                }

            },

            {

                $sort: {

                    "_id": 1

                }

            }

        ]);


    const months =
        Array.from(
            {
                length: 12
            },
            (_, index) => ({

                month:
                    index + 1,

                count:
                    0

            })
        );


    data.forEach(
        (item) => {

            months[
                item._id - 1
            ].count =
                item.count;

        }
    );


    return {

        year:
            selectedYear,

        data:
            months

    };
};


/*
|--------------------------------------------------------------------------
| Monthly User Analytics
|--------------------------------------------------------------------------
*/

export const getMonthlyUserAnalytics = async (
    year
) => {

    const selectedYear =
        Number(year) ||
        new Date().getFullYear();


    const startDate =
        new Date(
            `${selectedYear}-01-01T00:00:00.000Z`
        );


    const endDate =
        new Date(
            `${selectedYear + 1}-01-01T00:00:00.000Z`
        );


    const data =
        await User.aggregate([

            {
                $match: {

                    role:
                        "CUSTOMER",

                    createdAt: {

                        $gte:
                            startDate,

                        $lt:
                            endDate

                    }

                }

            },

            {

                $group: {

                    _id: {

                        $month:
                            "$createdAt"

                    },

                    count: {

                        $sum: 1

                    }

                }

            },

            {

                $sort: {

                    "_id": 1

                }

            }

        ]);


    const months =
        Array.from(
            {
                length: 12
            },
            (_, index) => ({

                month:
                    index + 1,

                count:
                    0

            })
        );


    data.forEach(
        (item) => {

            months[
                item._id - 1
            ].count =
                item.count;

        }
    );


    return {

        year:
            selectedYear,

        data:
            months

    };
};


/*
|--------------------------------------------------------------------------
| Complete Reports
|--------------------------------------------------------------------------
*/

export const getCompleteReports = async (
    year
) => {

    const [

        properties,

        users,

        visits,

        messages,

        monthlyProperties,

        monthlyUsers

    ] = await Promise.all([

        getPropertyAnalytics(),

        getUserAnalytics(),

        getVisitAnalytics(),

        getMessageAnalytics(),

        getMonthlyPropertyAnalytics(
            year
        ),

        getMonthlyUserAnalytics(
            year
        )

    ]);


    return {

        properties,

        users,

        visits,

        messages,

        monthlyProperties,

        monthlyUsers

    };
};