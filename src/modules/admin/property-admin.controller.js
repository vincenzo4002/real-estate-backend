import {
    getAllPropertiesForAdmin,
    getPropertyForAdmin,
    approveProperty,
    rejectProperty,
    removeProperty
} from "./property-admin.service.js";


/*
|--------------------------------------------------------------------------
| Get All Properties
|--------------------------------------------------------------------------
*/

export const getProperties = async (
    req,
    res
) => {

    try {

        const result =
            await getAllPropertiesForAdmin(
                req.query
            );

        return res.status(200).json({

            success: true,

            message:
                "Properties fetched successfully.",

            data: result

        });

    } catch (error) {

        console.error(
            "Admin get properties error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch properties.",

            error:
                error.message

        });

    }
};


/*
|--------------------------------------------------------------------------
| Get Property By ID
|--------------------------------------------------------------------------
*/

export const getProperty = async (
    req,
    res
) => {

    try {

        const property =
            await getPropertyForAdmin(
                req.params.id
            );

        return res.status(200).json({

            success: true,

            message:
                "Property fetched successfully.",

            data: property

        });

    } catch (error) {

        return res.status(404).json({

            success: false,

            message:
                error.message

        });

    }
};


/*
|--------------------------------------------------------------------------
| Approve Property
|--------------------------------------------------------------------------
*/

export const approve = async (
    req,
    res
) => {

    try {

        const property =
            await approveProperty(
                req.params.id
            );

        return res.status(200).json({

            success: true,

            message:
                "Property approved successfully.",

            data: property

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }
};


/*
|--------------------------------------------------------------------------
| Reject Property
|--------------------------------------------------------------------------
*/

export const reject = async (
    req,
    res
) => {

    try {

        const property =
            await rejectProperty(
                req.params.id,
                req.body.reason
            );

        return res.status(200).json({

            success: true,

            message:
                "Property rejected successfully.",

            data: property

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }
};


/*
|--------------------------------------------------------------------------
| Remove Property
|--------------------------------------------------------------------------
*/

export const remove = async (
    req,
    res
) => {

    try {

        const property =
            await removeProperty(
                req.params.id
            );

        return res.status(200).json({

            success: true,

            message:
                "Property removed successfully.",

            data: property

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }
};