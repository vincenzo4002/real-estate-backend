import {
    getPropertyAnalytics,
    getUserAnalytics,
    getVisitAnalytics,
    getMessageAnalytics,
    getMonthlyPropertyAnalytics,
    getMonthlyUserAnalytics,
    getCompleteReports
} from "./report.service.js";


/*
|--------------------------------------------------------------------------
| Complete Reports
|--------------------------------------------------------------------------
*/

export const reports = async (
    req,
    res
) => {

    try {

        const data =
            await getCompleteReports(
                req.query.year
            );

        return res.status(200).json({

            success: true,

            message:
                "Reports fetched successfully.",

            data

        });

    } catch (error) {

        console.error(
            "Reports error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch reports.",

            error:
                error.message

        });

    }
};


/*
|--------------------------------------------------------------------------
| Property Analytics
|--------------------------------------------------------------------------
*/

export const propertyAnalytics = async (
    req,
    res
) => {

    try {

        const data =
            await getPropertyAnalytics();

        return res.status(200).json({

            success: true,

            message:
                "Property analytics fetched successfully.",

            data

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
                error.message

        });

    }
};


/*
|--------------------------------------------------------------------------
| User Analytics
|--------------------------------------------------------------------------
*/

export const userAnalytics = async (
    req,
    res
) => {

    try {

        const data =
            await getUserAnalytics();

        return res.status(200).json({

            success: true,

            message:
                "User analytics fetched successfully.",

            data

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
                error.message

        });

    }
};


/*
|--------------------------------------------------------------------------
| Visit Analytics
|--------------------------------------------------------------------------
*/

export const visitAnalytics = async (
    req,
    res
) => {

    try {

        const data =
            await getVisitAnalytics();

        return res.status(200).json({

            success: true,

            message:
                "Visit analytics fetched successfully.",

            data

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
                error.message

        });

    }
};


/*
|--------------------------------------------------------------------------
| Message Analytics
|--------------------------------------------------------------------------
*/

export const messageAnalytics = async (
    req,
    res
) => {

    try {

        const data =
            await getMessageAnalytics();

        return res.status(200).json({

            success: true,

            message:
                "Message analytics fetched successfully.",

            data

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
                error.message

        });

    }
};


/*
|--------------------------------------------------------------------------
| Monthly Property Analytics
|--------------------------------------------------------------------------
*/

export const monthlyProperties = async (
    req,
    res
) => {

    try {

        const data =
            await getMonthlyPropertyAnalytics(
                req.query.year
            );

        return res.status(200).json({

            success: true,

            message:
                "Monthly property analytics fetched successfully.",

            data

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
                error.message

        });

    }
};


/*
|--------------------------------------------------------------------------
| Monthly User Analytics
|--------------------------------------------------------------------------
*/

export const monthlyUsers = async (
    req,
    res
) => {

    try {

        const data =
            await getMonthlyUserAnalytics(
                req.query.year
            );

        return res.status(200).json({

            success: true,

            message:
                "Monthly user analytics fetched successfully.",

            data

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
                error.message

        });

    }
};