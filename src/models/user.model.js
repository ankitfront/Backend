import mongoose,{ Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        trim:true,
        index: true, //adding index for faster search
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        trim:true, 
    },
    fullname:{
        type: String,
        required: true,
        trim:true,
        index: true, 
    },
    avatar:{
        type:String,
        required:true,
    },coverImage:{
        type:String,//cloudinary url
    },
    watchHistory:[{ // it is an array because we store multiple videos
        type: Schema.Types.ObjectId,
        ref: 'Video',
    }],
    password:{
        type: String,
        required: [true,'Password is required'],
    },
    refreshToken:{
        type: String,
    }
}, { timestamps: true }); // for createdAt and updatedAt fields
 

userSchema.pre("save",async function(next){ // pre is a hook which runs before saving the document. save triggers when you call
    if(!this.isModified('password')) return next(); // only hash the password if it has been modified (or is new)
    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){ // here this refers to the user document when they enter their password to login you get
    return await bcrypt.compare(password,this.password)// it comapres the password with the hashed password in database this method only return tru or false
}
userSchema.methods.generateAccessToken = function(){
    return jwt.sign( //jwt includes information that identifies the user
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:process.env.ACCESS_TOKEN_EXPIRY} // how long token will be valid
    )
}
userSchema.methods.generateRefreshToken = function () { // it get a new access token when the old one expires without asking user to login again
    return jwt.sign(
      {
        _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};

export const User = mongoose.model('User', userSchema); 