import {
    registerUser,
    loginUser
}
from "./auth.service.js";





// REGISTER


export const register = async(
req,
res
)=>{


try{


const result =
await registerUser(
    req.body
);



res.status(201).json({

success:true,

message:
"Registration successful",

data:result

});


}

catch(error){


res.status(400).json({

success:false,

message:error.message

});


}


};






// LOGIN


export const login = async(
req,
res
)=>{


try{


const {
email,
password
}
=
req.body;



const result =
await loginUser(
email,
password
);



res.status(200).json({

success:true,

message:
"Login successful",

data:result

});


}

catch(error){


res.status(400).json({

success:false,

message:error.message

});


}


};