function Error({ statusCode, title }) {
  return (
    <div className="error-container">
      <img
        src="https://rickandmortyapi.com/api/character/avatar/234.jpeg"
        alt="a dead morty..."
      />
      {statusCode && <h1>Code: {statusCode}</h1>}
      <p>We are sorry! There was an error</p>
      {title && <p>Error: {title}</p>}
      <p>Please try again later</p>
    </div>
  );
}

Error.getInitialProps = ({ res, title }) => {
  const statusCode = res ? res.statusCode : title ? title.statusCode : 404;
  return { statusCode, title };
};

export default Error;
