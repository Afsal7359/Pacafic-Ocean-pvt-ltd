import React, { useEffect, useState } from 'react'
import searchicon from '../../assets/img/icons/search-normal.svg';
import addicon from '../../assets/img/icons/plus.svg';
import AddJobModal from './AddJobModal';
import JobCreation from './JobCreation';
import { GetJobs } from '../../ApiCalls/Job';

const JobList = () => {

    const [AddModal,setAddModal]=useState(false)
    const [Jobcreation,setJobcreation]=useState(false)
    const [tableView,setTableView]=useState(true)
    const [jobData,setJobData]=useState([])
    const handleItemClick=()=>{
      try {
       setJobcreation(true)
       setTableView(false)
      } catch (error) {
        console.log(error,"error");
      }
    }
    const JobDataFetch =async()=>{
      try {
        const response = await GetJobs();
        console.log(response,"response");
        if(response.success){
          setJobData(response.data)
        }else{
          console.log(response.message,"error");
        }
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(()=>{
      JobDataFetch();
    },[])
  return (
    <>
     {tableView&&<div className="row">
            <div className="col-sm-12">
            <div className="card  card-table show-entire">
              <div className="card-body">
                <div className="page-table-header mb-2">
                  <div className="row align-items-center">
                    <div className="col">
                      <div className="doctor-table-blk">
                        <h3>Job List</h3>
                        <div className="doctor-search-blk">
                          <div className="top-nav-search table-search-blk">
                            <form onClick={()=>{setAddModal(true)}}>
                              <input type="text" className="form-control" placeholder="Search here" />
                              <a className="btn" >
                                <img src={searchicon} alt="" />
                              </a>
                            </form>
                          </div>
                          <div className="add-group" onClick={()=>{handleItemClick()}} >
                            <a className="btn btn-primary add-pluss ms-2" >
                              <img src={addicon} alt="" />
                            </a>
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
                      <th>Book Ref.</th>
                      <th>Book Date</th>
                      <th>Customer Ref.</th>
                      <th>Customer</th>
                      <th>Carrier Doc</th>
                      <th>House Doc</th>
                      <th>Customs Doc</th>
                      <th>SP Name</th>
                      <th>Origin</th>
                      <th>Destination</th>
                      <th>Quotation</th>
                    </tr>
                  </thead>
                  <tbody>
                      {jobData&&jobData.map((item,index)=>(
                        <tr key={index} >
                            <td>{item.CarrierBookRef}</td>
                            <td>{item.Date}</td>
                            <td>{item.CustomerRef}</td>
                            <td>{item.Customer}</td>
                            <td>{item.CarrierDoc}</td>
                            <td>{item.HouseDoc}</td>
                            <td>{item.CustomsDoc}</td>
                            <td>{item.SalesPerson}</td>
                            <td>{item.Origin}</td>
                            <td>{item.Destination}</td>
                        </tr>))}
                  </tbody>
                </table>
              </div>
            </div>
            </div>
        </div>}
        {AddModal && <AddJobModal setModal={setAddModal}/>}
        {Jobcreation && <JobCreation settable={setTableView} setJob={setJobcreation} JobDataFetch={JobDataFetch}/>}
    </>
  )
}

export default JobList