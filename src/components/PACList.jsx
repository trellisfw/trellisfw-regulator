// "components/PACList.jsx"
import React from "react";
import Button from "@material-ui/core/Button";
import CheckedIcon from '@material-ui/icons/AssignmentTurnedIn';
import { connect } from "@cerebral/react";
import { state, sequences } from "cerebral/tags";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { useStyles, backColor, backColorList, CardEnum } from "./config.js";
import PACContent           from "./PACContent";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

class PACList extends React.Component {

  renderPAC( params ) {
    const { pac, classes } = params;
		if (pac) {
			const avaColor  = {backgroundColor: backColor[pac.trust_level]};
			const listColor = {backgroundColor: backColorList[pac.trust_level]};
			const expandStyle = { color: '#00b33c', marginLeft: '5px' };
			let _timestamp = pac.timestamp ? pac.timestamp : pac.date_init;
			return (
				<div key={pac.id}>
					<ListItem className={`${classes.pill}`} style={listColor}
                    key={pac.id}
				  >
						<ListItemAvatar>
							<Avatar style={avaColor}>
				      {pac.label}
							</Avatar>
						</ListItemAvatar>
						<IconButton aria-label={CardEnum.Blockchain}
						 onClick={ () => {
							 this.props.setCurrentPAC({pacid: pac.id});
							 this.props.handlePACContentOpen();
							}
										 }
							 >
                <ExpandMoreIcon style={expandStyle}/>
             </IconButton>
						<ListItemText primary={pac.organization.name || null} 
				                  secondary={pac.title + " "  + _timestamp || null} 
				    />
						<Button
							variant="outlined"
							color="default"
				      size="small"
				      id={pac.id}
							className={classes.button}
							startIcon={<CheckedIcon />}
				      onClick={ () => { 
																this.props.setCurrentItem({id: pac.id});
								                console.log(pac.id);
								   							this.props.verifySignature();
							                }
								      }
						 >
						  Verify	
						</Button>
					</ListItem>
				  <PACContent pac={pac}/>
				</div>
			);
		} else {
			return null;
	  }
	}//renderPAC

	render() {
		const { classes } = this.props;

		return (
			<div className={!this.props.open ? classes.hidden : classes.pill}>
				<List className={classes.pacList}>
        {
					Object.keys(this.props.pacs || {}).map(pacid => {
						return this.renderPAC(
							{
								pac:     this.props.pacs[pacid],
								classes: classes
							});
					})
				}
				</List>
			</div>
		)
	}//render

}

export default connect(
	{
		open:                 state`PACList.open`,
		pacs:                 state`pacs.records`,

		setCurrentItem:       sequences`PACList.setCurrentItem`,
		setCurrentPAC:        sequences`PACList.setCurrentPAC`,
		handlePACContentOpen: sequences`PACList.handlePACContentOpen`,
		verifySignature:      sequences`PACList.verifySignature`
	},
	withStyles(useStyles, {withTheme: true})(PACList)
);

