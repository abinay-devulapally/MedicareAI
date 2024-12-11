import React from "react";
import { Icon, InlineIcon } from "@iconify/react";

import locationIcon from "@iconify/icons-mdi/map-marker-radius-outline";
import phoneIcon from "@iconify/icons-mdi/phone-outline";
import emailIcon from "@iconify/icons-mdi/email-multiple-outline";

import facebookIcon from "@iconify/icons-mdi/facebook";
import linkedinIcon from "@iconify/icons-mdi/linkedin";
import twitterIcon from "@iconify/icons-mdi/twitter";

import "./info.css";

const contactDetails = [
  {
    value: "University of Cincinnati, Cincinnati, Ohio, 45220, United States",
    icon: locationIcon,
  },
  { value: "medicareai.reply@gmail.com", icon: emailIcon },
];

const socialIcons = [
  { icon: facebookIcon, href: "https://www.facebook.com" },
  { icon: linkedinIcon, href: "https://www.linkedin.com" },
  { icon: twitterIcon, href: "https://www.twitter.com" },
];

const renderContactDetails = () =>
  contactDetails.map((detail, index) => (
    <p key={index} className="info-detail">
      <InlineIcon icon={detail.icon} /> {detail.value}
    </p>
  ));

const renderSocialIcons = () =>
  socialIcons.map((social, index) => (
    <a key={index} href={social.href} target="_blank" rel="noopener noreferrer">
      <Icon icon={social.icon} className="info-icon" />
    </a>
  ));

const Info = () => (
  <section className="info">
    <h2 className="info-h2">Contact Information</h2>

    <div className="info-details-container">{renderContactDetails()}</div>

    <div className="info-icons-container">{renderSocialIcons()}</div>
  </section>
);

export default Info;
