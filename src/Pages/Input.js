import React ,{ useContext }from 'react';
import { Grid, Typography ,Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import DatePicker from 'react-datepicker';
import { updateDate,updateMessage,updateTheme } from '../redux'
import { useHistory } from 'react-router-dom';

import { ThemeContext } from '../App';
import { Themes } from '../Components/Themes';
import 'react-datepicker/dist/react-datepicker.css';
import Intro from '../Components/Intro';

const useStyles = makeStyles(() => ({
  form: (theme) => ({
    backgroundColor: theme.main,
    marginTop: '30px',
    marginBottom: '30px',
    padding: '30px',
    border: `2px solid ${theme.stroke}`,
    borderRadius: '5px',
  }),

  label: (theme) => ({
    color: theme.stroke,
    fontWeight: 500,
    display:'block',
    marginTop: '10px',
  }),

  input: (theme) => ({
    backgroundColor: theme.secondary,
    width: '200px',
    height: '40px',
    color: theme.stroke,
    fontWeight: 500,
    borderRadius: '7px',
    border: `2px solid ${theme.stroke}`,
    fontSize: '20px',
    outlineColor: theme.stroke,
    paddingLeft: '10px',
    margin: '0px',
    borderImageWidth: 0,
    outlineWidth: 0,
    fontFamily: 'Roboto',
  }),

  textArea: (theme) => ({
    width: '600px',
    height: '250px',
    padding: '20px',
    contenteditable: 'true',
    spellcheck: 'true',
    maxWidth: '90%',
  }),

  submit: (theme) => ({
    display: 'block',
    marginTop: '10px',
    fontFamily: 'Roboto',
    backgroundColor: theme.button,
    fontWeight: 500,
    fontSize: '1rem',
    border: `2px solid ${theme.stroke}`,
    color: theme.buttonText,
    '&:hover': {
      backgroundColor: theme.button,
      border: `2px solid ${theme.stroke}`,
      boxShadow: 'none',
    },
  }),
}));


function Input(props) {
  const theme = useContext(ThemeContext);
  const classes = useStyles(theme);
  const themeSetter = props.themeSetter;
  const history = useHistory();

  const handleMessageChange = (event) => {
    props.updateMessage(event.target.value);
  }
  console.log(props.theme);
  return (
   <React.Fragment>
      <Intro></Intro>
      <Grid container justify="center">
        <Grid item xs={10} lg={8} className={classes.form}>
          <form onSubmit={(event) => { event.preventDefault(); history.push('/output') }}>
            <Typography
              variant={'subtitle1'}
              component="label"
              className={classes.label}
              htmlFor="date-picker"
            >
              Pick Date :
            </Typography>
            <DatePicker
              name="date"
              selected={props.date}
              onChange={(date) => {
                props.updateDate(date);
              }}
              className={classes.input}
              portalId="date-picker"
            />
            <Typography
              variant={'subtitle1'}
              component="label"
              className={classes.label}
              htmlFor="theme-selector"
            >
              Choose Theme :
            </Typography>
            <select
              name="theme"
              value={props.theme}
              className={classes.input}
              id="theme-selector"
              onChange={(event) => {
                props.updateTheme(event.target.value);
                themeSetter(Themes[event.target.value]);
              }}
            >
              {Object.keys(Themes).map((value, index) => {
                return (
                  <option value={value} key={index}>
                    {' '}
                    {value}{' '}
                  </option>
                );
              })}
            </select>
  
            <Typography
              variant={'subtitle1'}
              className={classes.label}
              component="label"
              htmlFor="message"
            >
              Message :
            </Typography>
            <textarea
              required
              name="message"
              id="message"
              className={`${classes.input} ${classes.textArea}`}
              rows="15"
              value={props.message}
              onChange={handleMessageChange}
            ></textarea>
            <Button
              variant="outlined"
              type="submit"
              color="primary"
              className={classes.submit}
            >
              SUBMIT
            </Button>
          </form>
        </Grid>
      </Grid>
   </React.Fragment>
  );
  
}

const mapStateToprops = state => {
  return {
    date: state.date,
    theme: state.theme,
    message: state.message
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateDate: (date) => dispatch(updateDate(date)),
    updateMessage: (message) => dispatch(updateMessage(message)),
    updateTheme: (theme)=> dispatch(updateTheme(theme))
  }
}

if (module.hot) {
  module.hot.accept(function (err) {
    console.log('An error occurred while accepting new version');
  });
}


export default connect(mapStateToprops,mapDispatchToProps)(hot(Input));
