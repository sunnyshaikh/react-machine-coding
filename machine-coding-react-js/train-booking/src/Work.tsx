import { useMemo, useState } from "react";
import { rawTrainsData } from "./constants";
import "./work.css"; // Separate CSS file for styles

const Work = () => {
  const [date, setDate] = useState<number | string>("");
  const [seatId, setSeatId] = useState<any>(null);
  const [trainData, setTrainData] = useState(rawTrainsData);

  const filteredData = useMemo(
    () => trainData.filter((data) => data.date === date),
    [date, trainData]
  );

  const handleBooking = (seatIndex: number, id: string) => {
    setTrainData((prev) =>
      prev.map((train) =>
        train.trainId === id
          ? {
              ...train,
              seats: train.seats.map((seat, index) =>
                seatIndex === index ? { ...seat, isBooked: true } : seat
              ),
              availableSeats: train.availableSeats - 1,
            }
          : train
      )
    );
  };

  return (
    <div className="container">
      <h2 className="title">Train Seat Booking System</h2>

      <div className="input-control">
        <label htmlFor="select-date">Select Data: </label>
        <input
          type="date"
          id="select-date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {date ? (
        <>
          <h3>Trains available on {date}:</h3>
          {filteredData.length ? (
            <>
              <ul>
                {filteredData.map((data) => (
                  <li key={data.trainId}>
                    {data.name} - Available Seats: {data.availableSeats}
                    <button onClick={() => setSeatId(data.trainId)}>
                      View Seats
                    </button>
                  </li>
                ))}
              </ul>
              <h3>
                Seats for Train:{" "}
                {trainData.find((train) => train.trainId === seatId)?.name}
              </h3>
              <div className="seats">
                {filteredData
                  .find((data) => data.trainId === seatId)
                  ?.seats?.map((seat: any, index) => (
                    <div
                      className={`single-seat ${
                        seat.isBooked ? "booked" : seat.isPWD ? "pwd" : ""
                      }`}
                      onClick={() => {
                        !seat.isBooked &&
                          !seat.isPWD &&
                          handleBooking(index, seatId);
                      }}
                    >
                      {seat.isBooked ? "X" : seat.isPWD ? "PWD" : "O"}
                    </div>
                  ))}
              </div>
            </>
          ) : (
            <p>No trains available on this date.</p>
          )}
        </>
      ) : null}
    </div>
  );
};

export default Work;
