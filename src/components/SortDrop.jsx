export default function SortDrop({sort, order, setSort, setOrder}) {
    function handleSort(event) {
        setSort(event.target.value)
    }

    function handleOrder(event) {
        setOrder(event.target.value)
    }

    return (
        <div className="flex justify-center space-x-4 mb-4 border-2 border-solid border-slate-600">
            <select name="sort" id="sort" value={sort} onChange={handleSort}>
                <option value="created_at">Recent</option>
                <option value="votes">Popular</option>
                <option value="comment_count">Most Talked about</option>
            </select>
            <select name="order" id="order" value={order} onChange={handleOrder}>
                <option value="DESC">DESC</option>
                <option value="ASC">ASC</option>
            </select>
        </div>
    )
}