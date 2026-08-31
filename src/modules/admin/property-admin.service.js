import { Property } from "../properties/property.model.js";
import { createNotification } from "../notifications/notification.service.js";


/*
|--------------------------------------------------------------------------
| Get All Properties For Admin
|--------------------------------------------------------------------------
*/

export const getAllPropertiesForAdmin = async (
    query = {}
) => {

    const {
        status,
        search,
        page = 1,
        limit = 10
    } = query;


    const filter = {
        isDeleted: {
            $ne: true
        }
    };


    if (status) {
        filter.status = status;
    }


    if (search) {

        filter.$or = [

            {
                title: {
                    $regex: search,
                    $options: "i"
                }
            },

            {
                description: {
                    $regex: search,
                    $options: "i"
                }
            },

            {
                "location.city": {
                    $regex: search,
                    $options: "i"
                }
            }

        ];

    }


    const skip =
        (Number(page) - 1) *
        Number(limit);


    const [
        properties,
        total
    ] = await Promise.all([

        Property.find(filter)

            .populate(
                "owner",
                "name email phone"
            )

            .sort({
                createdAt: -1
            })

            .skip(skip)

            .limit(Number(limit)),

        Property.countDocuments(filter)

    ]);


    return {

        properties,

        pagination: {

            total,

            page: Number(page),

            limit: Number(limit),

            totalPages:
                Math.ceil(
                    total / Number(limit)
                )

        }

    };
};


/*
|--------------------------------------------------------------------------
| Get Property By ID
|--------------------------------------------------------------------------
*/

export const getPropertyForAdmin = async (
    propertyId
) => {

    const property =
        await Property.findOne({

            _id: propertyId,

            isDeleted: {
                $ne: true
            }

        })
            .populate(
                "owner",
                "name email phone"
            );


    if (!property) {
        throw new Error(
            "Property not found."
        );
    }


    return property;
};


/*
|--------------------------------------------------------------------------
| Approve Property
|--------------------------------------------------------------------------
*/

export const approveProperty = async (
    propertyId
) => {

    const property =
        await Property.findOne({

            _id: propertyId,

            isDeleted: {
                $ne: true
            }

        });


    if (!property) {
        throw new Error(
            "Property not found."
        );
    }


    if (property.status === "APPROVED") {
        throw new Error(
            "Property is already approved."
        );
    }


    property.status = "APPROVED";

    await property.save();


    /*
    |--------------------------------------------------------------------------
    | Notify Owner
    |--------------------------------------------------------------------------
    */

    try {

        await createNotification({

            recipient: property.owner,

            type: "PROPERTY_UPDATED",

            title: "Property Approved",

            message:
                `Your property "${property.title}" has been approved.`,

            property: property._id

        });

    } catch (error) {

        console.error(
            "Property approval notification failed:",
            error.message
        );

    }


    return property;
};


/*
|--------------------------------------------------------------------------
| Reject Property
|--------------------------------------------------------------------------
*/

export const rejectProperty = async (
    propertyId,
    reason
) => {

    const property =
        await Property.findOne({

            _id: propertyId,

            isDeleted: {
                $ne: true
            }

        });


    if (!property) {
        throw new Error(
            "Property not found."
        );
    }


    property.status = "REJECTED";

    property.rejectionReason =
        reason || "Property rejected by administrator";


    await property.save();


    /*
    |--------------------------------------------------------------------------
    | Notify Owner
    |--------------------------------------------------------------------------
    */

    try {

        await createNotification({

            recipient: property.owner,

            type: "PROPERTY_UPDATED",

            title: "Property Rejected",

            message:
                `Your property "${property.title}" has been rejected.`,

            property: property._id,

            metadata: {

                reason:
                    property.rejectionReason

            }

        });

    } catch (error) {

        console.error(
            "Property rejection notification failed:",
            error.message
        );

    }


    return property;
};


/*
|--------------------------------------------------------------------------
| Remove Property
|--------------------------------------------------------------------------
*/

export const removeProperty = async (
    propertyId
) => {

    const property =
        await Property.findOne({

            _id: propertyId,

            isDeleted: {
                $ne: true
            }

        });


    if (!property) {
        throw new Error(
            "Property not found."
        );
    }


    property.isDeleted = true;

    await property.save();


    /*
    |--------------------------------------------------------------------------
    | Notify Owner
    |--------------------------------------------------------------------------
    */

    try {

        await createNotification({

            recipient: property.owner,

            type: "PROPERTY_UPDATED",

            title: "Property Removed",

            message:
                `Your property "${property.title}" has been removed from the platform.`,

            property: property._id

        });

    } catch (error) {

        console.error(
            "Property removal notification failed:",
            error.message
        );

    }


    return property;
};