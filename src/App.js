import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: new Date(),
      events: [], // Array to store events
      selectedDate: null, // To track the selected date for event actions
    };
  }

  render() {
    const { currentMonth, selectedDate } = this.state;
    const today = new Date();

    return (
      <div className="container mt-5">
        <div className="card">
          <div className="card-header">
            <h1 className="text-center">Simple Calendar</h1>
            <div className="d-flex justify-content-between align-items-center">
              <button
                className="btn btn-primary"
                onClick={() => this.prevMonth()}
              >
                <FontAwesomeIcon icon={faArrowLeft} /> Previous Month
              </button>
              <DatePicker
                selected={currentMonth}
                onChange={(date) => this.handleMonthChange(date)}
                dateFormat="MMMM yyyy"
                showMonthYearPicker
                className="form-control"
              />
              <button
                className="btn btn-primary"
                onClick={() => this.nextMonth()}
              >
                Next Month <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr className="table-primary">
                  <th className="text-danger">Sun</th>
                  <th>Mon</th>
                  <th>Tue</th>
                  <th>Wed</th>
                  <th>Thu</th>
                  <th>Fri</th>
                  <th className="text-danger">Sat</th>
                </tr>
              </thead>
              <tbody>{this.renderCalendarGrid(currentMonth, today)}</tbody>
            </table>
          </div>
        </div>

        {/* Event Management Section */}
        {selectedDate && (
          <div className="mt-4">
            <h2 className="text-center">Event Management</h2>
            <div className="text-center">
              <button
                className="btn btn-success mr-2"
                onClick={this.createEvent}
              >
                Create Event
              </button>
              <button className="btn btn-warning mr-2" onClick={this.editEvent}>
                Edit Event
              </button>
              <button className="btn btn-danger" onClick={this.deleteEvent}>
                Delete Event
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  renderCalendarGrid(currentMonth, today) {
    if (!currentMonth) {
      return null; // Return nothing if currentMonth is undefined
    }

    const firstDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    ).getDay();
    const daysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();
    const calendarGrid = [];
    let dayCounter = 1;

    for (let i = 0; i < 6; i++) {
      const row = [];

      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDayOfMonth) || dayCounter > daysInMonth) {
          // Display empty cells for previous and next month's dates
          row.push(
            <td key={`${i}-${j}`} className="text-muted font-weight-bold">
              {" "}
            </td>
          );
        } else if (dayCounter <= daysInMonth) {
          const isToday =
            dayCounter === today.getDate() &&
            currentMonth.getMonth() === today.getMonth();
          const isSaturday = j === 6 ? "text-danger" : "";
          const isSunday = j === 0 ? "text-danger" : "";
          row.push(
            <td
              key={`${i}-${j}`}
              className={`font-weight-bold text-center ${
                isToday ? "table-success" : ""
              } ${isSaturday} ${isSunday}`}
            >
              {dayCounter}
            </td>
          );
          dayCounter++;
        }
      }

      // Check if all cells in the row are empty
      const isRowEmpty = row.every((cell) => {
        const cellContent = String(cell.props.children || ""); // Convert to string
        return cellContent.trim() === "";
      });

      if (!isRowEmpty) {
        calendarGrid.push(<tr key={i}>{row}</tr>);
      }
    }

    return calendarGrid;
  }

  prevMonth() {
    const { currentMonth } = this.state;
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(currentMonth.getMonth() - 1);
    this.setState({ currentMonth: prevMonth });
  }

  nextMonth() {
    const { currentMonth } = this.state;
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(currentMonth.getMonth() + 1);
    this.setState({ currentMonth: nextMonth });
  }

  handleMonthChange(selectedDate) {
    this.setState({ currentMonth: selectedDate });
  }
}

export default App;
