export const Filter = () => {
  const setFilter = (type: string) => {
    const event = new CustomEvent('setFilter', { detail: type });
    window.dispatchEvent(event);
  };

  return (
    <div className="filter">
      <button onClick={() => setFilter('all')}>All</button>
      <button onClick={() => setFilter('active')}>Active</button>
      <button onClick={() => setFilter('completed')}>Completed</button>
    </div>
  );
};
