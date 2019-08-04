import React from 'react';
import rebase from "re-base";
import firebase from "@firebase/app";
import "@firebase/database";
import Card from './Card.jsx';

const HN_DATABASE_URL = "https://hacker-news.firebaseio.com";
const HN_VERSION = "v0";
const nbTopStories = 10;

firebase.initializeApp({ databaseURL: HN_DATABASE_URL });
let db = firebase.database();
let base = rebase.createClass(db);

class Content extends React.Component {
  constructor() {
    super();

    this.state = {
      top10: [],
      isLoaded: false,
    };
  };  

  componentDidMount() {
    base.fetch(`/${HN_VERSION}/topstories`, {
      context: this,
      then(storyIds) {
        const top10Id = storyIds.slice(0,nbTopStories); 
        top10Id.map((item, key) =>
          this.getSingleStory(item)
        );
      }
    });
  }


  getSingleStory(id) {
    const {top10} = this.state;
    base.fetch(`/${HN_VERSION}/item/${id}`, {
      context: this,
      then(story) {
        top10.push(story);
        this.setState({top10});
        if(top10.length === nbTopStories){
          this.setState({isLoaded: true});
        }
      }
    });
  }

  render() {
    const {top10, isLoaded} = this.state;
    return (
    <div className='App'>
      {isLoaded ? top10.map((item, key) =>
        <Card base={base} item={item} key={item.id} />
      ) : (<span>Loading Stories ....</span>)}
    </div>
    );
  }
}

export default Content;