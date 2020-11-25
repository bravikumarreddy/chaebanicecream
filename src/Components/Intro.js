import React, { useContext } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { hot } from 'react-hot-loader/root';
import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Illustration from '../Components/Ilustration';
import { ThemeContext } from '../App';

const useStyles = makeStyles(() => ({
  section: {
    marginTop: '10px',
  },

  inputIllustration: {
    maxHeight: '500px',
    maxWidth: '500px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

function App() {
  const theme = useContext(ThemeContext);
  const classes = useStyles(theme);
  const illustrationSpringProps = useSpring({
    from: { transform: 'scale(0.6,0.6)' },
    to: { transform: 'scale(1,1)' },
    config: config.default,
  });

  const AnimatedGrid = animated(Grid);

  return (
    <Grid className={classes.section} container justify="center" spacing={2}>
      <AnimatedGrid item xs={10} md={5} lg={4} style={illustrationSpringProps}>
        <Box className={classes.inputIllustration}>
          <Illustration></Illustration>
        </Box>
      </AnimatedGrid>
    </Grid>
  );
}

if (module.hot) {
  module.hot.accept(function (err) {
    console.log('An error occurred while accepting new version');
  });
}

export default hot(App);
