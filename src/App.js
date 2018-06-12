import React, {Component} from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import Table from './Table';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: 0,
    width: 200
  },
  formControl: {
    marginLeft: theme.spacing.unit,
    marginTop: 10,
    minWidth: 120,
  }
});

const cities = ['Ranchi','Bangalore','Indore','Delhi','Pune']

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      bankDetails : [],
      refinedDetails : [],
      city : []
    }
    
  }


  fetchApi = (city,offset,limit) => {

    fetch(`https://app.fyle.in/api/bank_branches?city=${city}&offset=${offset}&limit=${limit}`)
    .then(results => {
      return results.json()
    })
    .then(data => {
      this.setState({bankDetails: data})
      this.setState({refinedDetails: data})
    })
  }

  componentWillMount(){

    this.fetchApi('RANCHI',0,50)
  }

  handleKeyUp = e => {
    const checker = e.target.value.toUpperCase();
    let dataRef = [];
    for(let i = 0;i< this.state.bankDetails.length;i++){
      const temp = this.state.bankDetails
      if(temp[i].bank_name.toUpperCase().indexOf(checker)>=0 || temp[i].ifsc.indexOf(checker)>=0){
        dataRef.push(temp[i]);
      }
    }
    this.setState({refinedDetails: dataRef})
  };

  handleSubmit = e =>{
    e.preventDefault();
  }

  handleChange = event => {

    this.setState({ [event.target.name]: event.target.value });
    const cityName = cities[event.target.value].toUpperCase();
    this.fetchApi(cityName,0,50)
  };

        render() {

          const dropdown = cities.map((data, index)=>{
            return <MenuItem value={index}>{data}</MenuItem>
          })
          const { classes } = this.props;
          return (
            <div>
              <form className={classes.container} noValidate onSubmit={this.handleSubmit} autoComplete="off">
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="city-simple">City</InputLabel>
                  <Select
                    value={this.state.city}
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'city',
                      id: 'city-simple',
                    }}
                  >
                  {dropdown}
                  </Select>
                </FormControl>
                <TextField
                  id="search"
                  label="Search"
                  type="search"
                  onKeyUp={this.handleKeyUp}
                  className={classes.textField}
                  margin="normal"
                />
              </form>
              <Table  data = {this.state.refinedDetails} />
            </div>
          );
        }
      }  

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);

