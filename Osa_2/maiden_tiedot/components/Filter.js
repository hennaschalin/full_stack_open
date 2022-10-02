

const Filter = ({ filter, onChange }) => {
    return (
        <form>
        <div>
          find countries: {' '}
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