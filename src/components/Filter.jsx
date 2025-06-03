const Filter = ({filter, setFilter}) => {

  const changeFilter = (e) => {
    setFilter(e.target.value)
  }

  return(
    <>   
    <label htmlFor="newfilter">Filter Shown With </label>
    <input id="newfilter"value={filter} onChange={changeFilter}/>
    </>
  )
}

export default Filter;