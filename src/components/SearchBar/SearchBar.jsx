import styles from "./SearchBar.module.css";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({
  searchValue,
  onSearchChange,
  selectValue,
  onSelectChange,
}) {
  return (
    <div className={styles["searchBar-container"]}>
      <div className={styles["searchBar-inputGroup"]}>
        <label className={styles["searchBar-label"]} htmlFor="searchInput">Search</label>
        <div className={styles["searchBar-inputWrapper"]}>
          <FaSearch className={styles["searchBar-icon"]} />
          <input
            id="searchInput"
            type="text"
            placeholder="Search by title or location"
            value={searchValue}
            onChange={onSearchChange}
            className={styles["searchBar-input"]}
          />
        </div>
      </div>

      <div className={styles["searchBar-selectGroup"]}>
        <label className={styles["searchBar-label"]} htmlFor="categorySelect">Category</label>
        <select
          id="categorySelect"
          value={selectValue}
          onChange={onSelectChange}
          className={styles["searchBar-select"]}
        >
          <option value="all">All</option>
          <option value="general">General</option>
          <option value="course">Course</option>
          <option value="volunteering">Volunteering</option>
          <option value="sports">Sports</option>
          <option value="music">Music</option>
          <option value="art and culture">Art and Culture</option>
          <option value="food and drink">Food and Drink</option>
          <option value="networking">Networking</option>
          <option value="online">Online</option>
          <option value="kids and family">Kids and Family</option>
        </select>
      </div>
    </div>
  );
}
