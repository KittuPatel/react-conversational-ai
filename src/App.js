import React, { useState, useEffect } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import './App.css';
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from "words-to-numbers";
import NewsCards from './components/NewsCards/NewsCards'
const alanKey = "41d3f3c895762a9faa7e90eb02a331c12e956eca572e1d8b807a3e2338fdd0dc/stage";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Nunito',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  }
});

const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if(command === "newHeadlines") {
          console.log(articles);
          setNewsArticles(articles)
          setActiveArticle(-1)
        } else if (command === 'highlight') {
          setActiveArticle(prevActiveArticle => prevActiveArticle + 1 )
        } else if (command === 'open') {
            const parsedNumber = number.length > 2  ? wordsToNumbers(number,{fuzzy:true}) : null;
            const article = articles[parsedNumber - 1]

            if(parsedNumber > 20){
              alanBtn().playText('Please try that again')
            } 
            else if(article) {
              window.open(article.url, '_blank' )
              alanBtn().playText('Opening...')
            }  
        }
      }
    })
  } , [])
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <h2 className = "heading">Meet the Conversational AI with React!</h2>
        <NewsCards articles = {newsArticles} activeArticle = {activeArticle} />
      </div>
      <footer className = "heading" style= {{marginTop:'50px'}}>
        <p>Created by: <a href="https://mangalarapu.co" target="_blank" rel="noopener noreferrer">Krishna sai patel</a></p>
      </footer>
    </ThemeProvider>
  );
}

export default App;
