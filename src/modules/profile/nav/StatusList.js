import { SendOutlined, ClockCircleOutlined, UserDeleteOutlined, TeamOutlined } from "@ant-design/icons";
import store from "~/store/store";

const component = {
  addFriendComponent: (
    <>
      <SendOutlined /> Add Friend
    </>
  ),
  pendingComponent: (
    <>
      <ClockCircleOutlined /> Pending
    </>
  ),
  cancelComponent: (
    <>
      <UserDeleteOutlined /> Remove
    </>
  ),
  friendComponent: (
    <>
      <TeamOutlined /> Friends
    </>
  ),
};

export default function statusList(status, friendId) {
  switch (status) {
    case "Friends":
      return {
        button: component.friendComponent,
        list: [
          {
            key: "1",
            label: component.cancelComponent,
          },
        ],
      };

    case "Pending":
      return {
        button: component.pendingComponent,
        list: [
          {
            key: "1",
            label: component.cancelComponent,
          },
        ],
      };

    default:
      return {
        button: component.addFriendComponent,
        list: [
          {
            key: "1",
            label: component.addFriendComponent,
          },
        ],
      };
  }
}
