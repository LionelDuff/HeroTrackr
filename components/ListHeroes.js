import { useState, useEffect, useRef, useMemo } from "react";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";

import styles from "@/styles/ListHeroes.module.css";

import VignetteHero from "@/components/VignetteHero";

export default function ListHeroes() {
  const favorites = useSelector((state) => state.favorites.value);

  const [value, setValue] = useState("");
  const [heroes, setHeroes] = useState([]);
  const [listSearch, setListSearch] = useState([]);

  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(20);

  const hasFetched = useRef(false);

  // Fetch Data from the API to display the heroes
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    for (let i = start; i <= end; i++) {
      fetch(`/api/hero/${i}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            setHeroes((prevHeroes) => [...prevHeroes, data.data]);
          }
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [start, end]);

  // Fetch Data from the API to display more heroes when the button is clicked
  const handleClick = () => {
    for (let i = start + 20; i <= end + 20; i++) {
      fetch(`/api/hero/${i}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            setHeroes((prevHeroes) => [...prevHeroes, data.data]);
          }
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
    setStart((prevStart) => prevStart + 20);
    setEnd((prevEnd) => prevEnd + 20);
  };

  // Fetch Data from the API to display the heroes based on the search value
  useEffect(() => {
    const searchHeroes = async (name) => {
      try {
        const response = await fetch(`/api/search/${name}`);
        const data = await response.json();
        if (data.result) {
          setListSearch(data.data.results);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (value.length > 0) {
      searchHeroes(value);
    }
  }, [value]);

  const heroesList = useMemo(() => {
    return heroes?.map((data, i) => {
      const isFavorite = favorites.some((favorite) => favorite.id === data.id);
      return <VignetteHero key={i} {...data} isFavorite={isFavorite} />;
    });
  }, [heroes, favorites]);

  const searchHeroesList = useMemo(() => {
    return listSearch?.map((data, i) => {
      const isFavorite = favorites.some((favorite) => favorite.id === data.id);
      return <VignetteHero key={i} {...data} isFavorite={isFavorite} />;
    });
  }, [listSearch, favorites]);

  return (
    <div className={styles.containerHeros}>
      <input
        className={styles.input}
        type="text"
        placeholder="🔍 Search for a hero"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className={styles.boxVignettes}>
        {value.length > 0 ? searchHeroesList : heroesList}
      </div>
      <div className={styles.containerButton}>
        <button className={styles.button} onClick={handleClick}>
          <FontAwesomeIcon icon={faAnglesDown} />
        </button>
      </div>
    </div>
  );
}
