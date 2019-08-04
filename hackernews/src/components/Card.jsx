import React from 'react';
import Moment from 'moment';
import CommentCard from './CommentCard.jsx';

class Card extends React.Component {  

  constructor() {
    super();

    this.state = {
      showHide: 'hide',
    };
  };  

  showHideComments(){
    const { showHide } = this.state;
    const newValue = showHide === 'hide' ? 'show' : 'hide';

    this.setState({showHide: newValue});

  }

  render() {
    const { item, base } = this.props;
    const { showHide } = this.state;
    var now = Moment();
    var end = Moment.unix(item.time);
    var duration = Moment.duration(now.diff(end));
    var time = parseInt(duration.asHours()) < 1 ? parseInt(duration.asMinutes()) + ' minutes' : parseInt(duration.asHours()) + ' hours';
    return (
      <div className='storyContainer'>
        <div className='score'>{item.score} <span className='points'>points</span></div>
        <h2 className='storyTitle'><a href={item.url} target='_blank' rel="noopener noreferrer" className='App-link'>{item.title}</a></h2>
        <div className='author'>By : {item.by} <span className='dateCreated'>{time} ago</span></div>
        {item.kids !== undefined && item.kids.length > 0 ?
          <div>
            <div className='comments'>
              <button className='App-text-button' onClick={() => { this.showHideComments(); }}>{showHide === 'hide' ? 'show' : 'hide'} top comments</button>
            </div>
            <div className={`commentsContainer ${showHide}`}>
              <ul className='commentList'>
                {item.kids.map((item, key) =>
                  <CommentCard base={base} item={item} key={item.id} />
                )}              
              </ul>
            </div> 
          </div>         
        : null } 
      </div>           
    );
  }
}

export default Card;