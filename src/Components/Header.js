import React,{useContext} from 'react';
import Logo from '../../assets/logo.png';
import { useSpring, animated, config } from 'react-spring';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { hot } from 'react-hot-loader/root';
import { ThemeContext } from '../App';

const useStyles = makeStyles((theme) => ({
  header: {
    paddingTop: '30px',
  },
  logoBox: {
    width: '50px',
    height: '50px',
    margin: '10px',
  },
  heading: (theme) => ({
    fontSize: '2rem',
    fontWeight: '500',
    color: theme.headline,
  }),
}));

function Header() {
  const theme = useContext(ThemeContext);
  const classes = useStyles(theme);
  const springProps = useSpring({
    from: { transform: 'translateY(-50%)' },
    to: { transform: 'translateY(0%)' },
    config: config.default,
  });
  const AnimatedBox = animated(Box);
  return (
    <AnimatedBox
      component="div"
      display="flex"
      alignItems="center"
      justifyContent={'center'}
      className={classes.header}
      style={springProps}
    >
      <Box>
        <img className={classes.logoBox} src={`${Logo}`}></img>
      </Box>
      <Typography variant={'h1'} className={classes.heading}>
        {' '}
        Date Messenger{' '}
      </Typography>
    </AnimatedBox>
  );
}

if (module.hot) {
  module.hot.accept(function (err) {
    console.log('An error occurred while accepting new version');
  });
}

export default hot(Header);