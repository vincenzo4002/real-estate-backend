import {
    getProfile,
    updateProfile,
    changePassword
} from "./user.service.js";

export const profile = async (req, res) => {

    try {

        const user = await getProfile(req.user._id);

        res.json({
            success: true,
            data: user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const update = async (req, res) => {

    try {

        const user = await updateProfile(
            req.user._id,
            req.body
        );

        res.json({
            success: true,
            message: "Profile updated successfully.",
            data: user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const updatePassword = async (req, res) => {

    try {

        const {
            oldPassword,
            newPassword
        } = req.body;

        await changePassword(
            req.user._id,
            oldPassword,
            newPassword
        );

        res.json({
            success: true,
            message: "Password changed successfully."
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};