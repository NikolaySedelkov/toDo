import './App.css';
import {useRef, useState} from "react";
import TableDay from "./TableDay.js"
import moment from 'moment/moment';
  
function App() {
  const [form, setForm] = useState({
    date: "",
    value: '0',
    upd: false
  })
  const [date, setDate] = useState([]);
  const handleNameChange = ({target}) => {
    let {name, value} = target;
    console.log(name, value);
    if(name === "date"){
      let now = moment(value, "YYYY-MM-DD");
      console.log(now.format("DD.MM.YYYY"));
      setForm(form => ({...form, [name]: value}));
    }
    else{  
      if(!isNaN(value))
        value = parseInt(value);
      setForm(form => ({...form, [name]: value}));
    }
  }

  const handleSubmit = evt =>{
    evt.preventDefault();
    let tmp = date.map(a => Object.assign({}, a));
    let obj = tmp.find(el => {
      if(el["date"] === form["date"]){
        if(form["upd"]){
          el["value"] = form["value"];
          form["upd"] = false;
        }
        else 
          el["value"] += form["value"];
        return true;
      }
      else return false; 
    })
    if(!obj) tmp.push(form);
    setDate(tmp.sort((a, b) => new Date(a["date"]).getTime() < new Date(b["date"]).getTime()));
    setForm({
      date: "",
      value: '0',
      upd: false
    })
  }

  const delDate = days =>{
    setDate(date.filter(el => el['date'] !== days));
  }

  const updDate = days =>{
    let obj = date.find(el => el["date"] === days);
    obj["upd"]=true;
    setForm(obj);
  }

  return (
    <div className="App">
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="formDate">Дата (ДД.ММ.ГГ)</label><br/>
          <input id="formDate" name="date" type="date" value={form.date} onChange={handleNameChange}/>

        </div>
        <div>
          <label htmlFor="formNumber">Пройдено км</label><br/>
          <input  id="formNumber" name="value" type="number" value={form.value} onChange={handleNameChange}/>
        </div>
        <button type="submit">ОК</button>
      </form>
      {date.length?<TableDay data={date} delDate={delDate} updDate={updDate}/>:null}
    </div>
  );
}

export default App;
