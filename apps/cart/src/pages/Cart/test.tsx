const App = () => {
  const onResentEmail = () => {
    console.log("ResentEmail");
  };
  return (
    <div>
      <button onClick={onResentEmail}>Resrnd Email</button>
    </div>
  );
};

export default App;
