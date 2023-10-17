import React from "react";
import { AiOutlineFacebook, AiOutlineGoogle, AiOutlineLinkedin, AiOutlineTwitter } from "react-icons/ai";

export default function SocialMediaInput({
  facebookIcon,
  twitterIcon,
  linkedInIcon,
  googleIcon,
  setInputValue,
  inputValue,
  socialMediaName
}) {
  return (
    <>
      <div className="flex items-center space-x-1.5 w-full">
        {/* SVG */}
        <div>
          {facebookIcon ? (
            <AiOutlineFacebook className="w-8 h-8 text-[#899592]" />
          ) : twitterIcon ? (
            <AiOutlineTwitter className="w-8 h-8 text-[#899592]" />
          ) : linkedInIcon ? (
            <AiOutlineLinkedin className="w-8 h-8 text-[#899592]" />
          ) : googleIcon ? (
            <AiOutlineGoogle className="w-8 h-8 text-[#899592]" />
          ) : null}
        </div>

        {/* INPUT */}
        <div className="w-full">
          <input
            type={"text"}
            className={`w-full border border-[#AAB4C1] rounded-[10px] py-1.5 px-2 bg-white`}
            placeholder={"URL"}
            onChange={(e) => setInputValue((prevValues => ({ ...prevValues, [socialMediaName]: e?.target?.value })))}
            value={inputValue}
          />
        </div>
      </div>
    </>
  );
}
