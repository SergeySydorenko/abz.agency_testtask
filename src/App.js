import { useEffect, useState } from "react";
import Header from "./components/Header";
import Section from "./components/Section";
import SectionUsers from "./components/SectionUsers";
import getUsers, { getToken, postUser } from "./functions/getUsers";
import {getPositions} from "./functions/getUsers";
import SectionAddNewUser from "./components/SectionAddNewUser";
import SuccessRegister from "./components/SuccessRegister";


function App() {
  const positionsLink='positions';

  const [usersData, setUsersData] = useState([]);
  const [positions, setPositions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [visibleButton, setVisibleButton] = useState(true);
  const [visibleModal, setVisibleModal] = useState(true);

  //loads first list of users
  //add new list everytime page change
  useEffect(()=>{
    getUsers(page).then(res => {
      setUsersData([...usersData, ...res.data.users]);
      setTotalPages(res.data.total_pages);
    });
  }, [page]);

  //loads list of positions
  useEffect(()=>{
    getPositions(page,positionsLink).then(res => setPositions(res.data.positions))
  }, []);

  //change page number to trigger useEffect and load more users
  function loadNewPage(){
    if(page < totalPages){
      setPage(prevState => prevState + 1);
    }
    if(page == totalPages-1){

      //button show more will be hidden when last page of users will loaded
      setVisibleButton(false);
    }
  }

  function sendData(e){
    e.preventDefault();

    let checkedPositition;

    //find which radio button is checked
    for(let i = 3; i <= 6; i++){
      if(e.target[i].checked == true){
        checkedPositition = e.target[i].id;
      }
    }

    var formData = new FormData(); 
    formData.append('position_id', checkedPositition);
    formData.append('name', e.target.name.value);
    formData.append('email', e.target.email.value);
    formData.append('phone', e.target.phone.value);
    formData.append('photo', e.target.photo.files[0], e.target[8].value);

    //gets token then uploads form data to database api when finished reloads first page of users
    getToken().then(res => postUser(formData, res.data.token).then(response=>{
      if(response.data.success == true){
        setVisibleModal(0);
        getUsers(page).then(res => {
          setUsersData(res.data.users);
        });
        setPage(1);
      }}).catch(err => alert(err.response.data.message))
      );

  }

  return (
    <div className="App">
      <Header/>
      <Section/>
      <SectionUsers usersData={usersData} loadNewPage={loadNewPage} visibleButton={visibleButton} />
      {visibleModal ? <SectionAddNewUser positions={positions} sendData={sendData}/> : <SuccessRegister/>}
    </div>
  );
}

export default App;
