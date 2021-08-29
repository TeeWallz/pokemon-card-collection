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



        if (cards.length === 0) {
            return <h2>Please add your first card</h2>;
        }

        let items = cards.map(card => {
            return <Card key={card.id} card={card}/>;
        });

        return (
            <div>
                <h2>Cards</h2>
                {items}
                <hr/>
                {/* a */}
            </div>
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