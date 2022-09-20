import { useState } from "react";

function InputStandart(props){

    const [showTooltips, setShowTooltips] = useState('hidden');
    
    return(
        <label 
            className={props.default ? "input-block" : "input-file-block"}
        >
            <span className={"input-block-placeholder " + showTooltips + " " + props.invalid}>{props.placeholder}</span>
            <input 
                className={props.className + " " + props.invalid + "-border"}
                type={props.type}
                placeholder={props.placeholder} 
                name={props.name}
                title={props.title}
                onFocus={()=>setShowTooltips('visible')}
                onBlur={()=>setShowTooltips('hidden')}
            />
            {!props.invalid ? <span className={"input-block-helper " + showTooltips}>{props.helperText}</span> : null}
            {props.invalid ? <span className={"input-block-helper" + " " + props.invalid}>{props.errorText}</span>: null}
        </label>
    )
}

export default InputStandart;