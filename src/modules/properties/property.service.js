import { Property } from "./property.model.js";

/**
 * Create Property
 */
export const createProperty = async (userId, data, imageUrls = []) => {

    const property = await Property.create({

        title: data.title,

        description: data.description,

        category: data.category,

        listingType: data.listingType,

        price: data.price,

        location: {
            city: data.location.city,
            state: data.location.state,
            address: data.location.address,
            coordinates: data.location.coordinates || {}
        },

        area: data.area,

        bedrooms: data.bedrooms || 0,

        bathrooms: data.bathrooms || 0,

        amenities: data.amenities || [],

        images: imageUrls,

        owner: userId

    });

    return property;

};

/**
 * Get All Approved Properties
 */
export const getAllProperties = async (query) => {

    const page = Number(query.page) || 1;

    const limit = Number(query.limit) || 10;

    const skip = (page - 1) * limit;

    const filter = {

        isDeleted: false,

        status: "APPROVED"

    };

    if (query.city) {

        filter["location.city"] = new RegExp(query.city, "i");

    }

    if (query.state) {

        filter["location.state"] = new RegExp(query.state, "i");

    }

    if (query.category) {

        filter.category = query.category;

    }

    if (query.listingType) {

        filter.listingType = query.listingType;

    }

    if (query.minPrice || query.maxPrice) {

        filter.price = {};

        if (query.minPrice) {

            filter.price.$gte = Number(query.minPrice);

        }

        if (query.maxPrice) {

            filter.price.$lte = Number(query.maxPrice);

        }

    }

    const properties = await Property.find(filter)

        .populate("owner", "name phone email")

        .sort({ createdAt: -1 })

        .skip(skip)

        .limit(limit);

    const total = await Property.countDocuments(filter);

    return {

        total,

        currentPage: page,

        totalPages: Math.ceil(total / limit),

        properties

    };

};

/**
 * Get Property By ID
 */
export const getPropertyById = async (id) => {

    const property = await Property.findOne({

        _id: id,

        isDeleted: false

    }).populate("owner", "name email phone");

    if (!property) {

        throw new Error("Property not found");

    }

    property.views += 1;

    await property.save();

    return property;

};

/**
 * Update Property
 */
export const updateProperty = async (id, userId, data) => {

    const property = await Property.findById(id);

    if (!property || property.isDeleted) {

        throw new Error("Property not found");

    }

    if (property.owner.toString() !== userId.toString()) {

        throw new Error("Unauthorized");

    }

    property.title = data.title ?? property.title;

    property.description = data.description ?? property.description;

    property.category = data.category ?? property.category;

    property.listingType = data.listingType ?? property.listingType;

    property.price = data.price ?? property.price;

    property.area = data.area ?? property.area;

    property.bedrooms = data.bedrooms ?? property.bedrooms;

    property.bathrooms = data.bathrooms ?? property.bathrooms;

    property.amenities = data.amenities ?? property.amenities;

    if (data.location) {

        property.location.city =
            data.location.city ?? property.location.city;

        property.location.state =
            data.location.state ?? property.location.state;

        property.location.address =
            data.location.address ?? property.location.address;

        property.location.coordinates =
            data.location.coordinates ??
            property.location.coordinates;

    }

    await property.save();

    return property;

};

/**
 * Soft Delete Property
 */
export const deleteProperty = async (id, userId) => {

    const property = await Property.findById(id);

    if (!property || property.isDeleted) {

        throw new Error("Property not found");

    }

    if (property.owner.toString() !== userId.toString()) {

        throw new Error("Unauthorized");

    }

    property.isDeleted = true;

    await property.save();

    return true;

};

/**
 * Featured Properties
 */
export const getFeaturedProperties = async () => {

    return await Property.find({

        featured: true,

        status: "APPROVED",

        isDeleted: false

    })

    .populate("owner", "name phone")

    .limit(8);

};

/**
 * Latest Properties
 */
export const getLatestProperties = async () => {

    return await Property.find({

        status: "APPROVED",

        isDeleted: false

    })

    .sort({ createdAt: -1 })

    .limit(10);

};

/**
 * Properties Added By Logged-in User
 */
export const getMyProperties = async (userId) => {

    return await Property.find({

        owner: userId,

        isDeleted: false

    }).sort({

        createdAt: -1

    });

};