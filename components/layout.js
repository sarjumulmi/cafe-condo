export default ({ children }) => (
  <>
    {children}
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Bungee+Shade&display=swap');
      body {
        margin: 0;
        padding: 0;
        font-size: 16px;
        font-family: monospace, sans-serif;
      }
      h1,
      h2 {
        margin: 0;
      }
    `}</style>
  </>
);
