import { User } from "../users/user.model.js";
import { createNotification } from "../notifications/notification.service.js";


/*
|--------------------------------------------------------------------------
| Get All Customers
|--------------------------------------------------------------------------
*/

export const getAllCustomers = async (
    query = {}
) => {

    const {
        search,
        status,
        page = 1,
        limit = 10
    } = query;


    const filter = {

        role: "CUSTOMER",

        isDeleted: {
            $ne: true
        }

    };


    /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

    if (search) {

        filter.$or = [

            {
                name: {
                    $regex: search,
                    $options: "i"
                }
            },

            {
                email: {
                    $regex: search,
                    $options: "i"
                }
            },

            {
                phone: {
                    $regex: search,
                    $options: "i"
                }
            }

        ];

    }


    /*
    |--------------------------------------------------------------------------
    | Status Filter
    |--------------------------------------------------------------------------
    */

    if (status === "BLOCKED") {

        filter.isBlocked = true;

    }

    if (status === "ACTIVE") {

        filter.isBlocked = {
            $ne: true
        };

    }


    const pageNumber =
        Math.max(
            Number(page),
            1
        );


    const limitNumber =
        Math.max(
            Number(limit),
            1
        );


    const skip =
        (pageNumber - 1) *
        limitNumber;


    const [
        customers,
        total
    ] = await Promise.all([

        User.find(filter)

            .select(
                "-password"
            )

            .sort({
                createdAt: -1
            })

            .skip(skip)

            .limit(limitNumber),

        User.countDocuments(
            filter
        )

    ]);


    return {

        customers,

        pagination: {

            total,

            page:
                pageNumber,

            limit:
                limitNumber,

            totalPages:
                Math.ceil(
                    total /
                    limitNumber
                )

        }

    };
};


/*
|--------------------------------------------------------------------------
| Get Customer By ID
|--------------------------------------------------------------------------
*/

export const getCustomerById = async (
    customerId
) => {

    const customer =
        await User.findOne({

            _id: customerId,

            role: "CUSTOMER",

            isDeleted: {
                $ne: true
            }

        })
            .select(
                "-password"
            );


    if (!customer) {

        throw new Error(
            "Customer not found."
        );

    }


    return customer;
};


/*
|--------------------------------------------------------------------------
| Block Customer
|--------------------------------------------------------------------------
*/

export const blockCustomer = async (
    customerId,
    reason
) => {

    const customer =
        await User.findOne({

            _id: customerId,

            role: "CUSTOMER",

            isDeleted: {
                $ne: true
            }

        });


    if (!customer) {

        throw new Error(
            "Customer not found."
        );

    }


    if (customer.isBlocked) {

        throw new Error(
            "Customer is already blocked."
        );

    }


    customer.isBlocked = true;

    customer.blockReason =
        reason ||
        "Blocked by administrator";


    customer.blockedAt =
        new Date();


    await customer.save();


    /*
    |--------------------------------------------------------------------------
    | Notify Customer
    |--------------------------------------------------------------------------
    */

    try {

        await createNotification({

            recipient:
                customer._id,

            type:
                "ANNOUNCEMENT",

            title:
                "Account Blocked",

            message:
                "Your account has been blocked by the administrator.",

            metadata: {

                reason:
                    customer.blockReason

            }

        });

    } catch (error) {

        console.error(
            "Block notification failed:",
            error.message
        );

    }


    return await User.findById(
        customer._id
    )
        .select(
            "-password"
        );
};


/*
|--------------------------------------------------------------------------
| Unblock Customer
|--------------------------------------------------------------------------
*/

export const unblockCustomer = async (
    customerId
) => {

    const customer =
        await User.findOne({

            _id: customerId,

            role: "CUSTOMER",

            isDeleted: {
                $ne: true
            }

        });


    if (!customer) {

        throw new Error(
            "Customer not found."
        );

    }


    if (!customer.isBlocked) {

        throw new Error(
            "Customer is not blocked."
        );

    }


    customer.isBlocked = false;

    customer.blockReason = null;

    customer.blockedAt = null;


    await customer.save();


    /*
    |--------------------------------------------------------------------------
    | Notify Customer
    |--------------------------------------------------------------------------
    */

    try {

        await createNotification({

            recipient:
                customer._id,

            type:
                "ANNOUNCEMENT",

            title:
                "Account Unblocked",

            message:
                "Your account has been unblocked. You can now access the platform.",

            metadata: {

                action:
                    "ACCOUNT_UNBLOCKED"

            }

        });

    } catch (error) {

        console.error(
            "Unblock notification failed:",
            error.message
        );

    }


    return await User.findById(
        customer._id
    )
        .select(
            "-password"
        );
};


/*
|--------------------------------------------------------------------------
| Delete Customer
|--------------------------------------------------------------------------
*/

export const deleteCustomer = async (
    customerId
) => {

    const customer =
        await User.findOne({

            _id: customerId,

            role: "CUSTOMER",

            isDeleted: {
                $ne: true
            }

        });


    if (!customer) {

        throw new Error(
            "Customer not found."
        );

    }


    customer.isDeleted = true;

    customer.deletedAt =
        new Date();


    await customer.save();


    return {

        message:
            "Customer deleted successfully."

    };
};