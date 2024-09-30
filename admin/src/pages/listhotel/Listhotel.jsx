import "./listformation.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatableformation/Datatableformation"
import Datatablehotel from "../../components/datatablehotel/Datatablehotel"

const listformation = ({columns}) => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatablehotel columns={columns}/>
      </div>
    </div>
  )
}

export default listformation ;