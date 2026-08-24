import {
    createProperty,
    getAllProperties,
    getPropertyById,
    updateProperty,
    deleteProperty,
    getFeaturedProperties,
    getLatestProperties,
    getMyProperties
} from "./property.service.js";

/**
 * Create Property
 */
export const create = async (req, res) => {
    try {

        const imageUrls = req.files
            ? req.files.map(file => file.path)
            : [];

        const property = await createProperty(
            req.user._id,
            req.body,
            imageUrls
        );

        res.status(201).json({
            success: true,
            message: "Property created successfully.",
            data: property
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

/**
 * Get All Properties
 */
export const getAll = async (req, res) => {

    try {

        const properties = await getAllProperties(req.query);

        res.status(200).json({

            success: true,

            data: properties

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/**
 * Get Property By ID
 */
export const getById = async (req, res) => {

    try {

        const property = await getPropertyById(req.params.id);

        res.status(200).json({

            success: true,

            data: property

        });

    } catch (error) {

        res.status(404).json({

            success: false,

            message: error.message

        });

    }

};

/**
 * Update Property
 */
export const update = async (req, res) => {

    try {

        const property = await updateProperty(

            req.params.id,

            req.user._id,

            req.body

        );

        res.status(200).json({

            success: true,

            message: "Property updated successfully.",

            data: property

        });

    } catch (error) {

        res.status(400).json({

            success: false,

            message: error.message

        });

    }

};

/**
 * Delete Property
 */
export const remove = async (req, res) => {

    try {

        await deleteProperty(

            req.params.id,

            req.user._id

        );

        res.status(200).json({

            success: true,

            message: "Property deleted successfully."

        });

    } catch (error) {

        res.status(400).json({

            success: false,

            message: error.message

        });

    }

};

/**
 * Featured Properties
 */
export const featured = async (req, res) => {

    try {

        const properties = await getFeaturedProperties();

        res.status(200).json({

            success: true,

            data: properties

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/**
 * Latest Properties
 */
export const latest = async (req, res) => {

    try {

        const properties = await getLatestProperties();

        res.status(200).json({

            success: true,

            data: properties

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/**
 * My Properties
 */
export const myProperties = async (req, res) => {

    try {

        const properties = await getMyProperties(req.user._id);

        res.status(200).json({

            success: true,

            data: properties

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};