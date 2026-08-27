import { Visit } from "./visit.model.js";
import { Property } from "../properties/property.model.js";
import { createNotification } from "../notifications/notification.service.js";


/*
|--------------------------------------------------------------------------
| Schedule Property Visit
|--------------------------------------------------------------------------
*/

export const scheduleVisit = async (
    customerId,
    propertyId,
    data
) => {

    const property = await Property.findOne({
        _id: propertyId,
        isDeleted: false,
        status: "APPROVED"
    });

    if (!property) {
        throw new Error(
            "Property not found or not available."
        );
    }

    const visitDate = new Date(data.visitDate);

    if (isNaN(visitDate.getTime())) {
        throw new Error(
            "Invalid visit date."
        );
    }

    if (visitDate <= new Date()) {
        throw new Error(
            "Visit date must be in the future."
        );
    }

    if (!data.visitTime) {
        throw new Error(
            "Visit time is required."
        );
    }

    const existingVisit = await Visit.findOne({
        property: propertyId,
        visitDate: visitDate,
        visitTime: data.visitTime,
        status: {
            $in: [
                "PENDING",
                "CONFIRMED"
            ]
        }
    });

    if (existingVisit) {
        throw new Error(
            "This time slot is already booked."
        );
    }

    const visit = await Visit.create({

        property: propertyId,

        customer: customerId,

        owner: property.owner,

        visitDate: visitDate,

        visitTime: data.visitTime,

        message: data.message || "",

        status: "PENDING"

    });

    try {

        await createNotification({

            recipient: property.owner,

            type: "VISIT_SCHEDULED",

            title: "New Property Visit",

            message:
                `A customer has scheduled a visit for ${property.title}.`,

            property: property._id,

            visit: visit._id,

            metadata: {
                visitDate: data.visitDate,
                visitTime: data.visitTime
            }

        });

    } catch (notificationError) {

        console.error(
            "Failed to create visit notification:",
            notificationError.message
        );

    }

    return await Visit.findById(
        visit._id
    )
        .populate(
            "property",
            "title price images location"
        )
        .populate(
            "customer",
            "name email phone"
        )
        .populate(
            "owner",
            "name email phone"
        );
};


/*
|--------------------------------------------------------------------------
| Get Customer Visits
|--------------------------------------------------------------------------
*/

export const getMyVisits = async (
    customerId
) => {

    return await Visit.find({
        customer: customerId
    })
        .populate(
            "property",
            "title price images location"
        )
        .populate(
            "owner",
            "name email phone"
        )
        .sort({
            visitDate: -1
        });
};


/*
|--------------------------------------------------------------------------
| Get Visit By ID
|--------------------------------------------------------------------------
*/

export const getVisitById = async (
    visitId,
    userId
) => {

    const visit = await Visit.findById(
        visitId
    )
        .populate(
            "property",
            "title price images location"
        )
        .populate(
            "customer",
            "name email phone"
        )
        .populate(
            "owner",
            "name email phone"
        );

    if (!visit) {
        throw new Error(
            "Visit not found."
        );
    }

    const isCustomer =
        visit.customer._id.toString() ===
        userId.toString();

    const isOwner =
        visit.owner._id.toString() ===
        userId.toString();

    if (!isCustomer && !isOwner) {
        throw new Error(
            "You are not authorized to view this visit."
        );
    }

    return visit;
};


/*
|--------------------------------------------------------------------------
| Cancel Visit
|--------------------------------------------------------------------------
*/

export const cancelVisit = async (
    visitId,
    userId,
    reason
) => {

    const visit = await Visit.findById(
        visitId
    )
        .populate(
            "property",
            "title"
        );

    if (!visit) {
        throw new Error(
            "Visit not found."
        );
    }

    const isCustomer =
        visit.customer.toString() ===
        userId.toString();

    const isOwner =
        visit.owner.toString() ===
        userId.toString();

    if (!isCustomer && !isOwner) {
        throw new Error(
            "You are not authorized to cancel this visit."
        );
    }

    if (visit.status === "CANCELLED") {
        throw new Error(
            "Visit is already cancelled."
        );
    }

    if (visit.status === "COMPLETED") {
        throw new Error(
            "Completed visit cannot be cancelled."
        );
    }

    visit.status = "CANCELLED";

    visit.cancellationReason =
        reason || "Cancelled by user";

    await visit.save();

    const recipient = isCustomer
        ? visit.owner
        : visit.customer;

    try {

        await createNotification({

            recipient,

            type: "VISIT_CANCELLED",

            title: "Visit Cancelled",

            message:
                `The property visit for ${visit.property.title} has been cancelled.`,

            property: visit.property._id,

            visit: visit._id,

            metadata: {
                reason: visit.cancellationReason
            }

        });

    } catch (notificationError) {

        console.error(
            "Failed to create cancellation notification:",
            notificationError.message
        );

    }

    return visit;
};


/*
|--------------------------------------------------------------------------
| Confirm Visit
|--------------------------------------------------------------------------
*/

export const confirmVisit = async (
    visitId,
    ownerId
) => {

    const visit = await Visit.findById(
        visitId
    )
        .populate(
            "property",
            "title"
        );

    if (!visit) {
        throw new Error(
            "Visit not found."
        );
    }

    if (
        visit.owner.toString() !==
        ownerId.toString()
    ) {
        throw new Error(
            "Only the property owner can confirm this visit."
        );
    }

    if (visit.status !== "PENDING") {
        throw new Error(
            "Only pending visits can be confirmed."
        );
    }

    visit.status = "CONFIRMED";

    await visit.save();

    try {

        await createNotification({

            recipient: visit.customer,

            type: "VISIT_CONFIRMED",

            title: "Visit Confirmed",

            message:
                `Your visit for ${visit.property.title} has been confirmed.`,

            property: visit.property._id,

            visit: visit._id,

            metadata: {
                visitDate: visit.visitDate,
                visitTime: visit.visitTime
            }

        });

    } catch (notificationError) {

        console.error(
            "Failed to create confirmation notification:",
            notificationError.message
        );

    }

    return visit;
};


/*
|--------------------------------------------------------------------------
| Complete Visit
|--------------------------------------------------------------------------
*/

export const completeVisit = async (
    visitId,
    ownerId
) => {

    const visit = await Visit.findById(
        visitId
    )
        .populate(
            "property",
            "title"
        );

    if (!visit) {
        throw new Error(
            "Visit not found."
        );
    }

    if (
        visit.owner.toString() !==
        ownerId.toString()
    ) {
        throw new Error(
            "Only the property owner can complete this visit."
        );
    }

    if (visit.status !== "CONFIRMED") {
        throw new Error(
            "Only confirmed visits can be completed."
        );
    }

    visit.status = "COMPLETED";

    await visit.save();

    try {

        await createNotification({

            recipient: visit.customer,

            type: "PROPERTY_UPDATED",

            title: "Property Visit Completed",

            message:
                `Your visit for ${visit.property.title} has been completed.`,

            property: visit.property._id,

            visit: visit._id

        });

    } catch (notificationError) {

        console.error(
            "Failed to create completion notification:",
            notificationError.message
        );

    }

    return visit;
};


/*
|--------------------------------------------------------------------------
| Get Owner Visits
|--------------------------------------------------------------------------
*/

export const getOwnerVisits = async (
    ownerId
) => {

    return await Visit.find({
        owner: ownerId
    })
        .populate(
            "property",
            "title price images location"
        )
        .populate(
            "customer",
            "name email phone"
        )
        .sort({
            visitDate: -1
        });
};