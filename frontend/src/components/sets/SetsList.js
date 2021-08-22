import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';

import {getSets} from "./SetsActions";
import Set from "./Set";
import Table from "react-bootstrap/Table";
import {Button} from "react-bootstrap";

const SetLogo = {
  // height: "100px",
    maxWidth: "155px",
    maxHeight: "50px",
}

function logoFormatter(cell, row) {
    return <img src={row.logo} style={SetLogo}/>
}
function addCollectionFormatter(cell, row) {
    return <Button>Start Collection</Button>
}

class SetsList extends Component {
    componentDidMount() {
        console.log("sets componentDidMount")
        this.props.getSets();

    }

    render() {
        console.log("Render")
        const {sets} = this.props.sets;

        if (sets.length === 0) {
            return <h2>Please add your first set</h2>;
        }

        let items = sets.map(set => {
            return <Set key={set.id} set={set}/>;
        });

        const columns = [
            {
                dataField: 'logo',
                text: '',
                formatter: logoFormatter
            }
            , {
                dataField: 'name',
                text: 'Set Name',
                sort: true
            }
            , {
                dataField: 'series',
                text: 'Series',
                sort: true
            }, {
                dataField: 'releasedate',
                text: 'Date',
                sort: true
            }, {
                dataField: 'printedtotal',
                text: 'Total',
                sort: true
            }, {
                dataField: '',
                text: '',
                formatter: addCollectionFormatter,
            }
        ];


        return <BootstrapTable keyField='id' data={sets} columns={columns}/>

        return (
            <div>
                <h2>Sets</h2>
                <Table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Series</th>
                        <th>Released Date</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {items}
                    </tbody>
                </Table>
                <hr/>
                {/* a */}
            </div>
        );
    }
}

SetsList.propTypes = {
    getSets: PropTypes.func.isRequired,
    sets: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    sets: state.sets
});

export default connect(mapStateToProps, {
    getSets
})(withRouter(SetsList));
