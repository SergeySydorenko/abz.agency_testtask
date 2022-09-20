function RadioInput({position}){

    return(
        <label className="radio-input-block">
            <input id={position.id} type='radio' name='position'></input>
            <span>{position.name}</span>
        </label>
    )
}

export default RadioInput;