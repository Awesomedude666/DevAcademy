import { clerkClient } from "@clerk/express";

// Middleware to protect Educator routes

export const protectEducator = async (req, res, next) => {
    try {
        const {userId} = req.auth();
        const response = await clerkClient.users.getUser(userId);
        // in this response we have all the user data, we can check if the user is an educator or not.
        if(response.publicMetadata.role === 'educator'){
            next(); // user is an educator, proceed to the next middleware or route handler(controller).
        } else {
            return res.json({success : false, message : 'Unauthorized Access'});
        }

    } catch (error) {
        res.json({success : false, message : error.message});
    }
}

