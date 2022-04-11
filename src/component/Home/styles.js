import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '5px',
    justifyContent: 'space-around',
    flexDirection: 'row',
    // flexWrap: 'wrap',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'max-content',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  searchClass: {
    color: 'white',
  },
}));
