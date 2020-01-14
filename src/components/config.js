import { green }      from "@material-ui/core/colors";
import TableCell      from "@material-ui/core/TableCell";
import TableRow       from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";

export const useStyles = theme => ({
	progressBar: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
      }
  },
	hidden: {
	  display: "none"
	},
	pill: {
    textAlign: "center",
		padding: "5px",
		marginTop: "5px",
		marginBottom: "5px",
		alignItems: "center",
		borderRadius: "3px",
		color: "#FFFFFF",
		textShadow: "1px 1px #000000",
	},
	pacpill: {
    textAlign: "center",
		padding: "5px",
		marginTop: "5px",
		marginBottom: "5px",
		alignItems: "center",
		borderRadius: "3px",
		color: "#FFFFFF"
	},
  container: {
    paddingTop: '5px'
  },
  card: {
    flexGrow: 1,
    background: '#E9E8E8',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: green[500],
  },
	pacList: {
	  width: '100%',
		paddingTop: '5px',
		maxWidth: 375
	},
	pac: {
	  width: '100%',
		paddingTop: '5px',
		maxWidth: 375,
		background: "#F9B7B2"
	},
	button: {
		margin: theme.spacing(1)
	},
	table: {
    minWidth: 365
  },
});

export const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: "#F9B7B2"    },
    '&:nth-of-type(even)': {
      backgroundColor: "#ffe6e6"    },
  },
}))(TableRow);

export const backColor = {
  "tl1": "#FF3333",
  "tl2": "#FF9933",
  "tl3": "#00CC66"
};

// pastel colors, red, orange, green
export const backColorList = {
  "tl1": "#F9B7B2",
  "tl2": "#FCDAC1",
  "tl3": "#E2EFCB"
};

export const backColorGrayList = {
  "tl1": "#788696",
  "tl2": "#475D6F",
  "tl3": "#1A324B"
};


export const CardEnum = Object.freeze({
             "OSC": "Oblivious Smart Contract",
             "Set": "Settings",
             "Run": "Running since ",
             "VerCode": "Verified Code",
             "VerUser": "Verified User",
             "Blockchain": "Blockchain Connected"});

		//backgroundColor: theme.palette.background.paper
