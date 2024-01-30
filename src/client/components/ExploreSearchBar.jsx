
const ExploreSearchBar = ({setSearch}) => {
    return (
            <div className="search-bar-cards">
                <input
                    type="text"
                    placeholder="Search Decks..."
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div> 
    )
}

export default ExploreSearchBar;