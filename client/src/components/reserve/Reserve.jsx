import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import "./reserve.css";
import { useFetch } from "../../hooks/useFetch";
import { useSearch } from "../../context/SearchContext";
import axios from "axios";

export const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data } = useFetch(`/hotels/room/${hotelId}`);
  const navigate = useNavigate();

  const { dates } = useSearch();
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const handleSelect = e => {
    const checked = e.target.checked;
    const value = e.target.value;

    // when clicked add the new value to the selectedRooms array
    // else remove it
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter(item => item !== value)
    );
  };

  const isAvailable = roomNumber => {
    const isFound = roomNumber.unavailableDates.some(date =>
      allDates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map(roomId => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: allDates,
          });

          return res.data;
        })
      );

      setOpen(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />

        <span>Select your rooms:</span>
        {data.map(item => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>

              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">${item.price}</div>
            </div>

            <div className="rSelectRooms">
              {item.roomNumbers.map(roomNumber => (
                <div className="room">
                  <label>{roomNumber.number}</label>

                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};
