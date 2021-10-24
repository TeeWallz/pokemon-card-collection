import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getCards} from "./CardsActions";

import Card from "./Card";
import ListGroup from "react-bootstrap/ListGroup";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

export const CardsList = (props) => {
    let kek = props.cards.length;
    let cards = props.cards.map(card => {
        return (
            // <li>{card['name']}</li>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                </ListItemAvatar>
                <ListItemText
                    primary="Brunch this weekend?"
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                // className={classes.inline}
                                color="textPrimary"
                            >
                                Ali Connors
                            </Typography>
                            {" — I'll be in your neighborhood doing errands this…"}
                        </React.Fragment>
                    }
                />
            </ListItem>
        )
    })

    return (
        <List
            // className={classes.root}
        >
            {cards}
        </List>
    )
}

function CardListItem(card) {
    // let image = cardData.cardData["images"]["small"];
    // let text = cardData.cardData['id'] + " / " + cardData.cardData['name'];
    //
    // return (
    //     <ListGroup.Item><img style={{width: "20px"}}
    //                          src={image}/>
    //         {text}
    //     </ListGroup.Item>
    // )
}

export const processCardsForList = (cards, includeReverseHolos) => {

    let resultCards = [];

    for (let i = 0; i < cards.length; i++) {
        cards[i]['collectionId'] = i;
        cards[i]['printedCardNumber'] = (isNumeric(cards[i].number)) ? cards[i].number + "/" + cards[i].set.total : cards[i].number;
        if (!(includeReverseHolos)) {
            resultCards.push(cards[i])
            continue
        }

        let rarities = Object.keys(cards[i].tcgplayer.prices);
        let excludeRarities = ['1stEditionNormal']

        for (let j = 0; j < rarities.length; j++) {
            // Clone dict for each rarity
            if (rarities[j] in excludeRarities) {
                continue;
            }

            let additions = {
                reverse: rarities[j]
            }
            let copy = {...cards[i], ...additions};
            resultCards.push(copy)
        }

    }

    return resultCards;
}

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}
