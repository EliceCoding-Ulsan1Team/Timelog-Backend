const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true, //띄어쓰기 방지
        unique: 1,
    },
    id: {
        type: String,
        maxlength: 20,
        unique: 1,
    },
    password: {
        type: String,
        minlength: 6,
    },
    // role: {
    //     type: Number,
    //     defalt: 0
    // },
    // lastname: {
    //     type: String,
    //     maxlength:50
    // },
    // image: String,
    token: {
        type: String,
      },
      tokenExp: {
        type: Number,
      },
});


// DB 암호화(const salt)
userSchema.pre("save", function ( next ) {
    // 비밀번호 암호화 시킨다.
    let user = this;
    if (user.isModified("password")) {
      bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) return next(err);
  
        bcrypt.hash(user.password, salt, function (err, hash) {
          if (err) return next(err);
  
          user.password = hash;
          next();
        });
      });
    } 
    else {
      next();
    }
  });
  
  userSchema.methods.comparePassword = function (plainPassword, cb) {
    //plainPassword 123456 암호화된 비밀번호 $2b$10$IavgZqOzd2uPlPr4kSPPb.lZ7l
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  };

  //gpt(수정) 6.0 callback 미지원(231019)
  userSchema.methods.generateToken = function () {
    const user = this;
    // jwt 이용 토큰 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken');
    user.token = token;
  
    return user.save() // .save() 메서드를 프로미스를 반환하도록 수정
      .then((user) => user)
      .catch((err) => {
        throw err; // 오류를 던지고 나중에 처리할 수 있도록 수정
      });
  };


//   userSchema.statics.findByToken = function (token, cb) {
//     var user = this;
//     ///토큰을 decode한다
//     jwt.verify(token, "secretToken", function (err, decoded) {
//       // 유저 아이디를 이용해서 유저를 찾은 다음에
//       // 클라이언트에서 가져온 토큰과 db에 보관된 토큰이 일치하는지 확인
  
//       user.findOne({ _id: decoded, token: token }, function (err, user) {
//         if (err) return cb(err);
//         cb(null, user);
//       });
//     });
//   };

//gpt 6.0 callback 지원x(231019)
userSchema.statics.findByToken = function (token) {
    const User = this;
    return new Promise((resolve, reject) => {
      jwt.verify(token, "secretToken", (err, decoded) => {
        if (err) return reject(err);
        User.findOne({ _id: decoded, token: token })
          .exec() // .exec()를 사용하여 프로미스를 반환
          .then((user) => resolve(user))
          .catch((err) => reject(err));
      });
    });
  };


  //gpt 내용추가 (231019)
  userSchema.statics.findOneAndUpdateWithToken = function (_id, token) {
    const User = this;
    return new Promise((resolve, reject) => {
      User.findOneAndUpdate({ _id, token }, { token: "" }, { new: true })
        .exec()
        .then((user) => {
          if (!user) reject("User not found or token update failed");
          resolve(user);
        })
        .catch((err) => reject(err));
    });
  };
  
  

const User = mongoose.model("User", userSchema);

module.exports = { User };