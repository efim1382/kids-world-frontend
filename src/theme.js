import getMuiTheme from 'material-ui/styles/getMuiTheme';
import variables from 'containers/Layout/variables.css';

const Theme = getMuiTheme({
  palette: {
    primary1Color: variables.colorAccent,
  },
  appBar: {
    height: variables.headerHeight,
    titleFontWeight: variables.fontWeightLight,
    padding: variables.layoutPadding,
    fontSize: 20,
  },
});

export default Theme;
