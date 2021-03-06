import {useParams} from "react-router";
import CollectionView from "./collections-view.component";
import React from "react";
import CollectionViewEpic from "./collection-view-epic-component";

function CollectionViewWrapper(props) {
    const { id } = useParams();
    return (
        // <CollectionView id={id}/>
        <CollectionViewEpic id={id}/>
    );
}

export default CollectionViewWrapper;