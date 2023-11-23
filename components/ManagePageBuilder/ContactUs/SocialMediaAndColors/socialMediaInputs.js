import React from "react";
import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineLinkedin, AiOutlineTwitter } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { Tooltip } from "react-tooltip";
export default function SocialMediaInput({
  facebookIcon,
  twitterIcon,
  linkedInIcon,
  instagramIcon,
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
            <>
              <AiOutlineFacebook className="w-8 h-8 text-[#899592]" data-tooltip-id="facebook" data-tooltip-content={"Facebook"} />
              <Tooltip id="facebook" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />
            </>
          ) : twitterIcon ? (
            <>
              <FaXTwitter className="w-8 h-8 text-[#899592]" data-tooltip-id="twitter" data-tooltip-content={"X"} />
              <Tooltip id="twitter" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />
            </>
          ) : linkedInIcon ? (
            <>
            <AiOutlineLinkedin className="w-8 h-8 text-[#899592]" data-tooltip-id="linkedin" data-tooltip-content={"LinkedIn"} />
            <Tooltip id="linkedin" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />
            </>
          ) : instagramIcon ? (
            <>
            <AiOutlineInstagram className="w-8 h-8 text-[#899592]" data-tooltip-id="instagram" data-tooltip-content={"Instagram"} />
            <Tooltip id="instagram" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />
            </>
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
