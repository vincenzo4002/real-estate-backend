import { User } from "../auth/user.model.js";


/*
|--------------------------------------------------------------------------
| Super Admin Authorization
|--------------------------------------------------------------------------
*/

export const adminOnly = async (
    req,
    res,
    next
) => {

    try {

        if (!req.user) {

            return res.status(401).json({

                success: false,

                message:
                    "Authentication required."

            });

        }


        const user = await User.findById(
            req.user._id
        ).select(
            "role isBlocked isDeleted"
        );


        if (!user) {

            return res.status(404).json({

                success: false,

                message:
                    "User not found."

            });

        }


        if (user.isDeleted) {

            return res.status(403).json({

                success: false,

                message:
                    "User account has been deleted."

            });

        }


        if (user.isBlocked) {

            return res.status(403).json({

                success: false,

                message:
                    "User account is blocked."

            });

        }


        if (
            user.role !== "SUPER_ADMIN"
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "Access denied. Super Admin privileges required."

            });

        }


        req.admin = user;

        next();

    } catch (error) {

        console.error(
            "Admin authorization error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Failed to verify admin authorization.",

            error:
                error.message

        });

    }
};