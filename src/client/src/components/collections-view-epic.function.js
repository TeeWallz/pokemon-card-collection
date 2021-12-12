import {useParams} from "react-router";
import CollectionView from "./collections-view.component";
import React from "react";
import CollectionViewEpic from "./collection-view-epic-component";

function CollectionViewWrapper(props) {
    const { collectionid } = useParams();
    return (
        // <CollectionView id={id}/>
        <CollectionViewEpic collectionid={collectionid}/>
    );
}

export default CollectionViewWrapper;