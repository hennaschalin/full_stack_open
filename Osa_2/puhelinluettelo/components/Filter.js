

const Filter = ({ filter, onChange }) => {
    return (
        <form>
        <div>
          filter shown with: {' '}
          <input
          id="filter"
          name="filter"
          type="text"
          value={filter}
          onChange={onChange}
          />
        </div>
      </form>
    )
  }
  
  export default Filter