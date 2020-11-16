import React, { Component } from 'react'
import { requestApiData, locationData } from "../actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {dataResponseHandle} from './Common';


const receiveLocations = (reqData) => {
    return (new Promise(async (resolve, reject) => {

        let posData;
        console.log(reqData)
        posData = reqData.map((data) => {
            let countryData = [data.latlng, data.cioc]
            return countryData;
        })
        resolve(posData)
    }))
}


class DistanceCal extends Component {

    constructor(props) {
        super(props);
        this.props.requestApiData()

        this.state = {
            DataResponse: [],
            locations: [],
            country1Input: "",
            country2Input: "",
            betweenDistance: '',
            newGuy: []
        };
    };


    componentDidMount() {
        this.props.requestApiData();
    };

    country1Change = (e) => {
        this.setState({ country1Input: e.target.value });
    };

    country2Change = (e) => {
        this.setState({ country2Input: e.target.value });
    };

    calculateDistance = (e) => {
        e.preventDefault()

        console.log(this.state.locations, "hkhkh")

        let lat1, lon1, lat2, lon2 = '';
        this.state.locations.map((data) => {
            if (data[1] !== null) {
                if (data[1].trim() === this.state.country1Input.trim()) {
                    lat1 = data[0][0]
                    lon1 = data[0][1]
                }
            }

            if (data[1] !== null) {
                if (data[1].trim() === this.state.country2Input.trim()) {
                    lat2 = data[0][0]
                    lon2 = data[0][1]
                }
            }
            return null

        })

        if ((lat1 !== '') && (lon1 !== '') && (lat2 !== '') && (lon2 !== '')){
            var R = 6371; // Radius of the earth in km
            var dLat = (lat2-lat1) * (Math.PI/180);  // deg2rad below
            var dLon = (lon2-lon1) * (Math.PI/180); 
            var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.cos(lat1 * (Math.PI/180)) * Math.cos(lat2 * (Math.PI/180)) * 
                    Math.sin(dLon/2) * Math.sin(dLon/2)
              ; 
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            var d = R * c; // Distance in km
            this.setState({betweenDistance : d.toFixed(2) + 'KM'});
            return d;
          }else{
            console.log('invalid input')
            return false
          }

    }

    setupData(data) {
        if (data.length > 0) {
          console.log(data,"hjhj")
          //this.setState({ fullDataResponce : data })
          this.state.DataResponse = data;
          receiveLocations(data).then((fetchedData) => {
            this.state.locations = fetchedData
            this.props.dataResponseHandle(data)
          })
          
          return(
               console.log("loaded")
          )
        }else{
          console.log(data,"hhhhhh")
          return(
            <h1>Loading...</h1>
          )
        }
        
      }
       
    


    render() {
        console.log(this.props,"kpopjhhj")
            return(
                
            <div className = "container transbox" >
                <h3 style = {{textAlign: "center"}}><span className="badge badge-primary">Calculate Distance Between Two Countries</span></h3>
                {this.setupData(this.props.data)}  

                      
            <form onSubmit= {(e)=> this.calculateDistance(e)}>
                <div className="container" style={{
                    
                    textAlign: "center",
                    color : "darkblue"
                }}>
                    <div className="form-group"  >
                        <label style = {{textAlign : "center"}}>Country 1 </label>
                        
                        <input type="text" style = {{textAlign : "center" , width: "100%"}} className="form-control " placeholder="Enter 3 Letter Country Code"
                               onChange={(e)=>this.country1Change(e)}/>
                               
                              
                    </div>
                    <div className="form-group">
                        <label>Country 2</label>
                        <input type="text" style = {{textAlign : "center" , width: "100%"}} className="form-control" placeholder="Enter 3 Letter Country Code"
                                onChange={(e)=>this.country2Change(e)}/>
                    </div>
                </div>
                <div style = {{textAlign : "center"}}>
                    <button type= "submit" className= "btn btn-primary" style = {{ top: "50%"}} >Calculate
                    </button>
                </div>
                <br/>

                <h1 className="badgeDistance">{this.state.betweenDistance}</h1>
                
               
            </form>
            </div>
        );
    }
}







// function mapStateToProps(state) {
//     return {

//         data: state.data
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators(
//         {
//             locationData: state.
//             requestApiData,
//         },
//         dispatch
//     )
// }
const mapStateToProps = state => ({ 
    data : state.data,
    locationData : state.data,
  });

const mapDispatchToProps = disatch => 
  bindActionCreators({  locationData: locationData,
    requestApiData: requestApiData, }, disatch)

DistanceCal = connect(mapStateToProps, mapDispatchToProps)(DistanceCal);

export default DistanceCal;
