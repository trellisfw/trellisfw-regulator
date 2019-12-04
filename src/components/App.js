import React, { Component } from 'react';
import { connect }          from "@cerebral/react";
import { sequences }        from "cerebral/tags";
import { ThemeProvider }    from 'styled-components';
import { darkTheme }        from './theme';
import { GlobalStyles }     from './global';
import MenuBar              from './MenuBar';
import './App.css';
import Connections          from "./Connections";
import PACList              from "./PACList";

class App extends Component {

	UNSAFE_componentWillMount(){
    this.props.init({});
	}

	//including GlobalStyles changes the layout
	render(){
		return (
		<div className="App">	
			<MenuBar />
			<ThemeProvider theme={darkTheme}>
			  <>
					<GlobalStyles />
			    <Connections />
			    <PACList />
					<footer>
						Credits:
						<small>The Open AG Technology and Systems Center (OATS)</small>
					</footer>
			  </>
			</ThemeProvider>
		</div>
		);
  }
}

export default connect({
	  init: sequences`App.init`
  },
	(App)
);
