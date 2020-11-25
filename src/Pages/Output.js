import React, { useContext, useState } from 'react';
import { Grid, Typography, Button, Box } from '@material-ui/core';
import { useSpring, animated, config } from 'react-spring';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { useHistory } from 'react-router-dom';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ThemeContext } from '../App';
import { Themes, defaultThemeName } from '../Components/Themes';
import { updateDate, updateMessage, updateTheme } from '../redux';
import Intro from '../Components/Intro';
import OutputIllustration from '../Components/OutputIllustrtion';
const useStyles = makeStyles(() => ({
  output: (theme) => ({
    backgroundColor: theme.secondary,
    marginTop: '30px',
    marginBottom: '30px',
    padding: '30px',
    border: `2px solid ${theme.stroke}`,
    borderRadius: '5px',
  }),
  section: {
    marginTop: '10px',
  },
  illustration: {
    maxHeight: '500px',
    maxWidth: '500px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  outputHeading: (theme) => ({
    fontSize: '2rem',
    fontWeight: '500',
    color: theme.headline,
    textAlign: 'center',
  }),
  outputMessage: (theme) => ({
    fontSize: '1.5rem',
    fontWeight: '200',
    color: theme.paragraph,
    marginTop: '20px',
    textAlign: 'center',
    width: '100%',
    wordWrap:"break-word"
  }),
  goBack: (theme) => ({
    display: 'block',
    marginTop: '10px',
    fontFamily: 'Roboto',
    backgroundColor: theme.button,
    fontWeight: 500,
    fontSize: '1rem',
    marginLeft: '20px',
    border: `2px solid ${theme.stroke}`,
    color: theme.buttonText,
    '&:hover': {
      backgroundColor: theme.button,
      border: `2px solid ${theme.stroke}`,
      boxShadow: 'none',
    },
  }),
}));

function Output(props) {
  const history = useHistory();
  const theme = useContext(ThemeContext);
  const classes = useStyles(theme);
  var dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  const illustrationSpringProps = useSpring({
    from: { transform: 'scale(0,0)' },
    to: { transform: 'scale(1,1)' },
    config: config.default,
  });
  const outputSpringProps = useSpring({
    from: { transform: 'scale(0,0)' },
    to: { transform: 'scale(1,1)' },
    config: config.default,
  });

  const handleMessageChange = (event) => {
    props.updateMessage(event.target.value);
  };
  const AnimatedGrid = animated(Grid);

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        type="submit"
        color="primary"
        className={classes.goBack}
        onClick={()=>{history.goBack()}}
      >
        back
      </Button>
      <Grid className={classes.section} container justify="center" spacing={5}>
        <AnimatedGrid
          item
          xs={10}
          md={5}
          lg={4}
          style={illustrationSpringProps}
        >
          <Box className={classes.illustration}>
            <OutputIllustration></OutputIllustration>
          </Box>
        </AnimatedGrid>
      </Grid>
      <Grid container justify="center">
        <AnimatedGrid
          item
          xs={10}
          sm={8}
          style={outputSpringProps}
          className={classes.output}
        >
          <Typography className={classes.outputHeading} variant="h1">
            {new Date(props.date).toLocaleDateString('en-US', dateOptions)}
          </Typography>
          <Typography
            variant="h4"
            className={classes.outputMessage}
            noWrap={false}
          >
            {props.message}
          </Typography>
        </AnimatedGrid>
      </Grid>
    </React.Fragment>
  );
}

const mapStateToprops = (state) => {
  return {
    date: state.date,
    theme: state.theme,
    message: state.message,
  };
};



if (module.hot) {
  module.hot.accept(function (err) {
    console.log('An error occurred while accepting new version');
  });
}

export default connect(mapStateToprops, null)(hot(Output));
