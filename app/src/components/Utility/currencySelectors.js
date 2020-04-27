


// Curency selectors
function MultilineTextFields() {
    const classes = useStyles();
    const [currency, setCurrency] = React.useState('EUR');
  
    const handleChange = (event) => {
      setCurrency(event.target.value);
    };
  
    return (
      <form className={classes.root} noValidate autoComplete="off">
  
        <div>
          <TextField
            id="filled-select-currency"
            select
            label="Select"
            value={currency}
            onChange={handleChange}
            helperText="Please select your currency"
            variant="filled"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
  
        </div>&nbsp;
        <div>
          <TextField
            id="filled-select-currency"
            select
            label="Select"
            value={currency}
            onChange={handleChange}
            helperText="Please select your currency"
            variant="filled"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>        
        </div>
        
      </form>
    );
}

  

const currencies = [
{
    value: 'USD',
    label: '$',
},
{
    value: 'EUR',
    label: '€',
},
{
    value: 'BTC',
    label: '฿',
},
{
    value: 'JPY',
    label: '¥',
},
];
  