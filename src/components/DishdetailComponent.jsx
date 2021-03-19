import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Row,
  Col,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

function RenderComments({ comments, postComment, dishId }) {
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
          <CommentForm dishId={dishId} postComment={postComment}></CommentForm>
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
          <CardImg
            width="100%"
            src={baseUrl + dishDetail.image}
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

const DishDetail = (props) => {
  console.log("DishDetail Component render invoked");
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderDishDetail dishDetail={props.dish} />
          <RenderComments
            comments={props.comments}
            postComment={props.postComment}
            dishId={props.dish.id}
          />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length < len;
const minLength = (len) => (val) => !val || val.length >= len;
class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModelOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModelOpen: !this.state.isModelOpen,
    });
  }

  handleSubmit(values) {
    this.toggleModal();
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
  }

  render() {
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-edit fa-lg"></span> Submit Comment
        </Button>

        <Modal isOpen={this.state.isModelOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label for="rating" md={12}>
                  rating
                </Label>
                <Col md={12}>
                  <Control.select
                    model=".rating"
                    name="rating"
                    className="form-control"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author" md={12}>
                  Your Name
                </Label>
                <Col md={12}>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    placeholder="Author"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Should have more than 3 Characters",
                      maxLength: "Should have 15 or less Characters",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="feedback" md={12}>
                  Your feedback
                </Label>
                <Col md={12}>
                  <Control.text
                    model=".comment"
                    id="comment"
                    name="comment"
                    resize="none"
                    rows="12"
                    className="form-control"
                    validators={{
                      required,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".comment"
                    show="touched"
                    messages={{
                      required: "Required",
                    }}
                  />
                </Col>
              </Row>
              <Button type="submit" value="submit" color="primary">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default DishDetail;
