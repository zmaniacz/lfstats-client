import React from "react";
import { EuiListGroupItem } from "@elastic/eui";
import { createPath } from "history";
import {
  useHref,
  useNavigate,
  useLocation,
  useResolvedPath,
} from "react-router";

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

//This is lifted from the react-router <Link> component
export default ({ to, ...rest }) => {
  let href = useHref(to);
  let navigate = useNavigate();
  let location = useLocation();
  let path = useResolvedPath(to);

  function onClick(event) {
    const target = event.target.getAttribute("target");

    if (
      !event.defaultPrevented && // onClick prevented default
      event.button === 0 && // Ignore everything but left clicks
      (!target || target === "_self") && // Let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // Ignore clicks with modifier keys
    ) {
      event.preventDefault();

      // If the URL hasn't changed, a regular <a> will do a replace instead of
      // a push, so do the same here.
      let replace = createPath(location) === createPath(path);

      navigate(to, { replace });
    }
  }

  const props = { ...rest, href, onClick };
  return <EuiListGroupItem {...props} />;
};
