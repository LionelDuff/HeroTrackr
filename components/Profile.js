import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faDice,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "next/router";

import styles from "@/styles/Profile.module.css";

import Header from "./Header";
import Footer from "./Footer";

import { Progress, Typography, Collapse, Divider, Flex } from "antd";

import { addFavorites, removeFavorites } from "@/reducers/favorites";
import { clickHeroProfile } from "@/reducers/hero";

const colors = {
  "0%": "#2A959B",
  "50%": "#57C785",
  "100%": "#ADFF2F",
};

export default function ProfileHero() {
  const router = useRouter();

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.value);
  const hero = useSelector((state) => state.hero.value);

  const [mainHero, setMainHero] = useState(hero);

  const isFavorite = favorites.some((favorite) => favorite.id === hero.id);

  // Function to random the hero profile
  const randomHero = () => {
    const random = Math.floor(Math.random() * 731) + 1;

    fetch(`/api/hero/${random}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(clickHeroProfile(data.data));
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  // Function to add or remove the hero from the favorites list in the reducer
  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFavorites(hero));
    } else {
      dispatch(addFavorites(hero));
    }
  };

  // Function to capitalize the first letter of the stats name
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  let styleFavorite = {};
  if (isFavorite) {
    styleFavorite = { color: "greenYellow", transform: "scale(1.3)" };
  }

  let stylesVignette = {
    backgroundImage: `url(${hero.image.url})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  // Create a list of progress bars for the hero's power stats
  const listProgress = [];
  for (const data in hero.powerstats) {
    listProgress.push(
      <div className={styles.boxProgress}>
        <Progress
          type="circle"
          percent={hero.powerstats[data]}
          format={(percent) => (percent === "null" ? "-" : `${percent}`)}
          strokeColor={colors}
          trailColor="#333333"
          strokeWidth={20}
        />

        <Typography>{capitalizeFirstLetter(data)}</Typography>
      </div>
    );
  }

  // Data for the collapse component
  const items = [
    {
      key: "1",
      label: "Biography",
      children: (
        <div className={styles.collapseContent}>
          <p className={styles.collapsePara}>
            <strong>Full Name:</strong> {hero.biography["full-name"]}
          </p>
          <p className={styles.collapsePara}>
            <strong>Alter Ego:</strong> {hero.biography["alter-egos"]}
          </p>
          <p className={styles.collapsePara}>
            <strong>Place of Birth:</strong> {hero.biography["place-of-birth"]}
          </p>
          <p className={styles.collapsePara}>
            <strong>Publisher:</strong> {hero.biography.publisher}
          </p>
        </div>
      ),
    },
    {
      key: "2",
      label: "Appearance",
      children: (
        <div className={styles.collapseContent}>
          <p className={styles.collapsePara}>
            <strong>Gender:</strong> {hero.appearance["gender"]}
          </p>
          <p className={styles.collapsePara}>
            <strong>Race:</strong>{" "}
            {hero.appearance["race"] === "null" ? "-" : hero.appearance["race"]}
          </p>
          <p className={styles.collapsePara}>
            <strong>Height:</strong> {hero.appearance.height[1]}
          </p>
          <p className={styles.collapsePara}>
            <strong>Weight:</strong> {hero.appearance.weight[1]}
          </p>
          <p className={styles.collapsePara}>
            <strong>Eye Color:</strong> {hero.appearance["eye-color"]}
          </p>
          <p className={styles.collapsePara}>
            <strong>Hair Color:</strong> {hero.appearance["hair-color"]}
          </p>
        </div>
      ),
    },
    {
      key: "3",
      label: "Work",
      children: (
        <div className={styles.collapseContent}>
          <p className={styles.collapsePara}>
            <strong>Occupation:</strong> {hero.work.occupation}
          </p>
          <p className={styles.collapsePara}>
            <strong>Base:</strong> {hero.work.base}
          </p>
        </div>
      ),
    },
    {
      key: "4",
      label: "Connections",
      children: (
        <div className={styles.collapseContent}>
          <p className={styles.collapsePara}>
            <strong>Group Affiliation:</strong>
            {hero.connections["group-affiliation"]}
          </p>
          <p className={styles.collapsePara}>
            <strong>Relatives:</strong> {hero.connections.relatives}
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.containerHeader}>
        <Header />
      </div>

      <div className={styles.containerTitle}>
        <div className={styles.contentTitle}>
          <FontAwesomeIcon
            className={styles.icon}
            icon={faArrowLeft}
            onClick={() => router.push("/")}
          />
          <div className={styles.title}>
            <h2 className={styles.name}>{hero.name}</h2>
            <p className={styles.occupation}>{hero.biography["full-name"]}</p>
          </div>
          <FontAwesomeIcon
            className={styles.dice}
            icon={faDice}
            onClick={randomHero}
          />
        </div>
      </div>

      <div className={styles.containerMainHero}>
        <div style={stylesVignette} className={styles.boxOne}>
          <FontAwesomeIcon
            style={styleFavorite}
            className={styles.iconFav}
            icon={faHeart}
            onClick={handleFavoriteClick}
          />
        </div>

        <Divider
          type="vertical"
          style={{ borderColor: "#7cb305" }}
          className={styles.divider}
          variant="dotted"
        >
          Solid
        </Divider>

        <div className={styles.boxTwo}>{listProgress}</div>

        <Divider
          type="vertical"
          style={{ borderColor: "#7cb305" }}
          className={styles.divider}
          variant="dotted"
        >
          Solid
        </Divider>

        <div className={styles.boxThree}>
          <Collapse
            items={items}
            defaultActiveKey={["1"]}
            className={styles.collapse}
            bordered={false}
          />
        </div>
      </div>

      <footer className={styles.containerFooter}>
        <Footer />
      </footer>
    </div>
  );
}
