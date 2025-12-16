import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { deleteActivity } from "../api/activities";

export default function ActivityList({ activities, syncActivities }) {
  const [errorMsg, setErrorMsg] = useState(null);
  const [errorId, setErrorId] = useState(null);
  const { token } = useAuth();

  const clickDeleteButton = async (id) => {
    setErrorMsg(null);

    try {
      await deleteActivity(token, id);
      syncActivities();
    } catch (e) {
      setErrorId(id);
      setErrorMsg(e.message);
    }
  };

  return (
    <>
      <ul>
        {activities.map((activity) => (
          <>
            <li key={activity.id}>
              {activity.name} {activity.id}
              <button onClick={() => clickDeleteButton(activity.id)}>
                Delete
              </button>
            </li>
            {errorId === activity.id && errorMsg && (
              <p role="alert">{errorMsg}</p>
            )}
          </>
        ))}
      </ul>
    </>
  );
}
