import { useEffect } from "react";
import { useFormValue } from "sanity";
import { set , unset } from "sanity";

export function DiscountedPriceInput(props : any){
    const enableDiscouunt = useFormValue(['Enable_Discount']) as boolean
    const actualPrice = useFormValue(['Actual_Price']) as number

    useEffect(()=>{
        if(!enableDiscouunt && actualPrice !== undefined){
            props.onChange(set(actualPrice))
        }
    },[enableDiscouunt, actualPrice , props])

    return props.renderDefault(props);
}