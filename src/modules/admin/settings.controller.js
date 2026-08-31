import {
    getSettings,
    updateSettings,
    createBanner,
    getAllBanners,
    getActiveBanners,
    getBannerById,
    updateBanner,
    deleteBanner,
    toggleBanner
} from "./settings.service.js";


/*
|--------------------------------------------------------------------------
| Platform Settings
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| Get Settings
|--------------------------------------------------------------------------
*/

export const settings = async (
    req,
    res
) => {

    try {

        const data =
            await getSettings();

        return res.status(200).json({

            success: true,

            message:
                "Platform settings fetched successfully.",

            data

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
                error.message

        });

    }
};


/*
|--------------------------------------------------------------------------
| Update Settings
|--------------------------------------------------------------------------
*/

export const update = async (
    req,
    res
) => {

    try {

        const data =
            await updateSettings(
                req.body
            );

        return res.status(200).json({

            success: true,

            message:
                "Platform settings updated successfully.",

            data

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
| Banner Management
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| Create Banner
|--------------------------------------------------------------------------
*/

export const create = async (
    req,
    res
) => {

    try {

        const banner =
            await createBanner(

                req.admin._id,

                req.body

            );

        return res.status(201).json({

            success: true,

            message:
                "Banner created successfully.",

            data:
                banner

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
| Get All Banners
|--------------------------------------------------------------------------
*/

export const banners = async (
    req,
    res
) => {

    try {

        const includeInactive =
            req.query.includeInactive !==
            "false";


        const data =
            await getAllBanners(
                includeInactive
            );

        return res.status(200).json({

            success: true,

            message:
                "Banners fetched successfully.",

            data

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
                error.message

        });

    }
};


/*
|--------------------------------------------------------------------------
| Get Active Banners
|--------------------------------------------------------------------------
*/

export const activeBanners = async (
    req,
    res
) => {

    try {

        const data =
            await getActiveBanners();


        return res.status(200).json({

            success: true,

            message:
                "Active banners fetched successfully.",

            data

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
                error.message

        });

    }
};


/*
|--------------------------------------------------------------------------
| Get Banner By ID
|--------------------------------------------------------------------------
*/

export const banner = async (
    req,
    res
) => {

    try {

        const data =
            await getBannerById(
                req.params.id
            );


        return res.status(200).json({

            success: true,

            message:
                "Banner fetched successfully.",

            data

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
| Update Banner
|--------------------------------------------------------------------------
*/

export const updateBannerController = async (
    req,
    res
) => {

    try {

        const data =
            await updateBanner(

                req.params.id,

                req.body

            );


        return res.status(200).json({

            success: true,

            message:
                "Banner updated successfully.",

            data

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
| Delete Banner
|--------------------------------------------------------------------------
*/

export const removeBanner = async (
    req,
    res
) => {

    try {

        const data =
            await deleteBanner(
                req.params.id
            );


        return res.status(200).json({

            success: true,

            message:
                data.message

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
| Toggle Banner
|--------------------------------------------------------------------------
*/

export const toggle = async (
    req,
    res
) => {

    try {

        const data =
            await toggleBanner(
                req.params.id
            );


        return res.status(200).json({

            success: true,

            message:
                "Banner status updated successfully.",

            data

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }
};