import jwt from "jsonwebtoken";

function Authenticate(req : any, res : any, next : any){
    try{
        const token = req.headers.cookie.split("=")[1]
        const status = jwt.verify(token, String(process.env.JWT_SECRET));
        req.user = status;
        next()
    }
    catch(e : any){
        console.log(e.message);
        res.status(403  ).send({error : "Authentication error"})
    }
}

export default Authenticate