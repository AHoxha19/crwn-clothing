import React from "react";
import FormInput from "../form-input/form-input";

import "./sign-in.scss";
import CustomButton from "../custom-button/custom-button";
import {auth, signInWithGoogle} from "../../firebase/firebase.utils";
import {signInWithEmailAndPassword} from "firebase/auth";


class SignIn extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event =>{
        event.preventDefault();
        const {email, password} = this.state;
        try{
            console.log("Trying to sign in...");
            await signInWithEmailAndPassword(auth, email, password);
            this.setState({email: '', password: ''})
        }catch (e) {
            console.log(e);
        }
    }

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]: value})
    }

    render() {
        return(
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        label="Email"
                        name="email"
                        type="email"
                        handleChange={this.handleChange}
                        value={this.state.email}
                        required/>
                    <FormInput
                        label="Password"
                        type="password" name="password" value={this.state.password}
                               handleChange={this.handleChange}
                           required/>

                <div className="buttons">

                    <CustomButton type="submit">Sign in</CustomButton>
                    <CustomButton isGoogleSignIn onClick={signInWithGoogle}>Sign in with Google</CustomButton>
                </div>
                </form>
            </div>
        )
    }

}

export default SignIn;