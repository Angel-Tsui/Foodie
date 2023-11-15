import { v4 } from "uuid";
import { setRecord } from "../../../firebase/firestore";

export default function AddNewRecord(userId) {
  console.log("userId", userId);
  if (userId) {
    let recordId = v4();
    setRecord(
      recordId,
      "",
      "",
      "",
      "HKD",
      "",
      "",
      "",
      "",
      "",
      [0, 0, 0, 0, 0],
      "",
      userId
    );
    window.location.href = "/record/" + recordId;
  }
}
