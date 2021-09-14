import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getCards} from "./CardsActions";

import Card from "./Card";

class CardsList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("cards componentDidMount")
        // this.props.getCards();


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
}

// CardsList.propTypes = {
//   getCards: PropTypes.func.isRequired,
//   cards: PropTypes.object.isRequired
// };
//
// const mapStateToProps = state => ({
//   cards: state.cards
// });
//
// export default connect(mapStateToProps, {
//   getCards
// })(withRouter(CardsList));

export default CardsList