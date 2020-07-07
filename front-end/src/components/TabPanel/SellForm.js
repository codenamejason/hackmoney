import React, { useState } from 'react'
import { Paper, Typography, FormControl, InputLabel, Select,
  FormHelperText, Input, InputAdornment, Tooltip, Button,
  TextField, NativeSelect, InputBase, MenuItem,
  FormControlLabel, Checkbox } from '@material-ui/core';
//import tokenLogo from '../images/ij-logo.jpg'
//import ethLogo from '../images/eth-logo.png'

const SellForm = (props) => {
  
    const [output, setOutput] = useState(0);
    const [input, setInput] = useState(0);

    return (
      <div>
        <div>
          <Input
            type="text"
            onChange={(event) => {
              const tokenAmount = event.target.value;
              setOutput(tokenAmount);
            }}
            placeholder="0"
            required />
          <div>
            <div>
              {/* <img src={tokenLogo} height='32' alt=""/> */}
              &nbsp; JAR
            </div>
          </div>
        </div>
        <div>
          <Input
            type="text"
            value={output}
            disabled
          />
          <div>
            <div>
              {/* <img src={ethLogo} height='32' alt=""/> */}
              &nbsp;&nbsp;&nbsp; DAI
            </div>
          </div>
        </div><br />
        <div className="mb-5">
          <span>Exchange Rate ~ 1 JAR = 1 DAI</span>
        </div><br /><br />
        <Button
            variant='contained'
            color='secondary'        
        >Exchange</Button>
    </div>
    );

}

export default SellForm;
