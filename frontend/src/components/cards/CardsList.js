import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getCards} from "./CardsActions";

import Card from "./Card";

function CardList(props){


<<<<<<< HEAD

    }

    render() {
        console.log("Render")
        const {cards} = this.props;

        let items = cards.map(card => {
            return <Card key={card.id} card={card}/>;
        });

        return (
                {items}
        );
    }
=======
>>>>>>> 17a4fd013f02d211a0fe7c8a627cd2a1eed155a6
}

function CardListItem(card){

}