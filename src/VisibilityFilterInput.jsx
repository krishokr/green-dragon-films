import React from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';
import { setFilter } from './actions/actions';
import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import './Style/VFilter.css';


function VisibilityFilterInput(props) {
    const dispatch = useDispatch();
    const setfilter = bindActionCreators(setFilter, dispatch);


    return <Form.Control className="v-filter" onChange={e => setfilter(e.target.value)} value={props.visibilityFilter}
    placeholder="Search by movie title" />
}

// export default connect(null, { setFilter } )(VisibilityFilterInput);
export default VisibilityFilterInput;