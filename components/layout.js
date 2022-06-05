export default ({ children }) => (
  <>
    {children}
    <style jsx global>{`
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
