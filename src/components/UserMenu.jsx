import React, { useState } from "react";

import {
  EuiAvatar,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeaderSectionItemButton,
  EuiNotificationBadge,
  EuiLink,
  EuiText,
  EuiSpacer,
  EuiPopover
} from "@elastic/eui";

export default function UserMenu() {
  const [isOpen, setOpen] = useState(false);

  const button = (
    <EuiHeaderSectionItemButton
      aria-controls="headerUserMenu"
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label="Account menu"
      onClick={() => setOpen(!isOpen)}
    >
      <EuiAvatar name="John Username" size="s" />

      <EuiNotificationBadge className="euiHeaderNotification">
        3
      </EuiNotificationBadge>
    </EuiHeaderSectionItemButton>
  );

  return (
    <EuiPopover
      id="headerUserMenu"
      ownFocus
      button={button}
      isOpen={isOpen}
      anchorPosition="downRight"
      closePopover={() => setOpen(false)}
      panelPaddingSize="none"
    >
      <div style={{ width: 320 }}>
        <EuiFlexGroup
          gutterSize="m"
          className="euiHeaderProfile"
          responsive={false}
        >
          <EuiFlexItem grow={false}>
            <EuiAvatar name="John Username" size="xl" />
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiText>
              <p>John Username</p>
            </EuiText>

            <EuiSpacer size="m" />

            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiFlexGroup justifyContent="spaceBetween">
                  <EuiFlexItem grow={false}>
                    <EuiLink href="">Edit profile</EuiLink>
                  </EuiFlexItem>

                  <EuiFlexItem grow={false}>
                    <EuiLink href="">Log out</EuiLink>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </EuiPopover>
  );
}
