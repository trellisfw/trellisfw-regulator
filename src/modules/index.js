import { Module }        from "cerebral";
import oadaModule        from "@oada/cerebral-module";
import oadaProvider      from "@oada/cerebral-provider";
import App               from "./App";
import MenuList          from "./MenuList";
import PACList           from "./PACList";
import Connections       from "./Connections";
import pacs              from "./pacs";
import ProgressBar       from "./ProgressBar";
import Info              from "./Info";
import Messages          from "./Messages";
import blockchaingateway from "./blockchaingateway";

export default Module({
  modules: {
		App,
		Info,
		ProgressBar,
		MenuList,
		PACList,
		Connections,
		pacs,
		Messages,
		blockchaingateway,
		oada: oadaModule,
	},

	providers: {
		oada: oadaProvider
	}
})
