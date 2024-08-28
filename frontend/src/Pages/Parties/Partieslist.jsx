import React, { useEffect, useState } from 'react'
import searchicon from '../../assets/img/icons/search-normal.svg';
import addicon from '../../assets/img/icons/plus.svg';

import AddPartiesModal from './AddPartiesModal';
import { DeleteParties, GetAllParties } from '../../ApiCalls/Parties';
import { toast } from 'react-toastify';

const Partieslist = () => {
    const [AddModal,setAddModal]=useState(false)
    const [Parties,setParties]=useState([])
    const [isloading,setIsloading]=useState(true)

    const PartiesDataFetch = async()=>{
      try {
    
          const response = await GetAllParties();
          if(response.success){
            setParties(response.data)
            setIsloading(false)
          }else{
            toast.error("Network Error Please Check Your connection and Reload the Page")
          }
        
        
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(()=>{
      PartiesDataFetch()
    },[])
    console.log(Parties,"ppppp");

    const handleDeleteClick = async(item)=>{
      setIsloading(true)
      try {
        const response = await DeleteParties(item);
        if(response.success){
          toast.success(`${response.message}`)
          PartiesDataFetch()
          setIsloading(false)
        }else{
          toast.error(`${response.message}`)
          setIsloading(false)
        }
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <> {isloading ? (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    ) :<>
        <div className="row">
            <div className="col-sm-12">
            <div className="card  card-table show-entire">
              <div className="card-body">
                <div className="page-table-header mb-2">
                  <div className="row align-items-center">
                    <div className="col">
                      <div className="doctor-table-blk">
                        <h3>Parties List</h3>
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
                            <a className="btn btn-primary add-pluss ms-2" onClick={()=>{setAddModal(true)}}>
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
                      <th>Address Number</th>
                      <th>NPWP</th>
                      <th>Contact No</th>
                      <th>Email</th>
                      {/* <th>Pan Image</th> */}
                      <th>NPWP Image</th>
                    </tr>
                  </thead>
                  <tbody>
                      {Parties.map((item,index)=>(
                        <tr key={index}>
                        <td>{index+1}</td>
                        <td>{item.name}</td>
                        <td>{item.gst}</td>
                        <td>{item.number1}</td>
                        {/* <td>{item.email1}</td> */}
                        {/* <td>
                          <img src={item.panphoto} alt="pan-img" height={45} width={45} />
                         </td> */}
                         <td>
                          <img src={item.gstphoto} alt="gst-img" height={45} width={45} />
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
                              {/* <a  className="dropdown-item" data-bs-toggle="modal"
                                data-bs-target="#delete_patients"
                                >
                                <i className="fa-solid fa-pen-to-square m-r-5"></i> Edit
                              </a> */}
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
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            </div>
        </div>
        {AddModal && <AddPartiesModal setModal={setAddModal} setParties={setParties}/>}
    </>} </>
  )
}

export default Partieslist