import React from "react";
import moment from "moment";
import { EuiDatePicker, EuiDatePickerRange } from "@elastic/eui";
import { selectedSocialStartDateVar, selectedSocialEndDateVar } from "../cache";

export default function SocialMultiDatePicker({
  availableDates,
  startDate,
  endDate,
}) {
  const handleChangeStart = (date) => {
    selectedSocialStartDateVar(date.format("YYYY-MM-DD"));
  };

  const handleChangeEnd = (date) => {
    selectedSocialEndDateVar(date.format("YYYY-MM-DD"));
  };

  const isValidDate = (date) => {
    return availableDates.indexOf(date.format("YYYY-MM-DD")) >= 0;
  };

  return (
    <EuiDatePickerRange
      startDateControl={
        <EuiDatePicker
          selected={moment(startDate)}
          minDate={moment(availableDates[0])}
          maxDate={moment(availableDates[availableDates.length - 1])}
          onChange={handleChangeStart}
          filterDate={isValidDate}
        />
      }
      endDateControl={
        <EuiDatePicker
          selected={moment(endDate)}
          minDate={moment(availableDates[0])}
          maxDate={moment(availableDates[availableDates.length - 1])}
          onChange={handleChangeEnd}
          filterDate={isValidDate}
        />
      }
    />
  );
}
