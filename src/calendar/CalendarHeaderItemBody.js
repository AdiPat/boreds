import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { SlotDateSelectButton } from "./buttons/SlotDateSelectButton";

const useStyles = makeStyles((theme) => ({
  hide: {
    display: "none !important",
  },
}));

function CalendarHeaderItemBody({ date, isDuration }) {
  const classes = useStyles();

  return (
    <div
      className={clsx({
        [classes.hide]: isDuration.year || isDuration.month,
      })}
    >
      <SlotDateSelectButton date={date} />
    </div>
  );
}

CalendarHeaderItemBody.propTypes = {
  date: PropTypes.instanceOf(moment).isRequired,
  isDuration: PropTypes.object.isRequired,
  isDateSelected: PropTypes.bool.isRequired,
};

export { CalendarHeaderItemBody };
