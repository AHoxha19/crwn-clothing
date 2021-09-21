import React from 'react';
import Homepage from "./pages/homepage/homepage";
import {Switch, Route, Redirect} from "react-router-dom";
import ShopPage from "./pages/shop/shop.jsx";
import Header from "./components/header/header";
import "./App.css";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";
import {connect} from "react-redux";
import {setCurrentUser}  from  './redux/user/user-actions';
import {auth, firestore,  createUserProfileDocument} from "./firebase/firebase.utils";
import {onAuthStateChanged} from "firebase/auth";
import {doc, onSnapshot} from "firebase/firestore";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "./redux/user/user-selector";
import CheckoutPage from "./pages/checkout/checkout-page";

class App extends React.Component{

    unsubscribeFromAuth = null;

    componentDidMount() {
        const {setCurrentUser} = this.props;

        this.unsubscribeFromAuth = onAuthStateChanged(auth, async userAuth=>{
            console.log("User data received from firebase on Mount: ", userAuth);
            if(userAuth){
                const userRefId = await createUserProfileDocument(userAuth);
                onSnapshot(doc(firestore, "users", userRefId), (doc)=>{
                    console.log("Current data: ", doc.data());
                    setCurrentUser({
                            id: doc.id,
                            ...doc.data()
                        }
                    )
                })
            }else{
                setCurrentUser(userAuth)
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }


    render() {
        return (
            <div>
                <Header/>
                <Switch>
                    <Route exact path={'/'} component={Homepage} />
                    <Route path={'/shop'} component={ShopPage} />
                    <Route exact path='/checkout' component={CheckoutPage}/>
                    <Route exact path={'/signIn'}
                           render={()=>this.props.currentUser ?
                               (<Redirect to="/"/>) :
                               (<SignInAndSignUpPage/>)} />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});


const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
