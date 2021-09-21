import React from "react";
import "./menu-item.scss";
import {withRouter} from "react-router-dom";

const MenuItem = ({title, imageUrl, style, history, linkUrl, match})=>{
    return <div className= {`${style} menu-item`} onClick={()=>history.push(`${match.url}${linkUrl}`)} >
        <div
            style={
                {backgroundImage: `url(${imageUrl})`}
            } className={"background-image"}>


        </div>
        <div className="content">
            <h1 className="title">{title.toUpperCase()}</h1>
            <span className="subtitle">SHOP NOW!</span>
        </div>
    </div>
}

export default withRouter(MenuItem);