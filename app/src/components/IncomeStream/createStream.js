import React from 'react'
import PropTypes from 'prop-types'
import { Paper, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
//import MoneyButton from '@moneybutton/react-money-button'
import { Typography, FormHelperText, FormControl } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { fade } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    table: {
        minWidth: 700,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: '#9400d3',
      backgroundColor: '#282c34'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
    tabPanel: {
        backgroundColor: '#282c34',
    }
  }));

function CreateStreamForm({data}) {
    const classes = useStyles();
    const [duration, setDuration] = React.useState(0);
    const [productType, setProductType] = React.useState(0);
    const [deferredDuration, setDeferredDuration] = React.useState(0);

    
    const handleDurationChange = (event, newValue) => {
        const duration = event.target.name;
        
        setDuration(event.target.value)
        console.log(event.target.value)
    }
  
    const handleProductTypeChange = (event, newValue) => {
        const product = event.target.name;
        
        setProductType(event.target.value)
        console.log(event.target.value)
    }

    const handleDeferredDurationChange = (event, newValue) => {
        const deferredDuration = event.target.name;

        setDeferredDuration(event.target.value)
        console.log(event.target.value)
    }
  
    const createIncomeStream = () => {
        console.log(productType, ' ', duration, ' ', deferredDuration)
        alert(productType + duration)
    }
  
    let deferredTime
    if(productType == 'DEFERRED'){
        deferredTime =  <React.Fragment><InputLabel htmlFor="age-native-helper" style={{ color: '#009be5' }}>
                          Deferred Duration in Years
                        </InputLabel>
                        <Select 
                            style={{ color: '#009be5' }}
                            native
                            value={deferredDuration}
                            onChange={handleDeferredDurationChange}
                            inputProps={{
                            name: 'deferredDuration',
                            id: 'age-native-helper',
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option value={1}>One</option>
                            <option value={3}>Three</option>
                            <option value={5}>Five</option>
                        </Select>
                        <FormHelperText style={{ color: '#FE6B8B' }}>helper text</FormHelperText> 
                        </React.Fragment>  
    }
    
    return (
        <React.Fragment>            
                  <Grid container item lg={12} >
              <Grid item xs={12}>
              <Paper className={classes.paper}>
                  {data.name} | {data.x}
                    {/* first row */}
                      <Grid container spacing={3}>
                          <Grid item xs>
                              <FormControl>
                                {/* <InputLabel 
                                    htmlFor="produt-type" 
                                    style={{ color: '#009be5' }}
                                >
                                    Product Type
                                </InputLabel> */}
                                <Select style={{ color: '#009be5' }}
                                    native
                                    value={productType}
                                    onChange={handleProductTypeChange}
                                    inputProps={{
                                    name: 'productType',
                                    id: 'product-type'
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={'IMMEDIATE'}>Immediate</option>
                                    {/* <option value={'DEFERRED'}>Deferred</option> */}
                                </Select>
                                <FormHelperText style={{ color: '#FE6B8B' }}>
                                    Select the type of stream you want to buy
                                </FormHelperText>
                              </FormControl>
                          </Grid>
                          <Grid item xs>
                            {deferredTime}
                          </Grid>
                          <Grid item xs>
                              <FormControl>
                                    {/* <InputLabel htmlFor="age-native-helper" style={{ color: '#009be5' }}>
                                        Duration in Years
                                    </InputLabel> */}
                                    <Select 
                                        style={{ color: '#009be5' }}
                                        native
                                        value={duration}
                                        onChange={handleDurationChange}
                                        inputProps={{
                                        name: 'duration',
                                        id: 'age-native-helper',
                                        }}
                                    >
                                        <option aria-label="None" value="" />
                                        <option value={1}>One</option>
                                        <option value={3}>Three</option>
                                        <option value={5}>Five</option>
                                        <option value={7}>Seven</option>
                                        <option value={10}>Ten</option>
                                    </Select>
                                    <FormHelperText style={{ color: '#FE6B8B' }}>
                                        How long do you want to be paid?
                                    </FormHelperText>
                                </FormControl>                     
                          </Grid>
                      </Grid>
                      {/* second row */}
                      <Grid container spacing={3}>
                          <Grid item xs>
                            
                            
                          </Grid>
                          <Grid item xs={6}>
                          
                          
                          </Grid>
                          <Grid item xs>                            
                              <Tooltip title='Create the Stream'>
                                <Button 
                                    variant='outlined' 
                                    color='primary'
                                    onClick={createIncomeStream}   
                                >Create</Button>
                              </Tooltip>
                          </Grid>
                    </Grid>
                </Paper>
              </Grid>
                
            </Grid>
        </React.Fragment>
    )

}

export default CreateStreamForm;