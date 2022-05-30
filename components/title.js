export default () => (
  <div className="title">
    <h1>501 Fitz Utilities</h1>
    <style jsx>{`
      .title {
        position: sticky;
        top: 0;
        background-color: #fff;
        z-index: 100;
        padding-bottom: 0.5rem;
      }
      .title h1 {
        font-family: monospace;
        font-weight: 500;
        font-size: xxx-large;
        border-bottom: 1px solid #b1adad;
        width: fit-content;
        margin-bottom: 8px !important;
      }
    `}</style>
  </div>
);
