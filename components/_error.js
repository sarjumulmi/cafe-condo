export default function Error({ statusCode, error }) {
  return (
    <div className="error-container">
      <img
        src="https://rickandmortyapi.com/api/character/avatar/234.jpeg"
        alt="a dead morty..."
      />
      {statusCode && <h1>Error: {statusCode}</h1>}
      <p>We are sorry! There was an error</p>
      {error && <p>Error: {error}</p>}
      <p>Please try again later</p>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode, err };
};
