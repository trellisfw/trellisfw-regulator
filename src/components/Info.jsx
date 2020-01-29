// "components/Info.jsx"
import React                from "react";
import Button               from "@material-ui/core/Button";
import Snackbar             from "@material-ui/core/Snackbar";
import IconButton           from "@material-ui/core/IconButton";
import CloseIcon            from "@material-ui/icons/Close";
import { connect }          from "@cerebral/react";
import { state, sequences } from "cerebral/tags";
import { withStyles }       from "@material-ui/core/styles";
import { useStyles }        from "./config.js";

class Info extends React.Component {

	render() {
		return (
			<div >
				<Snackbar
					open={this.props.open}
					autoHideDuration={6000}
					onClose={this.props.handleClose}
					message={this.props.showHash ? 
						         `PAC Verified [${this.props.hash.substring(0,10)}...]`						       : "PAC Verified"}
				action={
						<React.Fragment>
							<Button color="secondary" size="small" onClick={this.props.handleShowHash}>
								HASH
							</Button>
							<IconButton size="small" aria-label="close" 
					                color="inherit" 
					                onClick={this.props.handleClose}>
								<CloseIcon fontSize="small" />
							</IconButton>
						</React.Fragment>
					}
					color="success"
				/>
			</div>
    );

	}//render

}

export default connect(
	{
		open:        state`Info.open`,
		hash:        state`Info.hash`,
		showHash:    state`Info.showHash`,

		handleClose: sequences`Info.handleClose`,
		handleShowHash: sequences`Info.handleShowHash`
	},
	withStyles(useStyles, {withTheme: true})(Info)
);
