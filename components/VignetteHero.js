import styles from "@/styles/VignetteHero.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { useDispatch } from "react-redux";
import { addFavorites, removeFavorites } from "@/reducers/favorites";
import { clickHeroProfile } from "@/reducers/hero";

import { useRouter } from "next/router";

export default function VignetteHero(props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const imageUrl = props.image.url;
  const proxiedImageUrl = `/api/proxy-image?url=${encodeURIComponent(
    imageUrl
  )}`;

  let stylesVignette = {
    backgroundImage: proxiedImageUrl
      ? `url(${proxiedImageUrl})`
      : url("../public/no_hero_picture.png"),
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  let styleFavorite = {};
  if (props.isFavorite) {
    styleFavorite = { color: "greenYellow", transform: "scale(1.3)" };
  }

  // Function to truncate the string if it exceeds the maximum length
  // and add "..." at the end
  function truncate(str, maxlength) {
    return str.length > maxlength ? str.slice(0, maxlength - 1) + "..." : str;
  }

  // Function to add or remove the hero from the favorites list in the reducer
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (props.isFavorite) {
      dispatch(removeFavorites(props));
    } else {
      dispatch(addFavorites(props));
    }
  };

  const handleClickProfile = () => {
    // Dispatch the action to set the hero profile in the reducer
    dispatch(clickHeroProfile(props));
    // Redirect to the profile page of the hero
    router.push(`/profile`);
  };

  return (
    <div
      style={stylesVignette}
      className={styles.vignetteHero}
      onClick={handleClickProfile}
    >
      <div className={styles.container}>
        <div className={styles.iconContainer}>
          <div className={styles.iconBox}>
            <FontAwesomeIcon
              style={styleFavorite}
              className={styles.iconFav}
              icon={faHeart}
              onClick={handleFavoriteClick}
            />
          </div>
        </div>
        <div className={styles.description}>
          <h2>{props.name}</h2>
          <p className={styles.occupation}>
            {truncate(props.work.occupation, 30)}
          </p>
          <div className={styles.stats}>
            <div className={styles.boxStat}>
              <span>💪</span>
              <span>
                {props.powerstats.strength === "null"
                  ? "-"
                  : props.powerstats.strength}
              </span>
            </div>
            <div className={styles.boxStat}>
              <span>🧠</span>
              <span>
                {props.powerstats.intelligence === "null"
                  ? "-"
                  : props.powerstats.intelligence}
              </span>
            </div>
            <div className={styles.boxStat}>
              <span>🛡</span>
              <span>
                {props.powerstats.durability === "null"
                  ? "-"
                  : props.powerstats.durability}
              </span>
            </div>
            <div className={styles.boxStat}>
              <span>🔥</span>
              <span>
                {props.powerstats.power === "null"
                  ? "-"
                  : props.powerstats.power}
              </span>
            </div>
            <div className={styles.boxStat}>
              <span>⚔</span>
              <span>
                {props.powerstats.combat === "null"
                  ? "-"
                  : props.powerstats.combat}
              </span>
            </div>
            <div className={styles.boxStat}>
              <span>⚡</span>
              <span>
                {props.powerstats.speed === "null"
                  ? "-"
                  : props.powerstats.speed}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
