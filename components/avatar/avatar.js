import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/open-peeps";
import Cookies from "js-cookie";
import { useState } from "react";
const Avatar = (props) => {
  const [did, setDid] = useState(
    typeof window != "undefined" ? Cookies.get("public_address") : "random"
  );

  let svg = createAvatar(style, {
    seed: did,
    // ... and other options
  });
  return (
    <>
      <img
        className="rounded-full"
        src={`https://avatars.dicebear.com/api/open-peeps/${did}.svg`}
        alt="avatar"
      />
    </>
  );
};

export default Avatar;
