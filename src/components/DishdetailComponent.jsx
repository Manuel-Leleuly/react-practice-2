import React, { Component } from "react";
import { Card, CardImg, CardText, CardTitle } from "reactstrap";

class DishDetail extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("DishDetail Component componentDidMount invoked");
  }

  componentDidUpdate() {
    console.log("DishDetail Component componentDidUpdate invoked");
  }

  renderComments(comments) {
    if (comments !== null) {
      const dishComments = comments.map((comment) => {
        return (
          <div key={comment.id} className="text-left mx-2">
            <CardText>{comment.comment}</CardText>
            <CardText className="mb-3">
              -- {comment.author},{" "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }).format(new Date(Date.parse(comment.date)))}
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

  renderDishDetail(dishDetail) {
    if (dishDetail !== null) {
      const dishDetailComponent = (
        <div className="col-12 col-md-5 m-1" key={dishDetail.id}>
          <Card>
            <CardImg
              width="100%"
              src={dishDetail.image}
              alt={dishDetail.name}
            />
            <CardTitle className="text-left mx-2 font-weight-bold">
              {dishDetail.name}
            </CardTitle>
            <CardText className="text-left mx-2">
              {dishDetail.description}
            </CardText>
          </Card>
        </div>
      );
      return dishDetailComponent;
    } else {
      return <div></div>;
    }
  }

  render() {
    console.log("DishDetail Component render invoked");
    if (this.props.dishDetail != null) {
      return (
        <div className="container">
          <div className="row">
            {this.renderDishDetail(this.props.dishDetail)}
            {this.renderComments(this.props.dishDetail.comments)}
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default DishDetail;
