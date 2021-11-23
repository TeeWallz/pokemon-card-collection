import {useParams} from "react-router";
import CollectionView from "./collections-view.component";
import React from "react";

function CollectionViewWrapper(props) {
    const { id } = useParams();
    return (
        <CollectionView id={id}/>
    );
}

export default CollectionViewWrapper;