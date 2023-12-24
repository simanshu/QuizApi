const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

//define user schema
const usershema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    roll:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
// Encrypt password
usershema.pre("save", async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  
});

// Sign JWT and return
usershema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, 'secret', {
      expiresIn: '120m'
    });
  };
  
  // Match user password to hashed password in database
  usershema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User=mongoose.model('User',usershema);
module.exports=User;