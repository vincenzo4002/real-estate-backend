import mongoose from "mongoose";


const platformSettingsSchema =
    new mongoose.Schema(

        {

            /*
            |--------------------------------------------------------------------------
            | Platform Information
            |--------------------------------------------------------------------------
            */

            platformName: {

                type: String,

                default:
                    "Real Estate Platform",

                trim: true

            },

            platformEmail: {

                type: String,

                trim: true,

                lowercase: true

            },

            platformPhone: {

                type: String,

                trim: true

            },


            /*
            |--------------------------------------------------------------------------
            | Platform Status
            |--------------------------------------------------------------------------
            */

            maintenanceMode: {

                type: Boolean,

                default: false

            },


            /*
            |--------------------------------------------------------------------------
            | Property Settings
            |--------------------------------------------------------------------------
            */

            propertyApprovalRequired: {

                type: Boolean,

                default: true

            },

            allowPropertyListing: {

                type: Boolean,

                default: true

            },


            /*
            |--------------------------------------------------------------------------
            | Visit Settings
            |--------------------------------------------------------------------------
            */

            allowVisitScheduling: {

                type: Boolean,

                default: true

            },


            /*
            |--------------------------------------------------------------------------
            | Messaging Settings
            |--------------------------------------------------------------------------
            */

            allowMessaging: {

                type: Boolean,

                default: true

            },


            /*
            |--------------------------------------------------------------------------
            | Notification Settings
            |--------------------------------------------------------------------------
            */

            emailNotifications: {

                type: Boolean,

                default: true

            },

            pushNotifications: {

                type: Boolean,

                default: true

            },


            /*
            |--------------------------------------------------------------------------
            | Currency
            |--------------------------------------------------------------------------
            */

            currency: {

                type: String,

                default: "INR",

                trim: true

            }

        },

        {

            timestamps: true

        }

    );


export const PlatformSettings =
    mongoose.model(
        "PlatformSettings",
        platformSettingsSchema
    );