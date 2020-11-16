import React, { Component } from '../../node_modules/react';
import "./style.css"


class TimeZone extends Component {

      constructor(props) {
        super(props);
        this.state = {
              locations: [],
              country1Input: '',
              country2Input: '',
              message: 'What country do you want search?',
              closestData : []

        };
      }

      asyncStateManagement(value){
        return(new Promise((resolve,reject) => {
            this.setState(value)
            resolve(true)
        }))
      }

    closeCountries(e){
        e.preventDefault();
        let closestData = this.state.locations.map((data) => {
            let max = Math.max(this.state.country1Input, this.state.country2Input)
            let min = Math.min(this.state.country1Input, this.state.country2Input)

            if ((Math.max(data[1],max) === max) && (Math.min(data[1],min) === min)){
                return data[0].trim()
            }
            
            return null
        })

        let filtered = [];
        for (let i = 0; i<closestData.length; i++){
            if (closestData[i] !== undefined){
                filtered.push(closestData[i])
            }
            
        }
        this.setState({ closestData : filtered })

    }

    countryZone1Change = (e) => {
        let okValue = e.target.value.replace(":", ".");
            okValue = parseFloat(okValue)
        this.asyncStateManagement({country1Input : okValue})
        
    }

    countryZone2Change = (e) => {
        let okValue = e.target.value.replace(":", ".");
            okValue = parseFloat(okValue)
        this.asyncStateManagement({country2Input : okValue})
        
    }

    componentDidMount() {

        let closestData = []
        this.props.fullDataResponse.map((data) => {
             (data.timezones.map((td) => {
                let hold = td.replace(':','.')
                hold = parseFloat(hold.replace('UTC',''))
                let c = [data.name,hold]
                closestData.push(c)
                return null
            }))

            return undefined
            
          })

        this.setState({ locations : closestData })
        
    }

    displayMessage() {
        let ret = []
        for (let i = 0; i<this.state.locations.length; i++ ){
            if(this.state.closestData[i] !== undefined){
                ret.push(<li className="list-group-item" key={i}>{this.state.closestData[i]}</li>)
            }
            
        }
        return (ret)
        
    }

  render() {
    return (
      <div className='container-fluid big-bg transbox'  style={{
                    
        textAlign: "center",
        color : "darkblue"
    }}>

        <h3 style = {{textAlign: "center", color: "lightskyblue"}}><span className="badge badge-primary">Countries between Time Zones</span></h3>

        <form onSubmit={(e) => this.closeCountries(e)} >
          <div className="form-group">
            <label htmlFor="country1">Country zone1</label>            
            <div className="input-group input-group-lg fontSize" style={{margin:'0px 0px 10px 0px'}}>
                <span className="input-group-addon fontSize" id="sizing-addon1" >UTC</span>
                <input type="text" onChange={(e) => {this.countryZone1Change(e)}} className="form-control " placeholder="Timezone 1" aria-describedby="sizing-addon1"/>
            </div>

            <small id="emailHelp" className="form-text text-muted">Put 2 Country Zone Ranges where you want to find the existing countries between the given ranges.</small>
          </div>
          <label htmlFor="basic-url">Country zone2</label>
            <div className="input-group input-group-lg fontSize" style={{margin:'0px 0px 5px 0px'}}>
                <span className="input-group-addon fontSize" id="sizing-addon1">UTC</span>
                <input type="text" onChange={(e) => {this.countryZone2Change(e)}} className="form-control " placeholder="Timezone 2" aria-describedby="sizing-addon1"/>
            </div>

            
          <button type="submit" className="btn btn-primary">Search</button>
        </form>



        <ul >
            {this.displayMessage()}
        </ul>

      </div>
    );
  }
}

export default TimeZone;