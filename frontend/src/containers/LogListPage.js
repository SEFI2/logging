import React, { Component } from "react";
import WebApi from "../utils/WebApi";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  ListGroup,
  ListGroupItem,
  Badge,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Container,
  Row,
  Col,
  Alert,
  Table
} from "reactstrap";

class LogListPage extends Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      sorted: [],
      traffic: [],
      threshold: 10,
      alerts: [{ text: "Logging started", color: "success" }],
      logs: [],
      trafficExceeds: false,
      highestAccessUser: null
    };
  }

  /**
   * addAlert - adds message to alert state
   *
   * @param {String} text - Alert message
   * @param {String} color - Type of alert
   * @param {String} [badge] - Badge if any extra text is added
   */
  addAlert(text, color, badge = null) {
    this.setState({
      ...this.state,
      alerts: [...this.state.alerts, { text, color, badge }]
    });
  }

  /**
   * checkStatistics
   */
  checkStatistics() {
    const startTime = moment
      .utc()
      .subtract("2", "minutes")
      .format();
    const endTime = moment.utc().format();
    WebApi.getStats(startTime, endTime).then(({ hitSort, userSort }) => {
      if (!hitSort || !hitSort.length) {
        this.addAlert("No logs found for given period", "warning");
      } else {
        this.addAlert(
          `Most visited section: ${hitSort[0].section}.`,
          "info",
          `Hits: ${hitSort[0].hits}`
        );
        this.setState({
          ...this.state,
          logs: hitSort[0].logs,
          highestAccessUser: userSort[0].user
        });
      }
    });
  }

  /**
   * checkTraffic
   */
  checkTraffic() {
    const startTime = moment
      .utc()
      .subtract("10", "seconds")
      .format();
    const endTime = moment.utc().format();
    WebApi.getTraffic(startTime, endTime).then(({ traffic }) => {
      if (!traffic) {
        this.addAlert("No logs found in last 2 minutes", "warning");
      } else {
        const { threshold, trafficExceeds: prevTrafficExceeds } = this.state;
        const { logsPerSecond, hits } = traffic;
        console.log({ prevTrafficExceeds });
        if (logsPerSecond > threshold) {
          this.addAlert(
            `Total traffic (${logsPerSecond}) exceeds threshold.`,
            "danger",
            `Hits: ${hits}`
          );
          alert(`Total traffic (${logsPerSecond}) exceeds threshold.`);
          this.setState({
            ...this.state,
            trafficExceeds: true
          });
        } else if (prevTrafficExceeds) {
          this.addAlert(
            `Total traffic (${logsPerSecond}) back to normal.`,
            "success",
            `Hits: ${hits}`
          );
          this.setState({
            ...this.state,
            trafficExceeds: false
          });
        } else {
          this.addAlert(
            `Total traffic (${logsPerSecond})`,
            "info",
            `Hits: ${hits}`
          );
        }
      }
    });
  }

  componentDidMount() {
    // Timer for Statistics retrieval
    setInterval(() => {
      this.checkStatistics();
    }, 10 * 1000); // 10 seconds

    // Timer for Traffic check
    setInterval(() => {
      this.checkTraffic();
    }, 10 * 1000); // 2 minutes
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Threshold</InputGroupText>
              </InputGroupAddon>
              <Input
                value={this.state.threshold}
                onChange={event =>
                  this.setState({
                    ...this.state,
                    threshold: parseInt(event.target.value)
                  })
                }
              />
            </InputGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            <h2>Most visited (in 10 seconds):</h2>
          </Col>
          <Col>
            <h2>Alerts:</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Address</th>
                  <th>Path</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {this.state.logs.map((log, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{log.user}</td>
                      <td>{log.address}</td>
                      <td>{log.requestPath}</td>
                      <td>{log.statusCode}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
          <Col>
            <ListGroup>
              {this.state.alerts.map((alert, index) => {
                return (
                  <ListGroupItem key={index}>
                    <Alert color={alert.color}>
                      {alert.text}
                      {alert.badge ? <Badge pill>{alert.badge}</Badge> : null}
                    </Alert>
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          </Col>
        </Row>
        <Row>
          <h4>User with highest access: </h4>
          <h3>
            <Badge color="primary">
              {this.state.highestAccessUser === null
                ? "No user accees yet."
                : this.state.highestAccessUser}
            </Badge>
          </h3>
        </Row>
      </Container>
    );
  }
}

export default LogListPage;
