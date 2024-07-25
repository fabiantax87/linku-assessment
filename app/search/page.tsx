import Search from "@/components/Search/Search";
import styles from "./page.module.css";

const SearchPage = () => {
  return (
    <div className={styles.searchPage}>
      <h1 className={styles.pageTitle}>Search</h1>
      <Search />
    </div>
  )
}

export default SearchPage;