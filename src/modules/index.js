import { Module } from "cerebral";

import oadaModule   from "@oada/cerebral-module";
import oadaProvider from "@oada/cerebral-provider";

import App          from "./App";
import MenuList     from "./MenuList";
import PACList      from "./PACList";
import Connections  from "./Connections";
import pacs         from "./pacs";

export default Module({
  modules: {
		App,
		MenuList,
		PACList,
		Connections,
		pacs,
		oada: oadaModule,
	},

	providers: {
		oada: oadaProvider
	}
})
