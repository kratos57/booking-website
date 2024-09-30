import "./attendre.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Dataattendre from "../../components/dataattendre/Dataattendre"

const Attendre = ({columns}) => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Dataattendre columns={columns}/>
      </div>
    </div>
  )
}

export default Attendre