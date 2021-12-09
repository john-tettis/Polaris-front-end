export default function validate(setError, form, validators){
    for(let [key,val] of Object.entries(form)){
        for(let validate of validators[key]){
            const res = validate(val);
            if(res.valid){
                continue
            }
            setError(e=>({...e,[key]:res.message}))
            return false
        }
    }
}


export const notNull = v => v ? {valid:true}: {valid:false, message:'This value cannot be empty.'};
export const noSpecialChars = v=>{
    let spChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if(spChars.test(v))return {valid:false,message:'Cannot contain special characters'}
    return {valid:true};
}