import bcrypt from "bcryptjs";
import { User } from "../auth/user.model.js";

export const getProfile = async (userId) => {

    return await User.findById(userId).select("-password");

};

export const updateProfile = async (userId, data) => {

    const updatedUser = await User.findByIdAndUpdate(

        userId,

        {
            name: data.name,
            phone: data.phone,
            profileImage: data.profileImage
        },

        {
            new: true
        }

    ).select("-password");

    return updatedUser;

};

export const changePassword = async (
    userId,
    oldPassword,
    newPassword
) => {

    const user = await User.findById(userId);

    const isMatch = await bcrypt.compare(
        oldPassword,
        user.password
    );

    if (!isMatch) {
        throw new Error("Old password is incorrect.");
    }

    const hashedPassword = await bcrypt.hash(
        newPassword,
        10
    );

    user.password = hashedPassword;

    await user.save();

    return true;
};