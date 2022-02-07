export function Home () {
  return (
  <div>
    <h1> Home page</h1>
    <div className="img_">
      <img src={require("./img/그림1.png")} alt="karina"></img>
    </div>
    <button onClick={() => window.open("http://localhost:3000/meetingroom", "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, menubar=yes")}>meetingroom</button>
  </div>
  );
};
