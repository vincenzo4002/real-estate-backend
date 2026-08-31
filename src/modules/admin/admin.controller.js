import {
    getDashboard,
    getDashboardStats,
    getRecentProperties,
    getRecentUsers,
    getRecentVisits
} from "./admin.service.js";


/*
|--------------------------------------------------------------------------
| Get Complete Dashboard
|--------------------------------------------------------------------------
*/

export const dashboard = async (
    req,
    res
) => {

    try {

        const data =
            await getDashboard();

        return res.status(200).json({

            success: true,

            message:
                "Dashboard data fetched successfully.",

            data

        });

    } catch (error) {

        console.error(
            "Admin dashboard error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch dashboard data.",

            error:
                error.message

        });

    }
};


/*
|--------------------------------------------------------------------------
| Get Dashboard Statistics
|--------------------------------------------------------------------------
*/

export const statistics = async (
    req,
    res
) => {

    try {

        const data =
            await getDashboardStats();

        return res.status(200).json({

            success: true,

            message:
                "Dashboard statistics fetched successfully.",

            data

        });

    } catch (error) {

        console.error(
            "Admin statistics error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch dashboard statistics.",

            error:
                error.message

        });

    }
};


/*
|--------------------------------------------------------------------------
| Get Recent Properties
|--------------------------------------------------------------------------
*/

export const recentProperties = async (
    req,
    res
) => {

    try {

        const limit =
            req.query.limit || 10;

        const data =
            await getRecentProperties(
                limit
            );

        return res.status(200).json({

            success: true,

            message:
                "Recent properties fetched successfully.",

            data

        });

    } catch (error) {

        console.error(
            "Recent properties error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch recent properties.",

            error:
                error.message

        });

    }
};


/*
|--------------------------------------------------------------------------
| Get Recent Users
|--------------------------------------------------------------------------
*/

export const recentUsers = async (
    req,
    res
) => {

    try {

        const limit =
            req.query.limit || 10;

        const data =
            await getRecentUsers(
                limit
            );

        return res.status(200).json({

            success: true,

            message:
                "Recent users fetched successfully.",

            data

        });

    } catch (error) {

        console.error(
            "Recent users error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch recent users.",

            error:
                error.message

        });

    }
};


/*
|--------------------------------------------------------------------------
| Get Recent Visits
|--------------------------------------------------------------------------
*/

export const recentVisits = async (
    req,
    res
) => {

    try {

        const limit =
            req.query.limit || 10;

        const data =
            await getRecentVisits(
                limit
            );

        return res.status(200).json({

            success: true,

            message:
                "Recent visits fetched successfully.",

            data

        });

    } catch (error) {

        console.error(
            "Recent visits error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch recent visits.",

            error:
                error.message

        });

    }
};