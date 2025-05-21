import Image from "next/image";

import googleIcon from "@assets/icons/Logo-Google.svg";
import twitterIcon from "@assets/icons/twitter-logo.svg";
import facebookIcon from "@assets/icons/fb-logo.svg";
import appleIcon from "@assets/icons/apple-logo.svg";

export default function PlatformsContainer() {
  return (
    <div className="platforms">
      <p className="hr-line relative text-center text-text-color mb-[32px]">Or Continue with</p>
      <ul className="container flex gap-x-8 items-center justify-center  ">
        <li className="border border-border-color  shadow-input-shadow p-[20px] rounded-2xl">
          <Image src={googleIcon} alt="Google Icon" width={23} height={23} />
        </li>
        <li className="border border-border-color  shadow-input-shadow p-[20px] rounded-2xl">
          <Image className="size-[23px]" src={twitterIcon} alt="Twitter Icon" width={23} height={23} />
        </li>
        <li className="border border-border-color  shadow-input-shadow p-[20px] rounded-2xl">
          <Image src={facebookIcon} alt="Facebook icon" width={23} height={23} />
        </li>
        <li className="border border-border-color  shadow-input-shadow p-[20px] rounded-2xl">
          <Image className="size-[23px]" src={appleIcon} alt="Apple Icon" width={23} height={23} />
        </li>
      </ul>
    </div>
  );
}
