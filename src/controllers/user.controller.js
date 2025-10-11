import { asyncHandler } from "../utils/async-Handler.js";

const registerUser = asyncHandler( async(req,res) =>{
    res.status(200).json({
        
        message:" yes i want to be an army man"
    })
})

export { registerUser }