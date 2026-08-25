import {
    addToWishlist,
    getWishlist,
    removeFromWishlist
} from "./wishlist.service.js";

export const add = async (req, res) => {

    try {

        const wishlist = await addToWishlist(

            req.user._id,

            req.params.propertyId

        );

        res.status(200).json({

            success: true,

            message: "Property added to wishlist.",

            data: wishlist

        });

    } catch (error) {

        res.status(400).json({

            success: false,

            message: error.message

        });

    }

};

export const list = async (req, res) => {

    try {

        const wishlist = await getWishlist(req.user._id);

        res.status(200).json({

            success: true,

            data: wishlist

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

export const remove = async (req, res) => {

    try {

        const wishlist = await removeFromWishlist(

            req.user._id,

            req.params.propertyId

        );

        res.status(200).json({

            success: true,

            message: "Property removed from wishlist.",

            data: wishlist

        });

    } catch (error) {

        res.status(400).json({

            success: false,

            message: error.message

        });

    }

};