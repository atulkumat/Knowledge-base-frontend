import { leaveGroup } from "actions/groupsAction";
import { confirmAlert } from "react-confirm-alert";

const leaveGroupPopUp = (history, dispatch, groupId, userId) => {
  confirmAlert({
    title: 'Leave Group',
    message: 'Are you sure that you want to leave this group?',
    buttons: [
      {
        label: 'Yes',
        onClick: () => {
          dispatch(leaveGroup(groupId, userId, history));
        },
      },
      {
        label: 'No',
      },
    ],
  })
}
export default leaveGroupPopUp;