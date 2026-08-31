import {
    getAllCustomers,
    getCustomerById,
    blockCustomer,
    unblockCustomer,
    deleteCustomer
} from "./user-admin.service.js";


/*
|--------------------------------------------------------------------------
| Get All Customers
|--------------------------------------------------------------------------
*/

export const getCustomers = async (
    req,
    res
) => {

    try {

        const result =
            await getAllCustomers(
                req.query
            );

        return res.status(200).json({

            success: true,

            message:
                "Customers fetched successfully.",

            data: result

        });

    } catch (error) {

        console.error(
            "Get customers error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                error.message

        });

    }
};


/*
|--------------------------------------------------------------------------
| Get Customer By ID
|--------------------------------------------------------------------------
*/

export const getCustomer = async (
    req,
    res
) => {

    try {

        const customer =
            await getCustomerById(
                req.params.id
            );

        return res.status(200).json({

            success: true,

            message:
                "Customer fetched successfully.",

            data: customer

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
| Block Customer
|--------------------------------------------------------------------------
*/

export const block = async (
    req,
    res
) => {

    try {

        const customer =
            await blockCustomer(

                req.params.id,

                req.body.reason

            );

        return res.status(200).json({

            success: true,

            message:
                "Customer blocked successfully.",

            data: customer

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
| Unblock Customer
|--------------------------------------------------------------------------
*/

export const unblock = async (
    req,
    res
) => {

    try {

        const customer =
            await unblockCustomer(
                req.params.id
            );

        return res.status(200).json({

            success: true,

            message:
                "Customer unblocked successfully.",

            data: customer

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
| Delete Customer
|--------------------------------------------------------------------------
*/

export const remove = async (
    req,
    res
) => {

    try {

        await deleteCustomer(
            req.params.id
        );

        return res.status(200).json({

            success: true,

            message:
                "Customer deleted successfully."

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }
};