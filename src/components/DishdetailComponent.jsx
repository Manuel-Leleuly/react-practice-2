import React, { Component } from "react";
import { Card, CardImg, CardText, CardTitle } from "reactstrap";

class DishDetail extends Component {
  constructor(props) {
    super(props);
  }

  renderComments(comments) {
    if (comments !== null) {
      const dishComments = comments.map((comment) => {
        return (
          <div key={comment.id} className="text-left mx-2">
            <CardText>{comment.comment}</CardText>
            <CardText className="mb-3">
              -- {comment.author}, {comment.date}
            </CardText>
          </div>
        );
      });

      const showDishComments = (
        <div className="col-12 col-md-5 m-1">
          <Card>
            <CardTitle className="font-weight-bold text-left ml-2">
              <h4>Comments</h4>
            </CardTitle>
            {dishComments}
          </Card>
        </div>
      );

      return showDishComments;
    } else {
      return <div></div>;
    }
  }

  render() {
    const dishDetailComponent = (
      <div className="col-12 col-md-5 m-1" key={this.props.dishDetail.id}>
        <Card>
          <CardImg
            width="100%"
            src={this.props.dishDetail.image}
            alt={this.props.dishDetail.name}
          />
          <CardTitle className="text-left mx-2 font-weight-bold">
            {this.props.dishDetail.name}
          </CardTitle>
          <CardText className="text-left mx-2">
            {this.props.dishDetail.description}
          </CardText>
        </Card>
      </div>
    );

    return (
      <React.Fragment>
        {dishDetailComponent}
        {this.renderComments(this.props.dishDetail.comments)}
      </React.Fragment>
    );
  }
}

export default DishDetail;
