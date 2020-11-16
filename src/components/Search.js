import { extend } from 'lodash';
import React, {Component} from 'react';
import './style.css';


class Search extends Component {

    constructor(props){
        super(props);
        this.state = {
            locations: [],
            inputCountry: '',
            msg : 'Enter the country you want to search',
            closestData: []
        };
    }

    asyncStateManagement(value){
        return(new Promise((resolve, reject)=>{
            this.setState(value)
            resolve(true)
        }))
    }

    closestCountries(e){
        e.preventDefault();
        let closestData = this.state.locations.map((data)=>{
            if(data[0].trim().toLowerCase().indexOf(this.state.inputCountry.trim().toLocaleLowerCase())> -1) {

                return data[0].trim()
            }
            return undefined
        })

        let filter = [];
        for(let x = 0; x<closestData.length; x++){

            if(closestData[x] !== undefined){
                filter.push(closestData[x])

            }

        }
        this.setState({closestData : filter})



    }

    changeOfCountry = (e) =>{
        this.asyncStateManagement({inputCountry : e.target.value}).then(()=> {this.closestCountries(e)})
    }

    componentDidMount(){
        let closestData = this.props.fullDataResponse.map((data)=>{
            let c =[data.name]
            return c
        })
        this.setState({locations: closestData})
    }

    showMsg(){
        let message = [];
        for(let x = 0; x<this.state.locations.length; x++){

            if(this.state.closestData[x] !== undefined){
            message.push(<li className="list-group-item" key={x}> {this.state.closestData[x]}</li>)

            }

        }
        return (message)
    }

    render(){
        return(

    <div className='container-fluid big-bg transbox'>
         <h3 style = {{textAlign: "center"}}><span className="badge badge-primary">Search For Countries</span></h3>

        <h1 className="badgeDistance">{this.state.message}</h1>

        <form onSubmit={(e) => this.closestCountries(e)} >
            <div className="container" style={{
                    width: "50%",
                    textAlign: "center"
                }}>
          <div className="form-group">
            <label htmlFor="country1" style = {{textAlign : "center", color: "darkblue"}}>Country name</label>
            <input type="text" onChange={(e) => {this.changeOfCountry(e)}} style = {{textAlign : "center" , width: "100%"}} className="form-control " id="country" aria-describedby="country" placeholder="Enter the Country Name " />
            <small id="emailHelp" className="form-text text-muted">Look for the country name you want to Search </small>
          </div>
          </div>
          <div style = {{textAlign : "center"}}>
          <button type="submit" className="btn btn-primary" style = {{ top: "50%"}}>Search</button>
          </div>
        </form>

        <ul className="list-group small my-custom-scrollbar my-custom-scrollbar-primary scrollbar scrollbar-primary" style= {{textAlign: "center" , top: "50%"}}>
            {this.showMsg()}
        </ul>

      </div>




        )




    }
}

export default Search;















