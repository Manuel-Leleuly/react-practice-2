import React from "react";
import { Card, CardImg, CardText, CardTitle } from "reactstrap";

function RenderComments({ comments }) {
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

function RenderDishDetail({ dishDetail }) {
  if (dishDetail !== null) {
    const dishDetailComponent = (
      <div className="col-12 col-md-5 m-1" key={dishDetail.id}>
        <Card>
          <CardImg width="100%" src={dishDetail.image} alt={dishDetail.name} />
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

const DishDetail = (props) => {
  console.log("DishDetail Component render invoked");
  if (props.dishDetail != null) {
    return (
      <div className="container">
        <div className="row">
          {/* {this.renderDishDetail(this.props.dishDetail)}
            {this.renderComments(this.props.dishDetail.comments)} */}
          <RenderDishDetail dishDetail={props.dishDetail} />
          <RenderComments comments={props.dishDetail.comments} />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default DishDetail;
