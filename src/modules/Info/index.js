import { Module } from "cerebral";
import * as sequences from "./sequences";

export default Module({
	state: {
		open: false,
		showHash: false,
		hash: ""
	},
  sequences	
});
