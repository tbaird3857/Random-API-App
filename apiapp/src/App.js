import './App.css';
import APIs from './component/APIs';
import Security from './component/Security';
import RatingHistogram from './component/RatingHistogram';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <main>
          <div class="api-container">
            <strong><u>Here is a random API you can use for your project:</u></strong>
            <APIs></APIs>
          </div>
          <div class = "security-container">
            <Security></Security>
            </div>

          <div class = "rating-container">
            <RatingHistogram></RatingHistogram>
          </div>
        </main>
      </header>
      
    </div>
  );
}

export default App;
