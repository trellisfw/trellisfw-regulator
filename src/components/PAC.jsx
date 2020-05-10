// "components/PAC.jsx"
import React                from "react";
import { connect }          from "@cerebral/react";
import { state, sequences } from "cerebral/tags";
import { withStyles }       from "@material-ui/core/styles";
import { useStyles }        from "./config.js";
import Table                from "@material-ui/core/Table";
import TableBody            from "@material-ui/core/TableBody";
import TableHead            from "@material-ui/core/TableHead";
import TableRow             from "@material-ui/core/TableRow";
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
				        {(pac.certified_quantity ? pac.certified_quantity.value : null) + " " + (pac.certified_quantity ? pac.certified_quatity.units : null) + " of " + (pac.certified_product ? pac.certified_product: null) }
              </StyledTableCell>
            </StyledTableRow>
				    <StyledTableRow key={"data_hash"}>
              <StyledTableCell align="center" omponent="th" scope="row">
				        Data Hash 
				      </StyledTableCell>
              <StyledTableCell align="center" omponent="th" scope="row">
				        {pac.data_hash ? pac.data_hash.substring(1,30): null}
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
		open:             state`PACList.detailOpen`,
		pacs:             state`pacs.records`,
		current:          state`PACList.current`,

		setCurrentItem:   sequences`PACList.setCurrentItem`,
		verifySignature:  sequences`PACList.verifySignature`
	},
	withStyles(useStyles, {withTheme: true})(PAC)
);

