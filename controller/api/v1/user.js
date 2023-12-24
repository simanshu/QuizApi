const User = require("../../../models/user");


//Register a User
module.exports.register=async(req,res)=>{
    try{
        let user = await User.create(req.body);
        //Return Response
        res.status(201).json({
            sucess:true,
            body:user,
            msg:'User Got Register Sucessfully'
        });

    }catch(e){
        console.log(e);
        //Error handling
        res.status(400).json({
            sucess:false,
            msg:'Error Occoured'
        });
    }
};
//User log in
module.exports.login= async (req, res)=>{
    try {
  
      let { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ 
          success: false,
          msg:'No email or password'
        });
      }
  
      let user = await User.findOne({ email: email });
      if (!user) {
        return res.status(401).json({ 
          success: false, 
          msg: "Invalid Username or Password!" 
        });
      }
  
      // Check if password matches
      const isMatch = await user.matchPassword(password);
      // Error handling if invalid password
      if (!isMatch) {
        return res.status(401).json({ 
          success: false, 
          msg: "Invalid Username or Password!" 
        });
      }
  
      // Get JWT token
      const token = user.getSignedJwtToken();
  
      // Return response
      res.status(200).json({
        success: true,
        token,
        msg: `Log In Sucessful! Keep the Token safe ${user.name}!`
      });
  
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        msg:'Error Occoured!'
      });
    }
  }
