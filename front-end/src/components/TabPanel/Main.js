import React, { useState } from 'react'
import BuyForm from './BuyForm'
import SellForm from './SellForm'
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Typography, FormControl, InputLabel, Select,
    FormHelperText, Input, InputAdornment, Tooltip, Button,
    TextField, NativeSelect, InputBase, MenuItem,
    FormControlLabel, Checkbox } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        flexGrow: 1,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    table: {
      minWidth: 650,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
    paper: {
        minWidth: 240,
        marginLeft: '-17px',
        textAlign: 'center',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #3f51b5',
        boxShadow: theme.shadows[5],
        //padding: theme.spacing(2, 4, 3),
        color: theme.palette.text.secondary,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));



const Main = (props) => {
    const classes = useStyles();
    const [currentForm, setcurrentForm] = useState("sell")

    let content
     if(currentForm === 'buy') {
      content = <BuyForm
        ethBalance={props.ethBalance}
        tokenBalance={props.tokenBalance}
        buyTokens={props.buyTokens}
        exchangeRateDisplay={1}
      />
    } else {
      content = <SellForm
        ethBalance={props.ethBalance}
        tokenBalance={props.tokenBalance}
        sellTokens={props.sellTokens}
      />
    }

    return (
      <div id="content" className={classes.root}>
        <br />
        <div className="d-flex justify-content-between mb-3">
          <Button
              variant='contained'
              color='primary'
              onClick={(event) => {
                setcurrentForm('buy')
              }}
            >
            Buy
          </Button>
          <span className="text-muted">&nbsp;</span>
          <Button
              variant='contained'
              color='secondary'
              onClick={(event) => {
                setcurrentForm('sell')
              }}
            >
            Sell
          </Button>
        </div>
        <br />
        <div className="card mb-4" >
          <div className="card-body">
            {content}
          </div><br />
        </div><br />
      </div>
    );
  }

export default Main;
