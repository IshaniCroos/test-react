import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { requestApiData } from "./actions";

class Home extends React.Component {
  componentDidMount() {
    this.props.requestApiData();
  }

  country = (x, i) =>
    <div key={x.name}>
      <b>{x.name} -</b>
      <b> {x.alpha2Code} -</b>
      <b>{x.alpha3Code} - </b>
      <b>{x.latlng} - </b>
      <b>{x.timezones} -</b>
    </div>;

  render() {
    const results = this.props.data;
    
  <div className = 'tile is-ancestor' >

    <div className='tile is-parent is-3'>
      <div className='tile is-child box'>
        <p>
          <b>Details: </b>
          {results.map(this.country)}
        </p>
        
      </div>
    </div>
    </div>
                                
                            
    return results.length




    
  }
}

const mapStateToProps = state => ({ data: state.data });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestApiData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
