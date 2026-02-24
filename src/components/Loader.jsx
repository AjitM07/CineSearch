import "./loader.css";

function Loader() {
  return (
    <div className="loader-overlay">
    <div className="loader-container">
      <svg viewBox="0 0 200 100">
        <circle className="ball" cx="20"  cy="80" r="5"/>
        <circle className="ball" cx="45"  cy="80" r="5"/>
        <circle className="ball" cx="70"  cy="80" r="5"/>
        <circle className="ball" cx="95"  cy="80" r="5"/>
        <circle className="ball" cx="120" cy="80" r="5"/>
        <circle className="ball" cx="145" cy="80" r="5"/>
        <circle className="ball" cx="170" cy="80" r="5"/>
        <circle className="ball" cx="195" cy="80" r="5"/>
      </svg>

      <div className="loading-text">LOADING...</div>
    </div>
    </div>
  );
}

export default Loader;