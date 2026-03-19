import crypto from 'crypto'

export default function getCode(){
    const code : String = crypto.randomBytes(4).toString('hex');
    return code;
}