/* Info/sequences.js */
import { sequence } from "cerebral";
import { set, toggle } from "cerebral/operators";
import { state } from "cerebral/tags";

export const handleClose = sequence("Info.handleClose", [
  toggle(state`Info.open`),
	set(state`Info.hash`, ""),
	//toggle(state`PACList.detailOpen`)
]);

export const handleShowHash = [toggle(state`Info.showHash`)];
