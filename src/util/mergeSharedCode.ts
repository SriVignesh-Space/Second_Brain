import type { contentDBType } from "../model/ContentModel.js";
import type { shareDBtype } from "../model/shareModel.js";

function mergeSharedCode(contentDB : contentDBType[], sharedDB : shareDBtype[]){
    const sharedMap = new Map<string, string>();
    
    for(const s of sharedDB){
        sharedMap.set(String(s.contentId), s.code);
    }

    const resp = contentDB.map((content) => {
        // @ts-ignore
        const sharedCode = sharedMap.get(content.id)

        return new Object({content, sharedCode})
    })

    return resp
}

export default mergeSharedCode