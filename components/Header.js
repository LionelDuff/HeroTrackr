import { Popover } from "antd";
import { ConfigProvider, Popconfirm } from "antd";

import styles from "@/styles/Header.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faMask, faHeart } from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";
import { useRouter } from "next/router";

import { removeFavorites, removeAllFavorites } from "@/reducers/favorites";
import { clickHeroProfile } from "@/reducers/hero";

import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const router = useRouter();
  // Redux
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.value);

  const removeFavorite = (favorite) => {
    dispatch(removeFavorites(favorite));
  };

  const removeAll = () => {
    dispatch(removeAllFavorites());
  };

  const handleClickProfile = (data) => {
    // Dispatch the action to set the hero profile in the reducer
    dispatch(clickHeroProfile(data));
    // Redirect to the profile page of the hero
    router.push(`/profile`);
  };

  const listFavorites = favorites?.map((favorite, i) => {
    return (
      <div key={i} className={styles.vignettePopover}>
        <Image
          className={styles.imagePopover}
          src={favorite.image.url}
          alt={favorite.name}
          width={70}
          height={50}
          onClick={() => handleClickProfile(favorite)}
        />
        <div className={styles.descriptionPopover}>
          <p className={styles.paraPopover1}>{favorite.name}</p>
          <p className={styles.paraPopover2}>
            {truncate(favorite.biography["full-name"], 15)}
          </p>
        </div>
        <FontAwesomeIcon
          className={styles.iconPopover}
          icon={faXmark}
          onClick={() => removeFavorite(favorite)}
        />
      </div>
    );
  });

  const listPopover = (
    <div className={styles.popoverContainer}>
      {listFavorites}
      <Popconfirm
        title="Delete all favorites?"
        onConfirm={removeAll}
        okText="Yes"
        okType="danger"
        cancelText="No"
        color="#333333"
      >
        <button className={styles.deleteBtn}>Delete All</button>
      </Popconfirm>
    </div>
  );

  // Function to truncate the string if it exceeds the maximum length
  // and add "..." at the end
  function truncate(str, maxlength) {
    return str.length > maxlength ? str.slice(0, maxlength - 1) + "..." : str;
  }

  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <FontAwesomeIcon className={styles.iconHeader} icon={faMask} />
        <h1 className={styles.title}>
          <span className={styles.color}>H</span>ero
          <span className={styles.color}>T</span>rack
          <span className={styles.color}>r</span>
        </h1>
      </div>

      <div className={styles.headerRight}>
        <Popover
          className={styles.popover}
          content={listPopover}
          color="rgba(255,255,255,0.2)"
          mouseEnterDelay={0.2}
          mouseLeaveDelay={0.2}
        >
          <FontAwesomeIcon className={styles.iconFav} icon={faHeart} />
        </Popover>
        <p>Favorites</p>
      </div>
    </div>
  );
}
