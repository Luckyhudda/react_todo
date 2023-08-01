import style from "./Footer.module.css";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={`${style.footer} bg-dark text-white`}>
      <div className={style.socialIconContainer}>
        <a
          href="https://www.linkedin.com/in/lucky-hudda-59a0a7254/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className={style.socialIcon} />
        </a>
        <a
          href="https://github.com/Luckyhudda"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className={style.socialIcon} />
        </a>
      </div>
      <span className={`copyRightText ${style.socialIconContainer}`}>
        <span className={style.madeWithText}> Made With</span> 💗 by Lucky
        &copy; {new Date().getFullYear()}
      </span>
    </footer>
  );
};

export default Footer;
