import React from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();

  const typefilter = searchParams.get("type");

  const [vans, setVans] = React.useState([]);
  React.useEffect(() => {
    fetch("/api/vans")
      .then((res) => res.json())
      .then((data) => setVans(data.vans));
  }, []);

  const displayFiltered = typefilter
    ? vans.filter((van) => van.type === typefilter)
    : vans;

  const vanElements = displayFiltered.map((van) => (
    <div key={van.id} className="van-tile">
      <Link to={`/vans/${van.id}`}>
        <img src={van.imageUrl} />
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>
            ${van.price}
            <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ));

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-buttons">
        <button onClick={() => setSearchParams({ type: "simple" })}>
          Simple
        </button>
        <button onClick={() => setSearchParams({ type: "luxury" })}>
          Luxury
        </button>
        <button onClick={() => searchParams({ type: "rugged" })}>Rugged</button>

        {typefilter ? (
          <button onClick={() => searchParams({})}>Clear Filters</button>
        ) : null}
      </div>
      <div className="van-list">{vanElements}</div>
    </div>
  );
}
