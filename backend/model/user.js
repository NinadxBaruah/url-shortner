const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  username:{
   type:String,
   required:true,
   unique:true
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// HAsh the password before saving

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password") || this.isNew("password")) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  } catch (error) {
    next(error);
  }
});

// defining method to compare pasword

userSchema.methods.comparePassword = function (candidatePassword , cb) {
   bcrypt.compare(candidatePassword , this.password , function(error , isMatch) {
    if(error) return cb(error)
    cb(null , isMatch)
   })
}
const User = mongoose.model("User", userSchema);

module.exports = User;
