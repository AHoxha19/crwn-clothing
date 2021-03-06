import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import './collection-overview.scss';
import CollectionPreview from "../collection-preview/collection-preview";
import {selectCollectionsForPreview} from "../../redux/shop/shop-selector";

const CollectionOverview = ({collections})=>(
    <div className="collections-overview">
        {
            collections
                .map(({id, ...otherCollectionProps}) =>(
                    <CollectionPreview key={id} {...otherCollectionProps}/>
                ))
        }
    </div>
)
const mapPropsToState = createStructuredSelector({
    collections: selectCollectionsForPreview
});

export default connect(mapPropsToState)(CollectionOverview);



