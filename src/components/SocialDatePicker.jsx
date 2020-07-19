import React from "react";
import moment from "moment";
import { EuiDatePicker } from "@elastic/eui";
import { selectedSocialStartDateVar, selectedSocialEndDateVar } from "../cache";

export default ({ availableDates, startDate }) => {
  const handleChange = (date) => {
    selectedSocialStartDateVar(date);
    selectedSocialEndDateVar(date.clone().add(1, "d"));
  };

  const isValidDate = (date) => {
    return availableDates.find((item) => item.isSame(date));
  };

  if (!isValidDate(startDate)) {
    startDate = moment(availableDates[availableDates.length - 1]);
    selectedSocialStartDateVar(startDate);
    selectedSocialEndDateVar(startDate.clone().add(1, "d"));
  }

  return (
    <EuiDatePicker
      selected={startDate}
      minDate={availableDates[0]}
      maxDate={availableDates[availableDates.length - 1]}
      onChange={handleChange}
      filterDate={isValidDate}
    />
  );
};
