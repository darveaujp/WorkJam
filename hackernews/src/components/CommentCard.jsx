import React from 'react';
import ReactHtmlParser from 'react-html-parser'
import CommentCard from './CommentCard.jsx';

const HN_VERSION = "v0";


class Card extends React.Component {

  constructor() {
    super();

    this.state = {
      comment: {},
      isLoaded: true,
    };
  };

  componentDidMount() {
    const { item } = this.props;

    this.getComment(item)
  }

  getComment(commentId) {
    const { base } = this.props;

    base.fetch(`/${HN_VERSION}/item/${commentId}`, {
      context: this,
      then(comment) {
        this.setState({comment});
      }
    });
  }

  render() {
    const { base } = this.props;
    const { comment } = this.state;
    return (   
      <li>
        { ReactHtmlParser(comment.text) }
        {comment.kids !== undefined && comment.kids.length > 0 ?
          <ul className='commentList'>
            {comment.kids.map((item, key) =>
              <CommentCard base={base} item={item} key={item.id} />
            )}              
          </ul>
       : null}
      </li>
    );
  }
}

export default Card;