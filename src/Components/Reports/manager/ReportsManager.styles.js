import { makeStyles } from "@material-ui/core/styles";

const useReportManagerStyles = makeStyles((theme) => ({
  reportsManagerWrapper: {
    paddingTop: 65,
    width: 400,
    height: "calc(100% - 164px)",
  },

  backButtonContainer: {
    marginBottom: 12,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },

  action: {
    borderRadius: "50%",
  },

  status: {
    height: 35,
    width: 35,
  },

  alert: {
    cursor: "default !important",
  },

  modelButton: {
    padding: 0,
    cursor: "default !important",
    maxWidth: 150,
    textAlign: "start",
  },

  backButton: {
    color: `${theme.palette.grey?.main || "#A7AFC3"}  !important`,
    height: 25,
    width: 25,
    marginLeft: "5px !important",
  },
  reportPreviewButton: {
    color: `${theme.palette.grey?.main || "#A7AFC3"}  !important`,
    height: 25,
    width: 25,
    marginLeft: "5px !important",
  },
  buttonIcon: {
    fontSize: "16px !important",
  },
  reportsManager: {
    paddingLeft: 15,
    paddingRight: 15,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flexStart",
  },

  title: {
    fontSize: 18,
    color: "#071e62",
    fontWeight: "bold",
    marginBottom: 30,
  },

  reportItem: {
    width: "100%",
    display: "flex",
    flexDirection: "column",

    "&::after": {
      width: "100%",
      height: 1,
      content: "''",
      background: theme.palette.grey?.["350"] || "#e5e7ed",
      borderRadius: "50%",
      marginTop: 8,
      marginBottom: 8,
    },
  },
  info: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    "&.date": {
      color: theme.palette.grey?.main || "A7AFC3",
    },

    "&.status": {
      height: "100%",
      justifyContent: "center",
      alignItems: "center",

      "&.warning": {
        color: theme.palette.orange?.["100"] || "#E9A52B",
      },
      "&.error": {
        color: theme.palette.red?.main || "#FF2A2A",
      },
      "&.completed": {
        color: theme.palette.text || "#333333",
      },
    },
  },

  statusIcon: {
    fontSize: 30,
    position: "relative",
    display: "inline-flex",

    "& @keyframes fadeIn": {
      "0%": {
        opacity: 0,
      },
      "100%": {
        opacity: 1,
      },
    },
    animation: "fadeIn 0.3s",
  },

  reportsItemsContainer: {
    overflowY: "auto",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
}));

export default useReportManagerStyles;
