import Loader from "./Loader";
import RadioInput from "./RadioInput";
import { useState } from "react";
import InputStandart from "./InputStandart";

function SectionAddNewUser({positions, sendData}){
    const [nameInvalid, setNameInvalid] = useState();
    const [emailInvalid, setEmailInvalid] = useState();
    const [phoneInvalid, setPhoneInvalid] = useState();
    const [radioButtonInvalid, setRadioButtonInvalid] = useState();
    const [photoInvalid, setPhotoInvalid] = useState();
    const [photoNameInvalid, setPhotoNameInvalid] = useState();
    
    const [photoError, setPhotoError] = useState();

    function validation(e){
        e.preventDefault();

        const validEmail = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
        const validPhone = new RegExp("^[\+]{0,1}380([0-9]{9})$");
        const maxFileSize = 5242880;

        let validated = true;

        //name validation, changes input styles
        if(2 > e.target.name.value.length || e.target.name.value.length > 60){
            setNameInvalid("invalid");
            validated=false;
        }else{
            setNameInvalid(false);
        }

        //email validation, changes input styles
        if(2 > e.target.email.value.length || e.target.email.value.length > 100 || !e.target.email.value.match(validEmail)){
            setEmailInvalid("invalid");
            validated=false;
        }else{
            setEmailInvalid(false);
        }
        
        //phone validation, changes input styles
        if(!e.target.phone.value.match(validPhone)){
            setPhoneInvalid("invalid")
            validated=false;
        }else{
            setPhoneInvalid(false);
        }

        //position validation, changes input styles
        if(!e.target.position[0].checked && !e.target.position[1].checked && !e.target.position[2].checked && !e.target.position[3].checked){
            setRadioButtonInvalid("invalid");
            validated=false;
        }else{
            setRadioButtonInvalid(false);
        }

        //photo validation and size validation, changes input styles
        if(!e.target.photo.files[0]){
            setPhotoInvalid("invalid");
            setPhotoError('Choose photo');
            validated=false;
        } else if(e.target.photo.files[0].size > maxFileSize){
            setPhotoInvalid("invalid");
            setPhotoError('Photo size > 5MB');
            validated=false;
        } else{
            setPhotoInvalid(false);
            setPhotoError(false);
        }

        //photo name validation, changes input styles
        if(2 > e.target.photo_name.value.length || e.target.photo_name.value.length > 60){
            setPhotoNameInvalid("invalid");
            validated=false;
        }else{
            setPhotoNameInvalid(false);
        }

        if(validated){
            sendData(e)
        }
    }

    return(
        <section className="section-newUser">
            <h2>Working with POST request</h2>
            <form 
                className="section-newUser-form" 
                id="formData"
                onSubmit={(e)=>{
                    validation(e);
                }}
            >
                <InputStandart
                    className="input-standart"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    title="Your name"
                    helperText="2 to 60 symbols"
                    errorText="Your name must contain at least 2 and less than 60 symbols"
                    default
                    invalid={nameInvalid}
                />
                <InputStandart
                    className="input-standart"
                    placeholder="Email" 
                    name='email' 
                    title="User email, must be a valid email according to RFC2822"
                    helperText="Must be a valid email"
                    errorText="Your email must be valid and contain at least 2 and less than 100 symbols"
                    default
                    invalid={emailInvalid}
                />
                <InputStandart
                    className="input-standart"
                    type='tel' 
                    placeholder="Phone" 
                    name='phone' 
                    title="Number should start with code of Ukraine +380"
                    default
                    invalid={phoneInvalid}
                />

                <span className={"mobile-example " + phoneInvalid}>+38 (XXX) XXX - XX - XX</span>
                <span className="radio-button-title">Select your position</span>
                {positions.length > 0 ? positions.map(item => <RadioInput position={item} key={item.id}/>) : <Loader/>}
                {radioButtonInvalid ?<span className={"input-block-helper " + radioButtonInvalid}>You must select position</span> : null}
                <label className={"input-file " + phoneInvalid+"-border"}>
                    <input 
                        type='file' 
                        accept="image/jpeg" 
                        name='photo' 
                        size='1' 
                        className="file"
                    />
                    <InputStandart
                        placeholder="Upload your photo" 
                        name='photo_name'
                        className="input-file-name"
                        helperText="Name your photo"
                        errorText="Invalid photo name"
                        invalid={photoNameInvalid}
                    />
                </label>
                {photoInvalid ? <span className={"photo-helper " + photoInvalid}>{photoError}</span> : null}
                <button className="button-submit">Sign up</button>
            </form>
        </section>
    )
}

export default SectionAddNewUser;