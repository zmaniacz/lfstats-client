import React from "react";
import moment from "moment";
import { EuiDatePicker, EuiDatePickerRange } from "@elastic/eui";
import { selectedSocialStartDateVar, selectedSocialEndDateVar } from "../cache";

export default function SocialMultiDatePicker({ startDate, endDate }) {
  const handleChangeStart = (date) => {
    selectedSocialStartDateVar(date.format("YYYY-MM-DD"));
  };

  const handleChangeEnd = (date) => {
    selectedSocialEndDateVar(date.format("YYYY-MM-DD"));
  };

  return (
    <EuiDatePickerRange
      iconType={false}
      startDateControl={
        <EuiDatePicker
          selected={moment(startDate)}
          onChange={handleChangeStart}
          isInvalid={moment(startDate) > moment(endDate)}
        />
      }
      endDateControl={
        <EuiDatePicker
          selected={moment(endDate)}
          onChange={handleChangeEnd}
          isInvalid={moment(startDate) > moment(endDate)}
        />
      }
    />
  );
}
