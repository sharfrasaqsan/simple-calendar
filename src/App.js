import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { format, startOfYear, addDays, getDayOfYear } from "date-fns";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: new Date(),
    };
  }

  render() {
    const { currentMonth } = this.state;
    const today = new Date();

    return (
      <div className="container mt-5">
        <div className="card">
          <div className="card-header">
            <h1 className="text-center">Calendar App</h1>
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
                  <th className="text-muted font-weight-bold">Week</th>
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
    let weekNumber = 1;

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

      if (dayCounter > daysInMonth) {
        // Only add the row if it's not the last row and it's not entirely empty
        if (i < 5 && row.some((cell) => cell !== " ")) {
          calendarGrid.push(
            <tr key={i}>
              <td className="text-muted font-weight-bold">{weekNumber}</td>
              {row}
            </tr>
          );
        }
      } else {
        calendarGrid.push(
          <tr key={i}>
            <td className="text-muted font-weight-bold">{weekNumber}</td>
            {row}
          </tr>
        );
      }

      // Calculate the next week number
      weekNumber++;
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
