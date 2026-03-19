import colors from 'colors'

const match = {
    GET : "green",
    POST : "blue",
    PUT : "yellow",
    DELETE : "red"
}

function logger(req : object ,res : object ,next : any){
    console.log(`${req.method} ---- ${req.protocol}://${req.get('host')}${req.originalUrl}`[match[req.method]]);
    next();
}

export default logger