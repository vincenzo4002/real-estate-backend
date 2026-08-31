import { PlatformSettings } from "./settings.model.js";
import { Banner } from "./banner.model.js";


/*
|--------------------------------------------------------------------------
| Get Platform Settings
|--------------------------------------------------------------------------
*/

export const getSettings = async () => {

    let settings =
        await PlatformSettings.findOne();


    if (!settings) {

        settings =
            await PlatformSettings.create({

                platformName:
                    "Real Estate Platform",

                currency:
                    "INR"

            });

    }


    return settings;
};


/*
|--------------------------------------------------------------------------
| Update Platform Settings
|--------------------------------------------------------------------------
*/

export const updateSettings = async (
    data
) => {

    let settings =
        await PlatformSettings.findOne();


    if (!settings) {

        settings =
            await PlatformSettings.create(
                data
            );

    } else {

        Object.keys(data).forEach(
            (key) => {

                if (
                    data[key] !== undefined
                ) {

                    settings[key] =
                        data[key];

                }

            }
        );


        await settings.save();

    }


    return settings;
};


/*
|--------------------------------------------------------------------------
| Create Banner
|--------------------------------------------------------------------------
*/

export const createBanner = async (
    adminId,
    data
) => {

    if (!data.title) {

        throw new Error(
            "Banner title is required."
        );

    }


    if (!data.image) {

        throw new Error(
            "Banner image is required."
        );

    }


    const banner =
        await Banner.create({

            title:
                data.title,

            description:
                data.description || "",

            image:
                data.image,

            redirectUrl:
                data.redirectUrl || "",

            isActive:
                data.isActive !== undefined
                    ? data.isActive
                    : true,

            displayOrder:
                Number(
                    data.displayOrder || 0
                ),

            startDate:
                data.startDate || null,

            endDate:
                data.endDate || null,

            createdBy:
                adminId

        });


    return banner;
};


/*
|--------------------------------------------------------------------------
| Get All Banners
|--------------------------------------------------------------------------
*/

export const getAllBanners = async (
    includeInactive = true
) => {

    const filter = {};


    if (!includeInactive) {

        filter.isActive = true;

    }


    return await Banner.find(
        filter
    )
        .populate(
            "createdBy",
            "name email"
        )
        .sort({

            displayOrder: 1,

            createdAt: -1

        });
};


/*
|--------------------------------------------------------------------------
| Get Active Banners
|--------------------------------------------------------------------------
*/

export const getActiveBanners = async () => {

    const now =
        new Date();


    return await Banner.find({

        isActive: true,

        $and: [

            {

                $or: [

                    {
                        startDate: null
                    },

                    {
                        startDate: {
                            $lte: now
                        }
                    }

                ]

            },

            {

                $or: [

                    {
                        endDate: null
                    },

                    {
                        endDate: {
                            $gte: now
                        }
                    }

                ]

            }

        ]

    })
        .sort({

            displayOrder: 1,

            createdAt: -1

        });
};


/*
|--------------------------------------------------------------------------
| Get Banner By ID
|--------------------------------------------------------------------------
*/

export const getBannerById = async (
    bannerId
) => {

    const banner =
        await Banner.findById(
            bannerId
        )
            .populate(
                "createdBy",
                "name email"
            );


    if (!banner) {

        throw new Error(
            "Banner not found."
        );

    }


    return banner;
};


/*
|--------------------------------------------------------------------------
| Update Banner
|--------------------------------------------------------------------------
*/

export const updateBanner = async (
    bannerId,
    data
) => {

    const banner =
        await Banner.findById(
            bannerId
        );


    if (!banner) {

        throw new Error(
            "Banner not found."
        );

    }


    const allowedFields = [

        "title",

        "description",

        "image",

        "redirectUrl",

        "isActive",

        "displayOrder",

        "startDate",

        "endDate"

    ];


    allowedFields.forEach(
        (field) => {

            if (
                data[field] !== undefined
            ) {

                banner[field] =
                    data[field];

            }

        }
    );


    await banner.save();


    return banner;
};


/*
|--------------------------------------------------------------------------
| Delete Banner
|--------------------------------------------------------------------------
*/

export const deleteBanner = async (
    bannerId
) => {

    const banner =
        await Banner.findByIdAndDelete(
            bannerId
        );


    if (!banner) {

        throw new Error(
            "Banner not found."
        );

    }


    return {

        message:
            "Banner deleted successfully."

    };
};


/*
|--------------------------------------------------------------------------
| Toggle Banner
|--------------------------------------------------------------------------
*/

export const toggleBanner = async (
    bannerId
) => {

    const banner =
        await Banner.findById(
            bannerId
        );


    if (!banner) {

        throw new Error(
            "Banner not found."
        );

    }


    banner.isActive =
        !banner.isActive;


    await banner.save();


    return banner;
};