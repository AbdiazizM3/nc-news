export default function SortDrop({setSort, setOrder}) {
    function handleSort(event) {
        setSort(event.target.value)
    }

    function handleOrder(event) {
        setOrder(event.target.value)
    }

    return (
        <div className="article__filter">
            <select name="sort" id="sort" className="article__filter --sort" onChange={handleSort}>
                <option value="created_at">Date</option>
                <option value="votes">Votes</option>
                <option value="comment_count">Comments</option>
            </select>
            <select name="order" id="order" className="article__filter --order" onChange={handleOrder}>
                <option value="DESC">DESC</option>
                <option value="ASC">ASC</option>
            </select>
        </div>
    )
}