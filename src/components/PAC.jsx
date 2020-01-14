// "components/PACList.jsx"
import React from "react";
import Button from "@material-ui/core/Button";
import CheckedIcon from '@material-ui/icons/AssignmentTurnedIn';
import { connect } from "@cerebral/react";
import { state, sequences } from "cerebral/tags";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { useStyles } from "./config.js";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { StyledTableCell, StyledTableRow } from "./config.js";

class PAC extends React.Component {

  renderPAC( params ) {
    const { pac, current,  classes } = params;
		if (current === pac.id && pac) {
			
			return (
				<div key={"content-" + pac.id}>
					<Table className={classes.table} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell align="center" >PAC</StyledTableCell>
							<StyledTableCell align="center" >{pac.title}</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
				    <StyledTableRow key={"date_init"}>
              <StyledTableCell align="center" omponent="th" scope="row">
				        Date Init
				     </StyledTableCell>
              <StyledTableCell align="center" omponent="th" scope="row">
				        {pac.date_init}
              </StyledTableCell>
            </StyledTableRow>
				    <StyledTableRow key={"organization"}>
              <StyledTableCell align="center" omponent="th" scope="row">
				        Organization 
				     </StyledTableCell>
              <StyledTableCell align="center" omponent="th" scope="row">
				        {pac.organization.name}
              </StyledTableCell>
            </StyledTableRow>
				    <StyledTableRow key={"certification-status"}>
              <StyledTableCell align="center" omponent="th" scope="row">
				        Status 
				      </StyledTableCell>
              <StyledTableCell align="center" omponent="th" scope="row">
				        {pac.certification_status}
              </StyledTableCell>
            </StyledTableRow>
				    <StyledTableRow key={"certified-quantity"}>
              <StyledTableCell align="center" omponent="th" scope="row">
				        Quantity 
				      </StyledTableCell>
              <StyledTableCell align="center" omponent="th" scope="row">
				        {pac.certified_quantity.value + " " + pac.certified_quantity.units + " of " + pac.certified_product}
              </StyledTableCell>
            </StyledTableRow>
				    <StyledTableRow key={"data_hash"}>
              <StyledTableCell align="center" omponent="th" scope="row">
				        Data Hash 
				      </StyledTableCell>
              <StyledTableCell align="center" omponent="th" scope="row">
				        {pac.data_hash.value.substring(1,30)}
              </StyledTableCell>
            </StyledTableRow>
				    <StyledTableRow key={"pac_hash"}>
              <StyledTableCell align="center" component="th" scope="row">
				        PAC Hash 
				      </StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">
				       {pac.pac_hash.value.substring(1,30)}
              </StyledTableCell>
            </StyledTableRow>
					</TableBody>
				</Table>
				</div>
			);
		} else {
			return null;
	  }
	}//renderPAC

	render() {
		const { classes } = this.props;

		return (
			<div className={!this.props.open ? classes.hidden : classes.pacpill}>
        {
					Object.keys(this.props.pacs || {}).map(pacid => {
						return this.renderPAC(
							{
								pac:     this.props.pacs[pacid],
								current:   this.props.current,
								classes: classes
							});
					})
				}
			</div>
		)
	}//render

}

export default connect(
	{
		open: state`PACList.detailOpen`,
		pacs: state`pacs.records`,
		current: state`PACList.current`,

		setCurrentItem:   sequences`PACList.setCurrentItem`,
		verifySignature:  sequences`PACList.verifySignature`
	},
	withStyles(useStyles, {withTheme: true})(PAC)
);

					/*<Typography variant="h6" gutterBottom>
				    {pac.title}	PAC
					</Typography>
					<Typography variant="subtitle1" gutterBottom>
				    Date [{pac.date_init}]
					</Typography>
					<Typography variant="subtitle2" gutterBottom>
	          Organization ID 
				   [{pac.organization.id}]			  
					</Typography>
					<Typography variant="subtitle2" gutterBottom>
	          Organization Name [{pac.organization.name}]			  
					</Typography>
					<Typography variant="body1" gutterBottom>
				    Timestamp [{pac.timestamp}]
					</Typography>
					<Typography variant="body2" gutterBottom>
				    Lot       [{pac.lot}]
					</Typography>
					<Typography variant="body2" gutterBottom>
				    Status    [{pac.certification_status}]
					</Typography>
					<Typography variant="body2" gutterBottom>
				    Certified Product [{pac.certified_product}]
				    Certifify quantity [{pac.certified_quantity.value} {pac.certified_quantity.units}]
					</Typography>
					<Typography variant="body2" gutterBottom>
				    Data Hash    [{pac.data_hash.value}]
					</Typography>
					<Typography variant="body2" gutterBottom>
				    PAC Hash     [{pac.pac_hash.value}]
					</Typography>*/
