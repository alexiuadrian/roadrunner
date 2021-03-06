import React, {useState, useContext, createContext, useEffect} from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "../App.css";

export default function Edit(props) {
    const hoursAndMinutes = formatTime();
    const [date, setDate] = useState(new Date());
    const [distance, setDistance] = useState(props.data.distance);
    const [hours, setHours] = useState(hoursAndMinutes[0]);
    const [minutes, setMinutes] = useState(hoursAndMinutes[1]);
    const [userId, setUserId] = useState(jwt_decode(localStorage.getItem('token')).user_id);

    function formatTime() {
        const hoursAndMinutes = props.data.time.split(" ");

        console.log(hoursAndMinutes[0]);

        return hoursAndMinutes;
    }

    async function editRun(event) {
        event.preventDefault();

        var response = null;

        try {
        response = await axios.put(
            "http://localhost:3000/api/runs/" + props.data.id,
            {
                "date": date,
                "distance": parseInt(distance),
                "time": (hours + ' ' + minutes),
                "user_id": userId
            },
            {
                headers: {
                    Authorization: `token ${localStorage.getItem('token')}`
                }
            }
        )

        console.log(response.data);

        } catch (error) {
        console.error(error);
        }

        refreshPage();
      }

      function refreshPage() {
        window.location.reload(false);
      }

    return (
        <div id="edit">

            <form onSubmit={ (event) => {
                editRun(event);
            } }>
                
                <div class="mb-3">
                    <label class="form-label">Date</label>
                    <DatePicker dateFormat="yyyy-MM-dd" selected={date} onChange={(date) => setDate(date)} />
                </div>
                <div class="mb-3 col-md-3">
                    <label class="form-label">Distance (km)</label>
                    <input type="text" class="form-control" required defaultValue={props.data.distance} onChange={(e) => setDistance(e.target.value)}/>
                </div>

                <div class="col-md-1">
                        <label class="form-label">Time</label>
                    </div>
                <div class="d-flex flex-row gap-5 mb-3">
                    <div class="col-md-2">
                    hour(s)
                        <input type="text" class="form-control col-12" required defaultValue={hours} onChange={(e) => setHours(e.target.value)}/>
                    </div>
                    <div class="col-md-2">
                        minute(s)
                        <input type="text" class="form-control col-12" required defaultValue={minutes} onChange={(e) => setMinutes(e.target.value)}/>
                    </div>

                </div>

                <button type="submit" class="btn btn-primary mt-4">Submit</button>
            </form>
        </div>
    );
}