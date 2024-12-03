import React, { useEffect, useState } from 'react'
import searchicon from '../../assets/img/icons/search-normal.svg';
import addicon from '../../assets/img/icons/plus.svg';
import AddEmployee from './AddEmployee';
import { DeleteEmployees, GetAllEmployees } from '../../ApiCalls/Employee';
import { toast } from 'react-toastify';
import EditEmployee from './EditEmployee';

const EmployeeList = () => {
  const [Modal,setModal]=useState(false)
  const [EmpList,setEmpList]=useState(true)
  const [Data,setData]=useState([]);
  const [isloading,setIsloading]=useState(true)
  const [EditModal,setEditModal]=useState(false)
  const [editData,setEditData]=useState();

  const EmployeeDataFetch =async()=>{
    try {
      const response = await GetAllEmployees();
      if(response.success){
        setData(response.data);
        setIsloading(false)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    EmployeeDataFetch();
  },[])

  const handleDeleteClick = async(item)=>{
    setIsloading(true)
    try {
      const response = await DeleteEmployees(item);
      if(response.success){
        toast.success(`${response.message}`)
        EmployeeDataFetch()
        setIsloading(false)
      }else{
        console.log(response);
        setIsloading(false)
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log(Data,"datata");
  return (
    <>
    {isloading ? (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    ) :
    <div className="row">
            <div className="col-sm-12">
            <div className="card  card-table show-entire">
              <div className="card-body">
                <div className="page-table-header mb-2">
                  <div className="row align-items-center">
                    <div className="col">
                      <div className="doctor-table-blk">
                        <h3>Employee List</h3>
                        <div className="doctor-search-blk">
                          <div className="top-nav-search table-search-blk">
                            <form>
                              <input type="text" className="form-control" placeholder="Search here" />
                              <a className="btn">
                                <img src={searchicon} alt="" />
                              </a>
                            </form>
                          </div>
                          <div className="add-group">
                            <a className="btn btn-primary add-pluss ms-2" onClick={()=>{setModal(true)}}>
                              <img src={addicon} alt="" />
                            </a>
                            {/* <a href="javascript:;" className="btn btn-primary doctor-refresh ms-2">
                              <img src={refreshicon} alt="" />
                            </a> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table border-0 custom-table comman-table datatable mb-0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Employee Id</th>
                      <th>Contact No</th>
                      <th>password</th>
                      <th>Position</th>
                      <th>Profile Image</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                      {
                        Data.map((item,index)=>(
                          <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.employeeId}</td>
                           
                            <td>{item.number}</td>
                            <td>{item.password}</td>
                            <td>{item.position}</td>
                            <td>
                              <img style={{height:"65px",width:"165px"}} src={item.profileImage} alt="" />
                            </td>
                            <td className="text-end">
                          <div className="dropdown dropdown-action">
                            <a
                              href="#"
                              className="action-icon dropdown-toggle"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                             
                            >
                              <i className="fa fa-ellipsis-v"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end">
                              <a  className="dropdown-item" data-bs-toggle="modal"
                                data-bs-target="#delete_patients" 
                                onClick={()=>{setEditData(item),setEditModal(true)}}
                                >
                                <i className="fa-solid fa-pen-to-square m-r-5"></i> Edit
                              </a>
                              <a
                              
                                className="dropdown-item"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_patient"
                                onClick={()=>handleDeleteClick(item._id)}
                              >
                                <i className="fa fa-trash-alt m-r-5"></i> Delete
                              </a>
                            </div>
                          </div>
                        </td>
                          </tr>
                        ))
                      }
                  </tbody>
                </table>
              </div>
            </div>
            </div>
        </div>}
        {Modal && <AddEmployee setModal={setModal} setEmpList={setEmpList} FetchData={EmployeeDataFetch}/>}
        {EditModal && <EditEmployee setModal={setEditModal} FetchData={EmployeeDataFetch} editData={editData} />}
    </>
  )
}

export default EmployeeList