import { Wishlist } from "./wishlist.model.js";
import { Property } from "../properties/property.model.js";

export const addToWishlist = async (userId, propertyId) => {

    const property = await Property.findById(propertyId);

    if (!property) {
        throw new Error("Property not found");
    }

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {

        wishlist = await Wishlist.create({

            user: userId,

            properties: [propertyId]

        });

        return wishlist;
    }

    if (wishlist.properties.includes(propertyId)) {
        throw new Error("Property already exists in wishlist");
    }

    wishlist.properties.push(propertyId);

    await wishlist.save();

    return wishlist;
};

export const getWishlist = async (userId) => {

    return await Wishlist.findOne({

        user: userId

    }).populate({

        path: "properties",

        populate: {

            path: "owner",

            select: "name phone"

        }

    });

};

export const removeFromWishlist = async (
    userId,
    propertyId
) => {

    const wishlist = await Wishlist.findOne({

        user: userId

    });

    if (!wishlist) {

        throw new Error("Wishlist not found");

    }

    wishlist.properties = wishlist.properties.filter(

        property => property.toString() !== propertyId

    );

    await wishlist.save();

    return wishlist;

};