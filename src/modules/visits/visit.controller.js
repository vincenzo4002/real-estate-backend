import {
    scheduleVisit,
    getMyVisits,
    getVisitById,
    cancelVisit,
    confirmVisit,
    completeVisit,
    getOwnerVisits
} from "./visit.service.js";


/*
|--------------------------------------------------------------------------
| Schedule Visit
|--------------------------------------------------------------------------
*/

export const schedule = async (
    req,
    res
) => {

    try {

        const visit = await scheduleVisit(
            req.user._id,
            req.body.propertyId,
            req.body
        );


        res.status(201).json({

            success: true,

            message:
                "Property visit scheduled successfully.",

            data: visit

        });

    } catch (error) {

        res.status(400).json({

            success: false,

            message: error.message

        });

    }
};


/*
|--------------------------------------------------------------------------
| My Visits
|--------------------------------------------------------------------------
*/

export const myVisits = async (
    req,
    res
) => {

    try {

        const visits =
            await getMyVisits(
                req.user._id
            );


        res.status(200).json({

            success: true,

            data: visits

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
| Visit Details
|--------------------------------------------------------------------------
*/

export const details = async (
    req,
    res
) => {

    try {

        const visit =
            await getVisitById(
                req.params.id,
                req.user._id
            );


        res.status(200).json({

            success: true,

            data: visit

        });

    } catch (error) {

        res.status(403).json({

            success: false,

            message: error.message

        });

    }
};


/*
|--------------------------------------------------------------------------
| Cancel Visit
|--------------------------------------------------------------------------
*/

export const cancel = async (
    req,
    res
) => {

    try {

        const visit =
            await cancelVisit(

                req.params.id,

                req.user._id,

                req.body.reason

            );


        res.status(200).json({

            success: true,

            message:
                "Visit cancelled successfully.",

            data: visit

        });

    } catch (error) {

        res.status(400).json({

            success: false,

            message: error.message

        });

    }
};


/*
|--------------------------------------------------------------------------
| Confirm Visit
|--------------------------------------------------------------------------
*/

export const confirm = async (
    req,
    res
) => {

    try {

        const visit =
            await confirmVisit(

                req.params.id,

                req.user._id

            );


        res.status(200).json({

            success: true,

            message:
                "Visit confirmed successfully.",

            data: visit

        });

    } catch (error) {

        res.status(400).json({

            success: false,

            message: error.message

        });

    }
};


/*
|--------------------------------------------------------------------------
| Complete Visit
|--------------------------------------------------------------------------
*/

export const complete = async (
    req,
    res
) => {

    try {

        const visit =
            await completeVisit(

                req.params.id,

                req.user._id

            );


        res.status(200).json({

            success: true,

            message:
                "Visit marked as completed.",

            data: visit

        });

    } catch (error) {

        res.status(400).json({

            success: false,

            message: error.message

        });

    }
};


/*
|--------------------------------------------------------------------------
| Owner Visits
|--------------------------------------------------------------------------
*/

export const ownerVisits = async (
    req,
    res
) => {

    try {

        const visits =
            await getOwnerVisits(
                req.user._id
            );


        res.status(200).json({

            success: true,

            data: visits

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }
};