import Profile from './components/Profile.jsx';

function App() {
  return (
    <div className="App">
      <Profile
        avatar="https://avatars.githubusercontent.com/u/9919?s=200&v=4"
        name="GitHub"
        bio="How people build software."
        email="fsf"
        phone="123-456-7890"
        github="ggdsf"
        linkedin="https://www.linkedin.com/in/github"
        twitter="https://twitter.com/github"
      />
    </div>
  );
}

export default App
