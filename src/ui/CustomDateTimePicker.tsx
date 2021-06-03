import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { SolidCheck, SolidSelector } from "../icons";
import DateFnsUtils from "@date-io/date-fns";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
  DateTimePickerProps,
} from "@material-ui/pickers";
import { InputErrorMsg } from "./InputErrorMsg";

const colors = {
  blue500: "#2d70d5",
  blue600: "#5f75ee",
  orange500: "#ff7c5d",
  orange600: "#fe764a",
  p100: "#dee3ea",
  p200: "#b2bdcd",
  p250: "#f8f8f8",
  p300: "#5d7290",
  p600: "#6e7191",
  p700: "#242c37",
  p800: "#151a21",
  p900: "#0b0e11",
  accent: "#fd4d4d",
  accentHover: "#fd6868",
  white: "#FFF",
};

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: colors.orange500,
    },
    secondary: {
      main: colors.orange500,
    },
  },
  overrides: {
    MuiPickersDay: {
      day: {
        "&:hover": {
          backgroundColor: colors.p100,
        },
        color: colors.p800,
      },
      current: {
        "&:hover": {
          backgroundColor: colors.p100,
          colors: colors.white,
        },
        color: colors.p800,
      },
      daySelected: {
        "&:hover": {
          backgroundColor: colors.orange600,
        },
        backgroundColor: colors.orange500,
        color: colors.white,
      },
      dayDisabled: {
        backgroundColor: colors.white,
        color: colors.p100,
      },
    },
    MuiPickerDTHeader: {
      separator: {},
      toolbar: {},
    },
    MuiPickerDTTabs: {
      tabs: {
        backgroundColor: colors.blue500,
      },
    },
    MuiPickersCalendar: {
      week: {
        backgroundColor: colors.white,
        color: colors.p100,
      },
      progressContainer: {},
      transitionContainer: {
        backgroundColor: colors.white,
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        backgroundColor: colors.white,
        color: colors.p800,
      },
      transitionContainer: {
        backgroundColor: colors.white,
      },
      iconButton: {
        backgroundColor: colors.white,
        color: colors.p900,
      },
      daysHeader: {
        backgroundColor: colors.white,
        color: colors.p900,
      },
      dayLabel: {
        backgroundColor: colors.white,
        color: colors.p900,
      },
    },
    MuiPickersSlideTransition: {
      transitionContainer: {},
    },
    MuiPickersYearSelectionStyles: {
      container: {
        backgroundColor: colors.p800,
        color: colors.p100,
      },
    },
    MuiPickersYear: {
      root: {
        backgroundColor: colors.white,
        color: colors.p300,
      },
      yearSelected: {
        backgroundColor: colors.white,
        color: colors.orange500,
      },
      yearDisabled: {
        backgroundColor: colors.p100,
        color: colors.p200,
      },
    },
    MuiPickersMonthSelection: {
      container: {
        backgroundColor: colors.white,
        color: colors.p800,
      },
    },
    MuiPickersMonth: {
      root: {
        backgroundColor: colors.white,
        color: colors.p300,
      },
      monthSelected: {
        backgroundColor: colors.p800,
        color: colors.p100,
      },
      monthDisabled: {
        backgroundColor: colors.p800,
        color: colors.p600,
      },
    },
    MuiPickersTimePickerToolbar: {
      separator: {},
      toolbarLandscape: {},
      hourMinuteLabel: {},
      ampmLabel: {},
    },
    MuiPickersClock: {
      container: {
        backgroundColor: colors.white,
        color: colors.p800,
      },
      clock: {
        backgroundColor: colors.p100,
        color: colors.p800,
      },
      pin: {
        backgroundColor: colors.orange500,
      },
    },
    MuiPickersClockNumber: {
      clockNumber: {
        color: colors.p900,
      },
      clockNumberSelected: {
        color: colors.white,
      },
    },
    MuiPickersClockPointer: {
      animateTransform: {},
      pointer: {
        backgroundColor: colors.orange500,
      },
      thumb: {
        backgroundColor: colors.orange500,
        borderColor: colors.orange500,
      },
      noPoint: {
        backgroundColor: colors.orange500,
      },
    },
    MuiInput: {
      root: {
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
        borderRadius: "1rem",
      },
      input: {
        padding: "17px 25px",
        cursor: "initial",
        color: colors.p600,
        fontSize: 14,
      },
      underline: {
        "&:before": {
          borderBottom: "none",
        },
        "&:after": {
          borderBottom: "none",
        },
      },
    },
    MuiPickersModal: {
      dialog: {
        backgroundColor: colors.white,
      },
      dialogRoot: {
        backgroundColor: colors.white,
      },
      dialogRootWider: {
        backgroundColor: colors.white,
      },
      withAdditionalAction: {
        backgroundColor: colors.white,
      },
    },
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: colors.blue500,
        color: colors.p100,
      },
    },
    MuiPickersToolbarButton: {
      toolbarBtn: {
        color: colors.p100,
      },
    },
  },
});

export interface CustomDateTimePickerProps extends DateTimePickerProps {
  error?: boolean;
}

export const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = ({
  error,
  ...props
}) => {
  const ring = error
    ? `ring-1 ring-red`
    : "border-1 border-black border-opacity-20";

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker
          className={`rounded-2xl bg-primary-250 ${ring}`}
          {...(props as any)}
        />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};
