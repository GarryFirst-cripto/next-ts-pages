import Head from "next/head";
import styles from "../styles/socials.module.scss";

export interface ISocials {
  id: string;
  icon: string;
  path: string;
}

const Socials = ({ socials }: { socials: ISocials[] }) => {

  if (!socials) {
    return null;
  }

  return (
    <>
      <ul className={styles.socials}>
        {socials && socials.map(({ id, icon, path }) => (
          <li key={id}>
            <a href={path} target="_blank" rel="noopener noreferrer">
              <i className={`fab fa-${icon}`} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Socials;