import React from "react";
import moment from "moment";
import { EuiDatePicker } from "@elastic/eui";
import { selectedSocialStartDateVar } from "../cache";

export default function SocialDatePicker({ availableDates, startDate }) {
  const handleChange = (date) => {
    selectedSocialStartDateVar(date.format("YYYY-MM-DD"));
  };

  const isValidDate = (date) => {
    return availableDates.indexOf(date.format("YYYY-MM-DD")) >= 0;
  };

  return (
    <EuiDatePicker
      selected={moment(startDate)}
      minDate={moment(availableDates[0])}
      maxDate={moment(availableDates[availableDates.length - 1])}
      onChange={handleChange}
      filterDate={isValidDate}
    />
  );
}
