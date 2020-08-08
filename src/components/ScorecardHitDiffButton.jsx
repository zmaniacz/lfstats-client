import React, { useState, Fragment } from "react";
import { useQuery, gql } from "@apollo/client";
import {
  EuiButtonEmpty,
  EuiBasicTable,
  EuiOverlayMask,
  EuiModal,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
  EuiModalFooter,
} from "@elastic/eui";
import { LoadError, LoadSpinner } from "./LFLoad";

const GET_HITDIFF_DETAILS = gql`
  query GetHitDiffDetails($id: bigint!) {
    scorecard: scorecards_by_pk(id: $id) {
      id
      player_id
      player_name
      position
      game_team {
        id
        name
      }
      scorecard_hits {
        hit
        hit_by
        missile
        missile_by
        player_id
        player_scorecard {
          id
          player_name
          position
          game_team {
            id
            name
            color_desc
          }
        }
        target_id
        target_scorecard {
          id
          player_name
          position
          game_team {
            id
            name
          }
        }
      }
    }
  }
`;

function positionSort(a, b) {
  const positions = {
    Commander: 0,
    "Heavy Weapons": 1,
    Scout: 2,
    "Ammo Carrier": 3,
    Medic: 4,
  };

  if (a !== b) {
    return (
      positions[a.target_scorecard.position] -
      positions[b.target_scorecard.position]
    );
  } else {
    return 0;
  }
}

export default function ScorecardHitDiffButton({ scorecardId, children }) {
  const { data, loading, error } = useQuery(GET_HITDIFF_DETAILS, {
    variables: { id: scorecardId * 1 },
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

  let content;
  if (loading) content = <LoadSpinner />;
  else if (error) content = <LoadError />;
  else {
    const sameTeam = data.scorecard.scorecard_hits.filter(
      (item) =>
        item.player_scorecard.game_team.id ===
        item.target_scorecard.game_team.id
    );
    const oppTeam = data.scorecard.scorecard_hits.filter(
      (item) =>
        item.player_scorecard.game_team.id !==
        item.target_scorecard.game_team.id
    );

    sameTeam.sort(positionSort);
    oppTeam.sort(positionSort);

    const columns = [
      {
        field: "target_scorecard.player_name",
        name: "Player",
      },
      {
        field: "target_scorecard.position",
        name: "Position",
      },
      {
        name: "Hit/Hit By",
        render: (item) => `${item.hit} / ${item.hit_by}`,
      },
      {
        name: "Missile/Missile By",
        render: (item) => `${item.missile} / ${item.missile_by}`,
      },
    ];
    content = (
      <Fragment>
        <EuiBasicTable items={oppTeam} columns={columns} compressed />
        <EuiBasicTable items={sameTeam} columns={columns} compressed />
      </Fragment>
    );
  }

  let modal;
  if (isModalVisible) {
    modal = (
      <EuiOverlayMask>
        <EuiModal onClose={closeModal}>
          <EuiModalHeader>
            <EuiModalHeaderTitle>Modal title</EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>{content}</EuiModalBody>
          <EuiModalFooter>
            <EuiButtonEmpty onClick={closeModal}>Done</EuiButtonEmpty>
          </EuiModalFooter>
        </EuiModal>
      </EuiOverlayMask>
    );
  }

  return (
    <Fragment>
      <EuiButtonEmpty onClick={showModal}>{children}</EuiButtonEmpty>
      {modal}
    </Fragment>
  );
}
