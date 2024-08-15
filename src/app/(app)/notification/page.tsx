import { LuBell } from "react-icons/lu";
import NotificationItem from "./_components/NotificationItem";

export default function page() {
  return (
    <div className="space-y-3">
      <div className="card card-row justify-center text-xl">
        <LuBell className="" />
        <h2>Notification</h2>
      </div>
      <NotificationItem
        type="like"
        name="Caine"
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a erat mollis, posuere turpis vel, mollis eros. Suspendisse tempus accumsan tempor. Ut at consectetur purus, ac finibus augue."
      />
      <NotificationItem
        type="like"
        name="Caine"
        message="Duis ante augue, tincidunt non elit eu, varius molestie dui. Mauris quis congue ipsum, non facilisis ante. Maecenas pharetra fermentum mauris at pulvinar. Curabitur fermentum purus sit amet mollis lacinia. Nullam aliquet eget arcu ut vulputate. Nunc eget dolor ex. Curabitur nec tellus dapibus, sodales urna quis, tincidunt nisi. Nunc elementum cursus est varius venenatis. Vestibulum finibus posuere mauris, id efficitur nunc euismod et. Duis vel leo scelerisque, ultrices tortor nec, dignissim metus. Sed nunc nisl, maximus eget risus at, laoreet congue sapien. Donec auctor dictum nunc sed pretium."
      />
      <NotificationItem
        type="comment"
        name="Caine"
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a erat mollis, posuere turpis vel, mollis eros. Suspendisse tempus accumsan tempor. Ut at consectetur purus, ac finibus augue."
      />
      <NotificationItem
        type="like"
        name="Caine"
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a erat mollis, posuere turpis vel, mollis eros. Suspendisse tempus accumsan tempor. Ut at consectetur purus, ac finibus augue."
      />
      <NotificationItem
        type="comment"
        name="Caine"
        message="Duis ante augue, tincidunt non elit eu, varius molestie dui. Mauris quis congue ipsum, non facilisis ante. Maecenas pharetra fermentum mauris at pulvinar. Curabitur fermentum purus sit amet mollis lacinia. Nullam aliquet eget arcu ut vulputate. Nunc eget dolor ex. Curabitur nec tellus dapibus, sodales urna quis, tincidunt nisi. Nunc elementum cursus est varius venenatis. Vestibulum finibus posuere mauris, id efficitur nunc euismod et. Duis vel leo scelerisque, ultrices tortor nec, dignissim metus. Sed nunc nisl, maximus eget risus at, laoreet congue sapien. Donec auctor dictum nunc sed pretium."
      />
    </div>
  );
}
